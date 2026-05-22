import type { TemplateContext } from '../types';

export function generatePlanningModeInfo(_ctx: TemplateContext): string {
  return `## Planning-Mode Safe Operations

If the host has a planning or review-only mode, a user-invoked skill still takes precedence over generic planning behavior. Treat the skill file as executable workflow instructions, not passive reference text.

Allowed because they inform the plan or review: \`$B\` browser checks, \`$D\` design/mockup helpers, \`codex exec\`/\`codex review\` or host-equivalent review commands, writes to \`~/.gstack/\` for local artifacts/logs, writes to the active plan/review file, and \`open\` or host-equivalent commands for generated local artifacts.

AskUserQuestion, or the host's equivalent user-input tool, satisfies an interactive planning turn. If no user-input tool is callable and the workflow needs a decision, report \`BLOCKED — user input unavailable\`. At STOP points, stop immediately and wait for the user's response.`;
}

export function generateCompletionStatus(ctx: TemplateContext): string {
  return `## Completion Status Protocol

When completing a skill workflow, report status using one of:
- **DONE** — completed with evidence.
- **DONE_WITH_CONCERNS** — completed, but list concerns.
- **BLOCKED** — cannot proceed; state blocker and what was tried.
- **NEEDS_CONTEXT** — missing info; state exactly what is needed.

Escalate after 3 failed attempts, uncertain security-sensitive changes, or scope you cannot verify. Format: \`STATUS\`, \`REASON\`, \`ATTEMPTED\`, \`RECOMMENDATION\`.

## Operational Self-Improvement

Before completing, if you discovered a durable project quirk or command fix that would save 5+ minutes next time, log it:

\`\`\`bash
${ctx.paths.binDir}/gstack-learnings-log '{"skill":"SKILL_NAME","type":"operational","key":"SHORT_KEY","insight":"DESCRIPTION","confidence":N,"source":"observed"}'
\`\`\`

Do not log obvious facts or one-time transient errors.

## Local completion log (optional)

After workflow completion, you may record a local-only timeline entry. Use skill \`name:\` from frontmatter. OUTCOME is success/error/abort/unknown.

\`\`\`bash
_RUN_END=$(date +%s)
_RUN_DUR=$(( _RUN_END - \${_RUN_START:-_RUN_END} ))
~/.claude/skills/gstack/bin/gstack-timeline-log '{"skill":"SKILL_NAME","event":"completed","branch":"'$(git branch --show-current 2>/dev/null || echo unknown)'","outcome":"OUTCOME","duration_s":"'"$_RUN_DUR"'","session":"'"$_SESSION_ID"'"}' 2>/dev/null || true
\`\`\`

Replace \`SKILL_NAME\` and \`OUTCOME\` before running.`;
}
