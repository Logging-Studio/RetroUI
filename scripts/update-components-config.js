const fs = require("fs");
const path = require("path");

/**
 * This script adds Base UI entries to the component config
 * It reads the existing config, generates Base UI variants, and appends them
 */

function updateComponentsConfig() {
  const configPath = path.join(process.cwd(), "config/components.ts");
  let content = fs.readFileSync(configPath, "utf-8");

  console.log("Reading existing config...\n");

  // Find the core section
  const coreMatch = content.match(/core:\s*{([^}]*(?:{[^}]*}[^}]*)*)}/s);
  if (!coreMatch) {
    console.error("❌ Could not find core section in config");
    return;
  }

  const coreContent = coreMatch[1];

  // Extract all component entries
  const componentPattern = /(\w+):\s*{([^}]*(?:{[^}]*}[^}]*)*)},?\n/g;
  const components = [];
  let match;

  while ((match = componentPattern.exec(coreContent)) !== null) {
    const [, name, config] = match;

    // Skip if already a baseui entry or a chart component
    if (name.startsWith("baseui") || name.includes("Chart")) {
      continue;
    }

    components.push({ name, config });
  }

  console.log(`Found ${components.length} components to duplicate for Base UI\n`);

  // Generate Base UI entries
  const baseuiEntries = [];

  components.forEach(({ name, config }) => {
    const baseuiName = `baseui-${name}`;
    let baseuiConfig = config;

    // Update the name property
    baseuiConfig = baseuiConfig.replace(
      /name:\s*"[^"]+"/,
      `name: "${baseuiName}"`
    );

    // Update filePath to use base-retroui instead of retroui
    baseuiConfig = baseuiConfig.replace(
      /filePath:\s*"components\/retroui\//g,
      'filePath: "components/base-retroui/'
    );

    // Update dependencies from @radix-ui to @base-ui/react
    baseuiConfig = baseuiConfig.replace(
      /dependencies:\s*\[(.*?)\]/s,
      (fullMatch, deps) => {
        const newDeps = deps
          .split(',')
          .map(dep => {
            dep = dep.trim();
            if (dep.includes('@radix-ui')) {
              return '"@base-ui/react"';
            }
            return dep;
          })
          .filter((dep, index, arr) => {
            // Remove duplicates
            return arr.indexOf(dep) === index;
          })
          .join(', ');
        return `dependencies: [${newDeps}]`;
      }
    );

    baseuiEntries.push(`    "${baseuiName}": {${baseuiConfig}}`);
  });

  // Now find the examples section
  const examplesMatch = content.match(/examples:\s*{([^}]*(?:{[^}]*}[^}]*)*)}/s);
  if (!examplesMatch) {
    console.error("❌ Could not find examples section in config");
    return;
  }

  const examplesContent = examplesMatch[1];

  // Extract all example entries
  const examplePattern = /"([^"]+)":\s*{([^}]*(?:{[^}]*}[^}]*)*)},?\n/g;
  const examples = [];

  while ((match = examplePattern.exec(examplesContent)) !== null) {
    const [, name, config] = match;

    // Skip if already a baseui entry
    if (name.startsWith("baseui")) {
      continue;
    }

    examples.push({ name, config });
  }

  console.log(`Found ${examples.length} examples to duplicate for Base UI\n`);

  // Generate Base UI example entries
  const baseuiExampleEntries = [];

  examples.forEach(({ name, config }) => {
    const baseuiName = `baseui-${name}`;
    let baseuiConfig = config;

    // Update the name property
    baseuiConfig = baseuiConfig.replace(
      /name:\s*"[^"]+"/,
      `name: "${baseuiName}"`
    );

    // Update filePath
    baseuiConfig = baseuiConfig.replace(
      /filePath:\s*"preview\/components\//g,
      'filePath: "preview/components/baseui-'
    );

    // Update lazy import path
    baseuiConfig = baseuiConfig.replace(
      /import\("@\/preview\/components\//g,
      'import("@/preview/components/baseui-'
    );

    baseuiExampleEntries.push(`    "${baseuiName}": {${baseuiConfig}}`);
  });

  console.log(`Generated ${baseuiEntries.length} Base UI component entries`);
  console.log(`Generated ${baseuiExampleEntries.length} Base UI example entries\n`);

  // Now we need to insert these entries into the config
  // Insert Base UI components after the last component in core section
  const lastCoreEntry = coreContent.trim().lastIndexOf('},');
  const insertPoint = coreMatch.index + coreMatch[0].indexOf(coreContent) + lastCoreEntry + 2;

  const newCoreEntries = ',\n' + baseuiEntries.join(',\n');

  content = content.slice(0, insertPoint) + newCoreEntries + content.slice(insertPoint);

  // Now find the examples section again (positions have changed)
  const newExamplesMatch = content.match(/examples:\s*{([^}]*(?:{[^}]*}[^}]*)*)}/s);
  const newExamplesContent = newExamplesMatch[1];
  const lastExampleEntry = newExamplesContent.trim().lastIndexOf('},');
  const exampleInsertPoint = newExamplesMatch.index + newExamplesMatch[0].indexOf(newExamplesContent) + lastExampleEntry + 2;

  const newExampleEntries = ',\n' + baseuiExampleEntries.join(',\n');

  content = content.slice(0, exampleInsertPoint) + newExampleEntries + content.slice(exampleInsertPoint);

  // Write back to file
  fs.writeFileSync(configPath, content, "utf-8");

  console.log("✅ Successfully updated components.ts");
  console.log(`   Added ${baseuiEntries.length} Base UI components`);
  console.log(`   Added ${baseuiExampleEntries.length} Base UI examples`);
}

try {
  updateComponentsConfig();
} catch (error) {
  console.error("❌ Error updating config:", error.message);
  console.error(error.stack);
}
