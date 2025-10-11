import { writeFile } from "fs/promises";
import prompts from "prompts";
import { createPigmentaConfigFileTemplate } from "./configTemplate.js";

export const initiatePigmentaWithUserPrompt = async (path: string) => {
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
  const { dest } = await prompts({
    type: "text",
    name: "dest",
    hint: "./",
    message: "location of the generated theme folder ?",
  });
  await writeFile(
    path,
    createPigmentaConfigFileTemplate({ dest, lazy, output })
  );
  console.log("Pigmenta Initiate Successfully");
};
