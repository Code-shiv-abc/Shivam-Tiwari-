const fs = require('fs');
let code = fs.readFileSync('src/components/sections/Hero.tsx', 'utf8');

// Replace AnimatedNumber props in Hero
const searchStr = `<AnimatedNumber
                    value={metric.value}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals ?? 0}
                    duration={1800}
                    startOnMount
                    delay={1000 + index * 120}
                    reduceMotion={reduced}
                  />`;

const newStr = `<div aria-label={\`\${metric.value} \${metric.label}\`}>
                    <AnimatedNumber
                      value={metric.value}
                      prefix={metric.prefix}
                      suffix={metric.suffix}
                      decimals={metric.decimals ?? 0}
                      duration={1800}
                    />
                  </div>`;

code = code.replace(searchStr, newStr);

fs.writeFileSync('src/components/sections/Hero.tsx', code);
