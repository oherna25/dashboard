const html = (strings, ...values) => String.raw({ raw: strings }, ...values);

function renderHeader(meta) {
  document.getElementById("top").innerHTML = html`
    <h1>${meta.title}</h1>
    <span class="meta">${meta.uptime}</span>
    <span class="meta">${meta.siteData}</span>
    <span class="ok">${meta.sourcesStatus}</span>
    <span class="spacer"></span>
    <button id="theme" type="button"></button>
    <span class="avatar" style="background-image:url('${meta.avatar}'), linear-gradient(135deg, #4c818f, #1b1b60)"></span>
  `;
}

function card(id, legend, body) {
  document.getElementById(id).innerHTML = html`<div class="legend">${legend}</div>${body}`;
}

const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

function isoWeek(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  return Math.ceil(((d - Date.UTC(d.getUTCFullYear(), 0, 1)) / 86400000 + 1) / 7);
}

function renderCalendar() {
  card("card-day", "calendar", html`
    <div class="day">
      <div class="day__left">
        <span class="day__date" id="cal-date"></span>
        <span class="day__clock" id="cal-clock"></span>
        <span class="day__week" id="cal-week"></span>
        <span class="week" id="cal-strip"></span>
      </div>
      <div class="day__right">
        <span class="day__remaining" id="cal-remaining"></span>
        <span class="day__year" id="cal-year"></span>
      </div>
    </div>
  `);

  const nodes = {};
  for (const key of ["date", "clock", "week", "strip", "remaining", "year"]) {
    nodes[key] = document.getElementById(`cal-${key}`);
  }

  const paint = () => {
    const now = new Date();
    const y = now.getFullYear();
    const remaining = new Date(y, now.getMonth(), now.getDate() + 1) - now;
    const yearDays = new Date(y, 1, 29).getMonth() === 1 ? 366 : 365;
    const dayOfYear = Math.round((new Date(y, now.getMonth(), now.getDate()) - new Date(y, 0, 1)) / 86400000) + 1;
    const hours12 = ((now.getHours() + 11) % 12) + 1;
    const values = {
      date: `${WEEKDAYS[now.getDay()]} ${MONTHS[now.getMonth()]} ${now.getDate()}`,
      clock: `${hours12}:${String(now.getMinutes()).padStart(2, "0")}${now.getHours() < 12 ? "a" : "p"}`,
      week: `✳ week ${isoWeek(now)}`,
      remaining: `day remaining ${Math.floor(remaining / 3600000)}h ${Math.floor((remaining % 3600000) / 60000)}m`,
      year: `day ${dayOfYear} of ${yearDays}`,
    };
    for (const [key, text] of Object.entries(values)) {
      if (nodes[key].textContent !== text) nodes[key].textContent = text;
    }

    const dates = [...Array(7)].map((_, i) => new Date(y, now.getMonth(), now.getDate() - now.getDay() + i).getDate());
    const stripKey = dates.join(".");
    if (nodes.strip.dataset.key !== stripKey) {
      nodes.strip.dataset.key = stripKey;
      nodes.strip.innerHTML = dates
        .map((n, i) => `<span class="box${i === now.getDay() ? " box--current" : ""}">${n}</span>`)
        .join("");
    }
  };

  paint();
  setInterval(paint, 1000);
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) paint();
  });
}

function sourceAge(s) {
  if (s.fail) return "fail";
  if (!s.at) return s.age || "ok";
  const m = Math.floor((Date.now() / 1000 - s.at) / 60);
  return m < 1 ? "now" : m < 60 ? `${m}m` : m < 1440 ? `${Math.floor(m / 60)}h` : `${Math.floor(m / 1440)}d`;
}

function renderSources(sources) {
  const live = typeof LIVE !== "undefined" ? LIVE : {};
  const list = live.sources || sources;
  const items = list
    .map((s) => html`<span class="src${s.fail ? " src--fail" : ""}"><i class="dot"></i><span class="name">${s.name}</span><span class="age">${sourceAge(s)}</span></span>`)
    .join("");
  card("card-sources", "sources", html`<div class="src__list">${items}</div>`);
}

