const { categories, activations, weeklyDeepDives, workItems, consultants, pitchDecks } = window.GSCG;

function byCategory(id) {
  return categories.find((category) => category.id === id);
}

function activationCard(item, expanded = false) {
  return `
    <article class="activation-card" data-category="${item.category}">
      <img src="${item.image}" alt="${item.sponsor} ${item.title}">
      <div class="card-body">
        <div class="card-meta"><span>${item.sponsor}</span><span>${byCategory(item.category).name}</span></div>
        <span class="badge">${item.tag}</span>
        <h3>${item.title}</h3>
        ${expanded ? `<p>${activationDescriptions[item.title] || item.build}</p><h4>What USL Spokane would run</h4><p>${item.build}</p>` : `<p>${activationDescriptions[item.title] || item.build}</p>`}
      </div>
    </article>
  `;
}

const activationDescriptions = {
  "Set Piece = 8 Piece": "When Velocity or Zephyr scores from a set piece, fans unlock a Chick-fil-A 8-piece reward. The concept turns a soccer-specific match moment into a simple food redemption fans can understand instantly.",
  "Thomas Hammer Coupon": "A goal-triggered coffee coupon gives Thomas Hammer a repeatable local matchday moment. Fans leave with a Spokane-born offer that can drive post-match visits, season-ticket perks, or cold-weather match engagement.",
  "Top Ins for Free Wings": "Houston TX Hot Chicken can connect a match trigger to a wings reward for selected groups, students, or nonprofit partners. The idea turns attendance behavior into a restaurant visit with a clear redemption path.",
  "Home Improvement Soccer Hunt": "Fans move through QR checkpoints around the stadium, completing sponsor-branded challenges and entering a prize drawing. Home Depot and Ziggy's become active parts of the matchday route instead of static signage.",
  "NERF Fight Night": "A supervised NERF challenge gives families a high-energy pre-match or halftime experience with branded targets, prizes, and ticket bundles. It is designed to feel visual, playful, and easy for kids to join.",
  "Schweitzer Theme Night": "A mountain-themed match brings Schweitzer into the stadium through giveaways, photo moments, resort-ticket prizes, and outdoor lifestyle visuals. The activation connects Spokane soccer to Pacific Northwest recreation.",
  "Spokane Spirit Nights": "Schools, youth clubs, and nonprofits receive dedicated ticket links, meal vouchers, and donation tracking through Houston TX Hot Chicken. The concept gives group sales a community giveback engine.",
  "Shot for a Shot": "Liquid I.V. can own a hydration zone built around samples, player voting, and a shot-based match trigger. The idea gives a non-alcoholic wellness sponsor a visible role during active stadium moments.",
  "Builders Deck & Street Courts": "Swinerton can move beyond logo exposure by physically helping build something for fans or the community, from a branded viewing deck to mini-pitch or street-soccer court improvements.",
  "The Syndicate Social Media Campaign": "Dave's Hot Chicken becomes part of supporter culture through Syndicate content, supporter meal codes, march coverage, and a short-window bounce-back offer.",
  "Heat Check": "Dave's Hot Chicken owns high-intensity match moments with a big-screen Heat Check graphic, social post, and QR offer. Cards, late pressure, and big plays become moments where the sponsor naturally belongs.",
  "Clear View Play of the Game": "Fans vote for the clearest, sharpest play of the match through a QR code tied to VPI and Marlin Windows. The sponsor becomes part of highlight selection and match analysis.",
  "Training Kit Integration": "Swinerton receives repeated visibility through training kits, warmups, player content, and community appearances. The placement fits the idea of behind-the-scenes work that builds matchday performance.",
  "Hard Hat Player of the Match": "A branded hard hat award recognizes the player who did the gritty, physical, or selfless work that shaped the match. It turns Swinerton's construction identity into recurring soccer content.",
  "Spokane Humane Society Trading Cards": "Limited player-and-pet trading cards connect fans to adoptable animals through QR codes, shelter spotlights, and collectible drops. The activation creates an emotional take-home item with a local nonprofit purpose.",
  "Mileage Connection": "Attendance can connect to travel rewards, miles, or trip giveaways through Alaska/Hawaiian Airlines. The concept extends matchday value beyond the stadium and gives loyal fans a reason to keep checking in.",
  "Laws of the Game": "Lukins & Annis can sponsor a printed and digital rules guide that helps newer fans understand soccer. The take-home item makes the firm useful, clear, and relevant without forcing an awkward promotion.",
  "The Great Cow Caper": "Golden cows hidden around Spokane create a weeklong Chick-fil-A scavenger hunt with clues, QR check-ins, sponsor prizes, and a final matchday reveal. The idea builds anticipation before fans even enter the stadium.",
  "NETFEST 2026": "A summer 3v3 street soccer event brings Liquid I.V. into Riverfront Park through hydration zones, pop-up pitches, and ticket offers. It creates a citywide participation platform, not just a matchday sample table.",
  "Community Kitchen Mobile Unit": "A mobile meal or donation platform connects Chick-fil-A to goals, group sales, and nonprofit partners. The sponsor becomes tied to meals served and community impact, not only concessions.",
};

