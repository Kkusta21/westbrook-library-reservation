# Prompts — Functional Analysis and Requirements
## Tool: aXet.oasis | Persona: Business Analyst | Answer Type: Detailed

---

## ⚙️ Context Parameters Configuration

### GLOBAL
```
We are working on a software development project for Westbrook Community Library,
a public library serving 45,000 residents across 1 central building and 2 branch locations,
managed by 12 staff members with a limited municipal budget.

The library currently manages all room and equipment reservations (study rooms, meeting halls,
projectors, laptops, shared resources) manually through paper logbooks, phone calls and informal
emails — with no centralized system across the three locations.

This causes double-bookings, lost records, staff overload, patron dissatisfaction and lack of
visibility for management decisions.

The goal is to improve reservation management across all three locations, reducing errors,
freeing staff time, and providing a better experience for both patrons and employees.
```

### REQUIREMENTS
```
- The solution must be usable by non-technical staff members.
- It must be accessible from existing computers at each branch.
- Budget is very limited — no large infrastructure investment is possible.
- No prolonged downtime or complex data migration is acceptable.
- Must support at least 3 simultaneous locations.
- Must handle rooms and shared equipment as reservable resources.
```

### CURRENT CONTEXT
```
We are in the Functional Analysis and Requirements phase of the SDLC.
The deliverable is a complete Functional Analysis and Requirements document,
professional and structured, ready to be handed to a development team.
Language: English.
```

### RULES
```
- Do not suggest specific technologies or programming languages.
- Do not include architecture or infrastructure decisions.
- Focus on WHAT the system must do, not HOW it does it.
- Use clear, professional language understandable by both business and technical audiences.
- All requirements must be numbered and traceable.
- Distinguish clearly between functional and non-functional requirements.
```

---

## 💬 Prompt 1 — Document Structure

```
Based on the project context provided in the parameters, generate the full structure
of a Functional Analysis and Requirements document for the Westbrook Community Library
reservation management project.

Only generate the document structure with section titles and a one-line description
of what each section will contain. Do not write the full content yet.
```

---

## 💬 Prompt 2 — Sections 1 to 4

```
The structure looks good. Now generate the full content for the following sections:

1. Document Control (version, date, authors, status)
2. Introduction (purpose, scope, intended audience)
3. Organization Context (who Westbrook Library is, current situation summary)
4. Stakeholder Identification (who is affected by or involved in the system)

Write each section in full, professional prose. Use tables where appropriate.
```

---

## 💬 Prompt 3 — Sections 5 to 7

```
Continue the document with the following sections:

5. Current Situation Analysis — AS-IS (describe in detail how the reservation
   process works today, its pain points and inefficiencies)
6. TO-BE Vision (describe what the improved situation should look like
   without specifying technology)
7. System Scope and Boundaries (what is inside and outside the scope of this project)
```

---

## 💬 Prompt 4 — Functional Requirements

```
Continue with:

8. Functional Requirements — list all the things the system must be able to do,
   grouped by functional area (e.g. resource management, reservation management,
   user management, notifications, reporting).

   Each requirement must:
   - Have a unique ID (FR-001, FR-002...)
   - Have a short title
   - Have a clear description
   - Have a priority (High / Medium / Low)
   - Have a source (who raised this need: staff, patron, management)
```

---

## 💬 Prompt 5 — Non-Functional Requirements

```
Continue with:

9. Non-Functional Requirements — list all quality, performance, usability,
   security and operational constraints the system must comply with.

   Each requirement must:
   - Have a unique ID (NFR-001, NFR-002...)
   - Have a category (Usability / Performance / Security / Availability / Maintainability...)
   - Have a clear description
   - Have an acceptance criterion where possible
```

---

## 💬 Prompt 6 — Use Cases

```
Continue with:

10. Use Cases — identify and describe the main use cases of the system.
    For each use case include:
    - Use Case ID and Name
    - Actor(s)
    - Preconditions
    - Main flow (step by step)
    - Alternative flows
    - Postconditions

    Identify at least 6 use cases covering: making a reservation, cancelling,
    checking availability, managing resources, generating reports, and user access.
```

---

## 💬 Prompt 7 — Final Sections

```
Complete the document with:

11. Assumptions and Dependencies
12. Exclusions and Out of Scope items
13. Open Questions (things that need to be clarified before development starts)
14. Glossary (key terms used in the document)

Then write a brief Executive Summary at the beginning of the document
(after the Document Control section) that summarises the project, the problem
and the objectives in no more than half a page.
```

---

## 💬 Prompt 8 — Review and Quality Check

```
Review the complete document you have generated throughout this session.
Check that:
- All requirement IDs are unique and sequential
- There are no contradictions between sections
- The tone is consistent and professional throughout
- No technology choices have been made
- All functional requirements have a corresponding use case or are justified

List any gaps or inconsistencies you find, and correct them.
```

---

## 💾 Prompt 9 — Export (Autonomous Chat)

```
Save the complete Functional Analysis and Requirements document
as "FunctionalAnalysis_v1.0.md" using Markdown formatting:
- Use # for main headings
- Use ## for section headings
- Use tables for requirements (ID | Title | Description | Priority | Source)
- Use numbered lists for use case steps
Save it to the current workspace folder.
```
