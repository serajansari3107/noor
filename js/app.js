/* Noor — Step 2 navigation and section landing pages */
(() => {
  "use strict";

  const menuToggle = document.getElementById("mobileMenuToggle");
  const nav = document.getElementById("primaryNav");
  const dropdowns = [...document.querySelectorAll(".nav-dropdown")];
  const searchOverlay = document.getElementById("searchOverlay");
  const searchOpen = document.getElementById("searchOpen");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("siteSearchInput");
  const searchForm = document.getElementById("siteSearchForm");
  const searchFeedback = document.getElementById("searchFeedback");
  const homeView = document.getElementById("homeView");
  const sectionView = document.getElementById("sectionView");
  const toast = document.getElementById("toast");

  document.getElementById("currentYear").textContent = new Date().getFullYear();

  const sections = {
    quran: {
      title: "Al-Quran", emphasis: "the words of Allah.", kicker: "READ · REFLECT · CONNECT",
      description: "A calm reading space for the Holy Quran. Your existing Quran data can be connected in the next step, including Arabic text and translations.",
      icon: "۞", kind: "library", tiles: [
        ["Read by Surah","Browse all 114 Surahs in order.","۞"],["Read by Juz","Explore the Quran by its 30 Juz.","٣٠"],["Translations","Choose a translation language.","文"],["Bookmarks","Return to ayahs you have saved.","⚑"],["Last Read","Continue from your reading progress.","↗"],["Reading Settings","Text size, display and reading preferences.","Aa"]
      ], notice: "Quran text and translations will be loaded from your supplied dataset. No placeholder text will be presented as Quran."
    },
    hadith: {
      title: "Hadith Library", emphasis: "prophetic wisdom.", kicker: "LEARN · VERIFY · APPLY",
      description: "Browse six Hadith collections with Arabic text, English translation, book/chapter navigation, narration references and available grading from your supplied dataset.",
      icon: "❋", kind: "library", tiles: [
        ["Sahih al-Bukhari","Browse by book and chapter.","١"],["Sahih Muslim","Explore narrations and references.","٢"],["Sunan Abu Dawud","A dedicated collection view.","٣"],["Jami at-Tirmidhi","Browse narrations by topic.","٤"],["Sunan an-Nasa'i","Explore the collection structure.","٥"],["Sunan Ibn Majah","Browse books and chapters.","٦"]
      ], notice: "The supplied dataset is used for the narration text and references. Grading appears only where it exists in the source data."
    },
    tafseer: {
      title: "Tafseer", emphasis: "understand the meaning.", kicker: "CONTEXT · EXPLANATION · REFLECTION",
      description: "A dedicated place for understanding ayahs through reliable tafseer sources, with Surah and ayah references kept visible.",
      icon: "تفسير", kind: "study", tiles: [
        ["Tafseer by Surah","Choose a Surah and browse ayah explanations.","۞"],["Ayah context","Keep the ayah reference alongside its explanation.","آ"],["Source & attribution","Clearly show the source of each explanation.","✓"],["Key lessons","Collect concise lessons with source context.","✧"],["Compare explanations","A future view for supported tafseer sources.","≋"],["Saved notes","Return to personal study notes.","✎"]
      ], notice: "Tafseer will be sourced and attributed carefully. We will not invent explanations or label unverified material as authentic tafseer."
    },
    stories: {
      title: "Quran Stories", emphasis: "lessons for life.", kicker: "DISCOVER · REFLECT · LEARN",
      description: "A story library designed to make Quranic accounts easier to explore, with clear references and lessons grounded in the Quran and reliable tafseer.",
      icon: "✧", kind: "study", tiles: [
        ["Stories of the Prophets","Browse stories with Quran references.","☾"],["People & communities","Explore accounts mentioned in the Quran.","◈"],["Lessons from the Quran","Reflect on key lessons from each account.","✧"],["Story parts","Long accounts organised into readable parts.","≋"],["References","See the source ayahs for each section.","آ"],["Continue reading","Return to your last story part.","↗"]
      ], notice: "Story content will be added with source references. We will avoid invented details and respect Islamic depiction boundaries."
    },
    duas: {
      title: "Duas & Adhkar", emphasis: "remember with purpose.", kicker: "DAILY REMEMBRANCE",
      description: "A clear library for everyday duas and adhkar, organised by moment and purpose with Arabic, transliteration, meaning and references when available.",
      icon: "۞", kind: "study", tiles: [
        ["Morning Adhkar","A dedicated morning remembrance list.","☼"],["Evening Adhkar","A dedicated evening remembrance list.","☾"],["After Salah","Remembrance following prayer.","◌"],["Daily Duas","Everyday supplications by situation.","♡"],["Quranic Duas","Supplications found in the Quran.","آ"],["Saved Duas","Keep useful duas close at hand.","⚑"]
      ], notice: "Arabic text, meanings and references will be verified against the supplied or trusted source data before being shown as authenticated."
    },
    names: {
      title: "99 Names of Allah", emphasis: "learn and reflect.", kicker: "THE BEAUTIFUL NAMES",
      description: "A calm learning layout for the Beautiful Names, with Arabic names, transliteration, meanings and a way to revisit names for reflection.",
      icon: "٩٩", kind: "study", tiles: [
        ["All Names","A planned index of the Beautiful Names.","٩٩"],["Learn a Name","A focused detail and reflection view.","✧"],["Pronunciation","Transliteration and pronunciation support.","Aa"],["Meanings","Readable meaning and explanation fields.","文"],["Saved Names","Return to names you have saved.","⚑"],["Learning Progress","A future progress view for study.","✓"]
      ], notice: "Name meanings and explanations will be reviewed carefully and attributed where appropriate."
    },
    prayer: {
      title: "Prayer Times", emphasis: "make space for Salah.", kicker: "PAUSE · PRAY · RECONNECT",
      description: "A future prayer dashboard with location, calculation method, daily prayer schedule and next-prayer information. Times are not calculated in this design step.",
      icon: "☼", kind: "tools", tiles: [
        ["Daily Prayer Schedule","Fajr, Dhuhr, Asr, Maghrib and Isha.","☼"],["Location Settings","Set a city or location for prayer calculations.","⌖"],["Calculation Method","Choose a supported calculation method.","⚙"],["Prayer Reminders","Future reminder preferences.","◷"],["Monthly Timetable","A planned monthly prayer schedule.","▦"],["Prayer Guide","Learn about the five daily prayers.","۞"]
      ], notice: "Prayer times are not live yet. We will connect a reliable calculation/source and location settings in a later step."
    },
    tools: {
      title: "Islamic Tools", emphasis: "made for everyday worship.", kicker: "PRACTICAL TOOLS",
      description: "A home for useful Islamic tools, designed to be simple and clear on both mobile and desktop.",
      icon: "◎", kind: "tools", tiles: [
        ["Qibla Finder","A future Qibla direction tool.","◎"],["Digital Tasbeeh","Count dhikr with a simple counter.","◌"],["Zakat Calculator","Estimate zakat from entered assets and liabilities.","◈"],["Prayer Times","Daily schedule and prayer settings.","☼"],["Islamic Calendar","Browse Hijri dates and occasions.","☾"],["Bookmarks","Manage saved reading items.","⚑"]
      ], notice: "Tools that depend on location, date conversion or financial calculations will be implemented and tested separately before being treated as functional."
    },
    calendar: {
      title: "Islamic Calendar", emphasis: "mark meaningful moments.", kicker: "HIJRI DATES & OCCASIONS",
      description: "A planned calendar view for Hijri dates and important Islamic occasions, with date conversion and local visibility settings added in a later step.",
      icon: "☾", kind: "tools", tiles: [
        ["Hijri Calendar","A month-by-month calendar layout.","▦"],["Date Converter","Convert between Gregorian and Hijri dates.","⇄"],["Important Occasions","A reference list of Islamic occasions.","✧"],["Ramadan Planner","A future Ramadan-focused view.","☾"],["Personal Notes","Save reminders for meaningful dates.","✎"],["Calendar Settings","Choose display preferences.","⚙"]
      ], notice: "Hijri dates can vary by local moon-sighting and calculation convention. The final calendar will make its method clear."
    },
    learning: {
      title: "Islamic Learning", emphasis: "grow one step at a time.", kicker: "LEARN WITH CLARITY",
      description: "A learning hub for organised topics, guided reading and saved learning progress, with reliable references attached to content.",
      icon: "✎", kind: "study", tiles: [
        ["Foundations of Islam","A structured beginner learning path.","۞"],["Seerah","A source-aware learning section about the Prophetic biography.","☾"],["Prayer Guide","Learn the structure of Salah.","☼"],["Quran Learning","Build a steady Quran reading habit.","آ"],["Glossary","Understand common Islamic terms.","文"],["Saved Learning","Return to topics you have bookmarked.","⚑"]
      ], notice: "Educational content will be developed with references and reviewed for clarity. This step establishes the layout, not a complete religious curriculum."
    }
  };

  function closeDropdowns(except = null) {
    dropdowns.forEach((item) => {
      if (item !== except) {
        item.classList.remove("open");
        item.querySelector(".dropdown-trigger")?.setAttribute("aria-expanded", "false");
      }
    });
  }

  dropdowns.forEach((item) => {
    const trigger = item.querySelector(".dropdown-trigger");
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const willOpen = !item.classList.contains("open");
      closeDropdowns(item);
      item.classList.toggle("open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-dropdown")) closeDropdowns();
  });

  function closeMobileMenu() {
    nav.classList.remove("mobile-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("menu-open");
    closeDropdowns();
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("mobile-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    document.body.classList.toggle("menu-open", isOpen);
    if (!isOpen) closeDropdowns();
  });

  function tileMarkup(tile, index) {
    return `<button class="section-tile" type="button" data-tile="${index}">
      <span class="section-tile-icon">${tile[2]}</span>
      <strong>${tile[0]}</strong><small>${tile[1]}</small><span class="tile-arrow">↗</span>
    </button>`;
  }


  const QURAN_BASE = "data/quran/";
  let quranManifestPromise;
  let currentSurah = null;
  let currentTranslationMode = localStorage.getItem("noor-quran-translation") || "both";
  let currentArabicSize = Number(localStorage.getItem("noor-quran-arabic-size") || 32);
  const loadedSurahs = new Set();

  function safeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[char]);
  }

  function loadQuranManifest() {
    if (!quranManifestPromise) {
      quranManifestPromise = window.NOOR_QURAN_MANIFEST
        ? Promise.resolve(window.NOOR_QURAN_MANIFEST)
        : Promise.reject(new Error("Quran index is missing. Please keep the data/quran folder beside index.html."));
    }
    return quranManifestPromise;
  }

  function loadSurahData(meta) {
    const key = String(meta.number).padStart(3, "0");
    if (window["surah" + key]) return Promise.resolve(window["surah" + key]);
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = QURAN_BASE + "surahs/" + meta.file;
      script.onload = () => {
        loadedSurahs.add(meta.number);
        const data = window["surah" + key];
        if (data) resolve(data);
        else reject(new Error("Surah data format was not recognised."));
      };
      script.onerror = () => reject(new Error("Could not load " + meta.nameEnglish + ". Please run the site using a local web server."));
      document.head.appendChild(script);
    });
  }

  function quranBreadcrumb(label = "Quran") {
    return `<div class="breadcrumbs"><button type="button" data-go-home>Home</button><span>／</span><span>${label}</span></div>`;
  }

  function renderQuranLanding(message = "") {
    sectionView.innerHTML = `<div class="section-page quran-page">
      ${quranBreadcrumb()}
      <header class="section-hero quran-hero">
        <div class="eyebrow"><span class="eyebrow-line"></span> READ · REFLECT · CONNECT</div>
        <h1>Al-Quran<br><em>the words of Allah.</em></h1>
        <p>Read the Quran in Arabic with English and Roman Urdu/Hinglish translations. Your supplied Indopak Nastaleeq font is included for the Arabic ayahs.</p>
        <div class="quran-feature-pills"><span>114 Surahs</span><span>30 Juz</span><span>Arabic · English · Hinglish</span></div>
      </header>
      <div class="quran-toolbar">
        <label class="quran-search"><span>⌕</span><input id="surahSearch" type="search" placeholder="Search Surah name or number..." autocomplete="off"></label>
        <div class="quran-view-switch" role="group" aria-label="Browse Quran">
          <button class="active" type="button" data-quran-tab="surah">By Surah</button>
          <button type="button" data-quran-tab="juz">By Juz</button>
        </div>
      </div>
      <div id="quranStatus" class="quran-status" role="status">${safeText(message)}</div>
      <div id="surahGrid" class="surah-grid"><div class="quran-loading">Loading Surah index…</div></div>
    </div>`;
    sectionView.querySelector("[data-go-home]").addEventListener("click", goHome);
    sectionView.querySelector("#surahSearch").addEventListener("input", renderSurahGrid);
    sectionView.querySelectorAll("[data-quran-tab]").forEach(button => button.addEventListener("click", () => {
      sectionView.querySelectorAll("[data-quran-tab]").forEach(item => item.classList.toggle("active", item === button));
      renderSurahGrid();
    }));
    loadQuranManifest().then(() => renderSurahGrid()).catch(error => {
      const status = sectionView.querySelector("#quranStatus");
      if (status) status.textContent = error.message + " If you opened index.html directly, use a local server such as VS Code Live Server.";
      const grid = sectionView.querySelector("#surahGrid");
      if (grid) grid.innerHTML = `<div class="section-empty-state"><div class="empty-icon">۞</div><h3>Quran index could not load</h3><p>${safeText(error.message)} For local development, start the folder with VS Code Live Server.</p></div>`;
    });
  }

  function renderSurahGrid() {
    const grid = sectionView.querySelector("#surahGrid");
    if (!grid) return;
    const search = (sectionView.querySelector("#surahSearch")?.value || "").trim().toLowerCase();
    const tab = sectionView.querySelector("[data-quran-tab].active")?.dataset.quranTab || "surah";
    if (tab === "juz") {
      grid.innerHTML = Array.from({ length: 30 }, (_, index) => {
        const n = index + 1;
        return `<button class="juz-card" type="button" data-juz="${n}">
          <span class="surah-number">${String(n).padStart(2, "0")}</span>
          <span class="surah-card-copy"><strong>Juz ${n}</strong><small>Para ${n} · Quran division</small></span>
          <span class="surah-card-arrow">↗</span>
        </button>`;
      }).join("");
      grid.querySelectorAll("[data-juz]").forEach(button => button.addEventListener("click", () => showToast("Juz navigation will be connected in the next Quran enhancement step.")));
      return;
    }
    loadQuranManifest().then(manifest => {
      const orderedManifest = [...manifest].sort((a, b) => Number(a.number) - Number(b.number));
      const filtered = orderedManifest.filter(meta => {
        const haystack = `${meta.number} ${meta.nameEnglish} ${meta.nameArabic} ${meta.meaning}`.toLowerCase();
        return haystack.includes(search);
      });
      grid.innerHTML = filtered.length ? filtered.map(meta => `<button class="surah-card" type="button" data-surah="${meta.number}">
        <span class="surah-number">${String(meta.number).padStart(2, "0")}</span>
        <span class="surah-card-copy"><strong>${safeText(meta.nameEnglish)}</strong><small>${safeText(meta.meaning)} · ${meta.totalAyahs} Ayahs</small></span>
        <span class="surah-card-arrow">↗</span>
      </button>`).join("") : `<div class="section-empty-state"><h3>No Surah found</h3><p>Try a different name or number.</p></div>`;
      grid.querySelectorAll("[data-surah]").forEach(button => button.addEventListener("click", () => openSurah(Number(button.dataset.surah))));
    });
  }

  function openSurah(number, focusAyah = null, learningOnly = false) {
    loadQuranManifest().then(manifest => {
      const meta = manifest.find(item => item.number === number);
      if (!meta) return;
      sectionView.innerHTML = `<div class="section-page quran-page">${quranBreadcrumb(meta.nameEnglish)}
        <div class="reader-topline"><button type="button" class="reader-back" id="backToSurahs">${learningOnly ? "← Back to Quran Learning" : "← All Surahs"}</button><span>QURAN READER</span></div>
        <nav class="surah-pagination" aria-label="Surah navigation">
          <button type="button" id="previousSurah" ${meta.number <= 1 ? "disabled" : ""}>← <span>Previous Surah</span></button>
          <span class="surah-pagination-count">${meta.number} / 114</span>
          <button type="button" id="nextSurah" ${meta.number >= 114 ? "disabled" : ""}><span>Next Surah</span> →</button>
        </nav>
        <header class="surah-reader-hero">
          <div class="surah-reader-meta"><span>SURAH ${String(meta.number).padStart(3, "0")}</span><span>${meta.totalAyahs} AYahs</span><span>${safeText(meta.meaning)}</span></div>
          <h1>${safeText(meta.nameEnglish)}</h1>
          <div class="surah-title-meaning">${safeText(meta.meaning)}</div>
        </header>
        <div class="reader-controls">
          <label class="translation-control"><span>Translation</span><select id="translationMode" aria-label="Translation display"><option value="both">English + Hinglish</option><option value="english">English only</option><option value="hinglish">Hinglish only</option></select></label>
          <label class="arabic-size-control"><span>Arabic size</span><button type="button" id="arabicSmaller" aria-label="Decrease Arabic font size">A−</button><button type="button" id="arabicLarger" aria-label="Increase Arabic font size">A+</button></label>
          <label class="jump-control"><span>Go to Ayah</span><input id="ayahJump" type="number" min="1" max="${meta.totalAyahs}" placeholder="1"><button type="button" id="ayahJumpButton">Go</button></label>
        </div>
        <div class="reader-language-note">Arabic text uses the supplied <strong>Indopak Nastaleeq</strong> font. Translation wording is shown from your original data.</div>
        <div id="ayahList" class="ayah-list"><div class="quran-loading">Loading ayahs…</div></div>
      </div>`;
      sectionView.querySelector("[data-go-home]").addEventListener("click", goHome);
      sectionView.querySelector("#backToSurahs").addEventListener("click", () => { if (learningOnly) { location.hash = "#learning"; } else renderQuranLanding(); });
      sectionView.querySelector("#previousSurah")?.addEventListener("click", () => {
        if (meta.number > 1) openSurah(meta.number - 1);
      });
      sectionView.querySelector("#nextSurah")?.addEventListener("click", () => {
        if (meta.number < 114) openSurah(meta.number + 1);
      });
      const mode = sectionView.querySelector("#translationMode");
      mode.value = ["both", "english", "hinglish"].includes(currentTranslationMode) ? currentTranslationMode : "both";
      mode.addEventListener("change", () => {
        currentTranslationMode = mode.value;
        localStorage.setItem("noor-quran-translation", mode.value);
        applyTranslationMode();
      });
      sectionView.querySelector("#arabicSmaller").addEventListener("click", () => changeArabicSize(-2));
      sectionView.querySelector("#arabicLarger").addEventListener("click", () => changeArabicSize(2));
      sectionView.querySelector("#ayahJumpButton").addEventListener("click", () => {
        const value = Number(sectionView.querySelector("#ayahJump").value);
        if (value >= 1 && value <= meta.totalAyahs) jumpToAyah(value);
        else showToast(`Enter an ayah number from 1 to ${meta.totalAyahs}.`);
      });
      sectionView.querySelector("#ayahJump").addEventListener("keydown", event => {
        if (event.key === "Enter") sectionView.querySelector("#ayahJumpButton").click();
      });
      loadSurahData(meta).then(data => {
        currentSurah = { meta, data };
        renderAyahs();
        if (learningOnly && focusAyah) {
          sectionView.querySelectorAll(".ayah-card").forEach(card => { if (card.id !== `ayah-${focusAyah}`) card.remove(); });
          const controls = sectionView.querySelector(".reader-controls");
          if (controls) controls.hidden = true;
          const note = sectionView.querySelector(".reader-language-note");
          if (note) note.textContent = `Quran Learning reference · Surah ${meta.number}, Ayah ${focusAyah}`;
        }
        const ayahCount = sectionView.querySelector(".surah-reader-meta span:nth-child(2)");
        if (ayahCount) ayahCount.textContent = `${data.ayahs.length} AYahs`;
        if (focusAyah) requestAnimationFrame(() => jumpToAyah(focusAyah));
      }).catch(error => {
        sectionView.querySelector("#ayahList").innerHTML = `<div class="section-empty-state"><h3>Unable to load this Surah</h3><p>${safeText(error.message)}</p></div>`;
      });
    }).catch(error => showToast(error.message));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  window.noorOpenQuranAyah = (surah, ayah, learningOnly = false) => openSurah(Number(surah), Number(ayah), !!learningOnly);

  function renderAyahs() {
    if (!currentSurah) return;
    const { meta, data } = currentSurah;
    const list = sectionView.querySelector("#ayahList");
    if (!list) return;
    const saved = JSON.parse(localStorage.getItem("noor-quran-bookmarks") || "[]");
    list.innerHTML = data.ayahs.map(ayah => `<article class="ayah-card" id="ayah-${ayah.number}">
      <div class="ayah-card-top"><span class="ayah-reference">AYAH ${String(ayah.number).padStart(3, "0")} <span>·</span> ${meta.number}:${ayah.number}</span>
        <button class="ayah-bookmark ${saved.includes(`${meta.number}:${ayah.number}`) ? "saved" : ""}" type="button" data-bookmark="${ayah.number}" aria-label="Bookmark ayah ${ayah.number}" title="Bookmark ayah">${saved.includes(`${meta.number}:${ayah.number}`) ? "★" : "☆"}</button></div>
      <p class="ayah-arabic" lang="ar" dir="rtl" style="font-size:${currentArabicSize}px">${safeText(ayah.arabic)}</p>
      <div class="ayah-translations ${currentTranslationMode}">
        <p class="ayah-translation english-translation"><span>ENGLISH</span>${safeText(ayah.english)}</p>
        <p class="ayah-translation hinglish-translation"><span>HINGLISH / ROMAN URDU</span>${safeText(ayah.romanUrdu)}</p>
      </div>
    </article>`).join("");
    list.querySelectorAll("[data-bookmark]").forEach(button => button.addEventListener("click", () => {
      const id = `${meta.number}:${button.dataset.bookmark}`;
      const bookmarks = JSON.parse(localStorage.getItem("noor-quran-bookmarks") || "[]");
      const index = bookmarks.indexOf(id);
      if (index >= 0) bookmarks.splice(index, 1); else bookmarks.push(id);
      localStorage.setItem("noor-quran-bookmarks", JSON.stringify(bookmarks));
      button.classList.toggle("saved", index < 0);
      button.textContent = index < 0 ? "★" : "☆";
      showToast(index < 0 ? "Ayah bookmarked on this device." : "Bookmark removed.");
    }));
    applyTranslationMode();
  }

  function applyTranslationMode() {
    const translations = sectionView.querySelectorAll(".ayah-translations");
    translations.forEach(item => {
      item.classList.remove("both", "english", "hinglish");
      item.classList.add(currentTranslationMode);
    });
  }

  function changeArabicSize(delta) {
    currentArabicSize = Math.max(24, Math.min(52, currentArabicSize + delta));
    localStorage.setItem("noor-quran-arabic-size", String(currentArabicSize));
    sectionView.querySelectorAll(".ayah-arabic").forEach(item => item.style.fontSize = `${currentArabicSize}px`);
  }

  function jumpToAyah(number) {
    const target = sectionView.querySelector(`#ayah-${number}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.classList.add("ayah-highlight");
      setTimeout(() => target.classList.remove("ayah-highlight"), 1500);
    }
  }

  const HADITH_MANIFEST = {"version":1,"books":[{"id":"bukhari","title":"Sahih al-Bukhari","arabicTitle":"صحیح البخاری","description":"The most widely studied collection in this library.","chapterCount":97,"chapters":[{"file":"bukhari-001.js","variable":"hadithChapter001","chapterId":1,"title":"Revelation"},{"file":"bukhari-002.js","variable":"hadithChapter002","chapterId":2,"title":"Belief"},{"file":"bukhari-003.js","variable":"hadithChapter003","chapterId":3,"title":"Knowledge"},{"file":"bukhari-004.js","variable":"hadithChapter004","chapterId":4,"title":"Ablutions (Wudu')"},{"file":"bukhari-005.js","variable":"hadithChapter005","chapterId":5,"title":"Bathing (Ghusl)"},{"file":"bukhari-006.js","variable":"hadithChapter006","chapterId":6,"title":"Menstrual Periods"},{"file":"bukhari-007.js","variable":"hadithChapter007","chapterId":7,"title":"Rubbing hands and feet with dust (Tayammum)"},{"file":"bukhari-008.js","variable":"hadithChapter008","chapterId":8,"title":"Prayers (Salat)"},{"file":"bukhari-009.js","variable":"hadithChapter009","chapterId":9,"title":"Times of the Prayers"},{"file":"bukhari-010.js","variable":"hadithChapter010","chapterId":10,"title":"Call to Prayers (Adhaan)"},{"file":"bukhari-011.js","variable":"hadithChapter011","chapterId":11,"title":"Friday Prayer"},{"file":"bukhari-012.js","variable":"hadithChapter012","chapterId":12,"title":"Fear Prayer"},{"file":"bukhari-013.js","variable":"hadithChapter013","chapterId":13,"title":"The Two Festivals (Eids)"},{"file":"bukhari-014.js","variable":"hadithChapter014","chapterId":14,"title":"Witr Prayer"},{"file":"bukhari-015.js","variable":"hadithChapter015","chapterId":15,"title":"Invoking Allah for Rain (Istisqaa)"},{"file":"bukhari-016.js","variable":"hadithChapter016","chapterId":16,"title":"Eclipses"},{"file":"bukhari-017.js","variable":"hadithChapter017","chapterId":17,"title":"Prostration During Recital of Qur'an"},{"file":"bukhari-018.js","variable":"hadithChapter018","chapterId":18,"title":"Shortening the Prayers (At-Taqseer)"},{"file":"bukhari-019.js","variable":"hadithChapter019","chapterId":19,"title":"Prayer at Night (Tahajjud)"},{"file":"bukhari-020.js","variable":"hadithChapter020","chapterId":20,"title":"Virtues of Prayer at Masjid Makkah and Madinah"},{"file":"bukhari-021.js","variable":"hadithChapter021","chapterId":21,"title":"Actions while Praying"},{"file":"bukhari-022.js","variable":"hadithChapter022","chapterId":22,"title":"Forgetfulness in Prayer"},{"file":"bukhari-023.js","variable":"hadithChapter023","chapterId":23,"title":"Funerals (Al-Janaa'iz)"},{"file":"bukhari-024.js","variable":"hadithChapter024","chapterId":24,"title":"Obligatory Charity Tax (Zakat)"},{"file":"bukhari-025.js","variable":"hadithChapter025","chapterId":25,"title":"Hajj (Pilgrimage)"},{"file":"bukhari-026.js","variable":"hadithChapter026","chapterId":26,"title":"`Umrah (Minor pilgrimage)"},{"file":"bukhari-027.js","variable":"hadithChapter027","chapterId":27,"title":"Pilgrims Prevented from Completing the Pilgrimage"},{"file":"bukhari-028.js","variable":"hadithChapter028","chapterId":28,"title":"Penalty of Hunting while on Pilgrimage"},{"file":"bukhari-029.js","variable":"hadithChapter029","chapterId":29,"title":"Virtues of Madinah"},{"file":"bukhari-030.js","variable":"hadithChapter030","chapterId":30,"title":"Fasting"},{"file":"bukhari-031.js","variable":"hadithChapter031","chapterId":31,"title":"Praying at Night in Ramadaan (Taraweeh)"},{"file":"bukhari-032.js","variable":"hadithChapter032","chapterId":32,"title":"Virtues of the Night of Qadr"},{"file":"bukhari-033.js","variable":"hadithChapter033","chapterId":33,"title":"Retiring to a Mosque for Remembrance of Allah (I'tikaf)"},{"file":"bukhari-034.js","variable":"hadithChapter034","chapterId":34,"title":"Sales and Trade"},{"file":"bukhari-035.js","variable":"hadithChapter035","chapterId":35,"title":"Sales in which a Price is paid for Goods to be Delivered Later (As-Salam)"},{"file":"bukhari-036.js","variable":"hadithChapter036","chapterId":36,"title":"Shuf'a"},{"file":"bukhari-037.js","variable":"hadithChapter037","chapterId":37,"title":"Hiring"},{"file":"bukhari-038.js","variable":"hadithChapter038","chapterId":38,"title":"Transferance of a Debt from One Person to Another (Al-Hawaala)"},{"file":"bukhari-039.js","variable":"hadithChapter039","chapterId":39,"title":"Kafalah"},{"file":"bukhari-040.js","variable":"hadithChapter040","chapterId":40,"title":"Representation, Authorization, Business by Proxy"},{"file":"bukhari-041.js","variable":"hadithChapter041","chapterId":41,"title":"Agriculture"},{"file":"bukhari-042.js","variable":"hadithChapter042","chapterId":42,"title":"Distribution of Water"},{"file":"bukhari-043.js","variable":"hadithChapter043","chapterId":43,"title":"Loans, Payment of Loans, Freezing of Property, Bankruptcy"},{"file":"bukhari-044.js","variable":"hadithChapter044","chapterId":44,"title":"Khusoomaat"},{"file":"bukhari-045.js","variable":"hadithChapter045","chapterId":45,"title":"Lost Things Picked up by Someone (Luqatah)"},{"file":"bukhari-046.js","variable":"hadithChapter046","chapterId":46,"title":"Oppressions"},{"file":"bukhari-047.js","variable":"hadithChapter047","chapterId":47,"title":"Partnership"},{"file":"bukhari-048.js","variable":"hadithChapter048","chapterId":48,"title":"Mortgaging"},{"file":"bukhari-049.js","variable":"hadithChapter049","chapterId":49,"title":"Manumission of Slaves"},{"file":"bukhari-050.js","variable":"hadithChapter050","chapterId":50,"title":"Makaatib"},{"file":"bukhari-051.js","variable":"hadithChapter051","chapterId":51,"title":"Gifts"},{"file":"bukhari-052.js","variable":"hadithChapter052","chapterId":52,"title":"Witnesses"},{"file":"bukhari-053.js","variable":"hadithChapter053","chapterId":53,"title":"Peacemaking"},{"file":"bukhari-054.js","variable":"hadithChapter054","chapterId":54,"title":"Conditions"},{"file":"bukhari-055.js","variable":"hadithChapter055","chapterId":55,"title":"Wills and Testaments (Wasaayaa)"},{"file":"bukhari-056.js","variable":"hadithChapter056","chapterId":56,"title":"Fighting for the Cause of Allah (Jihaad)"},{"file":"bukhari-057.js","variable":"hadithChapter057","chapterId":57,"title":"One-fifth of Booty to the Cause of Allah (Khumus)"},{"file":"bukhari-058.js","variable":"hadithChapter058","chapterId":58,"title":"Jizyah and Mawaada'ah"},{"file":"bukhari-059.js","variable":"hadithChapter059","chapterId":59,"title":"Beginning of Creation"},{"file":"bukhari-060.js","variable":"hadithChapter060","chapterId":60,"title":"Prophets"},{"file":"bukhari-061.js","variable":"hadithChapter061","chapterId":61,"title":"Virtues and Merits of the Prophet (pbuh) and his Companions"},{"file":"bukhari-062.js","variable":"hadithChapter062","chapterId":62,"title":"Companions of the Prophet"},{"file":"bukhari-063.js","variable":"hadithChapter063","chapterId":63,"title":"Merits of the Helpers in Madinah (Ansaar)"},{"file":"bukhari-064.js","variable":"hadithChapter064","chapterId":64,"title":"Military Expeditions led by the Prophet (pbuh) (Al-Maghaazi)"},{"file":"bukhari-065.js","variable":"hadithChapter065","chapterId":65,"title":"Prophetic Commentary on the Qur'an (Tafseer of the Prophet (pbuh))"},{"file":"bukhari-066.js","variable":"hadithChapter066","chapterId":66,"title":"Virtues of the Qur'an"},{"file":"bukhari-067.js","variable":"hadithChapter067","chapterId":67,"title":"Wedlock, Marriage (Nikaah)"},{"file":"bukhari-068.js","variable":"hadithChapter068","chapterId":68,"title":"Divorce"},{"file":"bukhari-069.js","variable":"hadithChapter069","chapterId":69,"title":"Supporting the Family"},{"file":"bukhari-070.js","variable":"hadithChapter070","chapterId":70,"title":"Food, Meals"},{"file":"bukhari-071.js","variable":"hadithChapter071","chapterId":71,"title":"Sacrifice on Occasion of Birth (`Aqiqa)"},{"file":"bukhari-072.js","variable":"hadithChapter072","chapterId":72,"title":"Hunting, Slaughtering"},{"file":"bukhari-073.js","variable":"hadithChapter073","chapterId":73,"title":"Al-Adha Festival Sacrifice (Adaahi)"},{"file":"bukhari-074.js","variable":"hadithChapter074","chapterId":74,"title":"Drinks"},{"file":"bukhari-075.js","variable":"hadithChapter075","chapterId":75,"title":"Patients"},{"file":"bukhari-076.js","variable":"hadithChapter076","chapterId":76,"title":"Medicine"},{"file":"bukhari-077.js","variable":"hadithChapter077","chapterId":77,"title":"Dress"},{"file":"bukhari-078.js","variable":"hadithChapter078","chapterId":78,"title":"Good Manners and Form (Al-Adab)"},{"file":"bukhari-079.js","variable":"hadithChapter079","chapterId":79,"title":"Asking Permission"},{"file":"bukhari-080.js","variable":"hadithChapter080","chapterId":80,"title":"Invocations"},{"file":"bukhari-081.js","variable":"hadithChapter081","chapterId":81,"title":"To make the Heart Tender (Ar-Riqaq)"},{"file":"bukhari-082.js","variable":"hadithChapter082","chapterId":82,"title":"Divine Will (Al-Qadar)"},{"file":"bukhari-083.js","variable":"hadithChapter083","chapterId":83,"title":"Oaths and Vows"},{"file":"bukhari-084.js","variable":"hadithChapter084","chapterId":84,"title":"Expiation for Unfulfilled Oaths"},{"file":"bukhari-085.js","variable":"hadithChapter085","chapterId":85,"title":"Laws of Inheritance (Al-Faraa'id)"},{"file":"bukhari-086.js","variable":"hadithChapter086","chapterId":86,"title":"Limits and Punishments set by Allah (Hudood)"},{"file":"bukhari-087.js","variable":"hadithChapter087","chapterId":87,"title":"Blood Money (Ad-Diyat)"},{"file":"bukhari-088.js","variable":"hadithChapter088","chapterId":88,"title":"Apostates"},{"file":"bukhari-089.js","variable":"hadithChapter089","chapterId":89,"title":"(Statements made under) Coercion"},{"file":"bukhari-090.js","variable":"hadithChapter090","chapterId":90,"title":"Tricks"},{"file":"bukhari-091.js","variable":"hadithChapter091","chapterId":91,"title":"Interpretation of Dreams"},{"file":"bukhari-092.js","variable":"hadithChapter092","chapterId":92,"title":"Afflictions and the End of the World"},{"file":"bukhari-093.js","variable":"hadithChapter093","chapterId":93,"title":"Judgments (Ahkaam)"},{"file":"bukhari-094.js","variable":"hadithChapter094","chapterId":94,"title":"Wishes"},{"file":"bukhari-095.js","variable":"hadithChapter095","chapterId":95,"title":"Accepting Information Given by a Truthful Person"},{"file":"bukhari-096.js","variable":"hadithChapter096","chapterId":96,"title":"Holding Fast to the Qur'an and Sunnah"},{"file":"bukhari-097.js","variable":"hadithChapter097","chapterId":97,"title":"Oneness, Uniqueness of Allah (Tawheed)"}]},{"id":"muslim","title":"Sahih Muslim","arabicTitle":"صحیح مسلم","description":"Browse the collection by chapter and narration.","chapterCount":57,"chapters":[{"file":"muslim-000.js","variable":"muslimChapter000","chapterId":0,"title":"Introduction"},{"file":"muslim-001.js","variable":"muslimChapter001","chapterId":1,"title":"The Book of Faith"},{"file":"muslim-002.js","variable":"muslimChapter002","chapterId":2,"title":"The Book of Purification"},{"file":"muslim-003.js","variable":"muslimChapter003","chapterId":3,"title":"The Book of Menstruation"},{"file":"muslim-004.js","variable":"muslimChapter004","chapterId":4,"title":"The Book of Prayers"},{"file":"muslim-005.js","variable":"muslimChapter005","chapterId":5,"title":"The Book of Mosques and Places of Prayer"},{"file":"muslim-006.js","variable":"muslimChapter006","chapterId":6,"title":"The Book of Prayer - Travellers"},{"file":"muslim-007.js","variable":"muslimChapter007","chapterId":7,"title":"The Book of Prayer - Friday"},{"file":"muslim-008.js","variable":"muslimChapter008","chapterId":8,"title":"The Book of Prayer - Two Eids"},{"file":"muslim-009.js","variable":"muslimChapter009","chapterId":9,"title":"The Book of Prayer - Rain"},{"file":"muslim-010.js","variable":"muslimChapter010","chapterId":10,"title":"The Book of Prayer - Eclipses"},{"file":"muslim-011.js","variable":"muslimChapter011","chapterId":11,"title":"The Book of Prayer - Funerals"},{"file":"muslim-012.js","variable":"muslimChapter012","chapterId":12,"title":"The Book of Zakat"},{"file":"muslim-013.js","variable":"muslimChapter013","chapterId":13,"title":"The Book of Fasting"},{"file":"muslim-014.js","variable":"muslimChapter014","chapterId":14,"title":"The Book of I'tikaf"},{"file":"muslim-015.js","variable":"muslimChapter015","chapterId":15,"title":"The Book of Pilgrimage"},{"file":"muslim-016.js","variable":"muslimChapter016","chapterId":16,"title":"The Book of Marriage"},{"file":"muslim-017.js","variable":"muslimChapter017","chapterId":17,"title":"The Book of Suckling"},{"file":"muslim-018.js","variable":"muslimChapter018","chapterId":18,"title":"The Book of Divorce"},{"file":"muslim-019.js","variable":"muslimChapter019","chapterId":19,"title":"The Book of Invoking Curses"},{"file":"muslim-020.js","variable":"muslimChapter020","chapterId":20,"title":"The Book of Emancipating Slaves"},{"file":"muslim-021.js","variable":"muslimChapter021","chapterId":21,"title":"The Book of Transactions"},{"file":"muslim-022.js","variable":"muslimChapter022","chapterId":22,"title":"The Book of Musaqah"},{"file":"muslim-023.js","variable":"muslimChapter023","chapterId":23,"title":"The Book of the Rules of Inheritance"},{"file":"muslim-024.js","variable":"muslimChapter024","chapterId":24,"title":"The Book of Gifts"},{"file":"muslim-025.js","variable":"muslimChapter025","chapterId":25,"title":"The Book of Wills"},{"file":"muslim-026.js","variable":"muslimChapter026","chapterId":26,"title":"The Book of Vows"},{"file":"muslim-027.js","variable":"muslimChapter027","chapterId":27,"title":"The Book of Oaths"},{"file":"muslim-028.js","variable":"muslimChapter028","chapterId":28,"title":"The Book of Oaths, Muharibin, Qasas (Retaliation), and Diyat (Blood Money)"},{"file":"muslim-029.js","variable":"muslimChapter029","chapterId":29,"title":"The Book of Legal Punishments"},{"file":"muslim-030.js","variable":"muslimChapter030","chapterId":30,"title":"The Book of Judicial Decisions"},{"file":"muslim-031.js","variable":"muslimChapter031","chapterId":31,"title":"The Book of Lost Property"},{"file":"muslim-032.js","variable":"muslimChapter032","chapterId":32,"title":"The Book of Jihad and Expeditions"},{"file":"muslim-033.js","variable":"muslimChapter033","chapterId":33,"title":"The Book on Government"},{"file":"muslim-034.js","variable":"muslimChapter034","chapterId":34,"title":"The Book of Hunting, Slaughter, and what may be Eaten"},{"file":"muslim-035.js","variable":"muslimChapter035","chapterId":35,"title":"The Book of Sacrifices"},{"file":"muslim-036.js","variable":"muslimChapter036","chapterId":36,"title":"The Book of Drinks"},{"file":"muslim-037.js","variable":"muslimChapter037","chapterId":37,"title":"The Book of Clothes and Adornment"},{"file":"muslim-038.js","variable":"muslimChapter038","chapterId":38,"title":"The Book of Manners and Etiquette"},{"file":"muslim-039.js","variable":"muslimChapter039","chapterId":39,"title":"The Book of Greetings"},{"file":"muslim-040.js","variable":"muslimChapter040","chapterId":40,"title":"The Book Concerning the Use of Correct Words"},{"file":"muslim-041.js","variable":"muslimChapter041","chapterId":41,"title":"The Book of Poetry"},{"file":"muslim-042.js","variable":"muslimChapter042","chapterId":42,"title":"The Book of Dreams"},{"file":"muslim-043.js","variable":"muslimChapter043","chapterId":43,"title":"The Book of Virtues"},{"file":"muslim-044.js","variable":"muslimChapter044","chapterId":44,"title":"The Book of the Merits of the Companions"},{"file":"muslim-045.js","variable":"muslimChapter045","chapterId":45,"title":"The Book of Virtue, Enjoining Good Manners, and Joining of the Ties of Kinship"},{"file":"muslim-046.js","variable":"muslimChapter046","chapterId":46,"title":"The Book of Destiny"},{"file":"muslim-047.js","variable":"muslimChapter047","chapterId":47,"title":"The Book of Knowledge"},{"file":"muslim-048.js","variable":"muslimChapter048","chapterId":48,"title":"The Book Pertaining to the Remembrance of Allah, Supplication, Repentance and Seeking Forgiveness"},{"file":"muslim-049.js","variable":"muslimChapter049","chapterId":49,"title":"The Book of Heart-Melting Traditions"},{"file":"muslim-050.js","variable":"muslimChapter050","chapterId":50,"title":"The Book of Repentance"},{"file":"muslim-051.js","variable":"muslimChapter051","chapterId":51,"title":"Characteristics of The Hypocrites And Rulings Concerning Them"},{"file":"muslim-052.js","variable":"muslimChapter052","chapterId":52,"title":"Characteristics of the Day of Judgment, Paradise, and Hell"},{"file":"muslim-053.js","variable":"muslimChapter053","chapterId":53,"title":"The Book of Paradise, its Description, its Bounties and its Inhabitants"},{"file":"muslim-054.js","variable":"muslimChapter054","chapterId":54,"title":"The Book of Tribulations and Portents of the Last Hour"},{"file":"muslim-055.js","variable":"muslimChapter055","chapterId":55,"title":"The Book of Zuhd and Softening of Hearts"},{"file":"muslim-056.js","variable":"muslimChapter056","chapterId":56,"title":"The Book of Commentary on the Qur'an"}]},{"id":"abudawud","title":"Sunan Abi Dawud","arabicTitle":"سنن أبي داود","description":"Browse the collection by chapter and narration.","chapterCount":43,"chapters":[{"file":"abudawud-001.js","variable":"abudawudChapter001","chapterId":1,"title":"Purification (Kitab Al-Taharah)"},{"file":"abudawud-002.js","variable":"abudawudChapter002","chapterId":2,"title":"Prayer (Kitab Al-Salat)"},{"file":"abudawud-003.js","variable":"abudawudChapter003","chapterId":3,"title":"The Book Of The Prayer For Rain (Kitab al-Istisqa')"},{"file":"abudawud-004.js","variable":"abudawudChapter004","chapterId":4,"title":"Prayer (Kitab Al-Salat): Detailed Rules of Law about the Prayer during Journey"},{"file":"abudawud-005.js","variable":"abudawudChapter005","chapterId":5,"title":"Prayer (Kitab Al-Salat): Voluntary Prayers"},{"file":"abudawud-006.js","variable":"abudawudChapter006","chapterId":6,"title":"Prayer (Kitab Al-Salat): Detailed Injunctions about Ramadan"},{"file":"abudawud-007.js","variable":"abudawudChapter007","chapterId":7,"title":"Prayer (Kitab Al-Salat): Prostration while reciting the Qur'an"},{"file":"abudawud-008.js","variable":"abudawudChapter008","chapterId":8,"title":"Prayer (Kitab Al-Salat): Detailed Injunctions about Witr"},{"file":"abudawud-009.js","variable":"abudawudChapter009","chapterId":9,"title":"Zakat (Kitab Al-Zakat)"},{"file":"abudawud-010.js","variable":"abudawudChapter010","chapterId":10,"title":"The Book of Lost and Found Items"},{"file":"abudawud-011.js","variable":"abudawudChapter011","chapterId":11,"title":"The Rites of Hajj (Kitab Al-Manasik Wa'l-Hajj)"},{"file":"abudawud-012.js","variable":"abudawudChapter012","chapterId":12,"title":"Marriage (Kitab Al-Nikah)"},{"file":"abudawud-013.js","variable":"abudawudChapter013","chapterId":13,"title":"Divorce (Kitab Al-Talaq)"},{"file":"abudawud-014.js","variable":"abudawudChapter014","chapterId":14,"title":"Fasting (Kitab Al-Siyam)"},{"file":"abudawud-015.js","variable":"abudawudChapter015","chapterId":15,"title":"Jihad (Kitab Al-Jihad)"},{"file":"abudawud-016.js","variable":"abudawudChapter016","chapterId":16,"title":"Sacrifice (Kitab Al-Dahaya)"},{"file":"abudawud-017.js","variable":"abudawudChapter017","chapterId":17,"title":"Game (Kitab Al-Said)"},{"file":"abudawud-018.js","variable":"abudawudChapter018","chapterId":18,"title":"Wills (Kitab Al-Wasaya)"},{"file":"abudawud-019.js","variable":"abudawudChapter019","chapterId":19,"title":"Shares of Inheritance (Kitab Al-Fara'id)"},{"file":"abudawud-020.js","variable":"abudawudChapter020","chapterId":20,"title":"Tribute, Spoils, and Rulership (Kitab Al-Kharaj, Wal-Fai' Wal-Imarah)"},{"file":"abudawud-021.js","variable":"abudawudChapter021","chapterId":21,"title":"Funerals (Kitab Al-Jana'iz)"},{"file":"abudawud-022.js","variable":"abudawudChapter022","chapterId":22,"title":"Oaths and Vows (Kitab Al-Aiman Wa Al-Nudhur)"},{"file":"abudawud-023.js","variable":"abudawudChapter023","chapterId":23,"title":"Commercial Transactions (Kitab Al-Buyu)"},{"file":"abudawud-024.js","variable":"abudawudChapter024","chapterId":24,"title":"Wages (Kitab Al-Ijarah)"},{"file":"abudawud-025.js","variable":"abudawudChapter025","chapterId":25,"title":"The Office of the Judge (Kitab Al-Aqdiyah)"},{"file":"abudawud-026.js","variable":"abudawudChapter026","chapterId":26,"title":"Knowledge (Kitab Al-Ilm)"},{"file":"abudawud-027.js","variable":"abudawudChapter027","chapterId":27,"title":"Drinks (Kitab Al-Ashribah)"},{"file":"abudawud-028.js","variable":"abudawudChapter028","chapterId":28,"title":"Foods (Kitab Al-At'imah)"},{"file":"abudawud-029.js","variable":"abudawudChapter029","chapterId":29,"title":"Medicine (Kitab Al-Tibb)"},{"file":"abudawud-030.js","variable":"abudawudChapter030","chapterId":30,"title":"Divination and Omens (Kitab Al-Kahanah Wa Al-Tatayyur)"},{"file":"abudawud-031.js","variable":"abudawudChapter031","chapterId":31,"title":"The Book of Manumission of Slaves"},{"file":"abudawud-032.js","variable":"abudawudChapter032","chapterId":32,"title":"Dialects and Readings of the Qur'an (Kitab Al-Huruf Wa Al-Qira'at)"},{"file":"abudawud-033.js","variable":"abudawudChapter033","chapterId":33,"title":"Hot Baths (Kitab Al-Hammam)"},{"file":"abudawud-034.js","variable":"abudawudChapter034","chapterId":34,"title":"Clothing (Kitab Al-Libas)"},{"file":"abudawud-035.js","variable":"abudawudChapter035","chapterId":35,"title":"Combing the Hair (Kitab Al-Tarajjul)"},{"file":"abudawud-036.js","variable":"abudawudChapter036","chapterId":36,"title":"Signet-Rings (Kitab Al-Khatam)"},{"file":"abudawud-037.js","variable":"abudawudChapter037","chapterId":37,"title":"Trials and Fierce Battles (Kitab Al-Fitan Wa Al-Malahim)"},{"file":"abudawud-038.js","variable":"abudawudChapter038","chapterId":38,"title":"The Promised Deliverer (Kitab Al-Mahdi)"},{"file":"abudawud-039.js","variable":"abudawudChapter039","chapterId":39,"title":"Battles (Kitab Al-Malahim)"},{"file":"abudawud-040.js","variable":"abudawudChapter040","chapterId":40,"title":"Prescribed Punishments (Kitab Al-Hudud)"},{"file":"abudawud-041.js","variable":"abudawudChapter041","chapterId":41,"title":"Types of Blood-Wit (Kitab Al-Diyat)"},{"file":"abudawud-042.js","variable":"abudawudChapter042","chapterId":42,"title":"Model Behavior of the Prophet (Kitab Al-Sunnah)"},{"file":"abudawud-043.js","variable":"abudawudChapter043","chapterId":43,"title":"General Behavior (Kitab Al-Adab)"}]},{"id":"tirmidhi","title":"Jami at-Tirmidhi","arabicTitle":"جامع الترمذي","description":"Browse the collection by chapter and narration.","chapterCount":49,"chapters":[{"file":"tirmidhi-001.js","variable":"tirmidhiChapter001","chapterId":1,"title":"The Book on Purification"},{"file":"tirmidhi-002.js","variable":"tirmidhiChapter002","chapterId":2,"title":"The Book on Salat (Prayer)"},{"file":"tirmidhi-003.js","variable":"tirmidhiChapter003","chapterId":3,"title":"The Book on Al-Witr"},{"file":"tirmidhi-004.js","variable":"tirmidhiChapter004","chapterId":4,"title":"The Book on the Day of Friday"},{"file":"tirmidhi-005.js","variable":"tirmidhiChapter005","chapterId":5,"title":"The Book on the Two Eids"},{"file":"tirmidhi-006.js","variable":"tirmidhiChapter006","chapterId":6,"title":"The Book on Traveling"},{"file":"tirmidhi-007.js","variable":"tirmidhiChapter007","chapterId":7,"title":"The Book on Zakat"},{"file":"tirmidhi-008.js","variable":"tirmidhiChapter008","chapterId":8,"title":"The Book on Fasting"},{"file":"tirmidhi-009.js","variable":"tirmidhiChapter009","chapterId":9,"title":"The Book on Hajj"},{"file":"tirmidhi-010.js","variable":"tirmidhiChapter010","chapterId":10,"title":"The Book on Jana''iz (Funerals)"},{"file":"tirmidhi-011.js","variable":"tirmidhiChapter011","chapterId":11,"title":"The Book on Marriage"},{"file":"tirmidhi-012.js","variable":"tirmidhiChapter012","chapterId":12,"title":"The Book on Suckling"},{"file":"tirmidhi-013.js","variable":"tirmidhiChapter013","chapterId":13,"title":"The Book on Divorce and Li'an"},{"file":"tirmidhi-014.js","variable":"tirmidhiChapter014","chapterId":14,"title":"The Book on Business"},{"file":"tirmidhi-015.js","variable":"tirmidhiChapter015","chapterId":15,"title":"The Chapters On Judgements From The Messenger of Allah"},{"file":"tirmidhi-016.js","variable":"tirmidhiChapter016","chapterId":16,"title":"The Book on Blood Money"},{"file":"tirmidhi-017.js","variable":"tirmidhiChapter017","chapterId":17,"title":"The Book on Legal Punishments (Al-Hudud)"},{"file":"tirmidhi-018.js","variable":"tirmidhiChapter018","chapterId":18,"title":"The Book on Hunting"},{"file":"tirmidhi-019.js","variable":"tirmidhiChapter019","chapterId":19,"title":"The Book on Sacrifices"},{"file":"tirmidhi-020.js","variable":"tirmidhiChapter020","chapterId":20,"title":"The Book on Vows and Oaths"},{"file":"tirmidhi-021.js","variable":"tirmidhiChapter021","chapterId":21,"title":"The Book on Military Expeditions"},{"file":"tirmidhi-022.js","variable":"tirmidhiChapter022","chapterId":22,"title":"The Book on Virtues of Jihad"},{"file":"tirmidhi-023.js","variable":"tirmidhiChapter023","chapterId":23,"title":"The Book on Jihad"},{"file":"tirmidhi-024.js","variable":"tirmidhiChapter024","chapterId":24,"title":"The Book on Clothing"},{"file":"tirmidhi-025.js","variable":"tirmidhiChapter025","chapterId":25,"title":"The Book on Food"},{"file":"tirmidhi-026.js","variable":"tirmidhiChapter026","chapterId":26,"title":"The Book on Drinks"},{"file":"tirmidhi-027.js","variable":"tirmidhiChapter027","chapterId":27,"title":"Chapters on Righteousness And Maintaining Good Relations With Relatives"},{"file":"tirmidhi-028.js","variable":"tirmidhiChapter028","chapterId":28,"title":"Chapters on Medicine"},{"file":"tirmidhi-029.js","variable":"tirmidhiChapter029","chapterId":29,"title":"Chapters On Inheritance"},{"file":"tirmidhi-030.js","variable":"tirmidhiChapter030","chapterId":30,"title":"Chapters On Wasaya (Wills and Testament)"},{"file":"tirmidhi-031.js","variable":"tirmidhiChapter031","chapterId":31,"title":"Chapters On Wala' And Gifts"},{"file":"tirmidhi-032.js","variable":"tirmidhiChapter032","chapterId":32,"title":"Chapters On Al-Qadar"},{"file":"tirmidhi-033.js","variable":"tirmidhiChapter033","chapterId":33,"title":"Chapters On Al-Fitan"},{"file":"tirmidhi-034.js","variable":"tirmidhiChapter034","chapterId":34,"title":"Chapters On Dreams"},{"file":"tirmidhi-035.js","variable":"tirmidhiChapter035","chapterId":35,"title":"Chapters On Witnesses"},{"file":"tirmidhi-036.js","variable":"tirmidhiChapter036","chapterId":36,"title":"Chapters On Zuhd"},{"file":"tirmidhi-037.js","variable":"tirmidhiChapter037","chapterId":37,"title":"Chapters on the description of the Day of Judgement, Ar-Riqaq, and Al-Wara'"},{"file":"tirmidhi-038.js","variable":"tirmidhiChapter038","chapterId":38,"title":"Chapters on the description of Paradise"},{"file":"tirmidhi-039.js","variable":"tirmidhiChapter039","chapterId":39,"title":"The Book on the Description of Hellfire"},{"file":"tirmidhi-040.js","variable":"tirmidhiChapter040","chapterId":40,"title":"The Book on Faith"},{"file":"tirmidhi-041.js","variable":"tirmidhiChapter041","chapterId":41,"title":"Chapters on Knowledge"},{"file":"tirmidhi-042.js","variable":"tirmidhiChapter042","chapterId":42,"title":"Chapters on Seeking Permission"},{"file":"tirmidhi-043.js","variable":"tirmidhiChapter043","chapterId":43,"title":"Chapters on Manners"},{"file":"tirmidhi-044.js","variable":"tirmidhiChapter044","chapterId":44,"title":"Chapters on Parables"},{"file":"tirmidhi-045.js","variable":"tirmidhiChapter045","chapterId":45,"title":"Chapters on The Virtues of the Qur'an"},{"file":"tirmidhi-046.js","variable":"tirmidhiChapter046","chapterId":46,"title":"Chapters on Recitation"},{"file":"tirmidhi-047.js","variable":"tirmidhiChapter047","chapterId":47,"title":"Chapters on Tafsir"},{"file":"tirmidhi-048.js","variable":"tirmidhiChapter048","chapterId":48,"title":"Chapters on Supplication"},{"file":"tirmidhi-049.js","variable":"tirmidhiChapter049","chapterId":49,"title":"Chapters on Virtues"}]},{"id":"nasai","title":"Sunan an-Nasa'i","arabicTitle":"سنن النسائي","description":"Browse the collection by chapter and narration.","chapterCount":52,"chapters":[{"file":"nasai-001.js","variable":"nasaiChapter001","chapterId":1,"title":"The Book of Purification"},{"file":"nasai-002.js","variable":"nasaiChapter002","chapterId":2,"title":"The Book of Water"},{"file":"nasai-003.js","variable":"nasaiChapter003","chapterId":3,"title":"The Book of Menstruation and Istihadah"},{"file":"nasai-004.js","variable":"nasaiChapter004","chapterId":4,"title":"The Book of Ghusl and Tayammum"},{"file":"nasai-005.js","variable":"nasaiChapter005","chapterId":5,"title":"The Book of Salah"},{"file":"nasai-006.js","variable":"nasaiChapter006","chapterId":6,"title":"The Book of the Times (of Prayer)"},{"file":"nasai-007.js","variable":"nasaiChapter007","chapterId":7,"title":"The Book of the Adhan (The Call to Prayer)"},{"file":"nasai-008.js","variable":"nasaiChapter008","chapterId":8,"title":"The Book of the Masjids"},{"file":"nasai-009.js","variable":"nasaiChapter009","chapterId":9,"title":"The Book of the Qiblah"},{"file":"nasai-010.js","variable":"nasaiChapter010","chapterId":10,"title":"The Book of Leading the Prayer (Al-Imamah)"},{"file":"nasai-011.js","variable":"nasaiChapter011","chapterId":11,"title":"The Book of the Commencement of the Prayer"},{"file":"nasai-012.js","variable":"nasaiChapter012","chapterId":12,"title":"The Book of The At-Tatbiq (Clasping One's Hands Together)"},{"file":"nasai-013.js","variable":"nasaiChapter013","chapterId":13,"title":"The Book of Forgetfulness (In Prayer)"},{"file":"nasai-014.js","variable":"nasaiChapter014","chapterId":14,"title":"The Book of Jumu'ah (Friday Prayer)"},{"file":"nasai-015.js","variable":"nasaiChapter015","chapterId":15,"title":"The Book of Shortening the Prayer When Traveling"},{"file":"nasai-016.js","variable":"nasaiChapter016","chapterId":16,"title":"The Book of Eclipses"},{"file":"nasai-017.js","variable":"nasaiChapter017","chapterId":17,"title":"The Book of Praying for Rain (Al-Istisqa')"},{"file":"nasai-018.js","variable":"nasaiChapter018","chapterId":18,"title":"The Book of the Fear Prayer"},{"file":"nasai-019.js","variable":"nasaiChapter019","chapterId":19,"title":"The Book of the Prayer for the Two 'Eids"},{"file":"nasai-020.js","variable":"nasaiChapter020","chapterId":20,"title":"The Book of Qiyam Al-Lail (The Night Prayer) and Voluntary Prayers During the Day"},{"file":"nasai-021.js","variable":"nasaiChapter021","chapterId":21,"title":"The Book of Funerals"},{"file":"nasai-022.js","variable":"nasaiChapter022","chapterId":22,"title":"The Book of Fasting"},{"file":"nasai-023.js","variable":"nasaiChapter023","chapterId":23,"title":"The Book of Zakah"},{"file":"nasai-024.js","variable":"nasaiChapter024","chapterId":24,"title":"The Book of Hajj"},{"file":"nasai-025.js","variable":"nasaiChapter025","chapterId":25,"title":"The Book of Jihad"},{"file":"nasai-026.js","variable":"nasaiChapter026","chapterId":26,"title":"The Book of Marriage"},{"file":"nasai-027.js","variable":"nasaiChapter027","chapterId":27,"title":"The Book of Divorce"},{"file":"nasai-028.js","variable":"nasaiChapter028","chapterId":28,"title":"The Book of Horses, Races and Shooting"},{"file":"nasai-029.js","variable":"nasaiChapter029","chapterId":29,"title":"The Book of Endowments"},{"file":"nasai-030.js","variable":"nasaiChapter030","chapterId":30,"title":"The Book of Wills"},{"file":"nasai-031.js","variable":"nasaiChapter031","chapterId":31,"title":"The Book of Presents"},{"file":"nasai-032.js","variable":"nasaiChapter032","chapterId":32,"title":"The Book of Gifts"},{"file":"nasai-033.js","variable":"nasaiChapter033","chapterId":33,"title":"The Book of ar-Ruqba"},{"file":"nasai-034.js","variable":"nasaiChapter034","chapterId":34,"title":"The Book of 'Umra"},{"file":"nasai-035.js","variable":"nasaiChapter035","chapterId":35,"title":"The Book of Oaths and Vows"},{"file":"nasai-036.js","variable":"nasaiChapter036","chapterId":36,"title":"The Book of the Kind Treatment of Women"},{"file":"nasai-037.js","variable":"nasaiChapter037","chapterId":37,"title":"The Book of Fighting [The Prohibition of Bloodshed]"},{"file":"nasai-038.js","variable":"nasaiChapter038","chapterId":38,"title":"The Book of Distribution of Al-Fay'"},{"file":"nasai-039.js","variable":"nasaiChapter039","chapterId":39,"title":"The Book of al-Bay'ah"},{"file":"nasai-040.js","variable":"nasaiChapter040","chapterId":40,"title":"The Book of al-'Aqiqah"},{"file":"nasai-041.js","variable":"nasaiChapter041","chapterId":41,"title":"The Book of al-Fara' and al-'Atirah"},{"file":"nasai-042.js","variable":"nasaiChapter042","chapterId":42,"title":"The Book of Hunting and Slaughtering"},{"file":"nasai-043.js","variable":"nasaiChapter043","chapterId":43,"title":"The Book of ad-Dahaya (Sacrifices)"},{"file":"nasai-044.js","variable":"nasaiChapter044","chapterId":44,"title":"The Book of Financial Transactions"},{"file":"nasai-045.js","variable":"nasaiChapter045","chapterId":45,"title":"The Book of Oaths (qasamah), Retaliation and Blood Money"},{"file":"nasai-046.js","variable":"nasaiChapter046","chapterId":46,"title":"The Book of Cutting off the Hand of the Thief"},{"file":"nasai-047.js","variable":"nasaiChapter047","chapterId":47,"title":"The Book Of Faith and its Signs"},{"file":"nasai-048.js","variable":"nasaiChapter048","chapterId":48,"title":"The Book of Adornment"},{"file":"nasai-049.js","variable":"nasaiChapter049","chapterId":49,"title":"The Book of the Etiquette of Judges"},{"file":"nasai-050.js","variable":"nasaiChapter050","chapterId":50,"title":"The Book of Seeking Refuge with Allah"},{"file":"nasai-051.js","variable":"nasaiChapter051","chapterId":51,"title":"The Book of Drinks"},{"file":"nasai-9999.js","variable":"nasaiChapter9999","chapterId":9999,"title":"The Book of Agriculture"}]},{"id":"ibnmajah","title":"Sunan Ibn Majah","arabicTitle":"سنن ابن ماجه","description":"Browse the collection by chapter and narration.","chapterCount":38,"chapters":[{"file":"ibnmajah-000.js","variable":"ibnmajahChapter000","chapterId":0,"title":"The Book of the Sunnah"},{"file":"ibnmajah-001.js","variable":"ibnmajahChapter001","chapterId":1,"title":"The Book of Purification and its Sunnah"},{"file":"ibnmajah-002.js","variable":"ibnmajahChapter002","chapterId":2,"title":"The Book of the Prayer"},{"file":"ibnmajah-003.js","variable":"ibnmajahChapter003","chapterId":3,"title":"The Book of the Adhan and the Sunnah Regarding It"},{"file":"ibnmajah-004.js","variable":"ibnmajahChapter004","chapterId":4,"title":"The Book On The Mosques And The Congregations"},{"file":"ibnmajah-005.js","variable":"ibnmajahChapter005","chapterId":5,"title":"Establishing the Prayer and the Sunnah Regarding Them"},{"file":"ibnmajah-006.js","variable":"ibnmajahChapter006","chapterId":6,"title":"Chapters Regarding Funerals"},{"file":"ibnmajah-007.js","variable":"ibnmajahChapter007","chapterId":7,"title":"Fasting"},{"file":"ibnmajah-008.js","variable":"ibnmajahChapter008","chapterId":8,"title":"The Chapters Regarding Zakat"},{"file":"ibnmajah-009.js","variable":"ibnmajahChapter009","chapterId":9,"title":"The Chapters on Marriage"},{"file":"ibnmajah-010.js","variable":"ibnmajahChapter010","chapterId":10,"title":"The Chapters on Divorce"},{"file":"ibnmajah-011.js","variable":"ibnmajahChapter011","chapterId":11,"title":"The Chapters on Expiation"},{"file":"ibnmajah-012.js","variable":"ibnmajahChapter012","chapterId":12,"title":"The Chapters on Business Transactions"},{"file":"ibnmajah-013.js","variable":"ibnmajahChapter013","chapterId":13,"title":"The Chapters on Rulings"},{"file":"ibnmajah-014.js","variable":"ibnmajahChapter014","chapterId":14,"title":"The Chapters on Gifts"},{"file":"ibnmajah-015.js","variable":"ibnmajahChapter015","chapterId":15,"title":"The Chapters on Charity"},{"file":"ibnmajah-016.js","variable":"ibnmajahChapter016","chapterId":16,"title":"The Chapters on Pawning"},{"file":"ibnmajah-017.js","variable":"ibnmajahChapter017","chapterId":17,"title":"The Chapters on Pre-emption"},{"file":"ibnmajah-018.js","variable":"ibnmajahChapter018","chapterId":18,"title":"The Chapters on Lost Property"},{"file":"ibnmajah-019.js","variable":"ibnmajahChapter019","chapterId":19,"title":"The Chapters on Manumission (of Slaves)"},{"file":"ibnmajah-020.js","variable":"ibnmajahChapter020","chapterId":20,"title":"The Chapters on Legal Punishments"},{"file":"ibnmajah-021.js","variable":"ibnmajahChapter021","chapterId":21,"title":"The Chapters on Blood Money"},{"file":"ibnmajah-022.js","variable":"ibnmajahChapter022","chapterId":22,"title":"The Chapters on Wills"},{"file":"ibnmajah-023.js","variable":"ibnmajahChapter023","chapterId":23,"title":"Chapters on Shares of Inheritance"},{"file":"ibnmajah-024.js","variable":"ibnmajahChapter024","chapterId":24,"title":"The Chapters on Jihad"},{"file":"ibnmajah-025.js","variable":"ibnmajahChapter025","chapterId":25,"title":"Chapters on Hajj Rituals"},{"file":"ibnmajah-026.js","variable":"ibnmajahChapter026","chapterId":26,"title":"Chapters on Sacrifices"},{"file":"ibnmajah-027.js","variable":"ibnmajahChapter027","chapterId":27,"title":"Chapters on Slaughtering"},{"file":"ibnmajah-028.js","variable":"ibnmajahChapter028","chapterId":28,"title":"Chapters on Hunting"},{"file":"ibnmajah-029.js","variable":"ibnmajahChapter029","chapterId":29,"title":"Chapters on Food"},{"file":"ibnmajah-030.js","variable":"ibnmajahChapter030","chapterId":30,"title":"Chapters on Drinks"},{"file":"ibnmajah-031.js","variable":"ibnmajahChapter031","chapterId":31,"title":"Chapters on Medicine"},{"file":"ibnmajah-032.js","variable":"ibnmajahChapter032","chapterId":32,"title":"Chapters on Dress"},{"file":"ibnmajah-033.js","variable":"ibnmajahChapter033","chapterId":33,"title":"Etiquette"},{"file":"ibnmajah-034.js","variable":"ibnmajahChapter034","chapterId":34,"title":"Supplication"},{"file":"ibnmajah-035.js","variable":"ibnmajahChapter035","chapterId":35,"title":"Interpretation of Dreams"},{"file":"ibnmajah-036.js","variable":"ibnmajahChapter036","chapterId":36,"title":"Tribulations"},{"file":"ibnmajah-037.js","variable":"ibnmajahChapter037","chapterId":37,"title":"Zuhd"}]}]};
  const HADITH_BASE = "data/hadith/chapters/";
  let activeHadithBook = null;
  let activeHadithChapter = null;
  let activeHadithData = null;
  let hadithLoadToken = 0;
  let hadithEnglishOnly = localStorage.getItem("noor-hadith-english-only") === "true";
  const hadithScriptCache = new Set();

  function hadithRefLabel(item) {
    const refs = Array.isArray(item.refs) ? item.refs : [];
    if (!refs.length) return "Reference unavailable";
    return refs.map((ref) => {
      const number = ref.numberEnd ? `${ref.number}–${ref.numberEnd}` : String(ref.number ?? "");
      return `${number}${ref.suffix || ""}`;
    }).join(" · ");
  }

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
  }

  function loadHadithChapter(book, chapter) {
    return new Promise((resolve, reject) => {
      const existing = window[chapter.variable];
      if (existing && Array.isArray(existing.hadiths)) {
        resolve(existing);
        return;
      }
      const script = document.createElement("script");
      script.src = HADITH_BASE + chapter.file;
      script.onload = () => {
        const data = window[chapter.variable];
        if (data && Array.isArray(data.hadiths)) resolve(data);
        else reject(new Error("The chapter data format could not be recognised."));
      };
      script.onerror = () => reject(new Error("Could not load chapter data. Please run this website through VS Code Live Server."));
      document.head.appendChild(script);
    });
  }

  function renderHadithLanding(message = "") {
    activeHadithBook = null;
    activeHadithChapter = null;
    activeHadithData = null;
    const cards = HADITH_MANIFEST.books.map((book, index) => `
      <button class="hadith-book-card" type="button" data-book="${book.id}">
        <span class="hadith-book-number">${String(index + 1).padStart(2, "0")}</span>
        <span class="hadith-book-arabic" lang="ar" dir="rtl">${escapeHtml(book.arabicTitle)}</span>
        <strong>${escapeHtml(book.title)}</strong>
        <small>${book.chapterCount} chapters · Open collection</small>
        <span class="hadith-book-arrow">↗</span>
      </button>`).join("");
    sectionView.innerHTML = `
      <div class="section-page hadith-page">
        <div class="breadcrumbs"><button type="button" data-go-home>Home</button><span>／</span><span>Hadith Library</span></div>
        <header class="section-hero hadith-hero">
          <div class="eyebrow"><span class="eyebrow-line"></span> LEARN · VERIFY · APPLY</div>
          <h1>Hadith Library<br><em>prophetic wisdom.</em></h1>
          <p>Explore all available chapters and narrations in the six supplied collections. Select a collection to open its own reading page.</p>
          <div class="hadith-stats"><span><strong>6</strong><small>Collections</small></span><span><strong>336</strong><small>Chapter files</small></span><span><strong>Arabic + English</strong><small>Source fields</small></span></div>
        </header>
        <div class="section-content-heading"><h2>Choose a collection</h2><p>Each collection opens on a separate reading page. Chapters load only when selected.</p></div>
        <div class="hadith-book-grid">${cards}</div>
        ${message ? `<div class="section-notice"><span class="notice-icon">✧</span><div>${escapeHtml(message)}</div></div>` : ""}
      </div>`;
    sectionView.querySelector("[data-go-home]")?.addEventListener("click", goHome);
    sectionView.querySelectorAll("[data-book]").forEach((button) => {
      button.addEventListener("click", () => {
        const selectedBook = HADITH_MANIFEST.books.find((book) => book.id === button.dataset.book);
        if (!selectedBook) return;
        window.noorNavigationLoader?.show();
        activeHadithBook = selectedBook;
        activeHadithChapter = selectedBook.chapters[0];
        activeHadithData = null;
        history.pushState({ hadithBook: selectedBook.id }, "", `#hadith/${selectedBook.id}`);
        renderHadithCollectionPage();
        loadAndRenderHadithChapter();
        window.scrollTo({ top: 0, behavior: "instant" });
      });
    });
    window.noorNavigationLoader?.finish();
  }

  function renderHadithCollectionPage() {
    if (!activeHadithBook) return renderHadithLanding();
    sectionView.innerHTML = `
      <div class="section-page hadith-page hadith-collection-page">
        <div class="breadcrumbs"><button type="button" id="backToHadithCollections">← All collections</button><span>／</span><span>${escapeHtml(activeHadithBook.title)}</span></div>
        <header class="section-hero hadith-hero hadith-collection-hero">
          <div class="eyebrow"><span class="eyebrow-line"></span> SELECTED COLLECTION</div>
          <h1>${escapeHtml(activeHadithBook.title)}<br><em>prophetic wisdom.</em></h1>
          <p>${activeHadithBook.chapterCount} chapters · Arabic text, English translation and source references.</p>
          <p class="hadith-arabic-title" lang="ar" dir="rtl">${escapeHtml(activeHadithBook.arabicTitle)}</p>
        </header>
        <div class="hadith-reader-panel hadith-reader-panel-page">${hadithReaderShell(activeHadithBook)}</div>
      </div>`;
    document.getElementById("backToHadithCollections")?.addEventListener("click", () => {
      window.noorNavigationLoader?.show();
      activeHadithBook = null;
      activeHadithChapter = null;
      activeHadithData = null;
      history.pushState(null, "", "#hadith");
      renderHadithLanding();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
    wireHadithReaderControls();
  }

  function hadithReaderShell(book) {
    const options = book.chapters.map((chapter, index) =>
      `<option value="${index}" ${activeHadithChapter?.file === chapter.file ? "selected" : ""}>${String(chapter.chapterId).padStart(2, "0")} · ${escapeHtml(chapter.title)}</option>`
    ).join("");
    return `<div class="hadith-reader-head">
      <div><div class="eyebrow"><span class="eyebrow-line"></span> SELECTED COLLECTION</div><h2>${escapeHtml(book.title)}</h2><p class="hadith-arabic-title" lang="ar" dir="rtl">${escapeHtml(book.arabicTitle)}</p></div>
      <button class="button button-secondary hadith-saved-button" type="button" id="showHadithSaved">⚑ Saved Hadith</button>
    </div>
    <div class="hadith-controls">
      <label>Book / chapter<select id="hadithChapterSelect">${options}</select></label>
      <label>Search this chapter<input id="hadithSearchInput" type="search" placeholder="Search English or Arabic text…"></label>
      <label class="hadith-language-toggle"><span>Display language</span><select id="hadithLanguageMode"><option value="both" ${hadithEnglishOnly ? "" : "selected"}>Arabic + English</option><option value="english" ${hadithEnglishOnly ? "selected" : ""}>English only</option></select></label>
    </div>
    <div class="hadith-results-meta" id="hadithResultsMeta">Loading selected chapter…</div>
    <div id="hadithResults" class="hadith-results"><div class="section-empty-state"><p>Loading chapter…</p></div></div>
    <nav class="hadith-pagination" aria-label="Chapter navigation"><button type="button" class="button button-secondary hadith-chapter-nav" id="hadithPrevious" ${activeHadithBook.chapters.findIndex((chapter) => chapter.file === activeHadithChapter?.file) <= 0 ? "disabled" : ""}>← Previous chapter</button><span class="hadith-chapter-position">Chapter ${activeHadithBook.chapters.findIndex((chapter) => chapter.file === activeHadithChapter?.file) + 1} of ${activeHadithBook.chapters.length}</span><button type="button" class="button button-secondary hadith-chapter-nav" id="hadithNext" ${activeHadithBook.chapters.findIndex((chapter) => chapter.file === activeHadithChapter?.file) >= activeHadithBook.chapters.length - 1 ? "disabled" : ""}>Next chapter →</button></nav>`;
  }

  function loadAndRenderHadithChapter() {
    window.noorNavigationLoader?.show();
    const loaderStartedAt = Date.now();
    const finishHadithLoader = () => {
      const remaining = Math.max(0, 500 - (Date.now() - loaderStartedAt));
      window.setTimeout(() => {
        if (token === hadithLoadToken) window.noorNavigationLoader?.finish();
      }, remaining);
    };
    if (!activeHadithBook || !activeHadithChapter) return;
    const token = ++hadithLoadToken;
    const results = document.getElementById("hadithResults");
    const meta = document.getElementById("hadithResultsMeta");
    if (results) results.innerHTML = `<div class="section-empty-state"><p>Loading chapter data…</p></div>`;
    if (meta) meta.textContent = "Loading…";
    loadHadithChapter(activeHadithBook, activeHadithChapter).then((data) => {
      if (token !== hadithLoadToken) return;
      activeHadithData = data;
      renderHadithEntries();
      finishHadithLoader();
    }).catch((error) => {
      if (token !== hadithLoadToken) return;
      if (results) results.innerHTML = `<div class="section-empty-state"><h3>Chapter could not be loaded</h3><p>${escapeHtml(error.message)}</p></div>`;
      if (meta) meta.textContent = "Please check the project files.";
      finishHadithLoader();
    });
  }

  function hadithSavedItems() {
    try { return JSON.parse(localStorage.getItem("noorSavedHadiths") || "[]"); }
    catch { return []; }
  }

  function renderHadithEntries(showSaved = false) {
    const results = document.getElementById("hadithResults");
    const meta = document.getElementById("hadithResultsMeta");
    if (!results || !activeHadithBook) return;
    const query = (document.getElementById("hadithSearchInput")?.value || "").trim().toLowerCase();
    let entries = activeHadithData?.hadiths || [];
    if (showSaved) {
      entries = hadithSavedItems().filter((item) => item.bookId === activeHadithBook.id);
      meta.textContent = `${entries.length} saved narration(s) in ${activeHadithBook.title}`;
    } else {
      if (query) entries = entries.filter((item) => [item.arabic, item.english, item.narrator, item.grade, hadithRefLabel(item)].join(" ").toLowerCase().includes(query));
      meta.textContent = `${entries.length} narration(s)${query ? " matching your search" : " in this chapter"}`;
    }
    if (!entries.length) {
      results.innerHTML = `<div class="section-empty-state"><div class="empty-icon">⌕</div><h3>No narrations found</h3><p>Try another search term or choose a different chapter.</p></div>`;
      return;
    }
    results.innerHTML = entries.map((item, index) => {
      const ref = hadithRefLabel(item);
      const saved = hadithSavedItems().some((savedItem) => savedItem.key === `${activeHadithBook.id}|${activeHadithChapter?.file || "saved"}|${ref}`);
      const grade = item.grade ? `<span class="hadith-grade">${escapeHtml(item.grade)}</span>` : "";
      const narratorText = String(item.narrator || "").replace(/\s+/g, " ").trim();
      const englishText = String(item.english || "").replace(/\s+/g, " ").trim();
      return `<article class="hadith-entry">
        <div class="hadith-entry-top"><span class="hadith-ref">${escapeHtml(activeHadithBook.title)} · Hadith ${escapeHtml(ref)}</span><button type="button" class="hadith-save-button ${saved ? "is-saved" : ""}" data-save-hadith="${index}" aria-label="${saved ? "Remove saved hadith" : "Save hadith"}" title="${saved ? "Saved" : "Save hadith"}">${saved ? "⚑ Saved" : "⚑ Save"}</button></div>
        ${narratorText ? `<p class="hadith-narrator">${escapeHtml(narratorText)}</p>` : ""}
        ${hadithEnglishOnly ? "" : `<p class="hadith-arabic" lang="ar" dir="rtl">${escapeHtml(item.arabic || "Arabic text unavailable in this record.")}</p>`}
        ${englishText ? `<p class="hadith-english">${escapeHtml(englishText)}</p>` : `<p class="hadith-english hadith-missing">English translation is not available in this record.</p>`}
        <div class="hadith-entry-footer"><span>Source reference: ${escapeHtml(ref)}</span>${grade}</div>
      </article>`;
    }).join("");
    results.querySelectorAll("[data-save-hadith]").forEach((button) => {
      button.addEventListener("click", () => {
        const item = entries[Number(button.dataset.saveHadith)];
        const ref = hadithRefLabel(item);
        const key = `${activeHadithBook.id}|${activeHadithChapter?.file || "saved"}|${ref}`;
        let saved = hadithSavedItems();
        const existing = saved.findIndex((savedItem) => savedItem.key === key);
        if (existing >= 0) saved.splice(existing, 1);
        else saved.push({key, bookId: activeHadithBook.id, bookTitle: activeHadithBook.title, chapterFile: activeHadithChapter?.file || "", chapterTitle: activeHadithChapter?.title || "", ref, narrator: item.narrator || "", arabic: item.arabic || "", english: item.english || "", grade: item.grade || ""});
        localStorage.setItem("noorSavedHadiths", JSON.stringify(saved));
        renderHadithEntries(showSaved);
      });
    });
  }

  function wireHadithReaderControls() {
    const select = document.getElementById("hadithChapterSelect");
    const search = document.getElementById("hadithSearchInput");
    select?.addEventListener("change", () => {
      activeHadithChapter = activeHadithBook.chapters[Number(select.value)];
      activeHadithData = null;
      loadAndRenderHadithChapter();
    });
    search?.addEventListener("input", () => renderHadithEntries());
    document.getElementById("hadithLanguageMode")?.addEventListener("change", (event) => {
      hadithEnglishOnly = event.target.value === "english";
      localStorage.setItem("noor-hadith-english-only", String(hadithEnglishOnly));
      renderHadithEntries();
    });
    document.getElementById("hadithPrevious")?.addEventListener("click", () => { window.noorNavigationLoader?.show(); changeHadithChapter(-1); });
    document.getElementById("hadithNext")?.addEventListener("click", () => { window.noorNavigationLoader?.show(); changeHadithChapter(1); });
    document.getElementById("showHadithSaved")?.addEventListener("click", () => {
      const saved = hadithSavedItems().filter((item) => item.bookId === activeHadithBook.id);
      const results = document.getElementById("hadithResults");
      const meta = document.getElementById("hadithResultsMeta");
      if (!saved.length) {
        if (meta) meta.textContent = "No saved narrations yet.";
        if (results) results.innerHTML = `<div class="section-empty-state"><h3>No saved Hadith yet</h3><p>Use the “Save” control on a narration to keep it here on this device.</p></div>`;
        return;
      }
      if (meta) meta.textContent = `${saved.length} saved narration(s) in ${activeHadithBook.title}`;
      if (results) results.innerHTML = saved.map((item) => `<article class="hadith-entry"><div class="hadith-entry-top"><span class="hadith-ref">${escapeHtml(item.bookTitle)} · Hadith ${escapeHtml(item.ref)}</span><button type="button" class="hadith-save-button is-saved" data-remove-saved="${escapeHtml(item.key)}">⚑ Remove</button></div><p class="hadith-narrator">${escapeHtml(item.narrator)}</p><p class="hadith-arabic" lang="ar" dir="rtl">${escapeHtml(item.arabic)}</p><p class="hadith-english">${escapeHtml(item.english)}</p><div class="hadith-entry-footer"><span>${escapeHtml(item.chapterTitle)}</span>${item.grade ? `<span class="hadith-grade">${escapeHtml(item.grade)}</span>` : ""}</div></article>`).join("");
      results.querySelectorAll("[data-remove-saved]").forEach((button) => button.addEventListener("click", () => {
        const savedNow = hadithSavedItems().filter((item) => item.key !== button.dataset.removeSaved);
        localStorage.setItem("noorSavedHadiths", JSON.stringify(savedNow));
        button.closest(".hadith-entry")?.remove();
        if (meta) meta.textContent = `${savedNow.filter((item) => item.bookId === activeHadithBook.id).length} saved narration(s)`;
      }));
    });
  }

  function changeHadithChapter(direction) {
    if (!activeHadithBook || !activeHadithChapter) return;
    const index = activeHadithBook.chapters.findIndex((chapter) => chapter.file === activeHadithChapter.file);
    const next = Math.max(0, Math.min(activeHadithBook.chapters.length - 1, index + direction));
    activeHadithChapter = activeHadithBook.chapters[next];
    activeHadithData = null;
    const select = document.getElementById("hadithChapterSelect");
    if (select) select.value = String(next);
    const search = document.getElementById("hadithSearchInput");
    if (search) search.value = "";
    const pagination = document.querySelector(".hadith-pagination");
    if (pagination) pagination.outerHTML = `<nav class="hadith-pagination" aria-label="Chapter navigation"><button type="button" class="button button-secondary hadith-chapter-nav" id="hadithPrevious" ${next <= 0 ? "disabled" : ""}>← Previous chapter</button><span class="hadith-chapter-position">Chapter ${next + 1} of ${activeHadithBook.chapters.length}</span><button type="button" class="button button-secondary hadith-chapter-nav" id="hadithNext" ${next >= activeHadithBook.chapters.length - 1 ? "disabled" : ""}>Next chapter →</button></nav>`;
    document.getElementById("hadithPrevious")?.addEventListener("click", () => { window.noorNavigationLoader?.show(); changeHadithChapter(-1); });
    document.getElementById("hadithNext")?.addEventListener("click", () => { window.noorNavigationLoader?.show(); changeHadithChapter(1); });
    loadAndRenderHadithChapter();
  }

  function renderSection(key) {
    const data = sections[key];
    if (!data) return;
    if (key === "quran") {
      homeView.hidden = true;
      sectionView.hidden = false;
      renderQuranLanding();
      nav.querySelectorAll("a,button.nav-link").forEach((item) => item.classList.remove("active"));
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (key === "hadith") {
      homeView.hidden = true;
      sectionView.hidden = false;
      renderHadithLanding();
      nav.querySelectorAll("a,button.nav-link").forEach((item) => item.classList.remove("active"));
      nav.querySelector('a[href="#hadith"]')?.classList.add("active");
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (window.renderNoorStep4 && window.renderNoorStep4(key)) {
      homeView.hidden = true;
      sectionView.hidden = false;
      nav.querySelectorAll("a,button.nav-link").forEach((item) => item.classList.remove("active"));
      const activeTarget = nav.querySelector(`[href="#${key}"]`);
      if (activeTarget) activeTarget.classList.add("active");
      closeMobileMenu();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    homeView.hidden = true;
    sectionView.hidden = false;
    const tiles = data.tiles.map(tileMarkup).join("");
    sectionView.innerHTML = `
      <div class="section-page">
        <div class="breadcrumbs"><button type="button" data-go-home>Home</button><span>／</span><span>${data.title}</span></div>
        <header class="section-hero">
          <div class="eyebrow"><span class="eyebrow-line"></span>${data.kicker}</div>
          <h1>${data.title}<br><em>${data.emphasis}</em></h1>
          <p>${data.description}</p>
          ${key === "quran" || key === "hadith" ? `<form class="section-search-row" id="sectionSearchForm"><label class="visually-hidden" for="sectionSearchInput">Search ${data.title}</label><input id="sectionSearchInput" type="search" placeholder="${key === "quran" ? "Search Surah, ayah or translation..." : "Search collection, chapter or narration..."}"><button class="button button-primary" type="submit">Search <span>↗</span></button></form>` : ""}
          ${key === "quran" ? `<div class="section-filter-row"><button class="section-filter active" type="button">All Surahs</button><button class="section-filter" type="button">Meccan</button><button class="section-filter" type="button">Medinan</button><button class="section-filter" type="button">Juz index</button></div>` : ""}
        </header>
        <div class="section-content-heading"><h2>${key === "quran" ? "Reading options" : key === "hadith" ? "Browse collections" : key === "tools" ? "Choose a tool" : "Explore this section"}</h2><p>Designed for clear reading and easy navigation.</p></div>
        <div class="section-tile-grid">${tiles}</div>
        <div class="section-notice"><span class="notice-icon">✧</span><div><strong>About this section</strong><br>${data.notice}</div></div>
      </div>`;
    sectionView.querySelector("[data-go-home]").addEventListener("click", goHome);
    sectionView.querySelectorAll(".section-tile").forEach((button) => {
      button.addEventListener("click", () => {
        const tile = data.tiles[Number(button.dataset.tile)];
        showToast(`${tile[0]} layout is planned for the next functionality steps.`);
      });
    });
    sectionView.querySelectorAll(".section-filter").forEach((button) => {
      button.addEventListener("click", () => {
        sectionView.querySelectorAll(".section-filter").forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        showToast(`${button.textContent.trim()} view will be connected when Quran data is added.`);
      });
    });
    const sectionSearchForm = document.getElementById("sectionSearchForm");
    if (sectionSearchForm) {
      sectionSearchForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = document.getElementById("sectionSearchInput").value.trim();
        showToast(value ? `Search for “${value}” will work after the dataset is connected.` : "Enter a search term first.");
      });
    }
    nav.querySelectorAll("a,button.nav-link").forEach((item) => item.classList.remove("active"));
    const target = nav.querySelector(`[href="#${key}"]`);
    if (target) target.classList.add("active");
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goHome() {
    homeView.hidden = false;
    sectionView.hidden = true;
    history.pushState(null, "", "#home");
    nav.querySelectorAll("a,button.nav-link").forEach((item) => item.classList.remove("active"));
    nav.querySelector('a[href="#home"]')?.classList.add("active");
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navigateFromHash() {
    const rawHash = window.location.hash.replace("#", "") || "home";
    const hadithRoute = rawHash.match(/^hadith\/([a-z0-9_-]+)$/i);
    if (hadithRoute) {
      const book = HADITH_MANIFEST.books.find((item) => item.id === hadithRoute[1]);
      if (book) {
        homeView.hidden = true;
        sectionView.hidden = false;
        activeHadithBook = book;
        activeHadithChapter = book.chapters[0];
        activeHadithData = null;
        renderHadithCollectionPage();
        loadAndRenderHadithChapter();
        return;
      }
    }
    const key = rawHash;
    if (key === "home") {
      homeView.hidden = false;
      sectionView.hidden = true;
      return;
    }
    if (sections[key]) renderSection(key);
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    const key = link.getAttribute("href").slice(1);
    if (sections[key]) {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        history.pushState(null, "", `#${key}`);
        renderSection(key);
      });
    } else if (key === "home") {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        goHome();
      });
    } else {
      link.addEventListener("click", () => closeMobileMenu());
    }
  });

  window.addEventListener("popstate", navigateFromHash);
  window.addEventListener("hashchange", navigateFromHash);

  function openSearch() {
    searchOverlay.hidden = false;
    document.body.style.overflow = "hidden";
    searchFeedback.textContent = "";
    window.setTimeout(() => searchInput.focus(), 30);
  }

  function closeSearch() {
    searchOverlay.hidden = true;
    document.body.style.overflow = "";
    searchOpen.focus();
  }

  searchOpen.addEventListener("click", openSearch);
  searchClose.addEventListener("click", closeSearch);
  searchOverlay.addEventListener("click", (event) => {
    if (event.target === searchOverlay) closeSearch();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (!searchOverlay.hidden) closeSearch();
      closeDropdowns();
      closeMobileMenu();
    }
  });

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (!query) {
      searchFeedback.textContent = "Enter a word or topic to continue.";
      searchInput.focus();
      return;
    }
    searchFeedback.textContent = `“${query}” search will be connected when Quran and Hadith content is added.`;
  });

  document.querySelectorAll(".search-suggestions a").forEach((link) => {
    link.addEventListener("click", () => closeSearch());
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    window.setTimeout(() => toast.classList.remove("show"), 2600);
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMobileMenu();
  });

  navigateFromHash();
})();
