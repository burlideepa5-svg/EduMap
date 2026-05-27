import { UG_CAREER_CLUSTERS } from "../config/ugCareerClusters.js";
import { UG_NEXT_STEPS_MAP } from "../config/ugNextSteps.js";

/* ===============================
   LOAD QUIZ DATA FROM DB
=============================== */
const params = new URLSearchParams(window.location.search);
const resultId = params.get("id");

if (!resultId) {
  window.location.href = "quizB.html";
}

fetch(`php/get_resultug.php?id=${resultId}`)
  .then((res) => res.json())
  .then((data) => {
    if (!data || !data.phase1) {
      window.location.href = "quizB.html";
      return;
    }

    renderResult(data);
  })
  .catch((err) => {
    console.error("Fetch error:", err);
    alert("Unable to load result.");
  });

/* ===============================
   TRAIT SCORE ENGINE
=============================== */
function calculateTraits(phase2) {
  const scores = {
    analytical: 0,
    creative: 0,
    people: 0,
    adaptability: 0,
    leadership: 0,
    research: 0,
    structured: 0,
    impact: 0
  };

  const val = (x) => 6 - x;

  scores.analytical += val(phase2.q6_improvement || 3);
  scores.analytical += val(phase2.q7_logic || 3);
  scores.analytical += val(phase2.q13_analysis || 3);

  scores.creative += val(phase2.q8_creativity || 3);

  scores.people += val(phase2.q9_people || 3);

  scores.research += val(phase2.q10_research || 3);

  scores.adaptability += val(phase2.q11_adaptability || 3);

  scores.leadership += val(phase2.q12_initiative || 3);

  scores.impact += val(phase2.q14_impact || 3);

  scores.structured += val(phase2.q7_logic || 3);

  return scores;
}

/* ===============================
   PATHWAY DETECTION
=============================== */
function getBestPathway(phase3) {
  const pathwayMap = {
    masters: 6 - (phase3.q16_higher_studies || 3),
    job: 6 - (phase3.q17_job || 3),
    certification: 6 - (phase3.q18_certifications || 3),
    govt: 6 - (phase3.q19_govt || 3),
    switch: 6 - (phase3.q20_switch_domain || 3)
  };

  return Object.entries(pathwayMap)
    .sort((a, b) => b[1] - a[1])[0][0];
}

/* ===============================
   TOP TRAITS
=============================== */
function getTopTraits(scores) {
  return Object.entries(scores)
    .filter(([_, score]) => score >= 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([trait]) => trait);
}

/* ===============================
   CLUSTER MATCHING
=============================== */
function matchClusters(userDomain, topTraits, bestPath) {
  return UG_CAREER_CLUSTERS
.filter(cluster =>

  cluster.domains.includes(userDomain)

  ||

  (
    ["design_media", "business_management"]
      .includes(cluster.id)
    &&
    cluster.switchFriendly
    &&
    cluster.phase2MatchTraits.some(
      trait => topTraits.includes(trait)
    )
  )
)

.map((cluster) => {
    let score = 0;
    // STRICT PRIMARY TRAIT CHECK

if (
  cluster.primaryTraits &&
  !cluster.primaryTraits.some(t => topTraits.includes(t))
) {
  return {
    ...cluster,
    matchScore: 0,
    domainMatch: false
  };
}

    const domainMatch = cluster.domains.includes(userDomain);

    if (domainMatch) score += 2;

    topTraits.forEach((trait, index) => {

  const weight = index === 0 ? 3 : index === 1 ? 2 : 1;

  if (cluster.phase2MatchTraits.includes(trait)) {
    score += weight;
  }

});

// ===== TRAIT COMBINATION LOGIC =====

// ONLY allow design careers if creativity exists

if (cluster.id === "design_media") {

  if (!topTraits.includes("creative")) {
    score = 0;
  }
}

// Creative + People → Media
if (
  topTraits.includes("creative") &&
  topTraits.includes("people") &&
  cluster.id === "design_media"
) {
  score += 2;
}

// Analytical + Research → Data
if (
  topTraits.includes("analytical") &&
  topTraits.includes("research") &&
  cluster.id === "data_ai"
) {
  score += 3;
}

// Leadership + People → Business
if (
  topTraits.includes("leadership") &&
  topTraits.includes("people") &&
  cluster.id === "business_management"
) {
  score += 3;
}

// Analytical + Structured → Finance
if (
  topTraits.includes("analytical") &&
  topTraits.includes("structured") &&
  cluster.id === "commerce_finance"
) {
  score += 3;
}
    if (cluster.phase3PreferredPaths.includes(bestPath)) {
      score += 2;
    }

    return {
      ...cluster,
      matchScore: score,
      domainMatch
    };
  })

  .filter(cluster => {
  // allow same domain always
  if (cluster.domainMatch) return true;

  // allow switching ONLY if switchFriendly AND score is decent
  return cluster.switchFriendly && cluster.matchScore >= 4;
})


  .sort((a, b) => b.matchScore - a.matchScore)
  .slice(0, 3);
}

