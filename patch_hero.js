const fs = require('fs');
const content = fs.readFileSync('src/components/sections/Hero.tsx', 'utf8');

// Add willChange to pulsing rings
let newContent = content.replace(
  'border: `1px solid ${ring.color}`,\n                  }}',
  'border: `1px solid ${ring.color}`,\n                    willChange: "transform, opacity",\n                  }}'
);

// Add willChange to floating cards
newContent = newContent.replace(
  /style=\{\{ background: "var\(--color-glass-bg, rgba\(13,15,26,0.80\)\)" \}\}/g,
  'style={{ background: "var(--color-glass-bg, rgba(13,15,26,0.80))", willChange: "transform" }}'
);

// Optimize status dot animation to only use opacity
newContent = newContent.replace(
  '          0%, 100% { opacity: 1; transform: scale(1); }\n          50%       { opacity: 0.5; transform: scale(0.8); }',
  '          0%, 100% { opacity: 1; }\n          50%       { opacity: 0.5; }'
);

fs.writeFileSync('src/components/sections/Hero.tsx', newContent);
