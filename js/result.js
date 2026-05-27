/* =========================================================
   EduMap Result Engine
   Handles:
   - Class 9–10 stream guidance
   - Class 11–12 career directions
========================================================= */

import { DIMENSIONS } from "../config/dimensions.js";
import { CAREER_CLUSTERS } from "../config/careerClusters.js";
import { CAREER_MAP_11_12 } from "../config/careerMap11_12.js";

/* ---------------------------------------------------------
   Helpers
--------------------------------------------------------- */

function cloneDimensions(){
  return JSON.parse(JSON.stringify(DIMENSIONS));
}

/* Better normalization (prevents constant 100%) */

function normalize(scores){

const values = Object.values(scores);

const max = Math.max(...values);
const min = Math.min(...values);

Object.keys(scores).forEach(k=>{

const scaled = (scores[k] - min) / (max - min || 1);

/* scale between 55 and 90 */

scores[k] = Math.round(55 + scaled * 35);

});

return scores;

}

function formatTraitName(trait){

  const map = {
    creative:"Creative Thinking",
    analytical:"Logical Thinking",
    technical:"Technical Curiosity",
    people:"Social Skills",
    leadership:"Leadership Ability",
    structured:"Organized Thinking"
  };

  return map[trait] || trait;
}

/* ---------------------------------------------------------
   QUIZ SCORING
--------------------------------------------------------- */

function scoreQuizA(answers){

const s = cloneDimensions();

/* Primary traits */

answers.forEach(ans => {

if(ans === 0) s.creative += 1;
if(ans === 1) s.analytical += 1;
if(ans === 2) s.people += 1;
if(ans === 3) s.leadership += 1;

});

/* Derived traits (weaker influence) */

s.technical =
Math.round(s.analytical * 0.7 + s.creative * 0.3);

s.structured =
Math.round(s.analytical * 0.6 + s.leadership * 0.4);

return s;

}
/* ---------------------------------------------------------
   STREAM RECOMMENDATION (9–10)
--------------------------------------------------------- */

function recommendStreams(scores){

  const science =
    scores.analytical * 0.45 +
    scores.technical * 0.35 +
    scores.structured * 0.20;

  const commerce =
    scores.leadership * 0.40 +
    scores.people * 0.30 +
    scores.analytical * 0.30;

  const arts =
    scores.creative * 0.45 +
    scores.people * 0.35 +
    scores.leadership * 0.20;

  const streams = [

    {
      name:"Science",
      score:Math.round(science),
      reason:"strong analytical and problem-solving abilities",
      careers:["Engineering","Medicine","Research","Technology"]
    },

    {
      name:"Commerce",
      score:Math.round(commerce),
      reason:"leadership and decision-making strengths",
      careers:["Business","Finance","Economics","Entrepreneurship"]
    },

    {
      name:"Arts",
      score:Math.round(arts),
      reason:"creative thinking and communication skills",
      careers:["Design","Psychology","Media","Humanities"]
    }

  ];

  return streams.sort((a,b)=>b.score-a.score);
}

/* ---------------------------------------------------------
   RENDER STREAM RESULT
--------------------------------------------------------- */

function renderStreamResult(stream){

  const box = document.getElementById("streamCard");

  box.innerHTML = `
  <div class="stream-card">

    <div class="stream-title">🎓 Recommended Stream</div>

    <div class="stream-badge">${stream.name}</div>

    <p class="stream-reason">
      Based on your responses, you show ${stream.reason}.
    </p>

    <div class="stream-careers">
      ${stream.careers.map(c=>`<span class="stream-pill">${c}</span>`).join("")}
    </div>

  </div>
  `;
}

/* ---------------------------------------------------------
   STREAM COMPATIBILITY BARS
--------------------------------------------------------- */

function renderStreamScores(streams){

const container = document.getElementById("streamCard");

container.innerHTML += `
<div class="stream-compatibility">

<h4 style="margin-top:18px;margin-bottom:10px;">
Stream Compatibility
</h4>

${streams.map(s=>`

<div class="stream-row">

<div class="stream-label">
<span>${s.name}</span>
<span>${s.score}%</span>
</div>

<div class="stream-bar">
<div class="stream-fill" style="width:${s.score}%"></div>
</div>

</div>

`).join("")}

</div>
`;

}
/* ---------------------------------------------------------
   STRENGTH PROFILE
--------------------------------------------------------- */

