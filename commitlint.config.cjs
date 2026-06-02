// | Emoji | Code | Type | Description |
// | ----- | ----------------------------- | -------- | ------------------------- |
// | ✨    | `:sparkles:` | feat | New feature |
// | 🐛    | `:bug:` | fix | Bug fix |
// | 🔥    | `:fire:` | -        | Remove code / files |
// | 📝    | `:memo:` | docs | Documentation |
// | 💄    | `:lipstick:` | style | UI / style updates |
// | ♻️    | `:recycle:` | refactor | Refactor code |
// | ⚡️    | `:zap:` | perf | Performance improvement |
// | ✅    | `:white_check_mark:` | test | Add / update tests |
// | 🔧    | `:wrench:` | chore | Configuration files |
// | 🏗️    | `:building_construction:` | build | Build system changes |
// | 👷    | `:construction_worker:` | ci | CI / CD changes |
// | ⬆️    | `:arrow_up:` | build | Upgrade dependencies |
// | ⬇️    | `:arrow_down:` | build | Downgrade dependencies |
// | 🔒️    | `:lock:` | fix | Security fix |
// | 🚀    | `:rocket:` | -        | Deploy |
// | 🎨    | `:art:` | refactor | Improve structure / format |
// | 🚧    | `:construction:` | -        | Work in progress |
// | 💚    | `:green_heart:` | ci | Fix CI build |
// | ➕    | `:heavy_plus_sign:` | build | Add dependency |
// | ➖    | `:heavy_minus_sign:` | build | Remove dependency |
// | 🔀    | `:twisted_rightwards_arrows:` | -        | Merge branches |
// | ⏪️    | `:rewind:` | revert | Revert changes |
// | 🏷️    | `:label:` | -        | Add / update types |
// | 🗃️    | `:card_file_box:` | -        | Database changes |
// | 🌐    | `:globe_with_meridians:` | -        | Internationalization |
// | 💡    | `:bulb:` | docs | Add comments |
// | 🍱    | `:bento:` | -        | Add / update assets |
// | ♿️    | `:wheelchair:` | -        | Accessibility |
// | 🚸    | `:children_crossing:` | -        | UX improvements |
// | 📱    | `:iphone:` | -        | Responsive design |
// | 🥅    | `:goal_net:` | fix | Catch errors |
// | 🩹    | `:adhesive_bandage:` | fix | Simple fix(non - critical) |
// | 🧪    | `:test_tube:` | test | Add failing test |
// | 🔊    | `:loud_sound:` | -        | Add logs |
// | 🔇    | `:mute:` | -        | Remove logs |
const gitmojiPattern =
  "(?:✨|🐛|🔥|📝|💄|♻️|♻|⚡️|⚡|✅|🔧|🏗️|🏗|👷|⬆️|⬆|⬇️|⬇|🔒️|🔒|🚀|🎨|🚧|💚|➕|➖|🔀|⏪️|⏪|🏷️|🏷|🗃️|🗃|🌐|💡|🍱|♿️|♿|🚸|📱|🥅|🩹|🧪|🔊|🔇|:sparkles:|:bug:|:fire:|:memo:|:lipstick:|:recycle:|:zap:|:white_check_mark:|:wrench:|:building_construction:|:construction_worker:|:arrow_up:|:arrow_down:|:lock:|:rocket:|:art:|:construction:|:green_heart:|:heavy_plus_sign:|:heavy_minus_sign:|:twisted_rightwards_arrows:|:rewind:|:label:|:card_file_box:|:globe_with_meridians:|:bulb:|:bento:|:wheelchair:|:children_crossing:|:iphone:|:goal_net:|:adhesive_bandage:|:test_tube:|:loud_sound:|:mute:)";

module.exports = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        `^(${gitmojiPattern})\\s+(\\w+)(?:\\(([^)]+)\\))?(!)?:\\s(.+)$`,
      ),
      headerCorrespondence: ["gitmoji", "type", "scope", "breaking", "subject"],
    },
  },
  rules: {
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
  },
};
