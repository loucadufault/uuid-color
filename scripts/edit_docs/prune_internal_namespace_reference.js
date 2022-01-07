const fs = require("fs");

function excludeIndexRange(arr, indexRangeBounds) {
  return arr.slice(0, indexRangeBounds[0]).concat(arr.slice(indexRangeBounds[1]));
}

exports.pruneInternalNamespaceReferences = function(basePath, rootFilename) {
  const filename = rootFilename;

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

    console.log(prunedLines);
    console.log(rootFilename);

    const linesWithoutExportLink = prunedLines.slice(2);
    
    fs.writeFile(filename, linesWithoutExportLink.join('\n'), function (err, result) { if (err) throw err });
  });
};
