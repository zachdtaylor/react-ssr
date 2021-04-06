import React from "react";
import fs from "fs-extra";
import path from "path";
import { renderToStaticMarkup } from "react-dom/server.js";

function Document({ name, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no"
        />
        <link rel="stylesheet" href="app.css" />
      </head>
      <body>
        {children}
        <script src={`scripts/${name}.js`} type="module"></script>
      </body>
    </html>
  );
}

async function writeHTMLFile(appRoot, name) {
  const { default: Page } = await import(`${appRoot}/build/scripts/${name}.js`);
  const documentHTML = renderToStaticMarkup(
    <Document name={name}>
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
  const files = await fs.promises.readdir(path.resolve(pagesDir));
  const pages = [];
  for (const file of files) {
    pages.push(`${pagesDir}/${file}`);
  }
  fs.rmSync(`${appRoot}/build`, { recursive: true });
  const { buildSync } = await import("esbuild");
  const result = buildSync({
    entryPoints: pages,
    // entryNames: "[dir]/[name]-[hash]",
    bundle: true,
    splitting: true,
    minify: true,
    metafile: true,
    outdir: `${appRoot}/build/scripts/`,
    format: "esm",
    loader: { ".js": "jsx" },
  });

  for (const page of pages) {
    const nameRegex = /\/([A-Za-z]+)\.js/g;
    const name = nameRegex.exec(page)[1];
    writeHTMLFile(appRoot, name);
  }

  fs.copyFileSync(`${appRoot}/src/app.css`, `${appRoot}/build/app.css`);
}

writeHTMLFiles();
