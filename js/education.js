const cards = document.querySelectorAll(".level-card");
const streamOptions = document.getElementById("streamOptions");
const subjectOptions = document.getElementById("subjectOptions");
const subjectLabel = document.getElementById("subjectLabel");
const continueBtn = document.getElementById("continueBtn");
const errorMsg = document.getElementById("errorMsg");

let selectedLevel = null;
let selectedStream = null;
let selectedSubject = null;


/* EDUCATION LEVEL SELECTION */

cards.forEach(card => {
  card.onclick = () => {

    cards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");

    selectedLevel = card.dataset.level;

    selectedStream = null;
    selectedSubject = null;

    errorMsg.style.display = "none";

    if (selectedLevel === "class11-12") {
      streamOptions.style.display = "flex";
    } else {
      streamOptions.style.display = "none";
      subjectOptions.style.display = "none";
      subjectLabel.style.display = "none";
    }

  };
});


/* STREAM SELECTION */

document.querySelectorAll("#streamOptions .stream-btn").forEach(btn => {

  btn.onclick = (e) => {

    e.stopPropagation();

    document.querySelectorAll("#streamOptions .stream-btn")
      .forEach(b => b.classList.remove("selected"));

    btn.classList.add("selected");

    selectedStream = btn.dataset.stream;

    showSubjects(selectedStream);
  };

});


/* SHOW SUBJECTS */

function showSubjects(stream){

  subjectOptions.innerHTML = "";
  selectedSubject = null;

  const subjects = {
    science: ["PCM","PCB","PCMB"],
    commerce: ["Maths","Non-Maths"]
  };

  if(!subjects[stream]){
    subjectOptions.style.display = "none";
    subjectLabel.style.display = "none";
    return;
  }

  subjects[stream].forEach(sub => {

    const btn = document.createElement("button");

    btn.className = "stream-btn";
    btn.textContent = sub;

    btn.onclick = (e) => {

      e.stopPropagation();

      document.querySelectorAll("#subjectOptions .stream-btn")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");

      selectedSubject = sub;
    };

    subjectOptions.appendChild(btn);
  });

  subjectLabel.style.display = "block";
  subjectOptions.style.display = "flex";
}


/* CONTINUE BUTTON */

continueBtn.onclick = (e) => {

  e.preventDefault();

  if(!selectedLevel)
    return showError("Please select your education level.");

  if(selectedLevel === "class11-12"){

    if(!selectedStream)
      return showError("Please select a stream.");

    if(["science","commerce"].includes(selectedStream) && !selectedSubject)
      return showError("Please select a subject combination.");
  }

  localStorage.setItem(
    "edumap_user_level",
    JSON.stringify({
      level:selectedLevel,
      stream:selectedStream,
      subject:selectedSubject
    })
  );

  window.location.href =
    (selectedLevel === "class9-10" || selectedLevel === "class11-12")
      ? "quizA.html"
      : "quizB.html";

};


/* ERROR MESSAGE */

function showError(msg){
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
}