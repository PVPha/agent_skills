## Mandatory Skill Gate (blocking)

Before any analysis, plan, tool call, or code edit, the agent must:

1. Read skills only from `.agent/skills/` (no skill discovery scan).
2. Select matching skill(s) from the user request using files in `.agent/skills/`.
3. Open each selected `SKILL.md`.
4. Announce: `Using skill(s): <names> | source=.agent/skills/`.

If step 1-4 is not completed, the agent must stop and do it first.
If no skill matches, announce: `Using skill(s): none | source=.agent/skills/`.

## Output Contract (first line required)

`SKILL_GATE: PASS | skills=<...>`

If this line is missing, treat the run as invalid and retry.
