const DASHBOARD = {
  meta: {
    title: "Dashboard",
    uptime: "up 13m",
    siteData: "site data written 6s ago",
    sourcesStatus: "all sources ok",
    avatar: "avatar.png",
  },

  sources: [
    { name: "runescape", age: "1s" },
    { name: "github", age: "12s" },
    { name: "apple music", age: "45s" },
    { name: "visitors", age: "7s" },
    { name: "anilist", age: "8m" },
    { name: "tweets", age: "1m" },
    { name: "steam", age: "40s" },
    { name: "dink", age: "40s" },
  ],

  github: [
    {
      name: "commits",
      up: "@username",
      stats: [
        { label: "portfolio", value: "12m ago", detail: "add github card to the dashboard" },
        { label: "dotfiles", value: "2h ago", detail: "zsh: drop unused aliases" },
        { label: "scratchpad", value: "1d ago", detail: "fix off-by-one in grid parser" },
        { label: "site", value: "2d ago", detail: "bump dependencies" },
        { label: "homelab", value: "3d ago", detail: "ansible: rotate backup keys" },
      ],
    },
    {
      name: "projects",
      up: "pushed 12m ago",
      stats: [
        { label: "portfolio", value: "12m ago", detail: "html" },
        { label: "dotfiles", value: "2h ago", detail: "shell · private" },
        { label: "scratchpad", value: "1d ago", detail: "python" },
        { label: "site", value: "2d ago", detail: "javascript · ★ 12" },
        { label: "homelab", value: "3d ago", detail: "yaml · private" },
        { label: "notes", value: "5d ago", detail: "markdown" },
      ],
    },
  ],

  media: {
    left: [
      {
        kind: "show",
        heading: "steam",
        now: { title: "not playing", state: "online" },
        rows: [
          ["last 2 weeks", "6h 42m"],
          ["top 2 weeks", "Counter-Strike 2"],
          ["last played", "3h 12m ago"],
        ],
      },
      {
        kind: "show",
        heading: "anilist",
        ago: "2h ago",
        now: { title: "Frieren: Beyond Journey's End", state: "watching" },
        rows: [
          ["watching", "4"],
          ["completed", "187"],
          ["episodes", "3,204"],
          ["days watched", "54"],
        ],
      },
      {
        kind: "tracks",
        heading: "apple music",
        ago: "4d 13h ago",
        tracks: [
          ["Wir – pitiful prod junoes greyrock", "4d 13h"],
          ["326 – wir ★ \" na", "4d 13h"],
          ["Thanksgiving – tree 2 remix ft. Crysta", "5d 6h"],
          ["Thanksgiving – just for the lolz (2025", "5d 6h"],
        ],
      },
    ],
    right: [
      {
        kind: "kv",
        heading: "steam library",
        note: "online",
        rows: [
          ["games", "212"],
          ["played", "138"],
          ["hours played", "4,203h"],
          ["level", "34"],
        ],
      },
      {
        kind: "list",
        heading: "watching",
        ago: "2h ago",
        rows: [
          ["Frieren: Beyond Journey's End", "12/28"],
          ["Dungeon Meshi", "5/24"],
          ["GIRLS BAND CRY", "0/13"],
        ],
        footnote: "187 on list · 3,204 eps watched",
      },
    ],
    youtube: {
      kind: "list",
      heading: "youtube",
      note: "recent likes",
      rows: [
        ["Mobile Suit Zeta Gundam • MS ZETA Gundam - Ep. 18 - Mirai Captured", "Gundam Channel"],
        ["Every Collection Log you should get before Maxing in OSRS", "J1mmy"],
        ["The Texas Chainsaw Massacre 2 - re:View", "RedLetterMedia"],
        ["Naruto • My Name Is Konohamaru!", "Crunchyroll"],
      ],
    },
  },

  lately: {
    subheading: "today",
    entries: [
      ["6:27a", "Kidou Senshi Zeta Gundam 18/50", "mal"],
      ["4:18a", "Mobile Suit Zeta Gundam • MS ZETA Gundam - Ep. 18 - Mirai Captured", "jellyfin"],
      ["2:35a", "Every Collection Log you should get before Maxing in OSRS", "youtube"],
      ["2:14a", "we went to mcdonalds and it was closed so we went to circle k and i got an ice cream", "tweets"],
      ["2:12a", "night walk", "tweets"],
      ["2:11a", "started watching naruto and hes always saying believe it! and it makes me laugh", "tweets"],
      ["12:19a", "elebii has looted: 3 x Saltpetre (12) From: Reward cart (Wintertodt))", "dink"],
      ["12:19a", "elebii has looted: 3337 x Coins (3,337) From: Reward cart (Wintertodt))", "dink"],
      ["12:19a", "elebii has looted: 3 x Mithril ore (465) From: Reward cart (Wintertodt))", "dink"],
      ["11:52p", "passive", "youtube"],
      ["11:51p", "believe it!", "tweets"],
      ["11:47p", "I Created Isaac's ULTIMATE Gameshow", "youtube"],
      ["11:47p", "The Texas Chainsaw Massacre 2 - re:View", "youtube"],
      ["11:45p", "Naruto • My Name Is Konohamaru!", "jellyfin"],
      ["8:41p", "Collections in Order? My Clue Casket Conundrum | Sortlocked", "youtube"],
    ],
  },

  today: {
    left: {
      title: "time spent",
      total: "15h 32m total",
      rows: [
        ["runescape", "10h 55m", 100],
        ["twitter", "1h 52m", 17],
        ["youtube live", "1h 02m", 9],
        ["youtube", "55m", 8],
        ["anime", "48m", 7],
      ],
    },
    right: {
      head: "heard 17s ago",
      rows: [
        ["anime episodes", "2"],
        ["youtube videos", "7"],
        ["youtube left", "37m"],
        ["google searches", "14"],
      ],
      tabs: { now: 88, most: 90, avg: 74 },
      spark: [20, 18, 15, 10, 15, 17, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 15, 14, 11, 11, 11, 11, 18, 28, 27, 25, 23, 21, 21, 20, 18, 16, 16, 15, 15, 13, 12, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 8, 8, 7, 7, 7, 6, 6, 5],
    },
  },
};
