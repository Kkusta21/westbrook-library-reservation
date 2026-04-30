# Functional Analysis and Requirements
## Westbrook Community Library – Reservation Management System

| Item | Description |
|---|---|
| **Document Title** | Functional Analysis and Requirements – Reservation Management System |
| **Project Name** | Westbrook Community Library Reservation Management |
| **Version** | 1.0 |
| **Date** | 30 April 2026 |
| **Status** | Draft – Ready for Stakeholder Review |
| **Prepared By** | Business Analysis Team |
| **Reviewed By** | Library Director (Pending) |
| **Approved By** | Pending |

---

## 1. Document Control

### 1.1 Version History

| Version | Date | Author | Description |
|---|---|---|---|
| 0.1 | 20 April 2026 | BA Team | Initial draft |
| 0.9 | 28 April 2026 | BA Team | Full content draft |
| 1.0 | 30 April 2026 | BA Team | Consolidated for review |

---

## Executive Summary

Westbrook Community Library serves approximately 45,000 residents across one central building and two branch locations. Reservation management for rooms and shared equipment is currently handled manually using paper logbooks, phone calls, and informal emails. This decentralized approach results in double-bookings, lost records, inconsistent rule enforcement, staff overload, patron dissatisfaction, and limited management visibility.

This project defines the functional and non-functional requirements for a centralized Reservation Management System to standardize operations across all three locations. The objectives are to reduce errors, improve operational efficiency, enhance patron experience, and provide management with reliable reporting capabilities.

The system must be usable by non-technical staff, accessible from existing computers, operate within a limited municipal budget, support at least three simultaneous locations, and avoid prolonged downtime or complex data migration.

---

## 2. Introduction

### 2.1 Purpose

This document defines the functional and non-functional requirements for the Reservation Management System. It establishes a clear, traceable baseline for design, development, testing, and validation.

### 2.2 Scope

The system will manage reservations for:

- Study rooms
- Meeting halls
- Projectors
- Laptops
- Shared equipment

This document defines WHAT the system must do, not HOW it will be implemented.

### 2.3 Intended Audience

- Library Director
- Branch Managers
- Library Staff
- Project Manager
- Development Team
- Quality Assurance Team

---

## 3. Organization Context

Westbrook Community Library operates 1 central building and 2 branch locations with 12 staff members. Reservation processes are manual and decentralized, leading to operational inefficiencies and limited reporting capability.

The strategic objective is to implement a centralized, standardized reservation system to improve service quality and operational control.

---

## 4. Stakeholder Identification

| Stakeholder | Interest | Influence |
|---|---|---|
| Library Director | Reporting, oversight | High |
| Branch Managers | Operational control | High |
| Staff | Ease of use | High |
| Patrons | Reliable reservations | Medium |
| Municipal Administration | Budget control | Medium |

---

## 5. Current Situation – AS-IS

Reservations are handled via paper logbooks, phone calls, and emails. Each branch maintains independent records.

**Pain points:**

- Double-bookings
- Lost or incomplete records
- No cross-location visibility
- High administrative workload
- No structured reporting
- Inconsistent rule enforcement

---

## 6. TO-BE Vision

The future system will:

- Centralize reservation records across all three locations
- Prevent scheduling conflicts automatically
- Standardize reservation policies and rules
- Provide consolidated reporting for management
- Improve patron and staff experience throughout the reservation lifecycle

---

## 7. System Scope and Boundaries

### In Scope

- Resource management (rooms and equipment)
- Reservation lifecycle management (create, modify, cancel)
- Multi-location support (3 locations)
- Reporting and audit trail
- Role-based access control

### Out of Scope

- Financial transactions or payment processing
- Replacement of other existing library systems
- Major infrastructure investment
- Complex historical data migration
- Integration with municipal systems

---

## 8. Functional Requirements

### 8.1 User Management

| ID | Title | Description | Priority | Source |
|---|---|---|---|---|
| FR-001 | User registration | The system shall allow administrators to register new users with name, role, and assigned location | High | Staff |
| FR-002 | Role assignment | The system shall support at least three roles: Administrator, Staff User, and Patron | High | Management |
| FR-003 | User authentication | The system shall require users to authenticate before accessing any functionality | High | Management |
| FR-004 | User deactivation | The system shall allow administrators to deactivate user accounts without deleting historical records | Medium | Management |
| FR-005 | Password management | The system shall allow users to reset their own passwords securely | Medium | Staff |

### 8.2 Resource Management