function activationTile(item, index) {
  return `
    <button class="activation-tile" type="button" data-activation="${index}" aria-label="Open ${item.title}">
      <img src="${item.image}" alt="${item.title}">
      <span class="tile-title">${item.title}</span>
    </button>
  `;
}

function sponsorMark(sponsor) {
  const names = sponsor.split(" & ");
  return `
    <div class="partner-lockup" aria-label="${sponsor} logo lockup">
      ${names.map((name) => `<span>${name}</span>`).join("")}
    </div>
  `;
}

function activationModalContent(item) {
  const category = byCategory(item.category);
  return `
    <button class="dialog-close" type="button" aria-label="Close activation details">Close</button>
    <div class="dialog-media">
      <img src="${item.image}" alt="${item.title}">
    </div>
    <div class="dialog-copy">
      ${sponsorMark(item.sponsor)}
      <div class="card-meta"><span>${category.name}</span><span>${item.tag}</span></div>
      <h2>${item.title}</h2>
    </div>
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
  const summary = document.querySelector("#category-summary");
  const tabs = document.querySelectorAll(".tab");
  if (!grid) return;

  if (summary) {
    summary.innerHTML = categories.map((category) => `
      <article>
        <strong>${activations.filter((item) => item.category === category.id).length}</strong>
        <span>${category.name}</span>
        <p>${category.description}</p>
      </article>
    `).join("");
  }

  function renderGallery(filter = "all") {
    const activeCategories = filter === "all" ? categories : categories.filter((category) => category.id === filter);
    grid.innerHTML = activeCategories.map((category) => {
      const categoryActivations = activations
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => item.category === category.id);
      return `
        <section class="category-section" data-category="${category.id}">
          <div class="category-heading">
            <div>
              <p class="eyebrow">${categoryActivations.length} concepts</p>
              <h2>${category.name}</h2>
              <p>${category.description}</p>
            </div>
          </div>
          <div class="activation-gallery">
            ${categoryActivations.map(({ item, index }) => activationTile(item, index)).join("")}
          </div>
        </section>
      `;
    }).join("");
  }

  renderGallery();
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      renderGallery(tab.dataset.filter);
    });
  });

  const dialog = document.querySelector("#activation-dialog");
  grid.addEventListener("click", (event) => {
    const tile = event.target.closest("[data-activation]");
    if (!tile || !dialog) return;
    const item = activations[Number(tile.dataset.activation)];
    dialog.innerHTML = activationModalContent(item);
    dialog.showModal();
    dialog.querySelector(".dialog-close")?.addEventListener("click", () => dialog.close());
  });
  dialog?.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function weeklyDetail(item) {
  const insights = item.insights.map((point) => `<li>${point}</li>`).join("");
  const teams = item.teams?.map((team) => `
    <tr>
      <td>${team.club}</td>
      <td>${team.attendance}</td>
      <td>${team.capacity}</td>
      <td>${team.filled}</td>
    </tr>
  `).join("") || "";
  return `
    <article class="week-detail-card">
      <div class="week-copy">
        <p class="eyebrow">${item.week} / ${item.owner}</p>
        <h2>${item.title}</h2>
        <p>${item.summary}</p>
        <h4>What the work achieved</h4>
        <ul>${insights}</ul>
        ${item.formula ? `<div class="formula-box"><span>ASI Formula</span><p>${item.formula}</p></div>` : ""}
      </div>
      <div class="week-preview">
        <img src="${item.preview}" alt="${item.title} preview">
        ${teams ? `
          <div class="mini-table-wrap">
            <table class="mini-table">
              <thead><tr><th>Club</th><th>Avg.</th><th>Cap.</th><th>Filled</th></tr></thead>
              <tbody>${teams}</tbody>
            </table>
          </div>
        ` : `<p>${item.artifact}</p>`}
      </div>
    </article>
  `;
}

function workCard(item, detailed = true) {
  const highlights = item.highlights.map((point) => `<li>${point}</li>`).join("");
  const clientUse = {
    "Sponsor Identification Framework": "Use this as the early category rationale when explaining why the team prioritized healthcare, QSR, coffee, construction, home improvement, and law firm targets.",
    "Peer Share: Category Mapping": "Use this to show executives that the recommendations were built from league benchmarks, existing inventory, and sponsor-category whitespace.",
    "Potential Sponsors Deep Dive": "Use this as the backup rationale for specific partner outreach, especially when a sponsor asks why their category makes sense for soccer.",
    "Prior Sponsorship Activation Strategy": "Use this to connect each recommended idea to precedent from other teams, sports, or community-facing sponsor models.",
    "Attendance Strength Report": "Use this as the quantitative bridge between sponsor value and attendance behavior, including capacity utilization and growth targets.",
    "Activation & Outreach Playbook": "Use this as the operating playbook for pilot structure, sponsor fit, outreach language, and what to measure after launch.",
    "Sponsor Pitch Decks": "Use these as starting points for partner conversations with Chick-fil-A, Dave's, Houston TX Hot Chicken, and Swinerton.",
    "Final Presentation": "Use this as the executive-facing summary of the recommendation set, final categories, visuals, and next-step deliverables.",
  }[item.title] || "Use this as supporting evidence for the final recommendation set.";
  return `
    <article class="work-preview-card">
      <img src="${item.preview}" alt="${item.title} preview">
      <div class="card-body">
        <div class="card-meta"><span>${item.week}</span><span>${item.type}</span></div>
        <span class="badge alt">${item.owner}</span>
        <h3>${item.title}</h3>
        <p>${item.explanation}</p>
        ${detailed ? `<h4>What this work contributed</h4><ul>${highlights}</ul><h4>How USL Spokane can use it</h4><p>${clientUse}</p><p class="file-note">${item.file}</p>` : ""}
      </div>
    </article>
  `;
}

function initWork() {
  const weekNav = document.querySelector("#week-nav");
  const weekDetail = document.querySelector("#week-detail");
  const library = document.querySelector("#work-library");
  const people = document.querySelector("#consultant-grid");
  if (weekNav && weekDetail && weeklyDeepDives) {
    function setWeek(index) {
      weekNav.querySelectorAll("button").forEach((button) => {
        button.classList.toggle("active", Number(button.dataset.week) === index);
      });
      weekDetail.innerHTML = weeklyDetail(weeklyDeepDives[index]);
    }
    weekNav.innerHTML = weeklyDeepDives.map((item, index) => `
      <button class="${index === 0 ? "active" : ""}" type="button" data-week="${index}">
        <span>${item.week}</span>
        ${item.shortTitle}
      </button>
    `).join("");
    weekNav.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => setWeek(Number(button.dataset.week)));
    });
    setWeek(0);
  }
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
