const fs = require("fs");
const path = require("path");


const packageRootDir = process.cwd();

const templateFilename = process.argv[0] === "--template" ? process.argv[1] : path.join("docs", "public", "README.template.md");

const templateData = fs.readFileSync(templateFilename, { encoding: "utf-8" });

const resultFilename = path.join(packageRootDir, "README.md");

const placeholderRegex = /\{\{(?<filename>.+)\}\}/;


process.chdir(path.join(packageRootDir, "docs", "public"));


const resultData = templateData.split("\n").map(function(line) {
  const placeholderMatch = line.match(placeholderRegex);
  if (placeholderMatch === null) { return line; }

  let replacementFilename = placeholderMatch.groups.filename;
  
  if (path.isAbsolute(replacementFilename)) {
    replacementFilename = path.join(packageRootDir, replacementFilename);
  }

  return fs.readFileSync(replacementFilename, { encoding: "utf-8" });
});


fs.writeFileSync(resultFilename, resultData.join("\n"));
