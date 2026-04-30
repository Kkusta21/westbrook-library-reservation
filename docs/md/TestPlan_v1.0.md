# Test Plan – Reservation Management System

| Field | Value |
|-------|-------|
| Project | Westbrook Community Library Reservation Management System |
| Version | 1.0 |
| Date | 30 April 2026 |
| Status | Draft |
| Prepared By | QA Team |
| Reviewed By | Pending |
| Approved By | Pending |

---

# 1. Introduction

## 1.1 Purpose

This Test Plan defines the strategy, scope, approach, resources, and schedule for testing the Reservation Management System.  

It ensures validation of:

- Functional Requirements (FR-001 to FR-031)
- User Stories (US-001 to US-045)
- Non-Functional Requirements (NFR-001 to NFR-023)

## 1.2 Scope

The system manages reservations for study rooms, meeting halls, projectors, laptops, and shared equipment across three library locations.

In scope:
- User & access management
- Resource management
- Reservation lifecycle
- Reporting
- Configuration
- Security, performance, usability, availability

Out of scope:
- Financial processing
- External integrations
- Mobile app
- Historical data migration

---

# 2. Test Strategy

## 2.1 Test Levels

### Unit Testing
- Framework: Jest + Supertest
- ≥80% branch coverage required
- 14/14 tests passing

### Integration Testing
- API + DB validation
- Conflict prevention (FR-012)
- Role-based access (FR-029)

### System Testing
- Full validation of FR-001 to FR-031
- ≥95% test pass rate required

### Acceptance Testing
- Business validation of workflows
- Stakeholder sign-off required

---

## 2.2 Entry & Exit Criteria

| Level | Entry Criteria | Exit Criteria |
|--------|----------------|---------------|
| Unit | Code merged & build successful | ≥80% coverage, 0 failing tests |
| Integration | Unit tests passed | All endpoints validated |
| System | Staging deployed | ≥95% pass rate, 0 Critical defects |
| UAT | System testing complete | Stakeholder sign-off |

---

# 3. Test Environment

## 3.1 Hardware
- 8GB RAM minimum
- Stable broadband connection

## 3.2 Software
- Node.js 20
- Express 4
- PostgreSQL 15+
- React 18 + Vite
- Chrome & Edge (latest)

## 3.3 Test Data
- 3 Locations
- Admin, Staff, Patron roles
- Active & cancelled reservations
- Overlapping bookings

---

# 4. Functional Test Cases

## 4.1 Authentication (FR-003, FR-029, FR-030)

| TC-ID | Title | Related Req | Steps | Expected Result | Priority |
|-------|--------|-------------|--------|-----------------|----------|
| TC-001 | Valid Login | FR-003 | 1. Enter valid credentials 2. Click Login | JWT issued; dashboard loaded | High |
| TC-002 | Invalid Login | FR-003 | 1. Enter wrong password 2. Submit | Access denied; 401 returned | High |
| TC-003 | Staff Access Admin Page | FR-029 | 1. Login as Staff 2. Access /admin URL | 403 Forbidden | High |
| TC-004 | Location Restriction | FR-030 | 1. Staff from Location A edits Location B reservation | Operation blocked | High |

---

## 4.2 Reservation Management (FR-010 to FR-018)

| TC-ID | Title | Related Req | Steps | Expected Result | Priority |
|-------|--------|-------------|--------|-----------------|----------|
| TC-010 | View Availability | FR-010 | 1. Select location 2. Select date | Slots displayed accurately | High |
| TC-011 | Create Reservation | FR-011 | 1. Select slot 2. Enter patron 3. Confirm | Reservation saved; confirmation ID generated (FR-013) | High |
| TC-012 | Prevent Double Booking | FR-012, NFR-020 | 1. Create reservation 2. Attempt overlapping booking | Second request rejected | Very High |
| TC-013 | Enforce Max Duration | FR-016 | 1. Attempt booking > allowed duration | Booking rejected | High |
| TC-014 | Cancel Reservation | FR-015 | 1. Cancel booking | Slot released immediately | High |
| TC-015 | View Upcoming Reservations | FR-018 | 1. Filter future reservations | Correct list displayed | High |

---

## 4.3 Resource Management (FR-006 to FR-009)

