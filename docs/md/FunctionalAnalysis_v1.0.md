Functional Analysis and Requirements
Westbrook Community Library – Reservation Management System
Version: 1.0
Date: 30 April 2026
Status: Draft – Ready for Stakeholder Review

1. Document Control
1.1 Document Information
Item	Description
Document Title	Functional Analysis and Requirements – Reservation Management System
Project Name	Westbrook Community Library Reservation Management
Version	1.0
Date	30 April 2026
Status	Draft
Prepared By	Business Analysis Team
Reviewed By	Library Director (Pending)
Approved By	Pending
1.2 Version History
Version	Date	Author	Description
0.1	20 April 2026	BA Team	Initial structure
0.9	28 April 2026	BA Team	Full draft content
1.0	30 April 2026	BA Team	Consolidated version for review
Executive Summary
Westbrook Community Library serves approximately 45,000 residents across one central building and two branch locations. Currently, all reservations for rooms and shared equipment are managed manually using paper logbooks, telephone calls, and informal emails. This fragmented approach results in double-bookings, lost records, inconsistent rule enforcement, staff overload, patron dissatisfaction, and limited management visibility.

The objective of this initiative is to define and implement a centralized Reservation Management System that standardizes reservation processes across all three locations. The system must reduce errors, improve operational efficiency, enhance the patron experience, and provide reliable reporting for management decision-making.

The solution must be usable by non-technical staff, accessible from existing branch computers, operate within a limited municipal budget, support at least three simultaneous locations, and avoid prolonged downtime or complex historical data migration.

This document defines the functional and non-functional requirements for the system and serves as the authoritative baseline for design, development, and validation.

2. Introduction
2.1 Purpose
This document defines the complete set of functional and non-functional requirements for the Reservation Management System. It establishes a clear, structured, and traceable baseline to guide development and testing activities.

2.2 Scope
The system will manage reservations for:

Study rooms
Meeting halls
Projectors
Laptops
Shared equipment
This document defines what the system must do, without prescribing implementation details.

2.3 Intended Audience
Library Director
Branch Managers
Library Staff
Project Manager
Development Team
Quality Assurance Team
3. Organizational Context
Westbrook Community Library operates:

1 Central Library
2 Branch Locations
12 Staff Members
All reservation activities are currently managed manually and independently at each branch. This lack of centralization leads to operational inefficiencies, inconsistent policies, and limited reporting capabilities.

The strategic objective is to introduce a centralized reservation management capability that standardizes processes and improves service quality while respecting budget constraints.

4. Stakeholder Identification
Stakeholder	Role	Interest
Library Director	Executive oversight	Reporting, policy enforcement
Branch Managers	Operational supervision	Visibility and control
Library Staff	Daily operations	Ease of use, reduced workload
Patrons	Service users	Reliable reservations
Municipal Administration	Funding authority	Cost control and accountability
5. Current Situation – AS-IS
Reservations are recorded manually using:

Paper logbooks
Telephone communication
Informal email exchanges
Each branch maintains independent records.

Identified Issues
Double-bookings due to manual checks
Lost or illegible records
No cross-location visibility
High administrative workload
Inconsistent reservation rules
No reliable reporting mechanism
These issues reduce efficiency, increase errors, and limit management insight.

6. TO-BE Vision
The future system will:

Centralize reservation records across three locations
Automatically prevent scheduling conflicts
Standardize reservation rules
Provide structured reporting
Improve staff efficiency
Enhance patron experience
The system will serve as the single authoritative source of reservation data.

7. System Scope and Boundaries
7.1 In Scope
Management of reservable rooms and equipment
Creation, modification, and cancellation of reservations
Multi-location support (minimum three locations)
Role-based access control
Reservation reporting
Audit tracking
7.2 Out of Scope
Financial transactions or billing
Replacement of unrelated library systems
Integration with municipal systems
Major infrastructure investment
Complex historical data migration
Expansion beyond current three locations
8. Functional Requirements
All functional requirements are uniquely identified and traceable.

8.1 User Management
FR-001 – Create User Account
The system shall allow authorized personnel to create staff user accounts.
Priority: High
Source: Management

FR-002 – Assign User Role
The system shall allow assignment of predefined roles to control access permissions.
Priority: High
Source: Management

FR-003 – Authenticate User
The system shall require authentication before access to reservation functions.
Priority: High
Source: Management

FR-004 – Maintain User Account
The system shall allow authorized users to update or deactivate staff accounts.
Priority: Medium
Source: Management

8.2 Resource Management
FR-005 – Register Resource
The system shall allow registration of reservable rooms and equipment.
Priority: High
Source: Staff

FR-006 – Categorize Resource
The system shall allow classification of resources by type.
Priority: High
Source: Staff

FR-007 – Assign Resource to Location
Each resource shall be associated with a specific library location.
Priority: High
Source: Management

FR-008 – Define Resource Availability
The system shall allow definition of standard availability schedules for each resource.
Priority: High
Source: Staff

FR-009 – Update Resource Status
The system shall allow temporary marking of a resource as unavailable.
Priority: Medium
Source: Staff

8.3 Reservation Management
FR-010 – Create Reservation
The system shall allow creation of reservations for available resources.
Priority: High
Source: Staff, Patron

FR-011 – Prevent Double-Booking
The system shall prevent overlapping reservations for the same resource.
Priority: High
Source: Staff

FR-012 – Modify Reservation
The system shall allow modification of existing reservations subject to rules.
Priority: High
Source: Staff

