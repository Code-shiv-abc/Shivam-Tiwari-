const fs = require('fs');
let code = fs.readFileSync('src/lib/site-config.tsx', 'utf8');

const oldLogoWall = `export const LOGO_WALL = [
  "Acme Corp", "Global Tech", "Stark Ind", "Wayne Ent", "Cyberdyne", "Umbrella"
];`;

const newClients = `export const ANONYMIZED_CLIENTS = [
  { name: "Series C FinTech — North America", icon: "Landmark" },
  { name: "B2B SaaS Platform — APAC", icon: "Cloud" },
  { name: "Healthcare Tech — Europe", icon: "HeartPulse" }
];`;

code = code.replace(oldLogoWall, newClients);

fs.writeFileSync('src/lib/site-config.tsx', code);
