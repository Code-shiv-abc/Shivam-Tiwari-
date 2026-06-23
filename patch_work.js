const fs = require('fs');
let code = fs.readFileSync('src/components/sections/work.tsx', 'utf8');

// Update imports
code = code.replace(
  'import { CASE_STUDIES, LOGO_WALL, type CaseStudy } from "@/lib/site-config";',
  'import { CASE_STUDIES, ANONYMIZED_CLIENTS, type CaseStudy } from "@/lib/site-config";'
);

code = code.replace(
  'import { Users, Layers, Cloud } from "lucide-react";',
  'import { Users, Layers, Cloud, Landmark, HeartPulse } from "lucide-react";'
);

// Replace LogoWall
const oldLogoWallDef = `function LogoWall() {
  return (
    <div className="mt-24 w-full">
      <div className="text-center mb-8">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-3">
          COMPANIES I&apos;VE LED & ADVISED
        </span>
      </div>

      {/* Container with fade edges */}
      <div
        className="w-full overflow-hidden"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)"
        }}
      >
        <div className="flex lg:flex-wrap lg:justify-center overflow-x-auto pb-4 pt-2 -mx-4 px-4 gap-6 no-scrollbar snap-x">
          {LOGO_WALL.map((name, i) => (
            <div
              key={i}
              className="flex-shrink-0 snap-center flex items-center justify-center w-[160px] h-[70px] rounded-xl bg-surface-2 border border-border grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 cursor-default"
            >
              <span className="font-display font-bold text-text-2 tracking-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const newLogoWallDef = `const CLIENT_ICONS: Record<string, React.ElementType> = {
  Landmark,
  Cloud,
  HeartPulse,
};

function LogoWall() {
  return (
    <div className="mt-24 w-full">
      <div className="text-center mb-10">
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-3">
          COMPANIES I&apos;VE LED & ADVISED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {ANONYMIZED_CLIENTS.map((client, i) => {
          const Icon = CLIENT_ICONS[client.icon];
          return (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 px-6 rounded-2xl bg-surface-2 border border-border transition-all duration-300 hover:border-border-soft hover:bg-surface-3 cursor-default group"
            >
              <div className="mb-4 text-text-3 transition-colors duration-300 group-hover:text-brand-violet">
                {Icon && <Icon size={28} strokeWidth={1.5} />}
              </div>
              <span className="font-display text-[15px] text-text-2 text-center tracking-wide leading-relaxed">
                {client.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <p className="font-body text-[13px] text-text-3">
          Full client list available on request.
        </p>
      </div>
    </div>
  );
}`;

code = code.replace(oldLogoWallDef, newLogoWallDef);

fs.writeFileSync('src/components/sections/work.tsx', code);
