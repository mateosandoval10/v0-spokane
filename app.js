const { categories, activations, workItems, consultants, pitchDecks } = window.GSCG;

function byCategory(id) {
  return categories.find((category) => category.id === id);
}

function activationCard(item, expanded = false) {
  const whyList = item.why.map((point) => `<li>${point}</li>`).join("");
  return `
    <article class="activation-card" data-category="${item.category}">
      <img src="${item.image}" alt="${item.sponsor} ${item.title}">
      <div class="card-body">
        <div class="card-meta"><span>${item.sponsor}</span><span>${byCategory(item.category).name}</span></div>
        <span class="badge">${item.tag}</span>
        <h3>${item.title}</h3>
        ${expanded ? `<h4>Why this fits</h4><ul>${whyList}</ul><h4>What we would build</h4><p>${item.build}</p>` : `<p>${item.why[0]}</p>`}
      </div>
    </article>
  `;
}

function initHome() {
  const featured = document.querySelector("#home-featured");
  const work = document.querySelector("#home-work");
  if (featured) {
    featured.innerHTML = activations.slice(0, 6).map((item) => activationCard(item)).join("");
  }
  if (work) {
    work.innerHTML = workItems.slice(0, 3).map((item) => workCard(item, false)).join("");
  }
}

function initActivations() {
  const grid = document.querySelector("#activation-grid");
  const tabs = document.querySelectorAll(".tab");
  if (!grid) return;
  grid.innerHTML = activations.map((item) => activationCard(item, true)).join("");
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      const filter = tab.dataset.filter;
      document.querySelectorAll(".activation-card").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });
}

function workCard(item, detailed = true) {
  const highlights = item.highlights.map((point) => `<li>${point}</li>`).join("");
  return `
    <article class="work-preview-card">
      <img src="${item.preview}" alt="${item.title} preview">
      <div class="card-body">
        <div class="card-meta"><span>${item.week}</span><span>${item.type}</span></div>
        <span class="badge alt">${item.owner}</span>
        <h3>${item.title}</h3>
        <p>${item.explanation}</p>
        ${detailed ? `<h4>What this work contributed</h4><ul>${highlights}</ul><p class="file-note">${item.file}</p>` : ""}
      </div>
    </article>
  `;
}

function initWork() {
  const library = document.querySelector("#work-library");
  const people = document.querySelector("#consultant-grid");
  if (library) {
    library.innerHTML = workItems.map((item) => workCard(item, true)).join("");
  }
  if (people) {
    people.innerHTML = consultants.map((person) => `
      <article class="person-card">
        <span class="avatar">${person.initials}</span>
        <h3>${person.name}</h3>
        <p><strong>${person.role}</strong></p>
        <p>${person.status}</p>
      </article>
    `).join("");
  }
}

function initDecks() {
  const pitch = document.querySelector("#pitch-grid");
  const rail = document.querySelector("#slide-rail");
  const image = document.querySelector("#slide-image");
  const caption = document.querySelector("#slide-caption");
  if (pitch) {
    pitch.innerHTML = pitchDecks.map((deck) => `
      <article class="pitch-card">
        <img src="${deck.image}" alt="${deck.sponsor} pitch deck preview">
        <div class="card-body">
          <span class="badge gold">${deck.fit}</span>
          <h3>${deck.sponsor}</h3>
          <p>${deck.lead}</p>
        </div>
      </article>
    `).join("");
  }
  if (!rail || !image || !caption) return;
  const slideCount = 42;
  let slideIndex = 1;
  function setSlide(index) {
    slideIndex = ((index - 1 + slideCount) % slideCount) + 1;
    image.src = `assets/final-slides/Slide${slideIndex}.jpg`;
    image.alt = `Final presentation slide ${slideIndex}`;
    caption.textContent = `Slide ${slideIndex} of ${slideCount}`;
    rail.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("active", Number(button.dataset.slide) === slideIndex);
    });
  }
  rail.innerHTML = Array.from({ length: slideCount }, (_, i) => {
    const slide = i + 1;
    return `<button class="slide-thumb${slide === 1 ? " active" : ""}" type="button" data-slide="${slide}" aria-label="Show slide ${slide}"><img src="assets/final-slides/Slide${slide}.jpg" alt=""></button>`;
  }).join("");
  rail.querySelectorAll("button").forEach((button) => button.addEventListener("click", () => setSlide(Number(button.dataset.slide))));
  document.querySelector("#prev-slide")?.addEventListener("click", () => setSlide(slideIndex - 1));
  document.querySelector("#next-slide")?.addEventListener("click", () => setSlide(slideIndex + 1));
}

initHome();
initActivations();
initWork();
initDecks();
