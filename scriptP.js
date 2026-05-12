// 1. linking all the html boxes to variables so js can talk to them
const loginPage = document.getElementById('login-page');
const studentInput = document.getElementById('student-name');
const welcomeMsg = document.getElementById('welcome-msg');
const quizPage = document.getElementById('quiz-page');
const timerDisplay = document.getElementById('timer');
const resultsPage = document.getElementById('results-page');
const finalScore = document.getElementById('final-score');
const gradeComment = document.getElementById('grade-comment');

// 2. setting the timer to 3600 seconds (which is 1 hour)
// i put it at the top so it's "global" and every function can find it
let timeLeft = 60 * 60; 

let countdown; // this is a placeholder to hold the timer later

// 3. this function runs when the "start practice" button is clicked
function handlelogin() {
    const name = studentInput.value;
 
    // basic check so they dont leave the name blank
    if (name === "") {
        alert("Please enter your name");
        return;
    }

    // this puts the name they typed into the hello message on the next screen
    if (welcomeMsg) {
        welcomeMsg.innerText = "Hello, " + name;
    }

    // this is the screen swap: hiding login and showing the quiz
    loginPage.classList.add('hidden');
    quizPage.classList.remove('hidden');

    // firing off the next two functions to get the timer and questions started
    startTimer();
    renderQuestions();
}

// this function builds the quiz on the screen using the questions list below
function renderQuestions() {
    const container = document.getElementById('question-box');
    
    // .map is basically a loop that creates the html for every single question
    container.innerHTML = questions.map((item, index) => `
        <div style="text-align: left; margin-bottom: 25px; padding: 15px; background: #fff9fa; border-radius: 10px;">
            <p><strong>Question ${index + 1}: ${item.q}</strong></p>
            ${item.options.map(opt => `
                <label style="display: block; margin: 5px 0;">
                    <input type="radio" name="q${index}" value="${opt}"> ${opt}
                </label>
            `).join('')}
        </div>
    `).join('');
}


// 4. this is the logic that makes the clock tick down
function startTimer() {
    // setInterval tells the code to run every 1000 milliseconds (1 second)
     countdown = setInterval(function() {
        timeLeft--; // subtracting 1 second from the total

        // doing the math to turn total seconds into minutes and seconds format
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60; 

        // this updates the timer on the screen. 
        // the ? "0" adds a zero if the seconds are less than 10 (like 09, 08)
        timerDisplay.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;

        // if the clock hits zero, stop everything and auto-submit
        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert("Time's Up");
            submitQuiz();
        } 
    }, 1000);
}

// this function calculates the grade and shows the final result screen
function submitQuiz() {
    clearInterval(countdown); // stops the timer immediately
    
    let correctCount = 0;
    
    // this loop goes through every question and checks if the answer is right
    questions.forEach((item, index) => {
        // querySelector finds the specific "radio" button the user clicked
        const selected = document.querySelector(`input[name="q${index}"]:checked`);
        
        // if they picked the right answer (item.a), add 1 to the score
        if (selected && selected.value === item.a) {
            correctCount++;
        }
    });

    // doing the math for the percentage: (correct / total) * 100
    let percentage = (correctCount / questions.length) * 100;

    // hiding the quiz and showing the final result card
    quizPage.classList.add('hidden');
    resultsPage.classList.remove('hidden');

    // putting the percentage on the screen. .toFixed(0) removes decimals
    finalScore.innerText = "Percentage: " + percentage.toFixed(0) + "%";
    
    // logic to show a different message depending on the score
    if (percentage >= 70) {
        gradeComment.innerText = "Excellent Work!";
    } else if (percentage >= 50) {
        gradeComment.innerText = "Good Job, keep practicing.";
    } else {
        gradeComment.innerText = "Keep studying and try again!";
    }
}

