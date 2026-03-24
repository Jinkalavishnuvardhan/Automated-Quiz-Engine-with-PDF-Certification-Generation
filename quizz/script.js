/* ============================
   FIREBASE (USE GLOBAL FROM HTML)
============================ */

/* ============================
   QUESTIONS
============================ */

const questions = [

{ question: "What is Full Stack Development?", answers: ["Frontend + Backend + Database","Only Frontend","Only Backend"], correct: 0 },

{ question: "Which language is used for frontend development?", answers: ["HTML","Java","SQL"], correct: 0 },

{ question: "Which language is used for backend in Spring Boot?", answers: ["Java","Python","C"], correct: 0 },

{ question: "Which HTML tag is used to create a hyperlink?", answers: ["<a>","<link>","<href>"], correct: 0 },

{ question: "Which CSS property is used to change text color?", answers: ["color","font-size","background"], correct: 0 },

{ question: "Which JavaScript function is used to print in console?", answers: ["console.log()","print()","log()"], correct: 0 },

{ question: "What is an API?", answers: ["Application Programming Interface","Advanced Programming Input","Application Process Integration"], correct: 0 },

{ question: "Which HTTP method is used to fetch data?", answers: ["GET","POST","DELETE"], correct: 0 },

{ question: "Which HTTP method is used to send data?", answers: ["POST","GET","PUT"], correct: 0 },

{ question: "What does HTTP status 404 mean?", answers: ["Page Not Found","Server Error","Success"], correct: 0 },

{ question: "What does HTTP status 200 mean?", answers: ["Success","Error","Redirect"], correct: 0 },

{ question: "Which annotation is used in Spring Boot for REST APIs?", answers: ["@RestController","@Service","@Repository"], correct: 0 },

{ question: "Which annotation is used for dependency injection?", answers: ["@Autowired","@Override","@Bean"], correct: 0 },

{ question: "Which layer handles business logic in Spring Boot?", answers: ["Service Layer","Controller Layer","Repository Layer"], correct: 0 },

{ question: "Which annotation is used to map GET requests?", answers: ["@GetMapping","@PostMapping","@PutMapping"], correct: 0 },

{ question: "Which SQL command is used to insert data?", answers: ["INSERT","SELECT","DELETE"], correct: 0 },

{ question: "Which SQL command is used to retrieve data?", answers: ["SELECT","UPDATE","DROP"], correct: 0 },

{ question: "Which database is commonly used with Spring Boot?", answers: ["MySQL","Photoshop","Excel"], correct: 0 },

{ question: "Which file is used to manage dependencies in Maven?", answers: ["pom.xml","index.html","style.css"], correct: 0 },

{ question: "What is cloud computing?", answers: ["Storing & accessing data over internet","Using only local storage","Offline computing"], correct: 0 }

];
/* ============================
   VARIABLES
============================ */

let currentQuestion = 0;
let score = 0;
let userName = "";
let VTUNo = "";
let userAnswers = [];
let currentRecordId = null;

/* ============================
   START QUIZ
============================ */

function startQuiz() {
    userName = (document.getElementById("username").value || "").trim();
    VTUNo = (document.getElementById("VTUNo").value || "").trim();

    if (!userName || !VTUNo) {
        alert("Fill all fields");
        return;
    }

    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);

    document.getElementById("startBox").style.display = "none";
    document.getElementById("quizBox").style.display = "block";
    document.getElementById("resultBox").style.display = "none";

    saveStartedRecord();
    loadQuestion();
}

function saveStartedRecord() {
    const data = JSON.parse(localStorage.getItem("quizData")) || [];
    const id = Date.now();
    currentRecordId = id;

    data.push({
        id,
        name: userName,
        vtu: VTUNo,
        score: 0,
        total: questions.length,
        percentage: 0,
        date: new Date().toLocaleString(),
        status: "started"
    });

    localStorage.setItem("quizData", JSON.stringify(data));
}

function updateFinishedRecord() {
    const data = JSON.parse(localStorage.getItem("quizData")) || [];
    const index = data.findIndex(item => item.id === currentRecordId);
    const percent = ((score / questions.length) * 100).toFixed(1);

    if (index >= 0) {
        data[index] = {
            ...data[index],
            score,
            percentage: percent,
            date: new Date().toLocaleString(),
            status: "completed"
        };
    } else {
        data.push({
            id: Date.now(),
            name: userName,
            vtu: VTUNo,
            score,
            total: questions.length,
            percentage: percent,
            date: new Date().toLocaleString(),
            status: "completed"
        });
    }

    localStorage.setItem("quizData", JSON.stringify(data));
}


/* ============================
   LOAD QUESTION
============================ */

