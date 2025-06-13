const fs = require('fs');
const path = require('path');

// Ensure client reference manifest exists for route groups
const manifestPath = path.join(__dirname, '../.next/server/app/(site)/page_client-reference-manifest.js');
const manifestDir = path.dirname(manifestPath);

// Create directory if it doesn't exist
if (!fs.existsSync(manifestDir)) {
  fs.mkdirSync(manifestDir, { recursive: true });
}

// Create empty manifest file if it doesn't exist
if (!fs.existsSync(manifestPath)) {
  fs.writeFileSync(manifestPath, 'module.exports = {};');
  console.log('Created client reference manifest for route group (site)');
}