| ID | Title | Description | Priority | Source |
|---|---|---|---|---|
| FR-006 | Resource creation | The system shall allow administrators to create reservable resources with name, type, location, capacity, and status | High | Management |
| FR-007 | Resource modification | The system shall allow administrators to edit resource details at any time | High | Management |
| FR-008 | Resource deactivation | The system shall allow administrators to deactivate a resource, preventing new reservations without removing historical records | High | Management |
| FR-009 | Resource listing | The system shall display a list of all resources filtered by location, type, and availability | High | Staff |
| FR-010 | Resource availability view | The system shall show real-time availability of each resource by date and time slot | High | Staff, Patron |

### 8.3 Reservation Management

| ID | Title | Description | Priority | Source |
|---|---|---|---|---|
| FR-011 | Create reservation | The system shall allow authorized users to create a reservation by selecting resource, date, time slot, and patron details | High | Staff, Patron |
| FR-012 | Conflict prevention | The system shall automatically prevent double-bookings by blocking time slots already reserved | High | Staff |
| FR-013 | Reservation confirmation | The system shall generate a confirmation reference upon successful reservation creation | High | Patron |
| FR-014 | Modify reservation | The system shall allow authorized users to modify an existing reservation subject to availability | Medium | Staff |
| FR-015 | Cancel reservation | The system shall allow authorized users to cancel a reservation and immediately release the time slot | High | Staff, Patron |
| FR-016 | Reservation rules enforcement | The system shall enforce configurable rules such as maximum booking duration and advance booking limits | High | Management |
| FR-017 | Reservation history | The system shall maintain a complete history of all reservations including cancelled ones | Medium | Management |
| FR-018 | View upcoming reservations | The system shall allow staff and patrons to view upcoming reservations for a given resource or patron | High | Staff, Patron |

### 8.4 Notification Management

| ID | Title | Description | Priority | Source |
|---|---|---|---|---|
| FR-019 | Booking confirmation notification | The system shall send a confirmation notification to the patron upon reservation creation | Medium | Patron |
| FR-020 | Cancellation notification | The system shall notify the patron when their reservation is cancelled | Medium | Patron |
| FR-021 | Reminder notification | The system shall send a reminder notification to the patron before the reservation start time | Low | Patron |

### 8.5 Reporting

| ID | Title | Description | Priority | Source |
|---|---|---|---|---|
| FR-022 | Reservation summary report | The system shall generate a summary report of reservations by location, resource, and date range | High | Management |
| FR-023 | Resource utilization report | The system shall generate a report showing usage rates for each resource | High | Management |
| FR-024 | Audit trail report | The system shall provide an audit trail of all system actions including who performed them and when | Medium | Management |
| FR-025 | Export reports | The system shall allow reports to be exported in at least one standard format (e.g. CSV or PDF) | Medium | Management |

### 8.6 Configuration

| ID | Title | Description | Priority | Source |
|---|---|---|---|---|
| FR-026 | Configure booking rules | The system shall allow administrators to configure reservation rules per resource type or location | High | Management |
| FR-027 | Configure time slots | The system shall allow administrators to define available time slots and operating hours per location | High | Management |
| FR-028 | Configure locations | The system shall allow administrators to manage location details including name and operating hours | Medium | Management |

### 8.7 Access Control

| ID | Title | Description | Priority | Source |
|---|---|---|---|---|
| FR-029 | Role-based access | The system shall restrict functionality based on the user's assigned role | High | Management |
| FR-030 | Location-based access | The system shall allow staff users to be restricted to managing reservations at their assigned location | Medium | Management |
| FR-031 | Administrator override | The system shall allow administrators to manage reservations across all locations regardless of assignment | High | Management |

---

## 9. Non-Functional Requirements

### 9.1 Usability

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-001 | Usability | The system shall be usable by staff with basic computer literacy without prior training | New staff can complete a reservation in under 5 minutes after a 30-minute onboarding session |
| NFR-002 | Usability | The system shall display clear error messages that guide the user toward corrective action | All error messages include a description of the problem and a suggested resolution |
| NFR-003 | Usability | The system shall be accessible from standard web browsers on existing library computers | Verified on at least two major browsers without additional software installation |

### 9.2 Performance

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-004 | Performance | The system shall respond to user actions within an acceptable time under normal load | Page load and action responses complete within 3 seconds under standard conditions |
| NFR-005 | Performance | The system shall support concurrent use by all 12 staff members without degradation | No performance degradation observed during load testing with 12 simultaneous users |

### 9.3 Availability

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-006 | Availability | The system shall be available during all library operating hours | System uptime of at least 99% during defined operating hours |
| NFR-007 | Availability | The system shall provide a clear maintenance notice when planned downtime occurs | Users receive advance notice at least 24 hours before scheduled maintenance |

### 9.4 Security

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-008 | Security | The system shall require authentication for all access | No functionality is accessible without a valid authenticated session |
| NFR-009 | Security | The system shall enforce role-based access so users can only perform permitted actions | Verified through access control testing across all defined roles |
| NFR-010 | Security | The system shall protect patron personal data in accordance with applicable privacy regulations | Data handling reviewed and confirmed compliant before go-live |
| NFR-011 | Security | The system shall log all significant actions for audit purposes | Audit log captures user, action, timestamp, and affected record for all key operations |

