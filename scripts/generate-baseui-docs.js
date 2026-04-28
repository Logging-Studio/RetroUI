const fs = require("fs");
const path = require("path");

// Mapping of Radix UI API references to Base UI equivalents
const apiReferenceMap = {
  accordion: "https://base-ui.com/components/react-accordion/",
  dialog: "https://base-ui.com/components/react-dialog/",
  popover: "https://base-ui.com/components/react-popover/",
  "context-menu": "https://base-ui.com/components/react-menu/",
  menu: "https://base-ui.com/components/react-menu/",
  select: "https://base-ui.com/components/react-select/",
  slider: "https://base-ui.com/components/react-slider/",
  switch: "https://base-ui.com/components/react-switch/",
  checkbox: "https://base-ui.com/components/react-checkbox/",
  "toggle-group": "https://base-ui.com/components/react-toggle-group/",
  tooltip: "https://base-ui.com/components/react-tooltip/",
  progress: "https://base-ui.com/components/react-progress/",
  radio: "https://base-ui.com/components/react-radio-group/",
};

function transformMDXContent(content, componentName) {
  let transformed = content;

  // 1. Update API reference link if available
  if (apiReferenceMap[componentName]) {
    transformed = transformed.replace(
      /api_reference:\s*https:\/\/www\.radix-ui\.com[^\n]*/,
      `api_reference: ${apiReferenceMap[componentName]}`
    );
  } else {
    // Remove api_reference if no Base UI equivalent
    transformed = transformed.replace(
      /\s*api_reference:\s*https:\/\/www\.radix-ui\.com[^\n]*/,
      ""
    );
  }

  // 2. Update source link (retroui -> base-retroui)
  transformed = transformed.replace(
    /source:\s*https:\/\/github\.com\/([^/]+\/[^/]+)\/blob\/([^/]+)\/components\/retroui\//g,
    "source: https://github.com/$1/blob/$2/components/base-retroui/"
  );

  // 3. Update ComponentShowcase names (add baseui- prefix)
  transformed = transformed.replace(
    /<ComponentShowcase\s+name="([^"]+)"\s*\/>/g,
    '<ComponentShowcase name="baseui-$1" />'
  );

  // 4. Update install commands (@retroui/ -> @retroui/baseui-)
  transformed = transformed.replace(
    /npmCommand="npx shadcn@latest add @retroui\/([^"]+)"/g,
    'npmCommand="npx shadcn@latest add @retroui/baseui-$1"'
  );

  // 5. Replace @radix-ui packages with @base-ui/react
  transformed = transformed.replace(
    /@radix-ui\/react-[a-z-]+/g,
    "@base-ui/react"
  );

  // 6. Update path in frontmatter to include /baseui
  transformed = transformed.replace(
    /^path:\s*\/components\/([^\n]+)/m,
    "path: /components/baseui/$1"
  );

  return transformed;
}

function generateBaseUIDocs() {
  const componentsDir = path.join(process.cwd(), "content/docs/components");
  const baseuiDir = path.join(componentsDir, "baseui");

  // Create baseui directory if it doesn't exist
  if (!fs.existsSync(baseuiDir)) {
    fs.mkdirSync(baseuiDir, { recursive: true });
  }

  // Get all MDX files in components directory (excluding baseui subdirectory)
  const files = fs
    .readdirSync(componentsDir)
    .filter((file) => file.endsWith(".mdx") && file !== "baseui");

  console.log(`Found ${files.length} component documentation files\n`);

  files.forEach((file) => {
    const componentName = path.basename(file, ".mdx");
    const sourcePath = path.join(componentsDir, file);
    const targetPath = path.join(baseuiDir, file);

    // Read original content
    const content = fs.readFileSync(sourcePath, "utf-8");

    // Transform content
    const transformed = transformMDXContent(content, componentName);

    // Write to baseui folder
    fs.writeFileSync(targetPath, transformed, "utf-8");

    console.log(`✓ Generated ${componentName}.mdx`);
  });

  console.log(`\n✅ Successfully generated ${files.length} Base UI documentation files`);
  console.log(`📁 Location: ${baseuiDir}`);
  console.log(
    `\n⚠️  Please review the generated files manually, especially:`
  );
  console.log(`   - API reference links (some components may not have Base UI equivalents)`);
  console.log(`   - Dependency lists (ensure @base-ui/react is correct)`);
  console.log(`   - Component-specific installation instructions`);
}

// Run the script
generateBaseUIDocs();