| TC-ID | Title | Related Req | Steps | Expected Result | Priority |
|-------|--------|-------------|--------|-----------------|----------|
| TC-020 | Create Resource | FR-006 | 1. Enter details 2. Save | Resource stored | High |
| TC-021 | Modify Resource | FR-007 | 1. Edit capacity 2. Save | Updated value displayed | High |
| TC-022 | Deactivate Resource | FR-008 | 1. Deactivate 2. Attempt booking | Booking blocked | High |
| TC-023 | Filter Resources | FR-009 | 1. Filter by type/location | Correct results shown | Medium |

---

## 4.4 Reporting (FR-022 to FR-025)

| TC-ID | Title | Related Req | Steps | Expected Result | Priority |
|-------|--------|-------------|--------|-----------------|----------|
| TC-030 | Generate Summary Report | FR-022 | 1. Select date range 2. Generate | Accurate totals displayed | High |
| TC-031 | Utilization Report | FR-023 | 1. Select resource 2. Generate | Correct % calculation | High |
| TC-032 | Audit Trail Report | FR-024, NFR-011 | 1. Create reservation 2. View audit | Log entry exists | High |
| TC-033 | Export CSV | FR-025 | 1. Click Export 2. Open file | Valid CSV format | Medium |

---

# 5. Non-Functional Test Cases

## 5.1 Usability (NFR-001 to NFR-003)

| TC-ID | Title | Steps | Expected Result |
|-------|--------|--------|----------------|
| TC-034 | Complete Reservation < 5 min | 1. Start timer 2. Create booking | ≤5 minutes |
| TC-035 | Clear Error Message | Attempt conflict booking | Message includes conflict period |
| TC-036 | Browser Compatibility | Test in Chrome & Edge | No layout or functional issues |

---

## 5.2 Performance (NFR-004, NFR-005)

| TC-ID | Title | Steps | Expected Result |
|-------|--------|--------|----------------|
| TC-037 | Response ≤3 seconds | Measure API response | ≤3 sec |
| TC-038 | 12 Concurrent Users | Simulate load | No degradation |
| TC-039 | Concurrent Conflict Handling | Two identical submissions | Only one succeeds |

---

## 5.3 Security (NFR-008 to NFR-011)

| TC-ID | Title | Steps | Expected Result |
|-------|--------|--------|----------------|
| TC-040 | Block Unauthenticated Access | Access API without token | 401 Unauthorized |
| TC-041 | Enforce Role Restrictions | Staff accesses admin config | 403 Forbidden |
| TC-042 | Audit Log Records Action | Create reservation | Log entry recorded |

---

## 5.4 Availability (NFR-006, NFR-007)

| TC-ID | Title | Steps | Expected Result |
|-------|--------|--------|----------------|
| TC-043 | System Available During Hours | Access at 10:00 | Fully operational |
| TC-044 | Maintenance Notice | Schedule downtime | Notice shown 24h prior |

---

# 6. Unit Test Summary

| Test File | Tests | Passing | Failing | Coverage |
|------------|--------|----------|----------|-----------|
| tests/auth.service.test.js | 4 | 4 | 0 | ≥80% |
| tests/reservation.service.test.js | 5 | 5 | 0 | ≥80% |
| tests/resource.service.test.js | 5 | 5 | 0 | ≥80% |
| **TOTAL** | **14** | **14** | **0** | ≥80% |

---

# 7. Defect Management

## Severity Levels

| Level | Definition |
|--------|------------|
| Critical | Core function broken, data corruption, security breach |
| High | Major function partially broken |
| Medium | Minor functional issue |
| Low | Cosmetic issue |

## Lifecycle

New → Assigned → Fixed → Verified → Closed

---

# 8. Risks & Mitigation

| Risk | Related Req | Mitigation |
|------|-------------|------------|
| Double Booking | FR-012 | TC-012, TC-039 |
| Unauthorized Access | FR-029 | TC-041 |
| Performance Degradation | NFR-005 | TC-038 |

---

# 9. Sign-Off Criteria

System approved for go-live when:

- 0 Critical defects
- 0 High defects
- ≥95% pass rate
- ≥80% coverage
- NFR-004 performance met
- NFR-005 concurrency validated
- Stakeholder sign-off completed

---

# ✅ End of Document
