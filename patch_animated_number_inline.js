const fs = require('fs');
let code = fs.readFileSync('src/components/ui/animated-number.tsx', 'utf8');

// Using inline-block causes wrapping issues when combined with 5ch if the parent isn't wrapping right,
// let's use inline instead or just block without forcing width that breaks the layout
code = code.replace(
  `style={{ display: 'inline-block', minWidth: '5ch' }}`,
  `style={{ minWidth: '5ch' }}`
);

fs.writeFileSync('src/components/ui/animated-number.tsx', code);
