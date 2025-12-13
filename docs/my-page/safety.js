// safety.js - Range Safety modal logic
(() => {
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("commandModal");
    const modalTitle = document.getElementById("commandModalTitle");
    const modalDescription = document.getElementById("commandModalDescription");
    const closeBtn = document.getElementById("commandModalClose");
    const dialog = modal?.querySelector(".modal-dialog");
    const cards = document.querySelectorAll(".command-card");

    if (!modal || !modalTitle || !modalDescription || !closeBtn || !dialog || cards.length === 0) return;

    // Map command id -> description
    const commandDescriptions = {
      load:
        "This command tells you that it is now safe and appropriate to load your firearm. You may insert a magazine or load rounds, close the action, and prepare to shoot while keeping the muzzle safely downrange. Do not fire until told to do so.",
      fire:
        "This command authorizes you to begin shooting. Fire in a controlled, safe manner while staying aware of muzzle direction, your target, and what is beyond it. Stop immediately if you hear any conflicting command such as “Cease Fire.”",
      cease:
        "Stop shooting immediately. Take your finger off the trigger, keep the firearm pointed downrange, and wait for further instructions. Do not move, load, or unload the firearm unless told to do so.",
      clear:
        "Remove all ammunition and prove the firearm is empty. Remove the magazine (if applicable), open the action, visually and physically inspect the chamber, and present the open, empty firearm for verification if instructed.",
      cold:
        "When the range is cold, no one handles firearms. Firearms should be unloaded with actions open on the bench or rack. People may go downrange only after the line is confirmed safe.",
      hot:
        "A hot range means firearms may be handled and fired from the firing line. Do not go downrange. Continue to follow all safety rules and obey range staff instructions.",
    };

    let lastFocusedEl = null;

    function openModal(fromCard) {
      lastFocusedEl = fromCard;

      const id = fromCard.getAttribute("data-command-id");
      const title = fromCard.textContent.trim();
      const description = commandDescriptions[id] || "No description available.";

      modalTitle.textContent = title;
      modalDescription.textContent = description;

      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      // Focus close button (prevents aria-hidden/focus issues later)
      closeBtn.focus();
    }

    function closeModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";

      // Return focus to the element that opened the modal
      if (lastFocusedEl) lastFocusedEl.focus();
    }

    // Open on card click
    cards.forEach((card) => {
      card.addEventListener("click", () => openModal(card));
      // Also allow keyboard "Enter" / "Space" (buttons already support this, but safe)
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") openModal(card);
      });
    });

    // Close button
    closeBtn.addEventListener("click", closeModal);

    // Click outside dialog closes
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Escape closes
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
  });
})();