FR-013 – Cancel Reservation
The system shall allow cancellation of existing reservations.
Priority: High
Source: Staff

FR-014 – Search Reservations
The system shall allow searching reservations by date, location, resource, or patron.
Priority: High
Source: Staff

FR-015 – Maintain Reservation History
The system shall maintain a traceable history of reservation actions.
Priority: Medium
Source: Management

FR-016 – View Multi-Location Schedule
The system shall display reservation schedules across all locations.
Priority: High
Source: Management

FR-017 – Enforce Reservation Rules
The system shall enforce defined booking policies such as duration limits.
Priority: High
Source: Management

FR-018 – Capture Patron Information
The system shall require capture of essential patron information during reservation creation.
Priority: High
Source: Staff

8.4 Availability and Scheduling
FR-019 – View Availability by Date
The system shall display availability by selected date.
Priority: High
Source: Staff

FR-020 – Filter Availability by Location
The system shall allow filtering availability by library location.
Priority: High
Source: Staff

FR-021 – Filter Availability by Resource Type
The system shall allow filtering availability by resource category.
Priority: Medium
Source: Staff

8.5 Notifications and Confirmation Records
FR-022 – Generate Reservation Confirmation Record
The system shall generate a standardized confirmation record for each reservation.
Priority: High
Source: Patron

FR-023 – Record Cancellation Confirmation
The system shall record confirmation of reservation cancellations.
Priority: Medium
Source: Staff

FR-024 – View Upcoming Reservations
The system shall allow viewing of upcoming reservations.
Priority: Low
Source: Staff

8.6 Reporting and Administration
FR-025 – Report Usage by Resource
The system shall generate usage reports by resource.
Priority: Medium
Source: Management

FR-026 – Report Usage by Location
The system shall generate usage reports by location.
Priority: Medium
Source: Management

FR-027 – Report Reservation Volume
The system shall generate reports by time period.
Priority: Medium
Source: Management

FR-028 – Provide Audit Trail Access
The system shall allow authorized users to view logged reservation activities.
Priority: Medium
Source: Management

FR-029 – Configure Reservation Rules
The system shall allow administrators to define and update reservation policies.
Priority: High
Source: Management

FR-030 – Enforce Role-Based Access
The system shall restrict functionality according to assigned user roles.
Priority: High
Source: Management

FR-031 – Retain Reservation Records
The system shall retain reservation records in accordance with defined retention policies.
Priority: Medium
Source: Management

9. Non-Functional Requirements
9.1 Usability
NFR-001 – Ease of Use
Category: Usability
The system shall be intuitive for non-technical staff.
Acceptance: Staff can perform core tasks after basic training.

NFR-002 – Minimal Training
Category: Usability
The system shall require minimal formal training.
Acceptance: Operational readiness within one working day of instruction.

NFR-003 – Clear Error Messages
Category: Usability
The system shall provide understandable error feedback.
Acceptance: Errors clearly describe the issue and corrective action.

9.2 Performance
NFR-004 – Responsive Operations
Category: Performance
The system shall respond promptly to reservation actions.
Acceptance: No noticeable delay during normal use.

NFR-005 – Concurrent Usage
Category: Performance
The system shall support simultaneous use across three locations.
Acceptance: No functional degradation during concurrent operations.

9.3 Availability
NFR-006 – Operational Availability
Category: Availability
The system shall be accessible during library operating hours.
Acceptance: Accessible whenever the library is open.

9.4 Security
NFR-007 – Secure Access Control
Category: Security
Only authorized users shall access reservation functions.
Acceptance: Unauthorized access attempts are denied.

NFR-008 – Patron Data Protection
Category: Security
Patron data shall be protected from unauthorized access.
Acceptance: Only authorized users can view or modify patron data.

9.5 Operational Constraints
NFR-009 – Existing Computer Compatibility
Category: Operational Constraint
The system shall operate on existing branch computers.
Acceptance: No hardware replacement required.

NFR-010 – Limited Budget Compliance
Category: Operational Constraint
The solution shall align with limited municipal budget conditions.
Acceptance: No large capital investment required.

NFR-011 – Minimal Downtime During Transition
Category: Operational Constraint
Implementation shall not cause prolonged service interruption.
Acceptance: Reservation operations remain available during transition.

NFR-012 – No Complex Data Migration
Category: Operational Constraint
The system shall not require full digitization of historical records.
Acceptance: System operational without migrating all past logbooks.

10. Use Cases
(Condensed listing; each includes Actors, Preconditions, Main Flow, Alternative Flow, Postconditions.)

UC-001 Authenticate User
UC-002 Check Availability
UC-003 Create Reservation
UC-004 Modify Reservation
UC-005 Cancel Reservation
UC-006 Manage Resources
UC-007 Generate Reports
UC-008 Configure Reservation Rules
Each use case fully aligns with corresponding functional requirements.

11. Assumptions and Dependencies
Assumptions:

Staff participation in validation
Standardized policies defined
Basic computer literacy
Dependencies:

Policy approval
Stakeholder sign-off
Data retention decision
12. Exclusions
No payment processing
No municipal integration
No infrastructure redesign
No expansion beyond three locations
13. Open Questions
Will patrons self-book?
What are exact booking limits?
What is the cancellation policy?
What patron data is mandatory?
What is the retention period?
14. Glossary
Term	Definition
Reservation	Confirmed allocation of a resource
Resource	Room or equipment available for booking
Patron	Individual requesting reservation
Location	One of three library sites
Audit Trail	Logged record of system actions
Administrator	User with configuration authority
Staff User	Operational system user