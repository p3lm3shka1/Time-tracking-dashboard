let data = [];
let currentRange = "weekly";

async function loadData() {
  const res = await fetch("./data.json");
  data = await res.json();
  renderCards();
}

function renderCards() {
  const container = document.getElementById("cards");
  container.innerHTML = "";
  data.forEach((item) => {
    const title = item.title;
    const slug = title.toLowerCase().replace(" ", "-");

    const current = item.timeframes[currentRange].current;
    const previous = item.timeframes[currentRange].previous;

    //additional class (with that gpt helped me a lot, becuase i was stuck here for hours)
    container.innerHTML += `
      <div class="card ${slug}">
        <div class="card-top">
          <img src="../images/icon-${slug}.svg" alt="icons">
        </div>

        <div class="card-content">
          <div class="card-header">
            <h2>${title}</h2>
            <span>•••</span>
          </div>

          <div class="hours">${current}hrs</div>
          <div class="previous">Last Week - ${previous}hrs</div>
        </div>
      </div>
    `;
  });
}

// timeline buttons
document.querySelectorAll(".timeline button").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".timeline .active").classList.remove("active");
    btn.classList.add("active");
    currentRange = btn.dataset.range;
    renderCards();
  });
});

loadData();
