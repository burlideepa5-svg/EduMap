/* =============================
   QUIZ QUESTIONS (20 MCQs)
============================= */

const questions = [

{
q:"When you enter a new place for the first time, what do you usually notice first?",
o:[
"Interesting details or unusual ideas",
"How things are built or functioning",
"What people are doing or discussing",
"How everything is arranged or organized"
]
},

{
q:"You come across a difficult puzzle or challenge. What do you naturally do?",
o:[
"Try a completely new approach",
"Break the problem into smaller steps",
"Ask others what they think",
"Create a plan to solve it"
]
},

{
q:"When you start using something new (an app, a tool, a game), you usually:",
o:[
"Explore possibilities and experiment",
"Understand how the system works",
"Notice how people interact with it",
"Look for the structure or rules"
]
},

{
q:"When watching videos online, which type keeps your attention the longest?",
o:[
"Videos showing new ideas or experiments",
"Videos explaining how things work",
"Videos about people and their experiences",
"Videos about strategy or decision making"
]
},

{
q:"If you had an hour completely free, what would you most likely do?",
o:[
"Try something new just out of curiosity",
"Solve a puzzle or explore something complex",
"Talk with someone or share ideas",
"Plan something useful"
]
},

{
q:"When facing a new challenge, your first instinct is to:",
o:[
"Think of possibilities others might not see",
"Understand the logic behind the problem",
"Discuss it with people around you",
"Decide the best way to move forward"
]
},

{
q:"Your class is preparing for an event. What do you usually start doing?",
o:[
"Suggest interesting ideas for the event",
"Figure out how things should work",
"Talk to others to gather opinions",
"Decide how tasks should be handled"
]
},

{
q:"During a group project you usually become the person who:",
o:[
"Suggests different ways to approach it",
"Solves difficult parts of the task",
"Keeps everyone involved",
"Makes sure everything stays on track"
]
},

{
q:"When a teacher gives a long explanation in class, you are usually:",
o:[
"Thinking about other ways the idea could be used",
"Trying to understand the logic behind it",
"Connecting it to real-life examples",
"Writing notes in an organized way"
]
},

{
q:"If a project deadline is approaching, what do you usually focus on first?",
o:[
"Improving the idea or concept",
"Solving the hardest problem in it",
"Helping the group stay motivated",
"Making sure everything is finished properly"
]
},

{
q:"During school events or activities, you are more likely to:",
o:[
"Suggest something new to try",
"Focus on making things work smoothly",
"Connect with people involved",
"Ensure everything is well organized"
]
},

{
q:"When something confusing happens during class work, you usually:",
o:[
"Try to look at it from a different angle",
"Analyze what exactly went wrong",
"Ask others for their perspective",
"Decide the next step to fix it"
]
},

{
q:"When working on something important, you usually prefer to:",
o:[
"Explore different possibilities",
"Understand the problem deeply",
"Work together with others",
"Follow a clear system"
]
},

{
q:"When people around you are confused about what to do, you usually:",
o:[
"Suggest a different idea",
"Focus on solving the issue",
"Try to understand everyone's views",
"Guide the group toward a decision"
]
},

{
q:"When learning something new, you usually start by:",
o:[
"Experimenting with it",
"Understanding how it works",
"Talking about it with others",
"Creating a structured approach"
]
},

{
q:"Which situation would feel the most frustrating for you?",
o:[
"Being forced to follow the same method every time",
"Facing a problem that has no logical explanation",
"Working completely alone with no interaction",
"Working in chaos without clear direction"
]
},

{
q:"When thinking about your future work, what excites you most?",
o:[
"Bringing new ideas into reality",
"Solving difficult challenges",
"Helping people or communities",
"Leading something meaningful"
]
},

{
q:"Which kind of achievement would feel the most satisfying?",
o:[
"Creating something original",
"Discovering a solution",
"Improving someone's life",
"Successfully managing a major goal"
]
},

{
q:"If you could make an impact in the world, you would prefer to:",
o:[
"Introduce new ideas or concepts",
"Solve important problems",
"Support people and communities",
"Build systems that work well"
]
},

{
q:"When you imagine success in the future, you picture yourself:",
o:[
"Turning ideas into reality",
"Solving complex challenges",
"Helping others grow",
"Leading important work"
]
}

];


/* =============================
   QUIZ LOGIC
============================= */

let currentQ = 0;
let answers = new Array(questions.length).fill(null);

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const errorMsg = document.getElementById("errorMsg");
const progressBar = document.getElementById("progressBar");


/* =============================
   LOAD QUESTION
============================= */

function loadQuestion(){

const q = questions[currentQ];

questionNumber.textContent = `Question ${currentQ + 1} of ${questions.length}`;
questionText.textContent = q.q;

optionsContainer.innerHTML = "";

q.o.forEach((optText,index)=>{

const option = document.createElement("div");
option.classList.add("option-card");
option.textContent = optText;

if(answers[currentQ] === index){
option.classList.add("selected");
}

option.addEventListener("click",()=>{

answers[currentQ] = index;
loadQuestion();
errorMsg.style.display = "none";

});

optionsContainer.appendChild(option);

});


const progressPercent = ((currentQ) / questions.length) * 100;
progressBar.style.width = `${progressPercent}%`;

prevBtn.disabled = currentQ === 0;

nextBtn.textContent = currentQ === questions.length - 1 ? "Submit" : "Next";

}

loadQuestion();


/* =============================
   NAVIGATION
============================= */

nextBtn.addEventListener("click",()=>{

if(answers[currentQ] === null){
errorMsg.style.display = "block";
return;
}

if(currentQ === questions.length - 1){
finishQuiz();
return;
}

currentQ++;
loadQuestion();

});

prevBtn.addEventListener("click",()=>{

if(currentQ > 0){
currentQ--;
loadQuestion();
}

});


/* =============================
   FINISH QUIZ
============================= */

function finishQuiz() {

  const levelData = JSON.parse(localStorage.getItem("edumap_user_level"));

const payload = {
  answers: answers,
  user_level: levelData.level,
  stream: levelData.stream,    
  subject: levelData.subject,   
  timestamp: Date.now()
};

  fetch("php/save_quizA.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => {

    if (data.success) {
      window.location.href = `result.html?id=${data.insert_id}`;
    }
    else {
      alert("Failed to save quiz");
    }

  })
  .catch(() => {
    alert("Server error");
  });
}