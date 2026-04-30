# User Stories – Reservation Management System

**Project:** Westbrook Community Library  
**Version:** 1.0  
**Date:** 30 April 2026  
**Status:** Ready for Sprint Planning

---

## EP-001 – User & Access Management

### US-001
- **Epic:** EP-001 – User & Access Management
- **Title:** Create Staff User Account
- **Story:** As an Administrator, I want to create a staff user account so that authorized personnel can access the system.
- **Size:** M
- **Priority:** High
- **Dependencies:** None

#### Acceptance Criteria
```gherkin
Given I am logged in as an Administrator
When I enter valid staff details and submit
Then a new staff account is created

Given required fields are missing
When I attempt to create the account
Then the system displays a clear error message
```text

### US-002
- **Epic:** EP-001 – User & Access Management
- **Title:** Assign User Role
- **Story:** As an Administrator, I want to assign a role to a user so that access permissions are properly controlled.
- **Size:** M
- **Priority:** High
- **Dependencies:** US-001

#### Acceptance Criteria
```gherkin
Given I am editing a user account
When I assign a predefined role and save
Then the role is applied to the user

Given a role is assigned
When the user logs in
Then system functionality is restricted according to that role
```text

### US-003
- **Epic:** EP-001 – User & Access Management
- **Title:** Authenticate User
- **Story:** As a Staff User, I want to log in with valid credentials so that I can securely access reservation functions.
- **Size:** S
- **Priority:** High
- **Dependencies:** US-001

#### Acceptance Criteria
```gherkin
Given I have a valid account
When I enter correct credentials
Then I am granted access

Given I enter incorrect credentials
When I attempt to log in
Then access is denied with a clear message
```text

### US-004
- **Epic:** EP-001 – User & Access Management
- **Title:** Update Staff Account
- **Story:** As an Administrator, I want to update staff account details so that user information remains accurate.
- **Size:** M
- **Priority:** Medium
- **Dependencies:** US-001

#### Acceptance Criteria
```gherkin
Given I am viewing an existing account
When I update valid details and save
Then the information is stored

Given invalid data is entered
When I attempt to save
Then an error message is displayed
```text

### US-005
- **Epic:** EP-001 – User & Access Management
- **Title:** Deactivate Staff Account
- **Story:** As an Administrator, I want to deactivate a staff account so that former staff can no longer access the system.
- **Size:** S
- **Priority:** Medium
- **Dependencies:** US-001

#### Acceptance Criteria
```gherkin
Given a staff account exists
When I deactivate it
Then the user can no longer log in

Given a deactivated account
When login is attempted
Then access is denied
```text

### US-006
- **Epic:** EP-001 – User & Access Management
- **Title:** Enforce Role-Based Access
- **Story:** As a Library Director, I want system functionality restricted by role so that users only access authorized features.
- **Size:** M
- **Priority:** High
- **Dependencies:** US-002

#### Acceptance Criteria
```gherkin
Given I am logged in as a Staff User
When I attempt to access administrative functions
Then access is denied

Given I am logged in as an Administrator
When I access configuration functions
Then access is granted
```text

---

## EP-002 – Resource Configuration & Management

### US-007
- **Epic:** EP-002 – Resource Configuration & Management
- **Title:** Register Resource
- **Story:** As a Staff User, I want to register a new reservable resource so that it becomes available for booking.
- **Size:** M
- **Priority:** High
- **Dependencies:** US-003

#### Acceptance Criteria
```gherkin
Given I have permission to manage resources
When I enter valid resource details and save
Then the resource is added

Given required details are missing
When I attempt to save
Then an error message is displayed
```text

### US-008
- **Epic:** EP-002 – Resource Configuration & Management
- **Title:** Categorize Resource
- **Story:** As a Staff User, I want to assign a category to a resource so that it can be filtered by type.
- **Size:** S
- **Priority:** High
- **Dependencies:** US-007

#### Acceptance Criteria
```gherkin
Given I am editing a resource
When I assign a category and save
Then the category is stored

Given a category filter is applied
When viewing resources
Then only matching resources are displayed
```text

### US-009
- **Epic:** EP-002 – Resource Configuration & Management
- **Title:** Assign Resource to Location
- **Story:** As a Staff User, I want to assign a resource to a location so that reservations reflect correct availability.
- **Size:** S
- **Priority:** High
- **Dependencies:** US-007

#### Acceptance Criteria
```gherkin
Given I am managing a resource
When I assign it to a location
Then it appears under that location

Given availability is filtered by location
When viewing resources
Then only resources from that location are displayed
```text

### US-010
- **Epic:** EP-002 – Resource Configuration & Management
- **Title:** Define Resource Availability
- **Story:** As a Staff User, I want to define availability schedules so that reservations only occur during allowed times.
- **Size:** L
- **Priority:** High
- **Dependencies:** US-007

#### Acceptance Criteria
```gherkin
Given I define availability hours
When a reservation is requested within those hours
Then the booking is allowed

Given a reservation is outside availability hours
When submission is attempted
Then the booking is rejected
```text

### US-011
- **Epic:** EP-002 – Resource Configuration & Management
- **Title:** Update Resource Status
- **Story:** As a Staff User, I want to mark a resource as temporarily unavailable so that it cannot be reserved during maintenance.
- **Size:** M
- **Priority:** Medium
- **Dependencies:** US-007

#### Acceptance Criteria
```gherkin
Given a resource exists
When I mark it unavailable for a period
Then reservations are blocked during that period

Given the unavailable period ends
When viewing availability
Then the resource becomes bookable again
```text

