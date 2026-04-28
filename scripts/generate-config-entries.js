const fs = require("fs");
const path = require("path");

/**
 * This script generates Base UI config entries that can be copy-pasted
 * into components.ts and velite-components.json
 */

function generateConfigEntries() {
  const componentsDir = path.join(process.cwd(), "content/docs/components");
  const previewDir = path.join(process.cwd(), "preview/components");

  // Get all component names from baseui docs
  const baseuiDocs = fs
    .readdirSync(path.join(componentsDir, "baseui"))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));

  // Get all preview files starting with baseui-
  const baseuiPreviews = fs
    .readdirSync(previewDir)
    .filter((file) => file.startsWith("baseui-") && file.endsWith(".tsx"))
    .map((file) => path.basename(file, ".tsx"));

  console.log("=".repeat(80));
  console.log("BASE UI COMPONENT CONFIG ENTRIES (components.ts)");
  console.log("=".repeat(80));
  console.log("\nAdd these to the `core` section:\n");

  baseuiDocs.forEach((comp) => {
    const baseuiName = `baseui-${comp}`;
    const capitalizedName = comp.charAt(0).toUpperCase() + comp.slice(1);

    console.log(`    "${baseuiName}": {`);
    console.log(`      name: "${baseuiName}",`);
    console.log(`      filePath: "components/base-retroui/${capitalizedName}.tsx",`);
    console.log(`      dependencies: ["@base-ui/react"],`);
    console.log(`      cover: "/images/components/${comp}.png",`);
    console.log(`      description: "${capitalizedName} component using Base UI.",`);
    console.log(`    },`);
  });

  console.log("\n" + "=".repeat(80));
  console.log("BASE UI EXAMPLE CONFIG ENTRIES (components.ts)");
  console.log("=".repeat(80));
  console.log("\nAdd these to the `examples` section:\n");

  baseuiPreviews.forEach((preview) => {
    console.log(`    "${preview}": {`);
    console.log(`      name: "${preview}",`);
    console.log(`      filePath: "preview/components/${preview}.tsx",`);
    console.log(`      preview: lazy(() => import("@/preview/components/${preview}")),`);
    console.log(`    },`);
  });

  console.log("\n" + "=".repeat(80));
  console.log("BASE UI VELITE COMPONENTS JSON ENTRIES (velite-components.json)");
  console.log("=".repeat(80));
  console.log("\nAdd these to the `core` section:\n");

  baseuiDocs.forEach((comp) => {
    const baseuiName = `baseui-${comp}`;
    const capitalizedName = comp.charAt(0).toUpperCase() + comp.slice(1);

    console.log(`    "${baseuiName}": {`);
    console.log(`      "name": "${baseuiName}",`);
    console.log(`      "filePath": "components/base-retroui/${capitalizedName}.tsx"`);
    console.log(`    },`);
  });

  console.log("\n\nAdd these to the `examples` section:\n");

  baseuiPreviews.forEach((preview) => {
    console.log(`    "${preview}": {`);
    console.log(`      "name": "${preview}",`);
    console.log(`      "filePath": "preview/components/${preview}.tsx"`);
    console.log(`    },`);
  });

  console.log("\n" + "=".repeat(80));
  console.log(`✅ Generated ${baseuiDocs.length} component entries`);
  console.log(`✅ Generated ${baseuiPreviews.length} example entries`);
  console.log("=".repeat(80));
}

generateConfigEntries();
