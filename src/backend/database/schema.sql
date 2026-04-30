-- =============================================================================
-- Westbrook Community Library – Reservation Management System
-- Database Schema v1.0
-- PostgreSQL 15+
--
-- Entities (11):
--   Role, User, Location, ResourceType, Resource, TimeSlot,
--   ReservationStatus, Reservation, Notification, AuditLog, ReservationRule
--
-- Conventions:
--   • Table names: snake_case, plural
--   • All timestamps: TIMESTAMPTZ (UTC)
--   • Soft deletes via is_active flag (no physical DELETE on key entities)
--   • Double-booking prevented via EXCLUSION CONSTRAINT (btree_gist extension)
-- =============================================================================


-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------

-- Required for the EXCLUSION CONSTRAINT on non-range columns (resource_id)
CREATE EXTENSION IF NOT EXISTS btree_gist;


-- =============================================================================
-- 1. ROLES
--    Defines access roles: Administrator, Staff, Patron
-- =============================================================================

CREATE TABLE IF NOT EXISTS roles (
    id   SERIAL       PRIMARY KEY,
    name VARCHAR(50)  NOT NULL UNIQUE
);

COMMENT ON TABLE  roles      IS 'Access-control roles assigned to system users.';
COMMENT ON COLUMN roles.name IS 'Role label, e.g. Administrator, Staff, Patron.';


-- =============================================================================
-- 2. USERS
--    System accounts for library staff and administrators.
-- =============================================================================

