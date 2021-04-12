import React from "react";
import fs from "fs-extra";
import path from "path";
import diveSync from "diveSync";
import { renderToString } from "react-dom/server.js";

function Document({ name, title, siteTitle, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no"
        />
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <link rel="stylesheet" href="/app.css" />
      </head>
      <body>
        {children}
        <script src={`/scripts/${name}.js`} type="module"></script>
      </body>
    </html>
  );
}

async function writeHTMLFile(appRoot, name) {
  const { default: siteConfig } = await import(`${appRoot}/site.config.js`);
  const { default: Page, meta } = await import(
    `${appRoot}/build/scripts/${name}.js`
  );
  const documentHTML = renderToString(
    <Document name={name} title={meta?.title} siteTitle={siteConfig.siteTitle}>
      <div id="root">
        <Page />
      </div>
    </Document>
  );

  const html = `<!DOCTYPE html>${documentHTML}`;

  fs.outputFile(`${appRoot}/build/${name}.html`, html);
}

async function writeHTMLFiles() {
  const appRoot = path.resolve(path.dirname(""));
  const pagesDir = path.resolve(`${appRoot}/src/pages/`);
  const pages = [];
  diveSync(path.resolve(pagesDir), (err, file) => {
    pages.push(file);
  });
  console.log("Emtying build directory...");
  fs.emptyDirSync(`${appRoot}/build/`, { recursive: true });
  const { buildSync } = await import("esbuild");

  console.log("Building node bundles to generate HTML...");
  buildSync({
    entryPoints: pages,
    // entryNames: "[dir]/[name]-[hash]",
    bundle: true,
    // minify: true,
    metafile: true,
    outdir: `${appRoot}/build/scripts/`,
    format: "cjs",
    loader: { ".js": "jsx" },
    external: ["react"],
  });

  console.log("Generating HTML...");
  for (const page of pages) {
    const nameRegex = /pages\/([A-Za-z\-/]+)\.js/g;
    const name = nameRegex.exec(page)[1];
    console.log(`  ${name}`);
    await writeHTMLFile(appRoot, name);
  }

  console.log("Building development browser bundles...");
  buildSync({
    entryPoints: pages,
    // entryNames: "[dir]/[name]-[hash]",
    bundle: true,
    // minify: true,
    metafile: true,
    splitting: true,
    outdir: `${appRoot}/build/scripts/`,
    format: "esm",
    loader: { ".js": "jsx" },
  });

  console.log("Copying app.css...");
  fs.copyFileSync(`${appRoot}/src/app.css`, `${appRoot}/build/app.css`);
}

writeHTMLFiles();
