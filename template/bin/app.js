"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const inputPath = path_1.default.join(__dirname, '..', 'src', 'input.txt');
const input = fs_1.readFileSync(inputPath).toString();
console.log(input);
