# Technical Design and Technology Proposal

## Westbrook Community Library – Reservation Management System

---

## Document Control

| Item | Description |
|------|-------------|
| Document Title | Technical Design and Technology Proposal |
| Project Name | Westbrook Community Library Reservation Management System |
| Version | 1.0 |
| Date | 30 April 2026 |
| Status | Draft |
| Prepared By | Software Architecture Team |
| Reviewed By | Pending |
| Approved By | Pending |

---

## 1. Introduction

This document defines the complete Technical Design for the Westbrook Community Library Reservation Management System.

It translates the approved Functional Analysis (v1.0) into:

- Architecture design
- Technology stack proposal
- Data model
- Security design
- Deployment architecture
- Traceability matrix
- Risk register

All decisions strictly follow these non-negotiable constraints:

- Very limited municipal budget
- Browser-based access only
- No proprietary client installation
- Simple architecture (no over-engineering)
- Support for 3 locations
- Prevent double-bookings
- Provide reporting and audit trail
- 99% uptime during operating hours

---

## 2. Architecture Overview

### 2.1 Architecture Style

✅ **Layered Monolithic Web Application**

#### Justification

| Constraint | Architectural Decision |
|-----------|-------------------------|
| Limited budget | Single deployable unit reduces infrastructure cost |
| Small user base (12 staff) | Microservices unnecessary |
| 3 locations only | No distributed architecture required |
| Simplicity requirement | Easier to maintain and operate |
| 99% uptime (not 99.99%) | Single VPS sufficient |

This avoids:

- Kubernetes
- Service mesh
- Distributed systems
- Event-driven microservices

### 2.2 Logical Architecture Layers

- Presentation Layer (Web UI)
- Application Layer (Business Logic)
- Data Access Layer
- Database Layer

---

## 3. Technology Stack

All technologies are open-source or low-cost to comply with budget constraints.

| Layer | Technology | Version | License | Justification |
|------|------------|---------|---------|---------------|
| Frontend | React | 18.x | MIT | Browser-based, component-driven, large ecosystem |
| Build Tool | Vite | Latest stable | MIT | Lightweight, fast build |
| Backend Runtime | Node.js | 20 LTS | MIT | Lightweight, low memory, easy deployment |
| Backend Framework | Express.js | 4.x | MIT | Minimal, stable, simple |
| Database | PostgreSQL | 15+ | Open-source | ACID compliance, prevents double-booking |
| Web Server | Nginx | Stable | BSD-style | HTTPS termination, reverse proxy |
| Hosting OS | Ubuntu Server LTS | LTS | Open-source | Stable, long-term support |
| Authentication | JWT-based | Open Standard | Free | Stateless, simple session handling |
| Reporting | PDF + CSV generation | Open-source libraries | Free | No commercial reporting engine |

### Why This Stack Works Together

- Node.js + Express integrates seamlessly with PostgreSQL.
- React communicates via REST APIs.
- Nginx serves frontend and proxies API.
- Ubuntu LTS ensures stability.
- All components run efficiently on a single VPS.

---

## 4. System Components

### 4.1 Web Frontend (Presentation Layer)

**Responsibilities:**

- Login screen
- Reservation calendar view
- Search/filter interface
- Reports display
- Confirmation display
- User management screens

**Justification:**

- Browser-based
- No installation
- Usable by non-technical staff

### 4.2 Authentication Module

**Responsibilities:**

- User login validation
- Password hashing
- JWT token generation
- Role enforcement

**Justification:**

- Secure access (NFR-007)
- Protect patron data (NFR-008)
- No expensive identity provider

### 4.3 Reservation Management Module

**Responsibilities:**

- Create, modify, cancel reservations
- Prevent double-booking
- Enforce reservation rules
- Capture patron information
- Maintain reservation history

**Justification:**

- Core system functionality
- Central rule enforcement
- Transactional integrity

### 4.4 Resource Management Module

**Responsibilities:**

- Register resources
- Categorize resources
- Assign to location
- Define availability schedules

### 4.5 Reporting Module

**Responsibilities:**

- Usage by resource
- Usage by location
- Reservation volume
- Audit trail access

### 4.6 Administration Module

**Responsibilities:**

- User account management
- Role assignment
- Reservation rule configuration
- Retention policy configuration

### 4.7 Database Layer

**Responsibilities:**

- Store structured data
- Enforce referential integrity
- Support transactions
- Support reporting queries

---

## 5. Data Model

### 5.1 Entities Overview

| Entity | Purpose |
|--------|---------|
| Role | Role-based access control |
| User | System users |
| Location | Library branches |
| ResourceType | Resource categories |
| Resource | Reservable rooms/equipment |
| TimeSlot | Availability schedules |
| Reservation | Reservation records |
| ReservationStatus | Reservation lifecycle |
| Notification | Confirmation records |
| AuditLog | Action tracking |
| ReservationRule | Policy enforcement |

### 5.2 Key Relationships

| Relationship | Cardinality |
|-------------|-------------|
| Role → User | 1:N |
| Location → Resource | 1:N |
| ResourceType → Resource | 1:N |
| Resource → TimeSlot | 1:N |
| Resource → Reservation | 1:N |
| ReservationStatus → Reservation | 1:N |
| User → Reservation | 1:N |
| Reservation → Notification | 1:N |
| User → AuditLog | 1:N |
| ResourceType → ReservationRule | 1:N |

✅ All functional requirements are covered by these entities.

---

## 6. Security Design

### 6.1 Authentication

- Username + password
- Salted hash storage
- HTTPS enforced

Supports:

- NFR-007 Secure Access
- NFR-008 Patron Data Protection

