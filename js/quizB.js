const SCALE5 = [
  "Strongly Agree",
  "Agree",
  "Neutral",
  "Disagree",
  "Strongly Disagree"
];

const QUESTIONS = [
  {
    section: 1,
    questions: [
      {
        id: 1,
        text: "Which best describes your current undergraduate program?",
        options: [
          "Engineering / Technology / Computer Applications",
          "Science / Mathematics / Pure Sciences",
          "Life Sciences / Medical / Health Sciences",
          "Commerce / Business / Management",
          "Arts / Humanities / Social Sciences / Law",
          "Design / Architecture / Fine Arts / Media",
          "Other / Interdisciplinary"
        ]
      },
      {
        id: 2,
        text: "Which stage of your undergraduate journey are you currently in?",
        options: [
          "1st year",
          "2nd year",
          "3rd year",
          "4th year",
          "5th year or above",
          "Recently graduated"
        ]
      },
      {
        id: 3,
        text: "How interested do you currently feel in your present field of study?",
        options: [
          "Strongly interested",
          "Interested",
          "Neutral / unsure",
          "Slightly uninterested",
          "Not interested at all"
        ]
      },
      {
        id: 4,
        text: "How open are you to exploring a different career domain?",
        options: [
          "Very open",
          "Somewhat open",
          "Neutral / exploring",
          "Slightly hesitant",
          "Not open at all"
        ]
      }
    ]
  },

  {
    section: 2,
    questions: [
      {
        id: 5,
        text: "I am clear about my next step after graduation.",
        options: SCALE5
      },
      {
        id: 6,
        text: "I enjoy improving existing ideas, systems, or workflows.",
        options: SCALE5
      },
      {
        id: 7,
        text: "I am comfortable solving problems in a structured, step-by-step way.",
        options: SCALE5
      },
      {
        id: 8,
        text: "I naturally pay attention to creativity, presentation, and overall experience.",
        options: SCALE5
      }
    ]
  },

  {
    section: 3,
    questions: [
      {
        id: 9,
        text: "I enjoy understanding people’s needs and working collaboratively.",
        options: SCALE5
      },
      {
        id: 10,
        text: "I like exploring topics deeply beyond what is academically required.",
        options: SCALE5
      },
      {
        id: 11,
        text: "I adapt well when learning something completely new.",
        options: SCALE5
      },
      {
        id: 12,
        text: "I often take initiative in group projects or discussions.",
        options: SCALE5
      }
    ]
  },

  {
    section: 4,
    questions: [
      {
        id: 13,
        text: "I enjoy tasks that involve analysis, comparison, or critical evaluation.",
        options: SCALE5
      },
      {
        id: 14,
        text: "I am motivated by creating meaningful impact through my work.",
        options: SCALE5
      },
      {
        id: 15,
        text: "I am comfortable exploring multiple career possibilities before deciding.",
        options: SCALE5
      },
      {
        id: 16,
        text: "I am interested in pursuing higher studies or specialization after graduation.",
        options: SCALE5
      }
    ]
  },

  {
    section: 5,
    questions: [
      {
        id: 17,
        text: "I would prefer becoming job-ready and entering the workforce soon after graduation.",
        options: SCALE5
      },
      {
        id: 18,
        text: "I am interested in building skills through certifications, internships, or short-term courses.",
        options: SCALE5
      },
      {
        id: 19,
        text: "I am considering preparing for competitive or government examinations.",
        options: SCALE5
      },
      {
        id: 20,
        text: "I am seriously considering transitioning into a different career domain.",
        options: SCALE5
      }
    ]
  }
];

const state = {};
let currentSection = 0;

const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

function renderSection() {
  document.querySelectorAll(".section").forEach((sec, idx) => {
    sec.classList.toggle("active", idx === currentSection);
  });

  document.querySelectorAll(".step-pill").forEach((pill, idx) => {
    pill.classList.toggle("active", idx <= currentSection);
  });

  const sectionEl = document.getElementById(
    `section${currentSection + 1}`
  );

  sectionEl.innerHTML = "";

  QUESTIONS[currentSection].questions.forEach((q) => {
    const card = document.createElement("div");
    card.className = "question-card";

    card.innerHTML = `
      <div class="q-head">
        <span class="q-num">Q${q.id}</span>
        <b>${q.text}</b>
      </div>
      <div class="q-body mcq-grid">
        ${q.options
  .map((opt, i) => {
    const selectedClass =
      state[q.id] === i + 1 ? "selected" : "";

    return `
      <div class="mcq ${selectedClass}"
           onclick="selectOption(${q.id}, ${i + 1}, this)">
        ${opt}
      </div>
    `;
  })
  .join("")}
      </div>
    `;

    sectionEl.appendChild(card);
  });

  backBtn.style.display = currentSection === 0 ? "none" : "inline-block";
  nextBtn.textContent =
    currentSection === 4 ? "Submit" : "Next";
}

function selectOption(qid, value, el) {
  state[qid] = value;

  const siblings = el.parentElement.querySelectorAll(".mcq");
  siblings.forEach((s) => s.classList.remove("selected"));

  el.classList.add("selected");
}

window.selectOption = selectOption;

nextBtn.onclick = () => {
  const currentQuestions =
    QUESTIONS[currentSection].questions;

  const unanswered = currentQuestions.some(
    (q) => state[q.id] === undefined
  );

  if (unanswered) {
    alert(
      "Please answer all questions in this section before continuing."
    );
    return;
  }

  if (currentSection < 4) {
    currentSection++;
    renderSection();
  } else {
  const finalPayload = {
    phase1: {
  q1_program: QUESTIONS[0].questions[0].options[state[1] - 1],
  q2_year: QUESTIONS[0].questions[1].options[state[2] - 1],
  q3_interest: state[3],
  q4_switch: state[4]
},

    phase2: {
      q5_clarity: state[5],
      q6_improvement: state[6],
      q7_logic: state[7],
      q8_creativity: state[8],
      q9_people: state[9],
      q10_research: state[10],
      q11_adaptability: state[11],
      q12_initiative: state[12],
      q13_analysis: state[13],
      q14_impact: state[14],
      q15_exploration: state[15]
    },

    phase3: {
      q16_higher_studies: state[16],
      q17_job: state[17],
      q18_certifications: state[18],
      q19_govt: state[19],
      q20_switch_domain: state[20]
    },

    timestamp: Date.now()
  };

 fetch("php/save_quizB.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(finalPayload)
})
  .then((res) => res.json())
  .then((result) => {
    if (result.success) {
      window.location.href = `result_ug.html?id=${result.insert_id}`;
    } else {
      alert("Failed to save responses.");
    }
  })
  .catch((err) => {
    console.error(err);
    alert("Something went wrong while saving.");
  });
}
};

backBtn.onclick = () => {
  if (currentSection > 0) {
    currentSection--;
    renderSection();
  }
};

renderSection();