function renderStrengths(scores){

  const box = document.getElementById("strengthsContainer");

  box.innerHTML = "";

  Object.entries(scores)
    .sort((a,b)=>b[1]-a[1])
    .forEach(([k,v])=>{

      box.innerHTML += `
<div class="strength-item">

<div class="strength-header">
<span>${formatTraitName(k)}</span>
<span>${v}%</span>
</div>

<div class="strength-bar">
<div class="strength-fill" style="width:${v}%"></div>
</div>

</div>
`;
    });

}

/* ---------------------------------------------------------
   CAREER CLUSTERS (9–10)
--------------------------------------------------------- */

function renderCareerClusters(scores, stream){

const grid = document.getElementById("careerGrid");

const streamTraits = {

Science:["technical","analytical"],
Commerce:["leadership","structured"],
Arts:["creative","people"]

};

const allowedTraits = streamTraits[stream.name] || [];

const filtered = CAREER_CLUSTERS.filter(cluster =>
cluster.traits.some(t => allowedTraits.includes(t))
);

const ranked = filtered.map(cluster => {

let score = 0;

// ✅ FIX: use average instead of total
cluster.traits.forEach(t=>{
  score += scores[t] || 0;
});

score = score / cluster.traits.length;

// 🔥 BONUS: boost dominant trait (creative)
if(scores.creative >= 80 && cluster.traits.includes("creative")){
  score += 10;
}

return {...cluster, score};

})
.sort((a,b)=>b.score-a.score)
.slice(0,5);

grid.innerHTML = ranked.map(c=>`
<div class="career-card">
<h4>${c.name}</h4>
<p>${c.examples.join(", ")}</p>
</div>
`).join("");

}

/* ---------------------------------------------------------
   CAREER RANKING (11–12)
--------------------------------------------------------- */

function rankCareersByAptitude(careers, scores, subject){

  return careers.map(c=>{

    let score = 0;

    // ✅ FIX 1: use average (not total)
    c.traits.forEach(t=>{
      score += (scores[t] || 0) / c.traits.length;
    });

    // ✅ FIX 2: small subject boost (keeps domain relevant)
    if(subject){
      score += 20;
    }

    return {...c, score};

  }).sort((a,b)=>b.score-a.score);

}

function analyzeCareerFit(career, scores){

const strong = [];
const developing = [];
const weak = [];

career.traits.forEach(trait => {

const value = scores[trait] || 0;

if(value >= 75){
strong.push(formatTraitName(trait));
}
else if(value >= 55){
developing.push(formatTraitName(trait));
}
else{
weak.push(formatTraitName(trait));
}

});

return { strong, developing, weak };

}
/* ---------------------------------------------------------
   CONFIDENCE LEVEL
--------------------------------------------------------- */

function getConfidenceLevel(career, scores){

  let total = 0;

  career.traits.forEach(t=>{
    total += scores[t] || 0;
  });

  const avg = total / career.traits.length;

  if(avg >= 70) return {label:"High", color:"#2e7d32"};
  if(avg >= 50) return {label:"Moderate", color:"#f9a825"};

  return {label:"Needs Improvement", color:"#c62828"};
}

/* ---------------------------------------------------------
   RENDER CAREERS (11–12)
--------------------------------------------------------- */

function renderCareers11_12(primary, optional, scores){

const grid = document.getElementById("careerGrid");

grid.innerHTML = `
<div style="grid-column:1/-1;margin-bottom:12px;">
<p style="font-size:0.95rem;color:#555;">
Based on your aptitude profile and subject choices,
the following career paths are recommended.
</p>
</div>
`;

primary.forEach(career => {

const { strong, developing, weak } = analyzeCareerFit(career, scores);

const confidence = getConfidenceLevel(career, scores);

grid.innerHTML += `
<div class="career-card">

<h4>${career.name}</h4>

<p class="confidence-badge"
style="background:${confidence.color}">
Confidence Level: ${confidence.label}
</p>

<p>

<strong>Why this fits you:</strong><br>

${
strong.length
? `You demonstrate strong ${strong.join(", ")} abilities required for this field.`
: `You show foundational skills required for this career path.`
}

</p>

${
weak.length
? `<p style="color:#c62828;">
<strong>Areas to improve:</strong><br>
You need to improve ${weak.join(", ")} to succeed in this field.
</p>`
: developing.length
? `<p style="color:#f9a825;">
<strong>Areas to strengthen:</strong><br>
Improving ${developing.join(", ")} will increase your confidence.
</p>`
: `<p style="color:#2e7d32;">
You already match all core requirements of this career path.
</p>`
}

<p><strong>Exams:</strong> ${career.exams.join(", ")}</p>

<p><strong>Degrees:</strong> ${career.degrees.join(", ")}</p>

</div>
`;

});

if(optional?.length){

grid.innerHTML += `
<div class="career-card explore-card">

<h4>🌱 You may also explore</h4>

<p>
${optional.map(o=>o.name).join(", ")}
</p>

<p style="font-size:0.85rem;color:#777;">
These careers partially match your strengths and
can be explored with additional effort.
</p>

</div>
`;
}
}

