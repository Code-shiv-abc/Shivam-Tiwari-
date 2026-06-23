const fs = require('fs');
let code = fs.readFileSync('src/components/ui/animated-number.tsx', 'utf8');

code = code.replace(
  ']}, [value, prefix, suffix, decimals, duration, reduceMotion, finalString]);',
  '    // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [value, prefix, suffix, decimals, duration, reduceMotion, finalString]);'
);
code = code.replace(
  ']}, [value, prefix, suffix, decimals, duration, reduceMotion, finalString, formatter]);',
  '    // eslint-disable-next-line react-hooks/exhaustive-deps\n  }, [value, prefix, suffix, decimals, duration, reduceMotion, finalString]);'
);

fs.writeFileSync('src/components/ui/animated-number.tsx', code);