// this is the "database" of all my questions stored as objects in an array
// i put the correct answer as the first option for my demo!
const questions = [
    { q: "Solve for x: 5x - 12 = 18", options: ["6", "2", "4", "10"], a: "6" },
    { q: "What is the square root of 625?", options: ["25", "15", "35", "45"], a: "25" },
    { q: "Calculate 15% of 200", options: ["30", "15", "20", "40"], a: "30" },
    { q: "Simplify: 4(x + 3) - 2x", options: ["2x + 12", "2x + 3", "6x + 12", "2x - 12"], a: "2x + 12" },
    { q: "Find the area of a rectangle with length 12cm and width 5cm", options: ["60cm²", "17cm²", "34cm²", "70cm²"], a: "60cm²" },
    { q: "What is the value of 3³ + 2²?", options: ["31", "13", "25", "35"], a: "31" },
    { q: "If y = 3x + 5, find y when x = 4", options: ["17", "12", "20", "9"], a: "17" },
    { q: "Solve: x/4 = 8", options: ["32", "2", "12", "16"], a: "32" },
    { q: "A triangle has angles 40° and 60°. Find the third angle.", options: ["80°", "100°", "180°", "40°"], a: "80°" },
    { q: "Simplify: (1/2) + (1/4)", options: ["3/4", "2/6", "1/6", "1/2"], a: "3/4" },
    { q: "What is the perimeter of a square with side 9cm?", options: ["36cm", "18cm", "81cm", "27cm"], a: "36cm" },
    { q: "Find the LCM of 6 and 8", options: ["24", "12", "16", "48"], a: "24" },
    { q: "Solve for m: 2m + 10 = 0", options: ["-5", "5", "10", "-10"], a: "-5" },
    { q: "What is 1000 divided by 125?", options: ["8", "4", "6", "10"], a: "8" },
    { q: "If a = 5 and b = 2, find a² - b²", options: ["21", "29", "7", "3"], a: "21" },
    { q: "Convert 0.75 to a fraction", options: ["3/4", "1/4", "1/2", "3/5"], a: "3/4" },
    { q: "Find the average of 10, 20, and 30", options: ["20", "15", "25", "60"], a: "20" },
    { q: "What is the value of Pi (π) to 2 decimal places?", options: ["3.14", "3.12", "3.16", "3.24"], a: "3.14" },
    { q: "Solve: 10 - 2 * 3 + 4", options: ["8", "28", "12", "0"], a: "8" },
    { q: "A shirt costs #5000 and is 10% off. What is the new price?", options: ["#4500", "#4000", "#4900", "#5100"], a: "#4500" },
    { q: "How many sides does a hexagon have?", options: ["6", "5", "7", "8"], a: "6" },
    { q: "Solve for p: 3p = 27", options: ["9", "3", "7", "81"], a: "9" },
    { q: "What is 200 * 0.5?", options: ["100", "150", "250", "400"], a: "100" },
    { q: "If a car travels 100km in 2 hours, what is its speed?", options: ["50km/h", "25km/h", "75km/h", "200km/h"], a: "50km/h" },
    { q: "What is the cube root of 27?", options: ["3", "9", "6", "2"], a: "3" },
    { q: "Solve: 7x = 49", options: ["7", "6", "8", "9"], a: "7" },
    { q: "What is the sum of angles in a triangle?", options: ["180°", "90°", "270°", "360°"], a: "180°" },
    { q: "Find x if 2x + 5 = 15", options: ["5", "10", "15", "20"], a: "5" },
    { q: "What is 2 to the power of 5?", options: ["32", "10", "16", "64"], a: "32" },
    { q: "A circle has a diameter of 10cm. Find the radius.", options: ["5cm", "10cm", "20cm", "2.5cm"], a: "5cm" },
    { q: "Simplify: 10a + 5b - 3a", options: ["7a + 5b", "13a + 5b", "15ab", "7a - 5b"], a: "7a + 5b" },
    { q: "What is the value of 0 squared?", options: ["0", "1", "10", "undefined"], a: "0" },
    { q: "Find the HCF of 12 and 18", options: ["6", "2", "3", "12"], a: "6" },
    { q: "Solve for y: y - 20 = 50", options: ["70", "30", "100", "50"], a: "70" },
    { q: "What is 1/5 as a percentage?", options: ["20%", "10%", "15%", "25%"], a: "20%" },
    { q: "How many degrees are in a right angle?", options: ["90°", "45°", "180°", "360°"], a: "90°" },
    { q: "Solve: 3(2 + 4)", options: ["18", "10", "12", "24"], a: "18" },
    { q: "If x = 10, what is x² - 10?", options: ["90", "0", "100", "110"], a: "90" },
    { q: "What is the next number: 2, 4, 6, 8, ...?", options: ["10", "9", "11", "12"], a: "10" },
    { q: "What is 1/3 of 90?", options: ["30", "10", "20", "40"], a: "30" }
];