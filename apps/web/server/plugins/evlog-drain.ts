import { createFsDrain } from "evlog/fs";
import { definePlugin as defineNitroPlugin } from "nitro";

export default defineNitroPlugin((nitroApp) => {
  if (!import.meta.dev) return;
  nitroApp.hooks.hook("evlog:drain", createFsDrain());
});
