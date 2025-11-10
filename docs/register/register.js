let participantCount = 1;

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <p>Participant ${count}</p>

      <div class="item">
        <label for="fname${count}"> First Name<span>*</span></label>
        <input id="fname${count}" type="text" name="fname${count}" required />
      </div>

      <div class="item activities">
        <label for="activity${count}">Activity #<span>*</span></label>
        <input id="activity${count}" type="text" name="activity${count}" />
      </div>

      <div class="item">
        <label for="fee${count}">Fee ($)<span>*</span></label>
        <input id="fee${count}" type="number" name="fee${count}" />
      </div>

      <div class="item">
        <label for="date${count}">Desired Date <span>*</span></label>
        <input id="date${count}" type="date" name="date${count}" />
      </div>

      <div class="item">
        <p>Grade</p>
        <select id="grade${count}" name="grade${count}">
          <option selected value="" disabled></option>
          <option value="1">1st</option>
          <option value="2">2nd</option>
          <option value="3">3rd</option>
          <option value="4">4th</option>
          <option value="5">5th</option>
          <option value="6">6th</option>
          <option value="7">7th</option>
          <option value="8">8th</option>
          <option value="9">9th</option>
          <option value="10">10th</option>
          <option value="11">11th</option>
          <option value="12">12th</option>
        </select>
      </div>
    </section>
  `;
}

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];

  const total = feeElements.reduce((sum, el) => {
    const val = parseFloat(el.value);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);

  return total;
}

function successTemplate({ name, count, total }) {
  return `
    <div class="success">
      <h2>Thank you ${name || "Friend"} for registering.</h2>
      <p>You have registered <strong>${count}</strong> participant${count === 1 ? "" : "s"} and owe <strong>$${total.toFixed(2)}</strong> in fees.</p>
      <button type="button" id="reset">Register More</button>
    </div>
  `;
}

function addParticipant() {
  participantCount += 1;
  const addBtn = document.querySelector("#add");
  addBtn.insertAdjacentHTML("beforebegin", participantTemplate(participantCount));
}

function submitForm(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const summary = document.querySelector("#summary");
  const adultName = document.querySelector("#adult_name")?.value?.trim() || "";

  const total = totalFees();

  form.style.display = "none";
  summary.innerHTML = successTemplate({
    name: adultName,
    count: participantCount,
    total: total,
  });

  const resetBtn = document.querySelector("#reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      window.location.reload();
    });
  }
}

function init() {
  participantCount = 1;

  const addBtn = document.querySelector("#add");
  addBtn.addEventListener("click", addParticipant);

  const form = document.querySelector("form");
  form.addEventListener("submit", submitForm);
}

document.addEventListener("DOMContentLoaded", init);
