#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const argv = require("yargs")
    .alias("p", "path")
    .usage("Usage: $0 [OPTION] [FILE]")
    .demandOption(["path"]).argv;

var input = JSON.parse(fs.readFileSync(argv.path, "utf8"));
getData(input);

function getData(inputData) {
    fs.mkdirSync(path.resolve(__dirname, inputData.path), {
        recursive: true
    });
    inputData["children"].forEach(item => {
        if (item.type === "file") {
            fs.closeSync(fs.openSync(path.resolve(__dirname, item.path), "w"));
        } else if (item.type === "folder") {
            fs.mkdirSync(path.resolve(__dirname, item.path), {
                recursive: true
            });
            getData(item);
        }
    });
}
