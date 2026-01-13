// Simple script to create placeholder icon files
// In a real project, you would use proper icon generation tools

const fs = require('fs');
const path = require('path');

const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'public', 'icons');

// Create a simple SVG icon template
const createSVGIcon = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4F46E5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <g transform="translate(${size * 0.25}, ${size * 0.25})">
    <path d="M${size * 0.1} ${size * 0.1}h${size * 0.4}v${size * 0.4}h-${size * 0.4}z" fill="white" opacity="0.9"/>
    <circle cx="${size * 0.3}" cy="${size * 0.3}" r="${size * 0.05}" fill="#4F46E5"/>
    <circle cx="${size * 0.2}" cy="${size * 0.4}" r="${size * 0.03}" fill="#7C3AED"/>
    <circle cx="${size * 0.4}" cy="${size * 0.2}" r="${size * 0.03}" fill="#F59E0B"/>
  </g>
  <text x="50%" y="85%" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="${size * 0.08}" font-weight="bold">Q</text>
</svg>`;

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate placeholder SVG files for each size
iconSizes.forEach(size => {
  const svgContent = createSVGIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svgContent.trim());
  console.log(`Generated ${filename}`);
});

// Create some additional icons
const additionalIcons = [
  { name: 'shortcut-new-quiz.svg', content: createSVGIcon(96) },
  { name: 'shortcut-how-it-works.svg', content: createSVGIcon(96) },
  { name: 'shortcut-faq.svg', content: createSVGIcon(96) },
  { name: 'badge-72x72.svg', content: createSVGIcon(72) },
  { name: 'action-quiz.svg', content: createSVGIcon(32) },
  { name: 'action-close.svg', content: createSVGIcon(32) }
];

additionalIcons.forEach(icon => {
  const filepath = path.join(iconsDir, icon.name);
  fs.writeFileSync(filepath, icon.content.trim());
  console.log(`Generated ${icon.name}`);
});

console.log('All placeholder icons generated successfully!');
console.log('Note: In production, replace these with proper PNG icons using tools like:');
console.log('- PWA Asset Generator');
console.log('- Favicon Generator');
console.log('- Adobe Illustrator/Figma export');