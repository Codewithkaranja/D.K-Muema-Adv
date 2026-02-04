const fs = require('fs');
const path = require('path');

// Path to your project folder
const projectDir = 'D:/MY PROJECTS/Dk Muema';

// Your website base URL
const baseUrl = 'https://dkmuemaadvocates.co.ke/';

// Function to recursively find all HTML files
function getHtmlFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(getHtmlFiles(filePath));
        } else if (file.endsWith('.html')) {
            results.push({ filePath, mtime: stat.mtime });
        }
    });
    return results;
}

const htmlFiles = getHtmlFiles(projectDir);

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

htmlFiles.forEach(file => {
    const relativePath = path.relative(projectDir, file.filePath).replace(/\\/g, '/');
    const url = `${baseUrl}${relativePath}`;
    const lastmod = file.mtime.toISOString().split('T')[0];

    // Assign priorities based on page importance
    let priority = 0.5; // default
    if (relativePath === 'index.html') priority = 1.0;
    else if (relativePath === 'team.html') priority = 0.9;
    else if (relativePath.startsWith('blog')) priority = 0.6;
    else if (relativePath.startsWith('services')) priority = 0.8;
    else if (relativePath.startsWith('about')) priority = 0.7;
    else if (relativePath.startsWith('contact')) priority = 0.7;

    sitemap += `   <url>
      <loc>${url}</loc>
      <lastmod>${lastmod}</lastmod>
      <priority>${priority}</priority>
   </url>\n`;
});

sitemap += '</urlset>';

// Write sitemap.xml to project root
fs.writeFileSync(path.join(projectDir, 'sitemap.xml'), sitemap);

console.log('sitemap.xml generated successfully with page priorities!');
