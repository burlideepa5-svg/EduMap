let compareList = [];

// Load clusters
fetch("php/get_clusters.php")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("clustersSection");

    data.forEach(cluster => {
      const div = document.createElement("div");
      div.className = "card";
     const icons = {
  "Technology & IT": "💻",
  "Design & Creative": "🎨",
  "Medical & Healthcare": "🏥",
  "Commerce & Business": "💼",
  "Arts & Humanities": "🎭",
  "Government & Public Services": "🏛️",
  "Science & Research": "🔬",
  "Emerging Careers": "🚀"
};

const descriptions = {
  "Technology & IT": "Software development, AI, data & development..",
  "Design & Creative": "UI/UX, graphics & visual design..",
  "Medical & Healthcare": "Healthcare,medical, patient care & services..",
  "Commerce & Business": "Finance, business & management..",
  "Arts & Humanities": "Psychology, history & social fields..",
  "Government & Public Services": "Civil/Govt services & public sector..",
  "Science & Research": "Scientific research & innovation(R&D)..",
  "Emerging Careers": "Future careers & new-age fields.."
};

div.innerHTML = `
  <div class="cluster-icon">${icons[cluster.name]}</div>
  <div class="cluster-title">${cluster.name}</div>
  <div class="cluster-desc-small">${descriptions[cluster.name] || ""}</div>
`;

      div.onclick = () => loadCluster(cluster);

      container.appendChild(div);
    });
  });


// When cluster is clicked
function loadCluster(cluster) {

  // Hide clusters
  document.getElementById("clustersSection").style.display = "none";

  const section = document.getElementById("careerSection");

  section.innerHTML = `
    <button class="back-btn" onclick="goBack()">← Back</button>

    <h2>${cluster.name}</h2>
    <p class="cluster-desc">
      ${cluster.description || "Explore careers in this field."}
    </p>

    <div id="rolesList"></div><div id="rolesList"></div>

<button class="compare-btn" onclick="showComparison()">
  Compare Selected
</button>
  `;

  // Fetch careers
  fetch(`php/get_careers.php?cluster_id=${cluster.cluster_id}`)
    .then(res => res.json())
    .then(data => {
       window.currentCareers = data;
      const container = document.getElementById("rolesList");

      data.forEach((career, index) => {
        const div = document.createElement("div");
        div.className = "role-card";

        div.innerHTML = `
  <div class="role-header">
  <span class="role-title">${career.name}</span>
  <label class="compare-label">
    <input type="checkbox" onchange="toggleCompare(${index})">
    Compare
  </label>
</div>

  <div class="role-meta">
    <span>💰 ${career.salary}</span>
    <span>🎓 ${career.degree || "Varies"}</span>
  </div>

  <p class="role-short">
    ${career.description.substring(0, 80)}...
  </p>

  <button class="view-btn" onclick="showDetails(${index})">
  View Details →
</button>

  <div class="role-details" id="details-${index}">
    <p>${career.description}</p>
    <p><strong>Stream:</strong> ${career.stream}</p>
    <p><strong>Degree:</strong> ${career.degree}</p>
    <p><strong>Exams:</strong> ${career.exams}</p>
    <p><strong>Growth:</strong> ${career.growth}</p>
  </div>
`;

        container.appendChild(div);
      });
    });
}

function showDetails(index) {
  const career = window.currentCareers[index];

  const modal = document.getElementById("modal");
  const body = document.getElementById("modalBody");
 const streamValue = career.stream.trim().toLowerCase();

const streamText = streamValue === "any"
  ? "All Streams"
  : career.stream;

const streamClass = streamValue === "any"
  ? "badge flexible"
  : "badge";

 body.innerHTML = `
  <div class="modal-header">
    <h2>${career.name}</h2>
    <span class="${streamClass}">${streamText}</span>
  </div>

  <p class="modal-desc">${career.description}</p>

  <div class="modal-grid">
    <div class="info-box">
      <span>💰 Salary</span>
      <strong>${career.salary}</strong>
    </div>

    <div class="info-box">
      <span>🎓 Degree</span>
      <strong>${career.degree}</strong>
    </div>

    <div class="info-box">
      <span>📘 Exams</span>
      <strong>${career.exams}</strong>
    </div>

    <div class="info-box">
      <span>📈 Growth</span>
      <strong>${career.growth}</strong>
    </div>
  </div>
`;

  modal.style.display = "flex";
}
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

function toggleCompare(index) {
  if (compareList.includes(index)) {
    compareList = compareList.filter(i => i !== index);
  } else {
    if (compareList.length >= 3) {
      alert("You can compare up to 3 roles");
      return;
    }
    compareList.push(index);
  }
}

function showComparison() {
  if (compareList.length < 2) {
    alert("Select at least 2 careers to compare");
    return;
  }

  const selected = compareList.map(i => window.currentCareers[i]);
  const salaries = selected.map(c => {
  const nums = c.salary.match(/\d+/g);
  return nums ? Math.max(...nums.map(Number)) : 0;
});
const maxSalary = Math.max(...salaries);

  let html = `
    <h2>Compare Careers</h2>
    <table class="compare-table">
      <tr>
        <th>Field</th>
        ${selected.map(c => `<th>${c.name}</th>`).join("")}
      </tr>

      <tr>
  <td>💰 Salary</td>
  ${selected.map((c, i) => `
    <td class="${salaries[i] === maxSalary ? 'highlight' : ''}">
      ${c.salary}
    </td>
  `).join("")}
</tr>

      <tr>
        <td>🎓 Degree</td>
        ${selected.map(c => `<td>${c.degree}</td>`).join("")}
      </tr>

      <tr>
        <td>📘 Exams</td>
        ${selected.map(c => `<td>${c.exams}</td>`).join("")}
      </tr>

      <tr>
        <td>📈 Growth</td>
        ${selected.map(c => `<td>${c.growth}</td>`).join("")}
      </tr>
    </table>
  `;

  document.getElementById("modalBody").innerHTML = html;
  document.getElementById("modal").style.display = "flex";
}

// Back button
function goBack() {
  document.getElementById("clustersSection").style.display = "grid";
  document.getElementById("careerSection").innerHTML = "";
}

