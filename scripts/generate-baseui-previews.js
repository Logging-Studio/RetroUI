const fs = require("fs");
const path = require("path");

function transformPreviewContent(content) {
  let transformed = content;

  // Update import paths from retroui to base-retroui
  transformed = transformed.replace(
    /from\s+"@\/components\/retroui\//g,
    'from "@/components/base-retroui/'
  );

  return transformed;
}

function needsManualReview(content) {
  // Flag files that have state-dependent logic that might need adjustment
  const patterns = [
    /data-state/,
    /data-\[state=/,
    /\.getAttribute\(/,
    /classList/,
  ];

  return patterns.some((pattern) => pattern.test(content));
}

function generateBaseUIPreviews() {
  const previewDir = path.join(process.cwd(), "preview/components");

  // Get all TSX files in preview/components directory (excluding subdirectories)
  const files = fs
    .readdirSync(previewDir)
    .filter(
      (file) =>
        file.endsWith(".tsx") && fs.statSync(path.join(previewDir, file)).isFile()
    );

  console.log(`Found ${files.length} preview component files\n`);

  const needsReview = [];
  let generated = 0;

  files.forEach((file) => {
    const sourcePath = path.join(previewDir, file);
    // Rename with baseui- prefix
    const newFileName = `baseui-${file}`;
    const targetPath = path.join(previewDir, newFileName);

    // Read original content
    const content = fs.readFileSync(sourcePath, "utf-8");

    // Transform content
    const transformed = transformPreviewContent(content);

    // Check if needs manual review
    if (needsManualReview(content)) {
      needsReview.push(newFileName);
    }

    // Write to same directory with baseui- prefix
    fs.writeFileSync(targetPath, transformed, "utf-8");

    console.log(`✓ Generated ${newFileName}`);
    generated++;
  });

  console.log(`\n✅ Successfully generated ${generated} Base UI preview files`);
  console.log(`📁 Location: ${previewDir}`);

  if (needsReview.length > 0) {
    console.log(`\n⚠️  ${needsReview.length} files may need manual review:`);
    needsReview.slice(0, 10).forEach((file) => {
      console.log(`   - ${file}`);
    });
    if (needsReview.length > 10) {
      console.log(`   ... and ${needsReview.length - 10} more`);
    }
    console.log(
      `\n   These files contain state-dependent logic that may need adjustments:`
    );
    console.log(`   - Radix UI uses: data-state="open|closed"`);
    console.log(`   - Base UI uses: data-open / data-closed attributes`);
  }
}

// Run the script
generateBaseUIPreviews();
