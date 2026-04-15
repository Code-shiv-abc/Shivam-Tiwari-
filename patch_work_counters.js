const fs = require('fs');
let code = fs.readFileSync('src/components/sections/work.tsx', 'utf8');

// Replace conditional isVisible animated number with strict AnimatedNumber and add aria-labels
const searchStr = `{isVisible ? (
                <AnimatedNumber
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={1800}
                />
              ) : (
                "0"
              )}`;

const newStr = `<div aria-label={\`\${metric.value} \${metric.label}\`}>
                <AnimatedNumber
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={1800}
                />
              </div>`;

code = code.replace(searchStr, newStr);
fs.writeFileSync('src/components/sections/work.tsx', code);
