import { readFileSync } from "fs";
import * as esbuild from "esbuild";
import { ensure, is } from "unknownutil";

const userScript = ({ name, version, description, author }) => ({
  name: "userScript",
  setup(build) {
    build.initialOptions.banner = {
      js: [
        "// ==UserScript==",
        `// @name ${name}`,
        `// @version ${version}`,
        `// @description ${description}`,
        `// @author ${author}`,
        "// @match https://github.com/notifications*",
        "// ==/UserScript==",
      ].join("\n"),
    };
  },
});

const isPackage = is.ObjectOf({
  name: is.String,
  version: is.String,
  description: is.String,
  author: is.String,
});

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  outfile: "dist/index.user.js",
  platform: "browser",
  format: "esm",
  plugins: [
    userScript(ensure(JSON.parse(readFileSync("package.json")), isPackage)),
  ],
});
