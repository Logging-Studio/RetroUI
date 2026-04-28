const fs = require("fs");
const path = require("path");

function updateComponentsTS() {
  const configPath = path.join(process.cwd(), "config/components.ts");
  let content = fs.readFileSync(configPath, "utf-8");

  const componentsDir = path.join(process.cwd(), "content/docs/components/baseui");
  const previewDir = path.join(process.cwd(), "preview/components");

  // Get component names
  const baseuiDocs = fs
    .readdirSync(componentsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));

  // Get preview names
  const baseuiPreviews = fs
    .readdirSync(previewDir)
    .filter((file) => file.startsWith("baseui-") && file.endsWith(".tsx"))
    .map((file) => path.basename(file, ".tsx"));

  // Generate core entries
  const coreEntries = baseuiDocs.map((comp) => {
    const baseuiName = `baseui-${comp}`;
    const capitalizedName = comp.charAt(0).toUpperCase() + comp.slice(1);
    return `    "${baseuiName}": {\n      name: "${baseuiName}",\n      filePath: "components/base-retroui/${capitalizedName}.tsx",\n      dependencies: ["@base-ui/react"],\n      cover: "/images/components/${comp}.png",\n      description: "${capitalizedName} component using Base UI.",\n    }`;
  }).join(',\n');

  // Generate example entries
  const exampleEntries = baseuiPreviews.map((preview) => {
    return `    "${preview}": {\n      name: "${preview}",\n      filePath: "preview/components/${preview}.tsx",\n      preview: lazy(() => import("@/preview/components/${preview}")),\n    }`;
  }).join(',\n');

  // Find insertion points
  // For core: find the last entry before the closing brace
  const coreEndPattern = /  core: \{[\s\S]*?\n  \},/;
  const coreMatch = content.match(coreEndPattern);
  if (coreMatch) {
    const insertPos = coreMatch.index + coreMatch[0].lastIndexOf('\n  },');
    // Find the last comma before the closing brace
    const beforeClose = content.substring(0, insertPos);
    const lastCommaOrBrace = Math.max(beforeClose.lastIndexOf(','), beforeClose.lastIndexOf('{'));
    const insertPoint = lastCommaOrBrace + 1;

    content = content.substring(0, insertPoint) + ',\n' + coreEntries + content.substring(insertPoint);
  }

  // For examples: find the last entry before the closing brace
  const examplesEndPattern = /  examples: \{[\s\S]*?\n  \}\n\}/;
  const examplesMatch = content.match(examplesEndPattern);
  if (examplesMatch) {
    const insertPos = examplesMatch.index + examplesMatch[0].lastIndexOf('\n  }');
    const beforeClose = content.substring(0, insertPos);
    const lastCommaOrBrace = Math.max(beforeClose.lastIndexOf(','), beforeClose.lastIndexOf('{'));
    const insertPoint = lastCommaOrBrace + 1;

    content = content.substring(0, insertPoint) + ',\n' + exampleEntries + content.substring(insertPoint);
  }

  fs.writeFileSync(configPath, content, "utf-8");
  console.log(`✅ Updated components.ts`);
  console.log(`   Added ${baseuiDocs.length} Base UI components`);
  console.log(`   Added ${baseuiPreviews.length} Base UI examples`);
}

function updateVeliteJSON() {
  const jsonPath = path.join(process.cwd(), "velite-components.json");
  const config = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));

  const componentsDir = path.join(process.cwd(), "content/docs/components/baseui");
  const previewDir = path.join(process.cwd(), "preview/components");

  // Get component names
  const baseuiDocs = fs
    .readdirSync(componentsDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));

  // Get preview names
  const baseuiPreviews = fs
    .readdirSync(previewDir)
    .filter((file) => file.startsWith("baseui-") && file.endsWith(".tsx"))
    .map((file) => path.basename(file, ".tsx"));

  // Add core entries
  baseuiDocs.forEach((comp) => {
    const baseuiName = `baseui-${comp}`;
    const capitalizedName = comp.charAt(0).toUpperCase() + comp.slice(1);
    config.core[baseuiName] = {
      name: baseuiName,
      filePath: `components/base-retroui/${capitalizedName}.tsx`
    };
  });

  // Add example entries
  baseuiPreviews.forEach((preview) => {
    config.examples[preview] = {
      name: preview,
      filePath: `preview/components/${preview}.tsx`
    };
  });

  fs.writeFileSync(jsonPath, JSON.stringify(config, null, 2), "utf-8");
  console.log(`✅ Updated velite-components.json`);
  console.log(`   Added ${baseuiDocs.length} Base UI components`);
  console.log(`   Added ${baseuiPreviews.length} Base UI examples`);
}

console.log("Updating configuration files...\n");
updateComponentsTS();
updateVeliteJSON();
console.log("\n✅ Configuration update complete!");
