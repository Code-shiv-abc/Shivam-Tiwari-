const fs = require('fs');
let code = fs.readFileSync('src/components/sections/Hero.tsx', 'utf8');

const oldImage = `<Image
                src="/images/shivam.jpg"
                alt="Shivam Tiwari — Engineering Leader"
                fill
                sizes="(max-width: 1024px) 280px, 420px"
                className="object-cover object-top rounded-[24px]"
                priority
                onError={() => setImgError(true)}
              />`;

const newImage = `<Image
                src="/images/shivam.jpg"
                alt="Shivam Tiwari — Engineering Leader"
                width={420}
                height={420}
                className="object-cover object-top rounded-[24px] w-full h-full"
                priority
                onError={() => setImgError(true)}
              />`;

code = code.replace(oldImage, newImage);
fs.writeFileSync('src/components/sections/Hero.tsx', code);