function loadQuestion() {

    let q = questions[currentQuestion];

    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1) + " / " + questions.length;

    document.getElementById("question").innerText = q.question;

    let container = document.getElementById("answers");
    container.innerHTML = "";

    q.answers.forEach((ans, i) => {

        let btn = document.createElement("button");

        btn.textContent = ans;

        btn.onclick = function () {
            selectAnswer(i);
        };

        if (userAnswers[currentQuestion] === i) {
            btn.style.background = "#4CAF50";
            btn.style.color = "white";
        }

        container.appendChild(btn);

    });

    /* BUTTON CONTROL */

    const backBtn = document.getElementById("backBtn");
    if (backBtn) {
        backBtn.disabled = currentQuestion === 0;
    }

}


/* ============================
   SELECT ANSWER
============================ */

function selectAnswer(index) {

    userAnswers[currentQuestion] = index;

    loadQuestion();

}


/* ============================
   NEXT QUESTION
============================ */

function nextQuestion() {

    if (userAnswers[currentQuestion] == null) {
        alert("Please select an answer");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        loadQuestion();

    } else {

        document.getElementById("quizBox").style.display = "none";
        document.getElementById("resultBox").style.display = "block";

        calculateScore();

    }

}


/* ============================
   PREVIOUS QUESTION
============================ */

function previousQuestion() {

    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }

}


/* ============================
   SCORE + SAVE TO FIREBASE
============================ */

function calculateScore() {

    score = 0;

    userAnswers.forEach((ans, i) => {
        if (ans === questions[i].correct) {
            score++;
        }
    });

    let percent = (score / questions.length) * 100;

    document.getElementById("score").innerText =
        userName + " scored " + score + " / " + questions.length +
        " (" + percent.toFixed(1) + "%)";

    updateFinishedRecord();
}


/* ============================
   CERTIFICATE
============================ */

function downloadCertificate() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF("landscape");

    let pageWidth = doc.internal.pageSize.width;
    let pageHeight = doc.internal.pageSize.height;

    setTimeout(() => {

        /* COLORFUL BACKDROP */

        doc.setFillColor(240, 248, 255);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20, 'F');

        doc.setFillColor(100, 149, 237);
        doc.rect(10, 10, pageWidth - 20, 40, 'F');

        doc.setFillColor(255, 215, 0);
        doc.rect(10, pageHeight - 30, pageWidth - 20, 20, 'F');

        /* BORDERS */

        doc.setDrawColor(0, 0, 139);
        doc.setLineWidth(4);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

        doc.setDrawColor(255, 165, 0);
        doc.setLineWidth(2);
        doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

        /* HEADER */

        doc.setTextColor(255, 255, 255);
        doc.setFont("times", "bold");
        doc.setFontSize(18);
        doc.text("Vel Tech Rangarajan Dr. Sagunthala", pageWidth / 2, 30, { align: "center" });
        doc.text("R&D Institute of Science and Technology", pageWidth / 2, 42, { align: "center" });

        /* CENTER TITLE */

        doc.setTextColor(0, 0, 139);
        doc.setFontSize(30);
        doc.text("CERTIFICATE OF ACHIEVEMENT", pageWidth / 2, 70, { align: "center" });

        /* COURSE */

        doc.setFontSize(20);
        doc.text("Full Stack", pageWidth / 2, 88, { align: "center" });

        /* NAME BLOCK */

        doc.setFontSize(16);
        doc.text("This certificate is proudly presented to", pageWidth / 2, 108, { align: "center" });

        doc.setTextColor(0, 102, 204);
        doc.setFontSize(28);
        doc.text(userName.toUpperCase(), pageWidth / 2, 128, { align: "center" });

        doc.setTextColor(0, 0, 0);

        /* DETAILS */

        doc.setFontSize(14);
        doc.text("VTU No : " + VTUNo, pageWidth / 2, 142, { align: "center" });
        doc.text("Score : " + score + " / " + questions.length, pageWidth / 2, 158, { align: "center" });
        doc.text("Date : " + new Date().toLocaleDateString(), pageWidth / 2, 172, { align: "center" });

        /* LEFT BOTTOM ID BLOCK REMOVED */

        /* SIGN */

        /* SIGN */

        doc.setFont("courier", "italic");
        doc.setTextColor(150, 0, 0);
        doc.setFontSize(20);

        doc.text("Dr.Sumithra M", pageWidth - 60, pageHeight - 40, { align: "center" });

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);

        doc.text("Authorized Signatory", pageWidth - 60, pageHeight - 30, { align: "center" });

        /* SAVE */

        doc.save("FullStack-Certificate.pdf");

    }, 500);

}


/* ============================
   GLOBAL FUNCTIONS
============================ */

window.startQuiz = startQuiz;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.selectAnswer = selectAnswer;
window.downloadCertificate = downloadCertificate;
