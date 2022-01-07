const path = require("path");

const { pruneInternalNamespaceReferences } = require("./prune_internal_namespace_reference");
const { makeTopLevelPathsAbsolute } = require("./make_top_level_paths_absolute");

const typedocOutPath = require("../../typedoc.json").out;


const BASE_PATH = typedocOutPath;
const filename = path.join(".", typedocOutPath, "README.md");


pruneInternalNamespaceReferences(BASE_PATH, filename);
makeTopLevelPathsAbsolute(BASE_PATH, filename);
