export const VERSION = process.env.VERSION;

export const REPO_RAW_ROOT = process.env.REPO.raw;
export const PACKAGE_URL = `${REPO_RAW_ROOT}/package.json`;

export const ONE_MINUTE = 60 * 1000;
export const TEN_MINUTES = ONE_MINUTE * 10;

export const SOUNDS = new Map([
  //long
  ["doom", "mp3"],
  ["vomit", "mp3"],
  ["romantic", "mp3"],
  ["massacre", "mp3"],
  ["breakup", "mp3"],
  ["fart", "mp3"],
  ["raid", "mp3"],
  //short
  ["equip", "mp3"],
  ["granted", "mp3"],
  ["denied", "mp3"],
  ["chunk-short", "mp3"],
  ["blip", "mp3"],
  ["book", "mp3"],
  ["chaching", "mp3"],
  ["tube", "mp3"],
  ["dice", "mp3"],
  ["coin", "mp3"],
  ["nuke-1", "mp3"],
  ["nuke-2", "mp3"],
  ["nuke-3", "mp3"],
  ["nuke-4", "mp3"],
  ["nuke-5", "mp3"],
  ["xp", "mp3"],
  ["level", "mp3"],
  ["mention", "mp3"],
  ["yes", "mp3"],
  ["global-mission-3", "mp3"],
  ["click-high-short", "mp3"],
  ["click-low-short", "mp3"],
  ["click-harsh-short", "wav"],
  ["latch-short", "wav"],
  ["swap-short", "wav"],
  ["shutter", "wav"],
  ["complete", "wav"],
  ["xp-down", "wav"],
  ["power", "wav"],
  ["daily", "wav"],
  ["item-found", "wav"],
  ["item-consumed", "wav"],
  ["panic", "wav"],
  ["poll", "wav"],
  ["tick-short", "wav"],
]);
