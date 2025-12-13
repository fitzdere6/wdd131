// main.js
// Shared utilities + Home page (Bulletproof Basics) logic

document.addEventListener("DOMContentLoaded", () => {
  // ===== SHARED: footer year =====
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ===== HOME PAGE ELEMENTS =====
  const rulesListElement = document.getElementById("rules-list");
  const gearChecklistElement = document.getElementById("gear-checklist");
  const gearStatusElement = document.getElementById("gear-status");

  const modal = document.getElementById("rules-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const closeModalButton = document.getElementById("close-modal");
  const openRulesModalButton = document.getElementById("open-rules-modal");

  // If these don’t exist, we’re not on the home page. Stop here.
  if (
    !rulesListElement ||
    !gearChecklistElement ||
    !gearStatusElement ||
    !modal ||
    !modalTitle ||
    !modalBody ||
    !closeModalButton
  ) {
    return;
  }

  // ===== DATA =====
  const safetyRules = [
    {
      id: 1,
      title: "Treat every firearm as if it is loaded.",
      summary: "Always assume a gun can fire. Never treat it like a toy.",
      details:
        "Even if you have personally checked the chamber, always act as if the firearm is loaded. This mindset prevents casual, careless behavior. Never point it at people, never horseplay with it, and never rely on someone else's word that it is 'unloaded'."
    },
    {
      id: 2,
      title: "Never point the firearm at anything you are not willing to destroy.",
      summary: "Always control your muzzle direction.",
      details:
        "Where your muzzle points, your responsibility follows. Avoid sweeping the muzzle across people, pets, vehicles, or anything you do not intend to shoot. At the range, keep firearms pointed downrange. At home, keep them pointed in a safe direction."
    },
    {
      id: 3,
      title: "Keep your finger off the trigger until you are ready to shoot.",
      summary: "Index your trigger finger along the frame, not on the trigger.",
      details:
        "Most negligent discharges happen because someone touched the trigger before they meant to fire. Only place your finger on the trigger once your sights are on target and you have made the conscious decision to shoot."
    },
    {
      id: 4,
      title: "Always know your target and what is beyond it.",
      summary:
        "Be aware of what you might hit if you miss or the bullet passes through.",
      details:
        "Bullets can go through targets or miss completely. Always be sure of what is behind your target—people, buildings, roads, or other hazards. If you cannot clearly see what is beyond your target, do not take the shot."
    }
  ];

  const gearItems = [
    "Eye protection",
    "Ear protection",
    "Secure case or bag",
    "Chamber flag",
    "Proper ammunition"
  ];

  // ===== RENDER FUNCTIONS =====
  function renderRules() {
    rulesListElement.innerHTML = "";

    safetyRules.forEach((rule) => {
      const li = document.createElement("li");
      li.classList.add("rule-item");

      const textDiv = document.createElement("div");
      textDiv.classList.add("rule-text");

      const title = document.createElement("p");
      title.classList.add("rule-title");
      title.textContent = rule.title;

      const summary = document.createElement("p");
      summary.classList.add("rule-summary");
      summary.textContent = rule.summary;

      textDiv.appendChild(title);
      textDiv.appendChild(summary);

      const btn = document.createElement("button");
      btn.classList.add("btn", "secondary");
      btn.textContent = "More info";
      btn.addEventListener("click", () => openRuleModal(rule));

      li.appendChild(textDiv);
      li.appendChild(btn);

      rulesListElement.appendChild(li);
    });
  }

  function renderGearChecklist() {
    gearChecklistElement.innerHTML = "";

    gearItems.forEach((item, index) => {
      const wrapper = document.createElement("div");
      wrapper.classList.add("checklist-item");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.id = `gear-${index}`;
      checkbox.addEventListener("change", updateGearStatus);

      const label = document.createElement("label");
      label.htmlFor = checkbox.id;
      label.textContent = item;

      wrapper.appendChild(checkbox);
      wrapper.appendChild(label);
      gearChecklistElement.appendChild(wrapper);
    });
  }

  // ===== MODAL FUNCTIONS =====
  function openRuleModal(rule) {
    modalTitle.textContent = rule.title;
    modalBody.textContent = rule.details;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
  }

  closeModalButton.addEventListener("click", closeModal);

  if (openRulesModalButton) {
    openRulesModalButton.addEventListener("click", () => {
      if (safetyRules.length > 0) {
        openRuleModal(safetyRules[0]);
      }
    });
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // ===== GEAR STATUS / CONDITIONAL LOGIC =====
  function updateGearStatus() {
    const checkboxes = Array.from(
      gearChecklistElement.querySelectorAll('input[type="checkbox"]')
    );

    const checkedCount = checkboxes.filter((box) => box.checked).length;
    const total = checkboxes.length;

    gearStatusElement.classList.remove("ready", "almost", "not-ready");

    if (checkedCount === 0) {
      gearStatusElement.textContent =
        "You have not selected any gear yet. Start by choosing one item you already own.";
      gearStatusElement.classList.add("not-ready");
    } else if (checkedCount < total) {
      gearStatusElement.textContent = `You have ${checkedCount} out of ${total} essentials. You are almost ready—add the remaining gear for a safer range trip.`;
      gearStatusElement.classList.add("almost");
    } else {
      gearStatusElement.textContent =
        "Nice work! You have all the basic safety gear. You are range-ready—now focus on practicing good habits.";
      gearStatusElement.classList.add("ready");
    }
  }

  // ===== INITIALIZE HOME PAGE =====
  renderRules();
  renderGearChecklist();
  updateGearStatus();
});
