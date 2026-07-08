const fs = require('fs');
const file = 'c:/Users/Admin/Desktop/TTTN/Hexagon/admin-puck-config.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add import
if (!content.includes('LanguageFilter')) {
  content = content.replace(/import React from 'react';/, "import React from 'react';\nimport { LanguageFilter } from './src/contexts/LanguageContext';");
}

const componentNames = [
  'Heading', 'Text', 'Image', 'Section', 'Hero', 'Header', 
  'About', 'Services', 'News', 'Partners', 'Contact', 'Footer', 
  'ServiceHero', 'Solutions', 'Process', 'CTA', 'NewsArticleLayout'
];

for (const componentName of componentNames) {
  // Add lang field to fields
  const fieldsRegex = new RegExp(`(${componentName}:\\s*{[^}]*?fields:\\s*{)`);
  content = content.replace(fieldsRegex, `$1\n        lang: {\n          type: 'select',\n          label: 'Ngôn ngữ hiển thị',\n          options: [\n            { label: 'Tất cả (Cả 2)', value: 'all' },\n            { label: 'Tiếng Việt', value: 'vi' },\n            { label: 'Tiếng Anh', value: 'en' }\n          ]\n        },`);
  
  // Add lang defaultProp
  const defaultPropsRegex = new RegExp(`(${componentName}:[\\s\\S]*?defaultProps:\\s*{)`);
  content = content.replace(defaultPropsRegex, `$1\n        lang: 'all',`);
  
  // Replace render
  const renderRegex = new RegExp(`(${componentName}:[\\s\\S]*?render:\\s*\\(props\\)\\s*=>\\s*)(<[A-Za-z0-9_]+\\s*\\{\\.\\.\\.props\\}\\s*\\/?>)`);
  content = content.replace(renderRegex, `$1<LanguageFilter lang={props.lang}>$2</LanguageFilter>`);
}

fs.writeFileSync('c:/Users/Admin/Desktop/TTTN/Hexagon/admin-puck-config.new.jsx', content);
console.log('Done!');
