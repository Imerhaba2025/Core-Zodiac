const form = document.querySelector("#videoForm");
const sourceGroup = document.querySelector("#sourceGroup");
const sourceInput = document.querySelector("#sourceInput");
const promptInput = document.querySelector("#promptInput");
const videoType = document.querySelector("#videoType");
const toneInput = document.querySelector("#toneInput");
const voiceInput = document.querySelector("#voiceInput");
const qualityInput = document.querySelector("#qualityInput");
const outputTitle = document.querySelector("#outputTitle");
const qualityPill = document.querySelector("#qualityPill");
const scriptOutput = document.querySelector("#scriptOutput");
const sceneList = document.querySelector("#sceneList");
const exportStrip = document.querySelector("#exportStrip");

const modeCopy = {
  url: {
    label: "Source URL or feed URL",
    placeholder: "https://example.com/product-launch",
    defaultPrompt: "Transform the source page into a polished launch video for buyers who need fast proof.",
  },
  prompt: {
    label: "Reference URL (optional)",
    placeholder: "https://example.com/brand-guidelines",
    defaultPrompt: "Create a premium marketing video for a new AI productivity tool aimed at startup founders.",
  },
  blank: {
    label: "Asset folder or inspiration URL (optional)",
    placeholder: "Paste a moodboard, product page, or leave blank",
    defaultPrompt: "Build a blank-canvas campaign video with a strong hook, benefits, proof, and CTA.",
  },
};

const sceneTemplates = [
  {
    title: "Pattern interrupt hook",
    detail: "Open with a bold visual, fast motion, and a line that names the audience's urgent problem.",
  },
  {
    title: "Product promise",
    detail: "Show the main benefit with premium stock footage cues, product overlays, and branded color accents.",
  },
  {
    title: "Proof and differentiation",
    detail: "Use captions, metric callouts, testimonial beats, or before-and-after framing to build trust.",
  },
  {
    title: "Conversion CTA",
    detail: "End with a simple next step, memorable voiceover cadence, and platform-safe end card.",
  },
];

const exports = ["16:9 MP4", "1:1 MP4", "9:16 MP4", "SRT captions", "Thumbnail", "SEO metadata"];

function getMode() {
  return new FormData(form).get("mode");
}

function titleFromInput(mode, source, type) {
  if (mode === "blank") return `${type} Blank Build`;

  try {
    const hostname = new URL(source).hostname.replace(/^www\./, "");
    return `${hostname} ${type}`;
  } catch {
    return `${type} Campaign`;
  }
}

function buildScript({ mode, source, prompt, type, tone, voice, quality }) {
  const inputContext = mode === "url" && source
    ? `from ${source}`
    : mode === "prompt"
      ? "from your campaign prompt"
      : "from a blank creative canvas";

  return `${tone} ${voice.toLowerCase()} voiceover: Start with the customer pain, then reveal the ${type.toLowerCase()} ${inputContext}. ${prompt || modeCopy[mode].defaultPrompt} Deliver it as a ${quality.toLowerCase()} video with crisp pacing, clear captions, premium visuals, and a CTA that is easy to act on.`;
}

function renderScenes(type, tone) {
  sceneList.innerHTML = sceneTemplates
    .map(
      (scene, index) => `
        <li>
          <strong>${String(index + 1).padStart(2, "0")} · ${scene.title}</strong>
          <p>${scene.detail} Keep the mood ${tone.toLowerCase()} and aligned to a ${type.toLowerCase()} objective.</p>
        </li>
      `,
    )
    .join("");
}

function renderExports(quality) {
  exportStrip.innerHTML = exports
    .map((item) => `<span>${item}${item.includes("MP4") ? ` · ${quality}` : ""}</span>`)
    .join("");
}

function updateModeFields() {
  const mode = getMode();
  const copy = modeCopy[mode];
  sourceGroup.querySelector("span").textContent = copy.label;
  sourceInput.placeholder = copy.placeholder;

  if (!promptInput.value.trim()) {
    promptInput.value = copy.defaultPrompt;
  }
}

function generatePlan(event) {
  event?.preventDefault();

  const mode = getMode();
  const source = sourceInput.value.trim();
  const prompt = promptInput.value.trim();
  const type = videoType.value;
  const tone = toneInput.value;
  const voice = voiceInput.value;
  const quality = qualityInput.value;

  outputTitle.textContent = titleFromInput(mode, source, type);
  qualityPill.textContent = quality;
  scriptOutput.textContent = buildScript({ mode, source, prompt, type, tone, voice, quality });
  renderScenes(type, tone);
  renderExports(quality);
}

form.addEventListener("change", (event) => {
  if (event.target.name === "mode") {
    promptInput.value = modeCopy[event.target.value].defaultPrompt;
    updateModeFields();
  }
  generatePlan();
});

form.addEventListener("submit", generatePlan);
updateModeFields();
generatePlan();
