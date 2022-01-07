const fs = require("fs");
const path = require("path");

const mdRelativeLinkRegex = /\[(?<text>[\w\s\d`]+)\]\((?<path>[\w\d./?=#]+)\)/g;

function transformLineLinkPaths(line, transformer) {
  // const mdRelativeLinkRegex = /\[(?<text>[\w\s\d`]+)\]\((?<path>[\w\d./?=#]+)\)/g;
  return line.replace(mdRelativeLinkRegex, function(match, p1, p2) { return transformer(p1, p2); });
}

exports.makeTopLevelPathsAbsolute = function(basePath, rootFilename) {
  function makeLineLinkPathsAbsolute(line) {
    return transformLineLinkPaths(line, function(text, pPath) {
      return "[" + text + "](" + path.join(basePath, pPath) + ")";
    });
  }

  const filename = rootFilename;

  fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    const lines = data.split('\n');

    const linesWithAbsoluteLocalLinks = lines.map(function (line) {
      return makeLineLinkPathsAbsolute(line);
    });
    
    fs.writeFile(filename, linesWithAbsoluteLocalLinks.join('\n'), function (err, result) { if (err) throw err });
  });
};
