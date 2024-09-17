export const Emojis = Object.freeze({
  "o/": "👋",
  "o7": "🫡",
  "</3": "💔",
  "<3": "💗",
  "8-D": "😁",
  "8D": "😁",
  ":-D": "😁",
  "=D": "😁",
  "XD": "😁",
  "xD": "😁",
  ":')": "😂",
  "8)": "😄",
  ":)": "🙂",
  ":-)": "🙂",
  ":3": "😸",
  ":D": "😄",
  ":]": "🙂",
  ":^)": "🙂",
  "=)": "🙂",
  "=]": "😄",
  "0:)": "😇",
  "3:)": "😈",
  "}:)": "😈",
  "*)": "😉",
  ";)": "😉",
  ":|": "😐",
  ":(": "🙁",
  ":-(": "🙁",
  ":<": "🙁",
  ":[": "🙁",
  ":c": "🙁",
  ":{": "🙁",
  "%)": "😖",
  ":-P": "😜",
  ":-p": "😜",
  ":P": "😜",
  ":p": "😜",
  ":@": "🤬",
  ":-/": "😕",
  ":/": "😕",
  ":S": "😡",
  ":\\": "😡",
  "=/": "😡",
  "=L": "😡",
  "=\\": "😡",
  ":'(": "😢",
  "D8": "😱",
  "D:": "😧",
  "D:<": "😧",
  "DX": "🤯",
  ":-o": "😲",
  ":O": "😲",
  ":o": "😲",
  "O_O": "😲",
  "O_o": "😲",
  "o-o": "😲",
  "o_O": "😲",
  "o_o": "😲",
  ":$": "😳",
  ":#": "😶",
  ":X": "😶",
  ":-J": "😼",
  ":>": "😄",
  ">.<": "😡",
  ">:(": "😠",
  ">:)": "😈",
  ">:/": "😡",
  ">:O": "😲",
  ">:P": "😜",
  ">:[": "😒",
  ">;)": "😈",
});

export const EmojiRegex = new RegExp(
  Object.keys(Emojis)
    .map((key) => {
      return key.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    })
    .join("|"),
  "g"
);