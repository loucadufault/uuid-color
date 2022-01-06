const fs = require("fs");
const path = require("path");

const typedocOutPath = require("../typedoc.json").out;


const filename = path.join(".", typedocOutPath, "modules.md");


function excludeIndexRange(arr, indexRangeBounds) {
  return arr.slice(0, indexRangeBounds[0]).concat(arr.slice(indexRangeBounds[1]));
}


fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;

  const lines = data.split('\n');
  const namespacesHeaderLine = lines.indexOf("### Namespaces");
  const nextHeaderLine = namespacesHeaderLine + 1 + lines.slice(namespacesHeaderLine + 1).findIndex(line => line.startsWith("#"));
  const namespaceLinks = lines.slice(namespacesHeaderLine + 2, nextHeaderLine - 1);

  let prunedLines;
  if (namespaceLinks.length === 1) {
    // exclude the entire section
    prunedLines = excludeIndexRange(lines, [namespacesHeaderLine, nextHeaderLine]);
  } else {
    // exclude just the relevant link (there are other links)
    const internalNamespaceLinkLine = namespaceLinks.findIndex(link => link.includes("internal"));
    prunedLines  = excludeIndexRange(lines, [internalNamespaceLinkLine, internalNamespaceLinkLine + 1]);
  }

  fs.writeFile(filename, prunedLines.join('\n'), function (err, result) { if (err) throw err });
});