const fs = require('fs');
const content = fs.readFileSync('src/components/layout/navbar.tsx', 'utf8');

// Fix the invalid replacements
let newContent = content.replace(
  'onClick={(e) => handleNavClick(e, item.href)}\n            />\n            <motion.div',
  'onClick={() => setIsMobileMenuOpen(false)}\n            />\n            <motion.div'
);

newContent = newContent.replace(
  'onClick={(e) => handleNavClick(e, item.href)}\n                  className="p-2 -mr-2 text-text-2 hover:text-text transition-colors"\n                  aria-label="Close menu"',
  'onClick={() => setIsMobileMenuOpen(false)}\n                  className="p-2 -mr-2 text-text-2 hover:text-text transition-colors"\n                  aria-label="Close menu"'
);

fs.writeFileSync('src/components/layout/navbar.tsx', newContent);
