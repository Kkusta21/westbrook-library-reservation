# Prompts — User Stories
## Tool: aXet.oasis | Persona: Business Analyst | Answer Type: Detailed

---

## ⚙️ Context Parameters Configuration

> Use the same GLOBAL, REQUIREMENTS and RULES as in `01_functional_analysis_prompts.md`.

### CURRENT CONTEXT
```
We are in the User Stories phase of the SDLC.
The Functional Analysis has already been completed.
The deliverable is a complete set of User Stories with acceptance criteria,
ready to be used in sprint planning by a development team.
Language: English.
```

### RULES (add to existing)
```
- Follow the standard format: "As a [role], I want to [action] so that [benefit]."
- Each story must have a unique ID (US-001, US-002...).
- Each story must have clear acceptance criteria in Gherkin format (Given / When / Then).
- Group stories by Epic.
- Indicate story size estimation (S / M / L / XL).
- Each story must be independently deliverable where possible.
```

---

## 💬 Prompt 1 — Identify Epics

```
Based on the Functional Requirements from the Functional Analysis document,
identify the main Epics for the Westbrook Community Library reservation system.

For each Epic provide:
- Epic ID (EP-001...)
- Epic name
- Short description
- List of functional requirements it covers (FR-XXX)
```

---

## 💬 Prompt 2 — Generate User Stories per Epic

```
For each Epic identified, generate all the User Stories.

Each story must follow this format:
- ID: US-XXX
- Epic: EP-XXX
- Title: short descriptive title
- Story: "As a [role], I want to [action] so that [benefit]."
- Acceptance Criteria (Gherkin):
  Given [context]
  When [action]
  Then [expected result]
- Size: S / M / L / XL
- Priority: High / Medium / Low
- Dependencies: list any US-XXX this story depends on
```

---

## 💬 Prompt 3 — Edge Cases and Error Stories

```
Review the user stories generated and add any missing stories that cover:
- Error scenarios (e.g. trying to book an already reserved room)
- Permission and access control (e.g. patron vs staff vs manager actions)
- Notification and confirmation stories
- Edge cases in availability checking

Assign IDs continuing from the last US-XXX generated.
```

---

## 💬 Prompt 4 — Definition of Done

```
Generate a "Definition of Done" section that applies to all user stories in this project.
Include criteria related to: functionality, testing, documentation, and code quality.
```

---

## 💬 Prompt 5 — Review

```
Review all user stories generated. Check that:
- Every functional requirement (FR-XXX) is covered by at least one story
- No story is too large to be completed in one sprint (if so, split it)
- Acceptance criteria are testable and unambiguous
- There are no duplicate stories

List any gaps and add the missing stories.
```

---

## 💾 Prompt 6 — Export (Autonomous Chat)

```
Save the complete User Stories document as "UserStories_v1.0.md"
using Markdown formatting:
- Use # for Epic headings
- Use tables for story summaries
- Use code blocks for Gherkin acceptance criteria
Save it to the current workspace folder.
```