//bestpath
function normalizePath(bestPath) {
  if (bestPath === "certification" || bestPath === "switch") {
    return "explore";
  }

  if (bestPath === "govt") {
    return "job";
  }

  return bestPath;
}

//pathway recommendation
function getTopThreePathways(phase3) {
  const pathwayMap = {
    masters: 6 - (phase3.q16_higher_studies || 3),
    job: 6 - (phase3.q17_job || 3),
    certification: 6 - (phase3.q18_certifications || 3),
    govt: 6 - (phase3.q19_govt || 3),
    switch: 6 - (phase3.q20_switch_domain || 3)
  };

  return Object.entries(pathwayMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
}
/* ===============================
   RENDER RESULT
=============================== */
function renderResult(data) {
  const traits = calculateTraits(data.phase2);
  const topTraits = getTopTraits(traits);
 const topThreePaths = getTopThreePathways(data.phase3);
const bestPath = topThreePaths[0][0];
  const mappedPath = normalizePath(bestPath);

  const userDomain = data.phase1.q1_program;

  const topClusters = matchClusters(
    userDomain,
    topTraits,
    bestPath
  );
  const primaryCluster = topClusters[0];
const clusterKey = primaryCluster.id || "DEFAULT";
const roadmapData =
  UG_NEXT_STEPS_MAP[clusterKey]?.[mappedPath] ||
  UG_NEXT_STEPS_MAP.DEFAULT[mappedPath];

  /* Profile Snapshot */
  document.getElementById("profileText").innerHTML = `
    <strong>Domain:</strong> ${userDomain}<br>
    <strong>Year:</strong> ${data.phase1.q2_year}
  `;

  /* Trait Chips */
  document.getElementById("traitChips").innerHTML =
  topTraits
    .map((trait) => {
      const formatted =
        trait.charAt(0).toUpperCase() + trait.slice(1);

      return `<span class="trait-chip">${formatted}</span>`;
    })
    .join("");

 document.getElementById("traitSummaryText").innerText =
  `Your strongest career tendencies currently align with ${topTraits
    .map(t => t.charAt(0).toUpperCase() + t.slice(1))
    .join(", ")}.`;

  /* Pathway */
  document.getElementById("pathBadge").innerText =
  bestPath;

 document.getElementById("pathwayText").innerHTML = `
  <div><strong>🥇 ${topThreePaths[0][0]}</strong></div>
  <div>🥈 ${topThreePaths[1][0]}</div>
  <div>🥉 ${topThreePaths[2][0]}</div>
`;

  /* Career Cards */
  document.getElementById("careerCards").innerHTML =
  topClusters
    .map((cluster) => {


      return `
      <div class="career-card">
        <h3>${cluster.name}</h3>

        <p><strong>Why it fits:</strong> ${cluster.whyFit[0]}</p><br>

        <p><strong>Field reality:</strong> ${cluster.fieldReality[0]}</p><br>

        <p><strong>Who thrives:</strong> ${cluster.whoThrives[0]}</p><br>

        <p><strong>Roles:</strong> ${
  cluster.id === "design_media"
    ? cluster.roles.slice(0, 8).join(", ")
    : cluster.roles.slice(0, 3).join(", ")
}</p><br>
      </div>
      `;
    })
    .join("");
    
  /* Roadmap */


document.getElementById("roadmap30Days").innerHTML =
  roadmapData
    .slice(0, 1)
    .map(item => `<li>${item}</li>`)
    .join("");

document.getElementById("roadmap3Months").innerHTML =
  roadmapData
    .slice(1, 2)
    .map(item => `<li>${item}</li>`)
    .join("");

document.getElementById("roadmap6Months").innerHTML =
  roadmapData
    .slice(2)
    .map(item => `<li>${item}</li>`)
    .join("");
}