function statBlock(stat) {
  const bar = stat.bar == null
    ? ""
    : html`<div class="bar"><i style="width:${stat.bar}%"></i></div>`;
  const value = stat.status ? html`<span class="value status">${stat.value}</span>` : html`<span class="value">${stat.value}</span>`;
  return html`
    <div class="stat">
      <div class="kv"><span class="label">${stat.label}</span>${value}</div>
      ${bar}
      <div class="detail">${stat.detail}</div>
    </div>
  `;
}

function renderGithub(github) {
  const live = typeof LIVE !== "undefined" ? LIVE : {};
  const columns = (live.github || github)
    .map((m) => {
      return html`
        <div class="machine">
          <div class="machine__head"><span class="name">${m.name}</span><span class="up">${m.up}</span></div>
          <div class="stats">${m.stats.map(statBlock).join("")}</div>
        </div>
      `;
    })
    .join("");
  card("card-github", "github", html`<div class="split split--line">${columns}</div>`);
}

function mediaSection(sec, cls) {
  const attr = cls ? ` class="sec ${cls}"` : ` class="sec"`;
  const head = html`<div class="sec__head">
    <span class="sec__name">${sec.heading}</span>
    ${sec.note ? html`<span class="note">${sec.note}</span>` : ""}
    ${sec.ago ? html`<span class="ago">${sec.ago}</span>` : ""}
  </div>`;

  if (sec.kind === "show") {
    const rows = sec.rows
      .map(([label, value]) => html`<div class="kv"><span class="label">${label}</span><span class="value">${value}</span></div>`)
      .join("");
    return html`
      <div${attr}>
        ${head}
        <div class="kv"><span class="now">${sec.now.title}</span>${sec.now.state ? html`<span class="state">${sec.now.state}</span>` : ""}</div>
        ${rows}
      </div>
    `;
  }

  if (sec.kind === "tracks") {
    const rows = sec.tracks
      .map(([title, ago]) => html`<div class="kv"><span class="track">${title}</span><span class="ago">${ago}</span></div>`)
      .join("");
    return html`<div${attr}>${head}${rows}</div>`;
  }

  const isList = sec.kind === "list";
  const rows = sec.rows
    .map(([label, value]) => {
      const left = isList ? html`<span class="item">${label}</span>` : html`<span class="label">${label}</span>`;
      return html`<div class="kv">${left}<span class="value">${value}</span></div>`;
    })
    .join("");
  const foot = sec.footnote ? html`<div class="footnote">${sec.footnote}</div>` : "";
  return html`<div${attr}>${head}${rows}${foot}</div>`;
}

function renderMedia(media) {
  const [steamL, anilist, music] = media.left;
  const [steamR, watching] = media.right;
  const live = typeof LIVE !== "undefined" ? LIVE : {};
  const musicSec = live.appleMusic ? { ...music, ago: live.appleMusic.ago, tracks: live.appleMusic.tracks } : music;
  const ytSec = live.youtube ? live.youtube : media.youtube;
  const steamLeft = live.steam ? live.steam.left : steamL;
  const steamRight = live.steam ? live.steam.right : steamR;
  const anilistSec = live.anilist ? live.anilist.left : anilist;
  const watchingSec = live.anilist ? live.anilist.right : watching;
  card("card-media", "media", html`
    <div class="media-grid">
      ${mediaSection(steamLeft, "sec--steam")}
      ${mediaSection(steamRight, "sec--steam-lib")}
      <div class="dots dots--steam"></div>
      ${mediaSection(anilistSec, "sec--anilist")}
      ${mediaSection(watchingSec, "sec--watching")}
      <div class="dots dots--watching"></div>
      ${mediaSection(musicSec, "sec--music")}
      ${mediaSection(ytSec, "sec--yt")}
    </div>
  `);
}

