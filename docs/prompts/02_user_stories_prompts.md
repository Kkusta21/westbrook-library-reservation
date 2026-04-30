# Prompts — User Stories
## Tool: aXet.oasis | Persona: Business Analyst | Answer Type: Detailed

---

## ⚙️ Context Parameters Configuration

### GLOBAL
```
We are working on a software development project for Westbrook Community Library,
a public library serving 45,000 residents across 1 central building and 2 branch
locations, managed by 12 staff members with a limited municipal budget.

The library needs a centralized Reservation Management System to replace the current
manual process of paper logbooks, phone calls and informal emails.

The system must manage reservations for study rooms, meeting halls, projectors,
laptops and shared equipment across all three locations.
```

### REQUIREMENTS
```
- The solution must be usable by non-technical staff members.
- It must be accessible from existing computers at each branch.
- Budget is very limited.
- Must support at least 3 simultaneous locations.
- Must handle rooms and shared equipment as reservable resources.
- Role-based access: Administrator, Staff User, Patron.
```

### ARCHITECTURE
```
Leave blank — not yet defined.
```

### TECHNOLOGIES
```
Leave blank — not yet defined.
```

### CURRENT CONTEXT
```
The Functional Analysis and Requirements document has been completed (v1.0).
We are now in the User Stories phase of the SDLC.
The deliverable is a complete set of User Stories with acceptance criteria,
ready to be used in sprint planning by a development team.
Language: English.
```

### RULES
```
- Follow the standard format: "As a [role], I want to [action] so that [benefit]."
- Each story must have a unique ID (US-001, US-002...).
- Each story must have clear acceptance criteria in Gherkin format (Given / When / Then).
- Group stories by Epic.
- Each Epic must have a unique ID (EP-001, EP-002...).
- Indicate story size: S / M / L / XL.
- Each story must reference its parent Epic.
- Do not suggest technologies or implementation details.
- Stories must be independently deliverable where possible.
```

---

## 📂 Files to open in aXet.oasis File Explorer

- `FunctionalAnalysis_v1.0.md`

---

## 💬 Prompt 1 — Identify Epics

```
Based on the Functional Requirements in the open document, identify the main
Epics for the Westbrook Community Library Reservation Management System.

For each Epic provide:
- Epic ID (EP-001, EP-002...)
- Epic name
- Short description (2-3 sentences)
- List of functional requirements it covers (FR-XXX)
- Priority (High / Medium / Low)

Do not generate user stories yet.
```

---

## 💬 Prompt 2 — Generate User Stories for first Epics

```
The Epics look good. Now generate all User Stories for EP-001 and EP-002.

For each story use this exact format:

**US-XXX**
- **Epic:** EP-XXX – [Epic name]
- **Title:** [Short descriptive title]
- **Story:** As a [role], I want to [action] so that [benefit].
- **Acceptance Criteria:**
  - Given [context], When [action], Then [expected result]
  - Given [context], When [action], Then [expected result]
- **Size:** S / M / L / XL
- **Priority:** High / Medium / Low
- **Dependencies:** US-XXX or None
```

---

## 💬 Prompt 3 — Continue with remaining Epics

```
Continue generating all User Stories for the remaining Epics
(EP-003 onwards), following the same format.
Continue the ID numbering from where you left off.
```

---

## 💬 Prompt 4 — Edge cases and error scenarios

```
Review all stories generated so far and add any missing stories that cover:

- Error scenarios (e.g. attempting to book an already reserved resource)
- Permission violations (e.g. a patron trying to access admin functions)
- Notification and confirmation stories
- Edge cases in availability checking (e.g. resource deactivated mid-booking)
- Boundary conditions (e.g. booking exactly at closing time)

Assign IDs continuing from the last US-XXX generated.
Do not repeat stories already written.
```

---

## 💬 Prompt 5 — Traceability matrix

```
Generate a traceability matrix that maps each Functional Requirement (FR-XXX)
from the Functional Analysis to at least one User Story (US-XXX).

Format it as a table:

| FR ID | FR Title | US ID(s) | Coverage Status |
|---|---|---|---|

Flag any FR that has no corresponding User Story as "NOT COVERED"
and add the missing story immediately after the table.
```

---

## 💬 Prompt 6 — Definition of Done

```
Generate a Definition of Done section that applies globally to all
User Stories in this project.

Include criteria for:
- Functionality (the story works as described)
- Testing (acceptance criteria are verified)
- Code quality (if applicable at this stage, keep it general)
- Documentation (the story is documented)
- Review (the story has been reviewed by a team member)
```

---

## 💬 Prompt 7 — Final review

```
Review the complete set of User Stories generated in this session.
Check that:

- Every FR-XXX from the Functional Analysis is covered by at least one story
- No two stories are duplicates
- All stories follow the agreed format consistently
- All acceptance criteria are testable and unambiguous
- No story is too large for a single sprint (if so, suggest how to split it)
- All IDs are unique and sequential

List any issues found and correct them.
```

---

## 💾 Prompt 8 — Export (Autonomous Chat)

```
Save the complete User Stories document as "UserStories_v1.0.md"
using Markdown formatting:
- Use # for Epic headings
- Use ## for each User Story
- Use tables for the traceability matrix
- Use code blocks for Gherkin acceptance criteria
- Include the Definition of Done as a final section
Save it to the current workspace folder.
```

---

## ✅ Actual Session Notes

- Date: 30 April 2026
- Tool: aXet.oasis
- Persona: Business Analyst
- Answer Type: Detailed
- Model used: [fill in which GPT model aXet used]
- Number of prompts sent: [fill in]
- Observations: [anything that worked well or needed adjustment]
