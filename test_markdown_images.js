const fs = require('fs');
const files = fs.readdirSync('content/projects');
files.forEach(f => {
  const content = fs.readFileSync('content/projects/' + f, 'utf-8');
  if (!content.includes('![')) {
    console.log(`Adding an image to ${f}`);
    fs.writeFileSync('content/projects/' + f, content + '\n\n### Gallery\n\n![Gallery Image 1](https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80)\n\n![Gallery Image 2](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80)\n');
  }
});