function renderLately(lately) {
  const live = typeof LIVE !== "undefined" ? LIVE : {};
  const feed = live.lately || lately;
  const rows = feed.entries
    .map(([time, text, tag]) => html`<li><span class="t">${time}</span><span class="txt">${text}</span><span class="tag">${tag}</span></li>`)
    .join("");
  card("card-lately", "lately", html`
    <div class="sub">${feed.subheading}</div>
    <ul class="lately">${rows}</ul>
  `);
}

function renderToday(today) {
  const live = typeof LIVE !== "undefined" ? LIVE : {};
  const t = live.today || today;
  const left = t.left;
  const leftRows = left.rows
    .map(([label, value, pct]) => html`
      <div class="ts">
        <div class="kv"><span class="item">${label}</span><span class="value">${value}</span></div>
        ${pct == null ? "" : html`<div class="bar"><i style="width:${pct}%"></i></div>`}
      </div>
    `)
    .join("");
  const right = t.right;
  const rightRows = right.rows
    .map(([label, value]) => html`<div class="kv"><span class="label">${label}</span><span class="value">${value}</span></div>`)
    .join("");
  const tabs = right.tabs
    ? html`<div class="kv"><span class="label">tabs</span><span class="value">${right.tabs.now} <span class="lite">now</span> · ${right.tabs.most} <span class="lite">most</span> · ${right.tabs.avg} <span class="lite">avg</span></span></div>`
    : "";
  const vmax = Math.max(0, ...right.spark);
  const step = right.spark.length > 1 ? 288 / (right.spark.length - 1) : 0;
  const sparkPoints = right.spark
    .map((v, i) => `${(i * step).toFixed(1)},${(28 - (vmax ? (v / vmax) * 24 : 0)).toFixed(1)}`)
    .join(" ");
  const spark = right.spark.length > 1
    ? html`<svg class="spark" viewBox="0 0 288 30" preserveAspectRatio="none"><polyline points="${sparkPoints}" /></svg>`
    : "";
  card("card-today", "today", html`
    <div class="split split--line">
      <div class="tscol">
        <div class="kv"><span class="item">${left.title}</span><span class="total">${left.total}</span></div>
        ${leftRows}
      </div>
      <div class="statscol">
        <div class="kv"><span class="item">today</span><span class="heard">${right.head}</span></div>
        ${rightRows}
        ${tabs}
        ${spark}
      </div>
    </div>
  `);
}

function renderAi() {
  const fallbackRow = { label: "usage", value: "no data", detail: "run tools/collect.py to refresh", dim: true };
  const sections = (typeof LIVE === "undefined" ? null : LIVE.sections) || [
    { name: "cursor", right: "no data", rows: [fallbackRow] },
    { name: "opencode", right: "no data", rows: [fallbackRow] },
  ];
  const col = (sec) => html`
    <div class="machine">
      <div class="machine__head"><span class="name">${sec.name}</span><span class="up">${sec.right}</span></div>
      <div class="stats">${sec.rows
        .map((r) => html`
        <div class="stat">
          <div class="kv"><span class="label">${r.label}</span><span class="value${r.dim ? " value--dim" : ""}">${r.value}</span></div>
          ${r.bar == null ? "" : html`<div class="bar"><i style="width:${r.bar}%"></i></div>`}
          <div class="detail">${r.detail}</div>
        </div>`)
        .join("")}</div>
    </div>`;
  card("card-ai", "ai", html`<div class="split split--line">${sections.map(col).join("")}</div>`);
}

function initTheme() {
  const btn = document.getElementById("theme");
  const set = (t) => {
    document.documentElement.dataset.theme = t;
    btn.textContent = t === "dark" ? "☀ light" : "☾ dark";
  };
  btn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("dashboard-theme", next);
    set(next);
  });
  set(localStorage.getItem("dashboard-theme") || "light");
}

renderHeader(DASHBOARD.meta);
renderCalendar();
renderSources(DASHBOARD.sources);
renderGithub(DASHBOARD.github);
renderMedia(DASHBOARD.media);
renderLately(DASHBOARD.lately);
renderToday(DASHBOARD.today);
renderAi();
initTheme();
