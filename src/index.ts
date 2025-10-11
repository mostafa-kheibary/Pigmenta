#!/usr/bin/env node

import { watchFile } from "fs";
import { initiatePigmentaWithUserPrompt } from "./templates/pigmentaInitiator.js";
import { generateThemes } from "./generators/index.js";

const command = process.argv.slice(2)[0];

if (command === "init") {
  initiatePigmentaWithUserPrompt("./pigmenta.config.js");
}

if (command === "watch") {
  generateThemes();
  watchFile("./pigmenta.config.js", async () => generateThemes());
}