/* ---------------------------------------------------------
   NEXT STEPS
--------------------------------------------------------- */

function renderNextSteps(){
  const list = document.getElementById("nextSteps");

  const steps = [

    "Observe which subjects excite you most",
    "Explore real careers related to your strengths",
    "Participate in activities that build your skills",
    "Talk with teachers or mentors about future options"

  ];

  list.innerHTML = steps.map(s=>`<li>${s}</li>`).join("");

}

function renderNextPath(stream){

const box = document.getElementById("nextPathBox");

if(!box) return;

box.innerHTML = `
<p>
If you continue with the <strong>${stream.name}</strong> stream,
focus on developing subjects and skills related to it.
Exploring activities connected to this field will help you
understand whether it truly suits your interests.
</p>
`;

}

/* ---------------------------------------------------------
   MAIN INIT
--------------------------------------------------------- */

(function initResult(){

  const id = new URLSearchParams(window.location.search).get("id");

  if(!id){
    alert("No result ID found");
    return;
  }


  fetch(`php/get_result.php?id=${id}`)
  .then(res=>res.json())
  .then(data=>{

    if(!data.success){
      alert("Result not found");
      return;
    }

    const answers = data.responses?.answers;

    const userLevel = {
  level: data.user_level,
  stream: data.responses?.stream,
  subject: data.responses?.subject
};

    if(!answers){
      alert("Answers missing");
      return;
    }

    const rawScores = scoreQuizA(answers);
    const scores = normalize(rawScores);

    renderStrengths(scores);

    /* CLASS 9–10 */

    if(userLevel?.level === "class9-10"){

const streams = recommendStreams(scores);

const bestStream = streams[0];
const secondStream = streams[1];

const gap = bestStream.score - secondStream.score;

let message = "";

if(gap <= 4){

message =
`Your strengths fit both ${bestStream.name} and ${secondStream.name}.
Exploring subjects from both streams may help you decide.`;

}
else if(gap <= 10){

message =
`${bestStream.name} appears slightly stronger than ${secondStream.name}
based on your responses.`;

}
else{

message =
`${bestStream.name} strongly matches your thinking style and interests.`;

}

bestStream.reason = message;

renderStreamResult(bestStream);
renderStreamScores(streams);   
renderCareerClusters(scores, bestStream);
renderNextPath(bestStream);
renderNextSteps();

return;

}

    /* CLASS 11–12 */

    if(userLevel?.level === "class11-12"){
     const streamBox = document.getElementById("streamCard");

const streamName = userLevel.stream
  ? userLevel.stream.charAt(0).toUpperCase() + userLevel.stream.slice(1)
  : "Selected Stream";

const subjectCombo = userLevel.subject || "General Combination";

streamBox.innerHTML = `
<div class="stream-card">

<div class="stream-title">
🎓 Career Fit Analysis
</div>

<div class="stream-badge">
${streamName} • ${subjectCombo}
</div>

<p class="stream-reason">
Your career recommendations are generated by combining
your selected <strong>${streamName}</strong> stream and
<strong>${subjectCombo}</strong> subject combination with
your aptitude profile from the interest assessment.
</p>

</div>
`;
      const stream = userLevel.stream;
const subject = userLevel.subject; 

      let options = [];

if(stream === "arts"){
  options = CAREER_MAP_11_12.arts;
}
else if(stream && subject && CAREER_MAP_11_12[stream]){
  options = CAREER_MAP_11_12[stream][subject] || [];
}

/* fallback if nothing found */
if(options.length === 0){
  options = CAREER_MAP_11_12.arts;
}

      const ranked = rankCareersByAptitude(options, scores, subject);

let primary = ranked.slice(0,3);
const optional = ranked.slice(3,5);
// 🔥 Ensure creative career appears if creativity is high
if(scores.creative >= 75){

  const creativeCareer = ranked.find(c =>
  c.traits.includes("creative")
) || ranked[0]; // fallback

  if(creativeCareer && !primary.includes(creativeCareer)){
    primary[primary.length - 1] = creativeCareer;
  }
}
      renderCareers11_12(primary, optional, scores);
      renderNextSteps();
      renderNextPath(primary[0]);

    }

  })
  .catch(err=>{
    console.error(err);
    alert("Error loading result");
  });

})();