### 6.2 Authorization

- Role-Based Access Control
- API-level enforcement
- UI-level visibility control

### 6.3 Data Protection

- HTTPS encryption
- Disk-level encryption (if VPS supports at no additional cost)
- Restricted DB access
- Audit logging

### 6.4 Input Validation

- Server-side validation
- Parameterized queries
- CSRF protection
- XSS prevention
- Rate limiting

---

## 7. Deployment Architecture

### 7.1 Hosting Approach

✅ **Single Cloud VPS**

#### Justification

| Constraint | Alignment |
|-----------|-----------|
| Limited budget | Low monthly cost |
| No infrastructure redesign | No hardware purchase |
| 99% uptime | Reliable hosting provider |
| Simplicity | No clustering |

### 7.2 Environment Strategy

| Environment | Purpose |
|------------|---------|
| Development | Local development |
| Staging | Testing & validation |
| Production | Live system |

### 7.3 Infrastructure Requirements

| Resource | Specification |
|----------|---------------|
| CPU | 2 vCPU |
| RAM | 4 GB |
| Storage | 80–100 GB SSD |
| OS | Ubuntu LTS |

Sufficient for 12 staff and moderate usage.

### 7.4 Backup & Recovery

- Daily database backup
- Weekly full server snapshot
- 30–90 day retention
- Restore procedure documented

Supports:

- NFR-006 Availability
- NFR-011 Minimal Downtime

### 7.5 Go-Live Strategy

- Direct cutover
- No complex data migration
- Manual logs retained for reference
- Deployment outside peak hours

---

## 8. Functional Requirement Traceability Matrix

| FR ID | FR Title | Component(s) | Notes |
|------|----------|--------------|-------|
| FR-001 | Create User Account | Administration Module | Admin function |
| FR-002 | Assign User Role | Administration, Authentication | RBAC |
| FR-003 | Authenticate User | Authentication Module | Login validation |
| FR-004 | Maintain User Account | Administration | Update/deactivate |
| FR-005 | Register Resource | Resource Management | CRUD |
| FR-006 | Categorize Resource | Resource Management | ResourceType |
| FR-007 | Assign Resource to Location | Resource Management | Location mapping |
| FR-008 | Define Resource Availability | Resource Management | TimeSlot |
| FR-009 | Update Resource Status | Resource Management | Availability flag |
| FR-010 | Create Reservation | Reservation Management | Core function |
| FR-011 | Prevent Double-Booking | Reservation + Database | Transactional validation |
| FR-012 | Modify Reservation | Reservation Management | Update logic |
| FR-013 | Cancel Reservation | Reservation + Notification | Status update |
| FR-014 | Search Reservations | Reservation Management | Filtering |
| FR-015 | Maintain Reservation History | AuditLog | Tracking |
| FR-016 | View Multi-Location Schedule | Reservation + Resource | Cross-location view |
| FR-017 | Enforce Reservation Rules | ReservationRule + Reservation | Policy enforcement |
| FR-018 | Capture Patron Information | Reservation | Stored with reservation |
| FR-019 | View Availability by Date | Reservation + TimeSlot | Query logic |
| FR-020 | Filter by Location | Resource + Reservation | Filtering |
| FR-021 | Filter by Resource Type | ResourceType | Filtering |
| FR-022 | Generate Confirmation Record | Notification | Confirmation |
| FR-023 | Record Cancellation Confirmation | Notification | Logging |
| FR-024 | View Upcoming Reservations | Reservation | Date query |
| FR-025 | Report Usage by Resource | Reporting | Aggregation |
| FR-026 | Report Usage by Location | Reporting | Aggregation |
| FR-027 | Report Reservation Volume | Reporting | Aggregation |
| FR-028 | Provide Audit Trail Access | Reporting + AuditLog | Admin-only |
| FR-029 | Configure Reservation Rules | Administration | Rule management |
| FR-030 | Enforce Role-Based Access | Authentication | RBAC |
| FR-031 | Retain Reservation Records | Administration + Database | Retention policy |

✅ No FR marked **NOT COVERED**.

---

## 9. Technical Risk Register

| Risk ID | Description | Likelihood | Impact | Mitigation |
|--------|-------------|------------|--------|------------|
| TR-001 | Budget overrun | Medium | High | Strict scope control |
| TR-002 | Low staff adoption | Medium | High | Simple UI + training |
| TR-003 | Double-booking concurrency | Medium | High | DB transactions |
| TR-004 | Data loss | Low | High | Daily backups |
| TR-005 | Security breach | Low-Medium | High | HTTPS + RBAC |
| TR-006 | Internet disruption | Medium | Medium | Manual fallback |
| TR-007 | VPS outage | Low | Medium | Backup restore |
| TR-008 | Reporting performance | Low | Medium | Indexing |
| TR-009 | Misconfigured rules | Medium | Medium | Admin validation |
| TR-010 | Open-source vulnerability | Medium | Medium | Regular updates |
| TR-011 | Limited IT capability | Medium | High | Simple architecture |

---

## 10. Final Validation

- ✅ Architecture justified against constraints
- ✅ Open-source stack
- ✅ No over-engineering
- ✅ All components clearly defined
- ✅ Data model covers all FRs
- ✅ Security covers NFRs
- ✅ Deployment respects budget
- ✅ No contradictions between sections
- ✅ Stack coherent and compatible

---

## Status

**Technical Design v1.0 – Draft**  
Ready for Stakeholder Review.

---

If required, I can next generate:

- Implementation Roadmap
- Test Strategy
- Executive Summary
- Cost Estimation Model