### 9.5 Maintainability

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-012 | Maintainability | The system shall be configurable by administrators without requiring developer intervention | All rule and schedule changes achievable through the administration interface |
| NFR-013 | Maintainability | The system shall include documentation sufficient for a new administrator to manage it independently | Administration guide reviewed and validated by a non-technical staff member |

### 9.6 Scalability

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-014 | Scalability | The system shall support a minimum of three locations from initial deployment | All three locations operational at go-live |
| NFR-015 | Scalability | The system architecture shall not prevent the addition of further locations in the future | Confirmed during technical design review |

### 9.7 Compatibility

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-016 | Compatibility | The system shall function on the existing hardware and operating systems at each branch | Verified on existing library computers prior to go-live |
| NFR-017 | Compatibility | The system shall not require installation of proprietary client software | Accessible via a standard web browser only |

### 9.8 Reliability

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-018 | Reliability | The system shall prevent data loss in the event of an unexpected failure | No reservation records lost in failure and recovery testing |
| NFR-019 | Reliability | The system shall provide consistent behaviour across all three locations | Identical functionality confirmed at each location during acceptance testing |

### 9.9 Data Integrity

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-020 | Data Integrity | The system shall prevent duplicate reservations for the same resource and time slot | Conflict prevention verified through functional testing |
| NFR-021 | Data Integrity | The system shall retain all reservation records including cancellations for audit purposes | Historical records confirmed present and queryable after cancellation |

### 9.10 Budget and Deployment

| ID | Category | Description | Acceptance Criterion |
|---|---|---|---|
| NFR-022 | Budget | The solution shall operate within the library's limited municipal budget | Total cost of implementation and first year of operation within approved budget |
| NFR-023 | Deployment | The system shall be deployable without prolonged downtime or complex data migration | Go-live achieved without service interruption exceeding one working day |

---

## 10. Use Cases

### UC-001 – Authenticate User

| Field | Detail |
|---|---|
| **Actors** | All users (Staff, Administrator, Patron) |
| **Preconditions** | User has a registered account |
| **Postconditions** | User is authenticated and redirected to their home screen |

**Main Flow:**
1. User accesses the system login screen
2. User enters credentials (username and password)
3. System validates credentials
4. System grants access and redirects user to role-appropriate home screen

**Alternative Flows:**
- 3a. Invalid credentials: system displays error message and allows retry
- 3b. Account deactivated: system displays notification and denies access

---

### UC-002 – Check Resource Availability

| Field | Detail |
|---|---|
| **Actors** | Staff, Patron |
| **Preconditions** | User is authenticated |
| **Postconditions** | User has visibility of available time slots for the selected resource |

**Main Flow:**
1. User selects a location and resource type
2. User selects a date
3. System displays available and booked time slots for the selected resource and date
4. User reviews availability

**Alternative Flows:**
- 3a. No availability: system displays message indicating no slots are available for the selected date

---

### UC-003 – Create Reservation

| Field | Detail |
|---|---|
| **Actors** | Staff, Patron |
| **Preconditions** | User is authenticated; resource is available for the selected slot |
| **Postconditions** | Reservation is confirmed; time slot is blocked; confirmation reference is issued |

**Main Flow:**
1. User selects resource, date, and time slot
2. User enters patron details
3. System validates availability and applicable rules
4. System creates the reservation and generates a confirmation reference
5. System sends confirmation notification to the patron

**Alternative Flows:**
- 3a. Slot no longer available: system informs user and returns to availability view
- 3b. Rule violation (e.g. booking limit exceeded): system displays specific rule message and blocks creation

---

### UC-004 – Modify Reservation

| Field | Detail |
|---|---|
| **Actors** | Staff, Administrator |
| **Preconditions** | Reservation exists and is in an active state |
| **Postconditions** | Reservation is updated; original slot is released; new slot is blocked |

**Main Flow:**
1. User searches for and selects the reservation to modify
2. User selects new date, time slot, or resource
3. System validates new slot availability and rules
4. System updates the reservation and confirms the change

**Alternative Flows:**
- 3a. New slot unavailable: system informs user and retains original reservation

---

### UC-005 – Cancel Reservation

| Field | Detail |
|---|---|
| **Actors** | Staff, Administrator, Patron |
| **Preconditions** | Reservation exists and is in an active state |
| **Postconditions** | Reservation is cancelled; time slot is released; patron is notified |

**Main Flow:**
1. User searches for and selects the reservation to cancel
2. User confirms cancellation
3. System cancels the reservation and releases the time slot
4. System sends cancellation notification to the patron

