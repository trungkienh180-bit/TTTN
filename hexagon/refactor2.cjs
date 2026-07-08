const fs = require('fs');
const file = 'c:/Users/Admin/Desktop/TTTN/Hexagon/admin-puck-config.jsx';
let content = fs.readFileSync(file, 'utf8');

const componentNames = [
  'ServicePageTemplate',
  'ConstructionServiceTemplate',
  'ITEquipmentServiceTemplate',
  'ITServicesTemplate',
  'NewsArticleTemplate',
  'NewsArticleTemplate2',
  'NewsArticleTemplate3',
  'NewsArticleTemplate4',
  'NewsArticleTemplate5'
];

for (const componentName of componentNames) {
  // Check if it already has 'Ngôn ngữ hiển thị' to avoid duplicates
  const fieldsRegexCheck = new RegExp(`(${componentName}:\\s*{[\\s\\S]*?fields:\\s*{[\\s\\S]*?Ngôn ngữ hiển thị)`);
  if (!fieldsRegexCheck.test(content)) {
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
}

fs.writeFileSync('c:/Users/Admin/Desktop/TTTN/Hexagon/admin-puck-config.jsx', content);
console.log('Done!');
