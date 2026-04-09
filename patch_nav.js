const fs = require('fs');
const content = fs.readFileSync('src/components/layout/navbar.tsx', 'utf8');

let newContent = content.replace(
  '  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);',
  `  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };`
);

newContent = newContent.replace(
  /onClick=\{\(\) => setIsMobileMenuOpen\(false\)\}/g,
  'onClick={(e) => handleNavClick(e, item.href)}'
);

newContent = newContent.replace(
  /className=\{cn\(\n\s*"relative text-sm font-medium transition-colors duration-200",/g,
  `onClick={(e) => handleNavClick(e, item.href)}
                    className={cn(
                      "relative text-sm font-medium transition-colors duration-200",`
);

fs.writeFileSync('src/components/layout/navbar.tsx', newContent);