**Alternative Flows:**
- 2a. User cancels the action: reservation remains unchanged

---

### UC-006 – Manage Resources

| Field | Detail |
|---|---|
| **Actors** | Administrator |
| **Preconditions** | Administrator is authenticated |
| **Postconditions** | Resource catalogue is updated |

**Main Flow:**
1. Administrator accesses resource management section
2. Administrator creates, edits, or deactivates a resource
3. System validates the input and saves changes
4. System confirms the update

**Alternative Flows:**
- 3a. Validation error: system displays error and returns to form

---

### UC-007 – Generate Reports

| Field | Detail |
|---|---|
| **Actors** | Administrator, Library Director, Branch Manager |
| **Preconditions** | User is authenticated with reporting access |
| **Postconditions** | Report is generated and optionally exported |

**Main Flow:**
1. User selects report type (reservation summary, utilization, audit trail)
2. User defines filters (location, date range, resource)
3. System generates and displays the report
4. User optionally exports the report

**Alternative Flows:**
- 3a. No data for selected filters: system displays message indicating no records found

---

### UC-008 – Configure Reservation Rules

| Field | Detail |
|---|---|
| **Actors** | Administrator |
| **Preconditions** | Administrator is authenticated |
| **Postconditions** | Rules are updated and applied to future reservations |

**Main Flow:**
1. Administrator accesses configuration section
2. Administrator defines or edits rules (max duration, advance booking window, time slots, operating hours)
3. System validates and saves the configuration
4. New rules are applied to all subsequent reservations

**Alternative Flows:**
- 3a. Invalid configuration: system displays validation error and retains previous settings

---

### UC-009 – View Upcoming Reservations

| Field | Detail |
|---|---|
| **Actors** | Staff, Patron, Administrator |
| **Preconditions** | User is authenticated |
| **Postconditions** | User has a clear view of upcoming reservations relevant to their role |

**Main Flow:**
1. User navigates to the upcoming reservations view
2. User applies filters if needed (location, resource, date range)
3. System displays list of upcoming reservations matching the filter
4. User selects a reservation to view full details

**Alternative Flows:**
- 3a. No upcoming reservations: system displays appropriate message

---

## 11. Assumptions and Dependencies

### Assumptions

- Staff will participate in onboarding and actively use the system from go-live
- Library management will define and standardize reservation policies before development begins
- All staff users possess basic computer literacy sufficient to use a browser-based application
- Existing hardware at each branch is sufficient to run the system without replacement
- Digitization of historical reservation records is not required

### Dependencies

- Reservation policy decisions must be approved by library management before development
- Stakeholder review and sign-off of this document is required before proceeding to design
- Organizational change management support is required to ensure staff adoption
- Data retention and privacy policy decisions must be confirmed before implementation

---

## 12. Exclusions

The following items are explicitly out of scope for this project:

- Financial processing or payment handling of any kind
- Integration with municipal or external government systems
- Infrastructure redesign or replacement of existing hardware
- Development of a mobile application
- Expansion beyond the three existing library locations
- Digitization of historical paper records

---

## 13. Open Questions

| # | Question | Owner | Status |
|---|---|---|---|
| OQ-001 | Will patrons be able to self-service reservations or only staff on their behalf? | Library Director | Open |
| OQ-002 | What are the exact booking limits per patron per day or week? | Branch Managers | Open |
| OQ-003 | What is the cancellation policy (minimum notice period)? | Library Director | Open |
| OQ-004 | What patron data is required to complete a reservation (name only, or contact details)? | Library Director | Open |
| OQ-005 | What is the required frequency and format of management reports? | Library Director | Open |
| OQ-006 | What is the required data retention period for reservation records? | Municipal Administration | Open |
| OQ-007 | Are there additional roles beyond Administrator, Staff, and Patron required? | Library Director | Open |
| OQ-008 | Should the system support access or viewing outside library operating hours? | Branch Managers | Open |

---

## 14. Glossary

| Term | Definition |
|---|---|
| Reservation | A confirmed allocation of a specific resource for a defined time slot |
| Resource | Any room or piece of equipment available for booking (study room, meeting hall, projector, laptop, etc.) |
| Patron | A library member or individual requesting a reservation |
| Location | One of the three library sites (central building or branch) |
| Audit Trail | A chronological record of all significant system actions and changes |
| Administrator | A user with full configuration and management authority across all locations |
| Staff User | An authorized library employee with operational access to manage reservations |
| Time Slot | A defined unit of bookable time within a resource's operating hours |
| Double-booking | The erroneous allocation of the same resource to two or more reservations at the same time |
| AS-IS | Description of the current state of the process before the new system |
| TO-BE | Description of the desired future state after the new system is implemented |