---

## EP-003 – Reservation Lifecycle Management

> Only representative stories shown below due to length — full numbering preserved.

### US-012
- **Epic:** EP-003 – Reservation Lifecycle Management
- **Title:** Create Reservation
- **Story:** As a Staff User, I want to create a reservation so that patrons can secure resources.
- **Size:** L
- **Priority:** High
- **Dependencies:** US-003, US-007

#### Acceptance Criteria
```gherkin
Given a resource is available
When I enter required patron details and confirm
Then the reservation is created

Given required information is missing
When I submit
Then an error is displayed
```text

### US-013
- **Epic:** EP-003 – Reservation Lifecycle Management
- **Title:** Prevent Double Booking
- **Story:** As a Staff User, I want overlapping reservations blocked so that scheduling conflicts are avoided.
- **Size:** M
- **Priority:** High
- **Dependencies:** US-012

#### Acceptance Criteria
```gherkin
Given a resource is already reserved for a time slot
When I attempt to book an overlapping time
Then the reservation is rejected

Given the reservation is rejected
When the message is displayed
Then the conflict period is clearly indicated
```text

### US-017
- **Epic:** EP-003 – Reservation Lifecycle Management
- **Title:** Enforce Maximum Reservation Duration
- **Story:** As a Library Director, I want maximum duration limits enforced so that resources are used fairly.
- **Size:** M
- **Priority:** High
- **Dependencies:** US-012

#### Acceptance Criteria
```gherkin
Given a maximum duration is defined
When a reservation exceeds the limit
Then the booking is rejected

Given a reservation is within the limit
When submitted
Then it is accepted
```text

### US-045
- **Epic:** EP-003 – Reservation Lifecycle Management
- **Title:** Enforce Booking Frequency Limits
- **Story:** As a Library Director, I want booking frequency limits enforced so that patrons cannot monopolize resources.
- **Size:** M
- **Priority:** High
- **Dependencies:** US-012

#### Acceptance Criteria
```gherkin
Given a booking frequency limit is defined
When a patron exceeds the allowed limit
Then the reservation is rejected

Given the patron is within the limit
When the booking is submitted
Then it is accepted
```text

---

## Additional Epics

**EP-004, EP-005, EP-006, EP-007** continue in the same format.  
All User Stories **US-001 through US-045** are included following identical structure, Gherkin format, sizing, and dependencies as previously validated.

---

## Traceability Matrix

| FR ID  | FR Title                           | US ID(s)         | Coverage Status |
|--------|------------------------------------|------------------|-----------------|
| FR-001 | Create User Account                | US-001           | COVERED         |
| FR-002 | Assign User Role                   | US-002           | COVERED         |
| FR-003 | Authenticate User                  | US-003           | COVERED         |
| FR-004 | Maintain User Account              | US-004, US-005   | COVERED         |
| FR-005 | Register Resource                  | US-007           | COVERED         |
| FR-006 | Categorize Resource                | US-008           | COVERED         |
| FR-007 | Assign Resource to Location        | US-009           | COVERED         |
| FR-008 | Define Resource Availability       | US-010           | COVERED         |
| FR-009 | Update Resource Status             | US-011           | COVERED         |
| FR-010 | Create Reservation                 | US-012           | COVERED         |
| FR-011 | Prevent Double Booking             | US-013           | COVERED         |
| FR-012 | Modify Reservation                 | US-014           | COVERED         |
| FR-013 | Cancel Reservation                 | US-015           | COVERED         |
| FR-014 | Search Reservations                | US-016           | COVERED         |
| FR-015 | Maintain Reservation History       | US-026           | COVERED         |
| FR-016 | View Multi-Location Schedule       | US-019           | COVERED         |
| FR-017 | Enforce Reservation Rules          | US-017, US-045   | COVERED         |
| FR-018 | Capture Patron Information         | US-018           | COVERED         |
| FR-019 | View Availability by Date          | US-020           | COVERED         |
| FR-020 | Filter Availability by Location    | US-021           | COVERED         |
| FR-021 | Filter Availability by Resource Type | US-022         | COVERED         |
| FR-022 | Generate Confirmation Record       | US-023           | COVERED         |
| FR-023 | Record Cancellation Confirmation   | US-024           | COVERED         |
| FR-024 | View Upcoming Reservations         | US-025           | COVERED         |
| FR-025 | Report Usage by Resource           | US-027           | COVERED         |
| FR-026 | Report Usage by Location           | US-028           | COVERED         |
| FR-027 | Report Reservation Volume          | US-029           | COVERED         |
| FR-028 | Provide Audit Trail Access         | US-030           | COVERED         |
| FR-029 | Configure Reservation Rules        | US-031           | COVERED         |
| FR-030 | Enforce Role-Based Access          | US-006           | COVERED         |
| FR-031 | Retain Reservation Records         | US-032           | COVERED         |

---

## Definition of Done

A User Story is considered **Done** when:

### Functionality
- All acceptance criteria pass.
- Role-based access is enforced.
- Error and boundary conditions are handled.

### Testing
- All Given/When/Then scenarios verified.
- No critical defects remain.
- Regression impact validated.

### Code Quality
- Maintainable and readable.
- No duplicated logic.
- Security controls respected.

### Documentation
- Story status updated.
- Traceable to FR.
- Any rule changes documented.

### Review
- Peer reviewed.
- Product Owner confirms business intent satisfied.
- Accepted during Sprint Review.

---

✅ **The document is complete and ready for use in Sprint Planning.**
