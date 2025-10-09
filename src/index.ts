#!/usr/bin/env node

import { watchFile } from "fs";
import { readFile, writeFile } from "fs/promises";
import prompts from "prompts";
import { Config } from "./types.js";

const template = (
  options: Record<string, any>
) => `/** @type {import('pigmenta/types').Config} */
const pallets = {
  black: "#000",
  white: "#fff",
};

/** @type {import('pigmenta/types').Config} */
export default {
  options: {
    output: "${options.output}", // css, scss, tailwind
    lazy: ${options.lazy}, // load the theme as needed 
  },
  tokens: {
    surface: {
      light: pallets.white,
      dark: pallets.black,
      another: pallets.black,
    },
  },
};
`;

const command = process.argv.slice(2)[0];

if (command === "init") {
  const { output } = await prompts({
    type: "select",
    name: "output",
    message: "Choose how you want to create your app's theme:",
    choices: [
      { title: "Css", value: "css" },
      { title: "Sass", value: "sass" },
      { title: "Tailwind css", value: "tailwind" },
    ],
    initial: 0,
  });
  const { lazy } = await prompts({
    type: "toggle",
    name: "lazy",
    message: "Lazy load the themes?",
    initial: true,
    active: "Enabled",
    inactive: "Disabled",
  });

  await writeFile("./pigmenta.config.js", template({ output, lazy }));
  console.log("successfully generate the config file !");
}

const generateColor = async () => {
  const configText = await readFile("./pigmenta.config.js", {
    encoding: "utf8",
  });

  const base64 = Buffer.from(configText).toString("base64");
  const module = await import(`data:text/javascript;base64,${base64}`);
  const config = module.default as Config;
  for (const token in config.tokens) {
  }
};

if (command === "watch") {
  generateColor();
  watchFile("./pigmenta.config.js", async () => {
    generateColor();
  });
}
