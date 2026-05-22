import type { TemplateContext } from '../types';

export function generateVendoringDeprecation(ctx: TemplateContext): string {
  return `If \`VENDORED_GSTACK\` is \`yes\`, warn once via AskUserQuestion unless \`~/.gstack/.vendoring-warned-$SLUG\` exists:

> This project has gstack vendored in \`.claude/skills/gstack/\`. Vendoring is deprecated.
> Remove the vendored copy?

Options:
- A) Yes, remove the vendored copy now
- B) No, I'll handle it myself

If A:
1. Run \`git rm -r .claude/skills/gstack/\`
2. Run \`echo '.claude/skills/gstack/' >> .gitignore\`
3. Run \`git add .claude/ .gitignore && git commit -m "chore: remove vendored gstack"\`
4. Tell the user: "Done. Install gstack globally with \`cd ~/.claude/skills/gstack && ./setup\`."

If B: say "OK, you're on your own to keep the vendored copy up to date."

Always run (regardless of choice):
\`\`\`bash
eval "$(${ctx.paths.binDir}/gstack-slug 2>/dev/null)" 2>/dev/null || true
touch ~/.gstack/.vendoring-warned-\${SLUG:-unknown}
\`\`\`

If marker exists, skip.`;
}
