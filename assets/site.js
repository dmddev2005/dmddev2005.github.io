const I18N = {
  en: {
   /* nav_updates: "Updates", */
   // nav_schedule: "Fixture",
  //  nav_nets: "Net Practice",
  //  nav_fields: "Fields",
    nav_gallery: "Gallery",
 //   nav_events: "Events",
  //  nav_archives: "Archives",
 //   nav_rules: "Grounds", //"changed from Rules"
 //   nav_contact: "Contact",
    /* nav_signup: "Join / Signup", */
    home_title: "BECC-Tokyo Cricket Club",
    home_sub: "Welcome to the BECC–Tokyo. We play in the Japan Cup League (South Kanto) and friendly matches throughout the year, with the goal of promoting cricket in Japan and enjoying the game as a social event.",
        home_cta_signup: "Player Signup",
    home_cta_schedule: "Fixture and Results",
    home_cta_rules: "Read Rules",

    rules_title: "Rules & Club Guidelines",
    rules_sub: "Basic match rules + club etiquette. Keep this page as the official reference.",
    schedule_title: "Schedule",
    schedule_sub: "Upcoming matches and training. You can use the table or Google Calendar (or both).",
    signup_title: "Player Signup",
    signup_sub: "New players welcome. Fill the form and we’ll contact you with next steps.",

    common_last_updated: "Last updated",
    footer_note: "Built on GitHub Pages • BECC-Tokyo"
  },
  ja: {
    nav_updates: "クラブについて",
    nav_schedule: "スケジュール",
    nav_nets: "ネット練習",
    nav_fields: "グラウンド",
    nav_gallery: "ギャラリー",
    nav_events: "イベント",
    nav_archives: "アーカイブ",
    nav_rules: "フィールド",
    nav_contact: "連絡先",
    nav_signup: "参加・登録",

    home_title: "BECC-Tokyo クリケットクラブ",
    home_sub: "ブリティッシュ・エンバシー・クリケット・クラブ東京へようこそ。私たちはジャパンカップリーグ（南関東）および年間を通じてフレンドリーマッチに参加し、クリケットを日本で広め、スポーツとしてだけでなく社交の場としても楽しむことを目指しています。",
    home_cta_signup: "参加フォーム",
    home_cta_schedule: "スケジュールを見る",
    home_cta_rules: "ルールを見る",

    rules_title: "ルール・クラブガイド",
    rules_sub: "基本ルールとクラブ内のマナー。公式情報はこのページにまとめます。",
    schedule_title: "スケジュール",
    schedule_sub: "試合・練習の予定。表とGoogleカレンダーの併用も可能です。",
    signup_title: "参加・登録",
    signup_sub: "新規メンバー歓迎。フォーム送信後、次の案内を連絡します。",

    common_last_updated: "更新日",
    footer_note: "GitHub Pagesで運用 • BECC-Tokyo"
  }
};

function getLang() {
  const urlLang = new URLSearchParams(location.search).get("lang");
  const stored = localStorage.getItem("lang");
  const lang = (urlLang || stored || "en").toLowerCase();
  return (lang === "ja") ? "ja" : "en";
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState({}, "", url.toString());
  applyI18n(lang);
}

function applyI18n(lang) {
  const dict = I18N[lang] || I18N.en;

  document.documentElement.lang = lang;

  // Set text for any element with data-i18n="key"
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  // Language toggle button label
  const btn = document.querySelector("#langToggle");
  if (btn) btn.textContent = (lang === "ja") ? "English" : "日本語";
}

function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    for (const ent of entries) {
      if (ent.isIntersecting) ent.target.classList.add("in");
    }
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
}

function initLangToggle() {
  const btn = document.querySelector("#langToggle");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const current = getLang();
    setLang(current === "ja" ? "en" : "ja");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const lang = getLang();
  applyI18n(lang);
  initLangToggle();
  initReveal();

  // Year in footer if present
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});