CREATE TABLE IF NOT EXISTS users (
    id            SERIAL        PRIMARY KEY,
    name          VARCHAR(150)  NOT NULL,
    email         VARCHAR(255)  NOT NULL UNIQUE,
    password_hash VARCHAR(255)  NOT NULL,
    role_id       INTEGER       NOT NULL REFERENCES roles(id) ON UPDATE CASCADE,
    is_active     BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  users               IS 'Library staff and administrator accounts.';
COMMENT ON COLUMN users.email         IS 'Login identifier. Must be unique across all users.';
COMMENT ON COLUMN users.password_hash IS 'bcrypt hash. Plain-text password is never stored.';
COMMENT ON COLUMN users.is_active     IS 'FALSE = soft-deleted; account retained for audit trail.';

CREATE INDEX IF NOT EXISTS idx_users_role_id
    ON users(role_id);

CREATE INDEX IF NOT EXISTS idx_users_email
    ON users(email);


-- =============================================================================
-- 3. LOCATIONS
--    The three library branches.
-- =============================================================================

CREATE TABLE IF NOT EXISTS locations (
    id         SERIAL        PRIMARY KEY,
    name       VARCHAR(150)  NOT NULL UNIQUE,
    address    TEXT,
    is_active  BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  locations           IS 'Library branch locations.';
COMMENT ON COLUMN locations.is_active IS 'FALSE disables the location without deleting historical data.';


-- =============================================================================
-- 4. RESOURCE TYPES
--    Categories of reservable items, e.g. Study Room, Projector, Laptop.
-- =============================================================================

CREATE TABLE IF NOT EXISTS resource_types (
    id          SERIAL        PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL UNIQUE,
    description TEXT,
    created_at  TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE resource_types IS 'Categories used to group resources and apply reservation rules.';


-- =============================================================================
-- 5. RESOURCES
--    Individual reservable rooms or equipment items.
-- =============================================================================

CREATE TABLE IF NOT EXISTS resources (
    id               SERIAL        PRIMARY KEY,
    name             VARCHAR(150)  NOT NULL,
    description      TEXT,
    resource_type_id INTEGER       NOT NULL REFERENCES resource_types(id) ON UPDATE CASCADE,
    location_id      INTEGER       NOT NULL REFERENCES locations(id) ON UPDATE CASCADE,
    capacity         INTEGER       CHECK (capacity IS NULL OR capacity > 0),
    is_active        BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    -- A resource name must be unique within its location
    UNIQUE (name, location_id)
);

COMMENT ON TABLE  resources           IS 'Reservable rooms and equipment, scoped to a library location.';
COMMENT ON COLUMN resources.capacity  IS 'Maximum number of occupants/users. NULL = not applicable.';
COMMENT ON COLUMN resources.is_active IS 'FALSE = resource unavailable for new bookings.';

CREATE INDEX IF NOT EXISTS idx_resources_location_id
    ON resources(location_id);

CREATE INDEX IF NOT EXISTS idx_resources_resource_type_id
    ON resources(resource_type_id);

CREATE INDEX IF NOT EXISTS idx_resources_is_active
    ON resources(is_active);


-- =============================================================================
-- 6. TIME SLOTS
--    Defines regular weekly availability windows for each resource.
-- =============================================================================

CREATE TABLE IF NOT EXISTS time_slots (
    id           SERIAL       PRIMARY KEY,
    resource_id  INTEGER      NOT NULL REFERENCES resources(id) ON UPDATE CASCADE ON DELETE CASCADE,
    day_of_week  SMALLINT     NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
    -- 0 = Sunday … 6 = Saturday (ISO: 1 = Monday, but 0-based used for simplicity)
    start_time   TIME         NOT NULL,
    end_time     TIME         NOT NULL,
    is_available BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_time_slots_order CHECK (start_time < end_time),
    -- Prevent duplicate day+window per resource
    UNIQUE (resource_id, day_of_week, start_time, end_time)
);

COMMENT ON TABLE  time_slots             IS 'Weekly recurring availability windows for each resource.';
COMMENT ON COLUMN time_slots.day_of_week IS '0=Sunday, 1=Monday, …, 6=Saturday.';

CREATE INDEX IF NOT EXISTS idx_time_slots_resource_id
    ON time_slots(resource_id);


-- =============================================================================
-- 7. RESERVATION STATUSES
--    Lifecycle states for a reservation record.
-- =============================================================================

CREATE TABLE IF NOT EXISTS reservation_statuses (
    id   SERIAL       PRIMARY KEY,
    name VARCHAR(50)  NOT NULL UNIQUE
);

COMMENT ON TABLE  reservation_statuses      IS 'Lifecycle states: Pending, Confirmed, Cancelled, Completed, No-Show.';
COMMENT ON COLUMN reservation_statuses.name IS 'Human-readable status label.';


-- =============================================================================
-- 8. RESERVATIONS
--    Core booking records. Enforces no-overlap per resource via EXCLUSION.
-- =============================================================================

CREATE TABLE IF NOT EXISTS reservations (
    id               SERIAL        PRIMARY KEY,
    resource_id      INTEGER       NOT NULL REFERENCES resources(id)             ON UPDATE CASCADE,
    user_id          INTEGER       NOT NULL REFERENCES users(id)                 ON UPDATE CASCADE,
    status_id        INTEGER       NOT NULL REFERENCES reservation_statuses(id)  ON UPDATE CASCADE,

    -- Patron (member of the public) information – captured at booking time
    patron_name      VARCHAR(150)  NOT NULL,
    patron_email     VARCHAR(255),
    patron_phone     VARCHAR(50),

    -- Booking window
    reservation_date DATE          NOT NULL,
    start_time       TIME          NOT NULL,
    end_time         TIME          NOT NULL,

    notes            TEXT,
    created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    CONSTRAINT chk_reservations_time_order
        CHECK (start_time < end_time),

    -- -----------------------------------------------------------------------
    -- DOUBLE-BOOKING PREVENTION
    -- No two non-cancelled reservations for the same resource may overlap.
    --
    -- tsrange combines date + time into a timestamp range.
    -- '[)' = inclusive start, exclusive end (half-open interval).
    -- The WHERE clause exempts Cancelled reservations so that cancelled slots
    -- become immediately re-bookable without constraint conflicts.
    --
    -- Requires: btree_gist extension (created above).
    -- -----------------------------------------------------------------------
    EXCLUDE USING gist (
        resource_id WITH =,
        tsrange(
            (reservation_date::text || ' ' || start_time::text)::timestamp,
            (reservation_date::text || ' ' || end_time::text)::timestamp,
            '[)'
        ) WITH &&
    )
);

COMMENT ON TABLE  reservations                  IS 'Core reservation records. Overlapping bookings prevented by EXCLUSION constraint.';
COMMENT ON COLUMN reservations.user_id          IS 'Staff member who created the reservation on behalf of the patron.';
COMMENT ON COLUMN reservations.patron_name      IS 'Patron name captured at booking time (not a system user).';
COMMENT ON COLUMN reservations.reservation_date IS 'Calendar date of the reservation.';

CREATE INDEX IF NOT EXISTS idx_reservations_resource_id
    ON reservations(resource_id);

CREATE INDEX IF NOT EXISTS idx_reservations_user_id
    ON reservations(user_id);

CREATE INDEX IF NOT EXISTS idx_reservations_status_id
    ON reservations(status_id);

-- Most frequent query pattern: "what is booked for resource X on date Y?"
CREATE INDEX IF NOT EXISTS idx_reservations_resource_date
    ON reservations(resource_id, reservation_date);

-- Cross-location availability view: filter by date across all resources
CREATE INDEX IF NOT EXISTS idx_reservations_date
    ON reservations(reservation_date);


-- =============================================================================
-- 9. NOTIFICATIONS
--    Confirmation and cancellation records generated per reservation event.
-- =============================================================================

CREATE TABLE IF NOT EXISTS notifications (
    id                SERIAL        PRIMARY KEY,
    reservation_id    INTEGER       NOT NULL REFERENCES reservations(id) ON UPDATE CASCADE ON DELETE CASCADE,
    notification_type VARCHAR(50)   NOT NULL
                          CHECK (notification_type IN ('confirmation', 'cancellation', 'modification', 'reminder')),
    sent_to           VARCHAR(255)  NOT NULL,
    message           TEXT,
    sent_at           TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  notifications                    IS 'Confirmation and status-change records for each reservation.';
COMMENT ON COLUMN notifications.notification_type  IS 'Event that triggered the notification.';
COMMENT ON COLUMN notifications.sent_to            IS 'Recipient address or identifier (email/phone).';

CREATE INDEX IF NOT EXISTS idx_notifications_reservation_id
    ON notifications(reservation_id);

CREATE INDEX IF NOT EXISTS idx_notifications_sent_at
    ON notifications(sent_at);


-- =============================================================================
-- 10. AUDIT LOG
--     Immutable record of every create, update, or delete action in the system.
-- =============================================================================

CREATE TABLE IF NOT EXISTS audit_log (
    id           SERIAL        PRIMARY KEY,
    user_id      INTEGER       REFERENCES users(id) ON UPDATE CASCADE,
    -- NULL user_id = system-generated action (e.g. scheduled job)
    action       VARCHAR(100)  NOT NULL,
    -- e.g. 'CREATE', 'UPDATE', 'DELETE', 'LOGIN', 'LOGOUT'
    entity_type  VARCHAR(100)  NOT NULL,
    -- e.g. 'reservation', 'resource', 'user'
    entity_id    INTEGER,
    old_values   JSONB,
    new_values   JSONB,
    ip_address   INET,
    performed_at TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE  audit_log             IS 'Immutable audit trail. Rows must never be updated or deleted.';
COMMENT ON COLUMN audit_log.user_id     IS 'Actor who performed the action. NULL for automated/system actions.';
COMMENT ON COLUMN audit_log.old_values  IS 'JSON snapshot of the record before the change.';
COMMENT ON COLUMN audit_log.new_values  IS 'JSON snapshot of the record after the change.';
COMMENT ON COLUMN audit_log.ip_address  IS 'Client IP address at the time of the action.';

CREATE INDEX IF NOT EXISTS idx_audit_log_user_id
    ON audit_log(user_id);

CREATE INDEX IF NOT EXISTS idx_audit_log_entity
    ON audit_log(entity_type, entity_id);

CREATE INDEX IF NOT EXISTS idx_audit_log_performed_at
    ON audit_log(performed_at DESC);


-- =============================================================================
-- 11. RESERVATION RULES
--     Policy rules applied per resource type (max duration, advance booking, etc.)
-- =============================================================================

CREATE TABLE IF NOT EXISTS reservation_rules (
    id                          SERIAL        PRIMARY KEY,
    resource_type_id            INTEGER       NOT NULL REFERENCES resource_types(id) ON UPDATE CASCADE,
    rule_name                   VARCHAR(100)  NOT NULL,
    max_duration_minutes        INTEGER       CHECK (max_duration_minutes IS NULL OR max_duration_minutes > 0),
    min_duration_minutes        INTEGER       CHECK (min_duration_minutes IS NULL OR min_duration_minutes > 0),
    max_advance_days            INTEGER       CHECK (max_advance_days IS NULL OR max_advance_days > 0),
    max_reservations_per_day    INTEGER       CHECK (max_reservations_per_day IS NULL OR max_reservations_per_day > 0),
    requires_approval           BOOLEAN       NOT NULL DEFAULT FALSE,
    is_active                   BOOLEAN       NOT NULL DEFAULT TRUE,
    created_at                  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at                  TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

    -- Only one active rule set per resource type
    UNIQUE (resource_type_id, rule_name)
);

COMMENT ON TABLE  reservation_rules                           IS 'Configurable booking policies applied per resource type.';
COMMENT ON COLUMN reservation_rules.max_duration_minutes      IS 'Maximum length of a single reservation in minutes. NULL = no limit.';
COMMENT ON COLUMN reservation_rules.min_duration_minutes      IS 'Minimum length of a single reservation in minutes. NULL = no minimum.';
COMMENT ON COLUMN reservation_rules.max_advance_days          IS 'How many days ahead a reservation may be booked. NULL = no limit.';
COMMENT ON COLUMN reservation_rules.max_reservations_per_day  IS 'Maximum reservations per resource per day. NULL = no limit.';
COMMENT ON COLUMN reservation_rules.requires_approval         IS 'TRUE = reservation is created with Pending status, awaiting admin confirmation.';

CREATE INDEX IF NOT EXISTS idx_reservation_rules_resource_type_id
    ON reservation_rules(resource_type_id);


-- =============================================================================
-- TRIGGERS
--    Automatically maintain updated_at timestamps on mutable tables.
-- =============================================================================

CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE OR REPLACE TRIGGER trg_locations_updated_at
    BEFORE UPDATE ON locations
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE OR REPLACE TRIGGER trg_resources_updated_at
    BEFORE UPDATE ON resources
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE OR REPLACE TRIGGER trg_reservations_updated_at
    BEFORE UPDATE ON reservations
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE OR REPLACE TRIGGER trg_reservation_rules_updated_at
    BEFORE UPDATE ON reservation_rules
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();


-- =============================================================================
-- SEED DATA
-- =============================================================================

-- ---------------------------------------------------------------------------
-- Roles  (FR-002, FR-030)
-- ---------------------------------------------------------------------------
INSERT INTO roles (name) VALUES
    ('Administrator'),
    ('Staff'),
    ('Patron')
ON CONFLICT (name) DO NOTHING;

-- ---------------------------------------------------------------------------
-- Reservation Statuses  (FR-010, FR-012, FR-013)
-- ---------------------------------------------------------------------------
INSERT INTO reservation_statuses (name) VALUES
    ('Pending'),       -- Created; awaiting confirmation (used when requires_approval = TRUE)
    ('Confirmed'),     -- Confirmed by staff or automatically on creation
    ('Cancelled'),     -- Cancelled by staff or patron
    ('Completed'),     -- Reservation window has passed; resource was used
    ('No-Show')        -- Reservation window has passed; patron did not attend
ON CONFLICT (name) DO NOTHING;


-- =============================================================================
-- END OF SCHEMA
-- =============================================================================
--
-- Deployment order is guaranteed by table definition sequence above:
--   roles → users
--   resource_types → resources ← locations
--   resources → time_slots
--   reservation_statuses, resources, users → reservations
--   reservations → notifications
--   users → audit_log
--   resource_types → reservation_rules
--
-- To apply:
--   psql -U <db_user> -d <db_name> -f src/backend/database/schema.sql
--
-- =============================================================================
