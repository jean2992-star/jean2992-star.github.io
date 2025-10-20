document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================
     🔤 1. WORD OF THE DAY (API + fallback)
  ========================================== */
  const wordEl = document.getElementById("word");
  const definitionEl = document.getElementById("definition");
  const exampleEl = document.getElementById("example");
  const audioBtn = document.getElementById("audio-btn");

  const localWords = [
    { word: "growth", definition: "The process of increasing in size or maturity.", example: "Personal growth comes from challenges." },
    { word: "focus", definition: "The center of interest or activity.", example: "Stay focused on your goals." },
    { word: "courage", definition: "The ability to do something that frightens you.", example: "He showed great courage under pressure." },
    { word: "gratitude", definition: "The quality of being thankful.", example: "She expressed gratitude for the support." },
    { word: "achieve", definition: "To successfully bring about a desired goal.", example: "He achieved his dream of becoming a pilot." }
  ];

  const todayWord = localWords[new Date().getDate() % localWords.length];

  async function loadWordOfTheDay() {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${todayWord.word}`);
      const data = await res.json();
      const entry = data[0];
      const meaning = entry.meanings[0].definitions[0];
      const audio = entry.phonetics.find(p => p.audio)?.audio;

      wordEl.textContent = entry.word;
      definitionEl.textContent = meaning.definition;
      exampleEl.textContent = meaning.example ? `"${meaning.example}"` : "";
      audioBtn.onclick = () => {
        if (audio) new Audio(audio).play();
      };
    } catch {
      wordEl.textContent = todayWord.word;
      definitionEl.textContent = todayWord.definition;
      exampleEl.textContent = `"${todayWord.example}"`;
      audioBtn.onclick = () => alert("🔊 No audio available offline.");
    }
  }
  loadWordOfTheDay();

  /* ==========================================
     🔎 2. VOCABULARY SEARCH (API)
  ========================================== */
  const searchInput = document.getElementById("searchWord");
  const searchBtn = document.getElementById("searchBtn");
  const resultBox = document.getElementById("result");

  searchBtn.addEventListener("click", async () => {
    const word = searchInput.value.trim();
    if (!word) {
      resultBox.innerHTML = "<p>Please enter a word.</p>";
      return;
    }

    resultBox.innerHTML = `<p>⏳ Searching for "${word}"...</p>`;

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await res.json();
      const entry = data[0];
      const meaning = entry.meanings[0].definitions[0];
      const audio = entry.phonetics.find(p => p.audio)?.audio;

      resultBox.innerHTML = `
        <h3>${entry.word}</h3>
        <p><b>Definition:</b> ${meaning.definition}</p>
        ${meaning.example ? `<p><b>Example:</b> "${meaning.example}"</p>` : ""}
        ${audio ? `<button id="audioPlay">🔊 Hear Pronunciation</button>` : ""}
      `;
      const playBtn = document.getElementById("audioPlay");
      if (playBtn) playBtn.addEventListener("click", () => new Audio(audio).play());
    } catch (err) {
      console.error(err);
      resultBox.innerHTML = `<p style="color:red;">⚠️ No result found for "${word}". Try another word.</p>`;
    }
  });

  /* ==========================================
     💬 3. EXPRESSIONS OF THE WEEK (Dynamic)
  ========================================== */
  const expressions = [
    ["Break the ice", "To start a conversation in a social situation."],
    ["Hit the books", "To study hard."],
    ["Piece of cake", "Something very easy to do."],
    ["Once in a blue moon", "Something that happens rarely."],
    ["Speak of the devil", "When the person you’re talking about appears."],
    ["Cut corners", "Do something the easiest or cheapest way."],
    ["Bite the bullet", "To face a difficult situation with courage."],
    ["Under the weather", "Feeling ill or sick."],
    ["Spill the beans", "Reveal a secret."],
    ["Pull someone's leg", "To joke or tease someone."]
  ];

  const exprContainer = document.getElementById("expression-list");
  function loadExpressions() {
    exprContainer.innerHTML = "";
    const shuffled = [...expressions].sort(() => 0.5 - Math.random()).slice(0, 5);
    shuffled.forEach(([term, meaning]) => {
      const p = document.createElement("p");
      p.innerHTML = `<b>${term}</b> — ${meaning}`;
      exprContainer.appendChild(p);
    });
  }
  loadExpressions();

  /* ==========================================
     🧩 4. GRAMMAR TIPS (Dynamic)
  ========================================== */
  const grammarTips = [
    ["Do vs Make", "Use <b>do</b> for actions (do homework) and <b>make</b> for creating (make a cake)."],
    ["Some vs Any", "Use <b>some</b> in positive sentences and <b>any</b> in negatives or questions."],
    ["Since vs For", "Use <b>since</b> for start points (since 2020) and <b>for</b> for durations (for 2 years)."],
    ["Much vs Many", "Use <b>much</b> with uncountable nouns, and <b>many</b> with countable nouns."],
    ["In, On, At", "Use <b>in</b> for months/years, <b>on</b> for days, and <b>at</b> for exact times."],
    ["Who vs Whom", "Use <b>who</b> as subject and <b>whom</b> as object."],
    ["Will vs Going to", "Use <b>will</b> for decisions made now, and <b>going to</b> for planned actions."]
  ];

  const grammarSection = document.getElementById("grammar");
  function loadGrammarTips() {
    const selected = [...grammarTips].sort(() => 0.5 - Math.random()).slice(0, 3);
    grammarSection.innerHTML = "<h2>🧩 Grammar Tips</h2>";
    selected.forEach(([title, text]) => {
      const d = document.createElement("details");
      const s = document.createElement("summary");
      s.textContent = title;
      const p = document.createElement("p");
      p.innerHTML = text;
      d.appendChild(s);
      d.appendChild(p);
      grammarSection.appendChild(d);
    });
  }
  loadGrammarTips();

  /* ==========================================
     ⏱️ 5. FOCUS TIMER (Pomodoro)
  ========================================== */
  const timeDisplay = document.getElementById("time");
  const startBtn = document.getElementById("startTimer");
  const resetBtn = document.getElementById("resetTimer");

  let timer;
  let timeLeft = 25 * 60;
  let running = false;

  function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    if (running) return;
    running = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimer();
      } else {
        clearInterval(timer);
        running = false;
        alert("🎉 Time's up! Take a 5-minute break!");
      }
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timer);
    running = false;
    timeLeft = 25 * 60;
    updateTimer();
  }

  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  updateTimer();

  /* ==========================================
     🌙 6. THEME SYNC
  ========================================== */
  const themeToggle = document.getElementById("theme-toggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️ Light Mode";
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const dark = document.body.classList.contains("dark");
    themeToggle.textContent = dark ? "☀️ Light Mode" : "🌙 Dark Mode";
    localStorage.setItem("theme", dark ? "dark" : "light");
  });

  /* ==========================================
     🎯 7. SMOOTH SCROLL FOR MENU
  ========================================== */
  document.querySelectorAll(".sidebar a").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
});
