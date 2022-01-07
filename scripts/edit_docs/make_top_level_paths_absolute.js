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

  const data = fs.readFileSync(filename, { encoding: "utf8" });

  const lines = data.split('\n');

  const linesWithAbsoluteLocalLinks = lines.map(function (line) {
    return makeLineLinkPathsAbsolute(line);
  });
  
  fs.writeFileSync(filename, linesWithAbsoluteLocalLinks.join("\n"));
};
