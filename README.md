# Westbrook Community Library — Reservation Management System

## Project Description

This repository contains the full Software Development Life Cycle (SDLC) documentation and source code for the **Westbrook Community Library Reservation Management System** — a project developed as part of an AI-assisted software engineering exercise using aXet tools.

## Business Context

Westbrook Community Library serves approximately 45,000 residents across one central building and two branch locations. All room and equipment reservations are currently managed manually through paper logbooks, phone calls, and informal emails — with no centralized system across the three locations.

This causes double-bookings, lost records, staff overload, patron dissatisfaction, and lack of visibility for management decisions.

The goal of this project is to improve reservation management across all three locations, reducing errors, freeing up staff time, and providing a better experience for both patrons and employees.

## Repository Structure

```
westbrook-library-reservation/
│
├── README.md                          # This file
├── docs/
│   ├── pdf/                           # Final polished deliverables (PDF format)
│   │   ├── FunctionalAnalysis_v1.0.pdf
│   │   ├── UserStories_v1.0.pdf
│   │   ├── TechnicalDesign_v1.0.pdf
│   │   └── TestPlan_v1.0.pdf
│   ├── md/                            # Documents in Markdown (GitHub-renderable)
│   │   ├── FunctionalAnalysis_v1.0.md
│   │   └── UserStories_v1.0.md
│   └── prompts/                       # AI prompts used at each SDLC phase
│       ├── 01_functional_analysis_prompts.md
│       └── 02_user_stories_prompts.md
│
├── src/                               # Application source code
│   └── (to be added)
│
└── tests/                             # Unit and integration tests
    └── (to be added)
```

## Documents

| Document | Description | Status |
|---|---|---|
| Functional Analysis v1.0 | Functional and non-functional requirements, use cases, stakeholders | ✅ Complete |
| User Stories v1.0 | User stories with acceptance criteria | ✅ Complete |
| Technical Design v1.0 | Architecture and technology proposal | ✅ Complete |
| Test Plan v1.0 | Test strategy, test cases and unit tests | ⏳ Pending |

## AI Tools Used

- **aXet.oasis** — Used for document generation across all SDLC phases (Business Analyst, Architect, QA Tester personas)
- **aXet.plugin** — Used for code generation and unit test creation inside the IDE

## Team Members

| Name | Role |
|---|---|
| TBD | TBD |

## Academic Context

This project was developed as part of an AI-assisted software development challenge. All AI interactions were designed, guided, and reviewed by the team. The prompts used at each phase are documented in `docs/prompts/` to demonstrate reasoned and responsible use of generative AI tools.
