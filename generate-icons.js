const fs = require('fs');
const path = require('path');

// SVG template for the EVEA icon
const createIconSVG = (size) => {
  const scale = size / 144; // Base size is 144px
  const strokeWidth = Math.max(2, 4 * scale);
  const fontSize = Math.max(12, 24 * scale);
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Background circle -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2 - strokeWidth}" fill="url(#gradient)" stroke="#dc2626" stroke-width="${strokeWidth}"/>
  
  <!-- Gradient definition -->
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ef4444;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#dc2626;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Letter E -->
  <text x="${size/2}" y="${size/2 + fontSize/3}" 
        font-family="Arial, sans-serif" 
        font-size="${fontSize}" 
        font-weight="bold" 
        text-anchor="middle" 
        fill="white">E</text>
  
  <!-- Decorative elements -->
  <circle cx="${size/4}" cy="${size/4}" r="${size/16}" fill="rgba(255,255,255,0.3)"/>
  <circle cx="${size*3/4}" cy="${size*3/4}" r="${size/20}" fill="rgba(255,255,255,0.2)"/>
</svg>`;
};

// Create different icon sizes
const iconSizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];

// Generate icons
iconSizes.forEach(size => {
  const svg = createIconSVG(size);
  const fileName = `icon-${size}x${size}.png`;
  const filePath = path.join(__dirname, 'public', 'icons', fileName);
  
  // For now, we'll create SVG files since we can't generate PNGs without additional libraries
  // In a real scenario, you'd use a library like sharp or canvas to convert SVG to PNG
  const svgFileName = `icon-${size}x${size}.svg`;
  const svgFilePath = path.join(__dirname, 'public', 'icons', svgFileName);
  
  fs.writeFileSync(svgFilePath, svg);
  console.log(`Generated ${svgFileName}`);
});

// Create a simple PNG-like file (base64 encoded SVG that can be used as icon)
const createPNGLikeIcon = (size) => {
  const svg = createIconSVG(size);
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
};

// Create manifest.json for PWA
const manifest = {
  "name": "EVEA - Event Management Platform",
  "short_name": "EVEA",
  "description": "Your comprehensive event management platform connecting vendors and customers",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ef4444",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png",
      "purpose": "maskable any"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable any"
    }
  ],
  "categories": ["business", "productivity", "lifestyle"],
  "lang": "en",
  "dir": "ltr"
};

fs.writeFileSync(path.join(__dirname, 'public', 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Generated manifest.json');

console.log('\nIcon generation complete!');
console.log('Note: SVG files were created. For production, convert to PNG using a tool like sharp or canvas.');
