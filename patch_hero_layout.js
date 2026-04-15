const fs = require('fs');
let code = fs.readFileSync('src/components/sections/Hero.tsx', 'utf8');

// The $2M Saved text is wrapping weirdly, let's make sure white-space is nowrap to avoid this for all metrics.
const searchStr = `className={\`font-display font-extrabold leading-none \${METRIC_COLORS[metric.color] ?? "text-[var(--color-brand-violet)]"}\`}`;
const newStr = `className={\`font-display font-extrabold leading-none whitespace-nowrap \${METRIC_COLORS[metric.color] ?? "text-[var(--color-brand-violet)]"}\`}`;

code = code.replace(searchStr, newStr);

fs.writeFileSync('src/components/sections/Hero.tsx', code);
