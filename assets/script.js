Reveal.initialize({
	controls: false,
	hash: false,
	progress: false,
	keyboard: false, 
	touch: false,
	autoSlideStoppable: false,
	postMessage: false,
	hideInactiveCursor: false,
	// transitions btwn sections
	transition: 'none',
	backgroundTransition: 'none',
	transitionSpeed: 'slow',
	center: false,
	// responsive
	width: "85%",
	height: "85%",
	margin: 0.01,
	minScale: 1, // no scale, hard code responsiveness
	maxScale: 1
});


/*********************************************
  MOBILE HAMBURGER MENU
 *********************************************/
const hamburger = document.querySelector(".hamburger-menu");
const navLinks = document.querySelector(".mobile-nav-items");
const links = document.querySelectorAll(".mobile-nav-items li");
/* when hamburger button clicked, toggle the .open class
   when hamburger menu opened, each link will toggle .fade class which adds the ease in animation*/
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach(link => {
    link.classList.toggle("fade");
  });
});

/*********************************************
  MODALS
 *********************************************/
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach(item => {
	item.addEventListener("click", () => {
		const modal = document.querySelector(item.dataset.modalTarget);
		openModal(modal);
	})
});

closeModalButtons.forEach(item => {
	item.addEventListener("click", () => {
		const modal = item.closest(".modal");
		closeModal(modal);
	})
});

overlay.addEventListener("click", () => {
	const modals = document.querySelectorAll(".modal.active");
	modals.forEach(modal => {
		closeModal(modal);
	})
});

function openModal(modal) {
	if (modal == null) return;
	modal.classList.add("active");
	overlay.classList.add("active");
};

function closeModal(modal) {
	if (modal == null) return;
	modal.classList.remove("active");
	overlay.classList.remove("active");
};


/*********************************************
  testing stuff
 *********************************************/
let increaseButton = document.getElementById("increase-test");
function nextSlide() {
	Reveal.next();
	console.log("Reveal next, onto: " + Reveal.getSlidePastCount());
}

function goTo(x) {
	Reveal.slide(x);
	console.log("Going to slide: " + x);
}

function consoleTest(x) {
	console.log("It worked! " + x);
}



document.querySelectorAll(".nextPrompt").forEach(item => {
	item.addEventListener("click", event => nextSlide());
});

/*********************************************
  General Utility
 *********************************************/
function commaFormat(value) {
	return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // regex to put commas into numbers
};

function intFormat(value) {
	return parseInt(value.replace(/,/g, ""), 10);
};

function toggleVisibility(element) { element.classList.toggle("temp-no-display") };

function removeAllNoDisplay() { // we can use this for testing, call function in console
	const hiddenElements = document.getElementsByClassName("temp-no-display");
	while (hiddenElements.length)  // list api method is live and changes are reflected automatically
		hiddenElements[0].classList.remove("temp-no-display");
};

const randomizeList = (a, b) => 0.5 - Math.random(); // use in array.sort(randomizeList);

 // implement the method used here when there's extra time
 // https://jshakespeare.com/simple-count-up-number-animation-javascript-react/
 // which adds acceleration to the ending 
function countingAnimation(element, start, end, duration) {
    const range = end - start;
    // calc step time to show all interediate values
    let stepTime = Math.abs(Math.floor(duration / range));
    // never go below 50ms
    stepTime = Math.max(stepTime, 50);
    
    // get current time and calculate desired end time
    const startTime = new Date().getTime();
    const endTime = startTime + duration;
    let timer;
  
    function run() {
        const now = new Date().getTime();
        const remaining = Math.max((endTime - now) / duration, 0);
        const value = Math.round(end - (remaining * range));
        element.innerHTML = commaFormat(value);
        if (value == end) {
            clearInterval(timer);
        };
    };
    
    timer = setInterval(run, stepTime);
    run();
};

/*********************************************
  Counters
 *********************************************/
const counterParentDiv = document.getElementById("counters");
const populationCounter = document.getElementById("population-counter");
const deathsCounter = document.getElementById("deaths-counter");
const hospitalCounter = document.getElementById("hospital-capacity");
const virusCounter = document.getElementById("virus-positivity");

let populationData = 1000000;
let deathData = "?"; // stat not unlocked in the beginning of the game
let hospitalData = 8;
let virusData = "?"; // stat not unlocked in the beginning of the game

populationCounter.textContent = commaFormat(populationData); // in case animation doesn't run
deathsCounter.textContent = deathData;
hospitalCounter.textContent = hospitalData;
virusCounter.textContent = virusData;

function newMonthCounters() { // simluate real world, natural data movement

}

function changeCounters(death, hospital, positive) {
	if (deathData === "?" || virusData === "?") { 
		// deaths & virus positivity rate not unlocked yet, so don't change
		countingAnimation(hospitalCounter, hospitalData, hospitalData + hospital, 2000);
		hospitalData += hospital;
	} else {
		countingAnimation(populationCounter, populationData, populationData - death, 2000);
		populationData -= death; 
		countingAnimation(deathsCounter, deathData, deathData + death, 2000);
		deathData += death;
		countingAnimation(hospitalCounter, hospitalData, hospitalData + hospital, 2000);
		hospitalData += hospital;
		countingAnimation(virusCounter, virusData, virusData + positive, 2000);
		virusData += positive;
	};
	checkLosing();
};

const checkLosing = () => {
	if (deathData <= 10000 || hospitalData >= 100 || virusData >= 50) return true;
} 
// if losing send to losing screen Reveal.slide(10);

// function checkLosing() {
// 	if (deathData <= 10000) {
// 		// losing due to death
// 	} else if (hospitalData >= 100) {
// 		// losing due to hospital overfill
// 	} else if (virusData >= 50) {
// 		// losing due one in two people has virus likely
// 	}
// }


/*********************************************
  Loading Prompts
 *********************************************/
 let monthQuestionAnswered = 0;
 let totalQuestionAnswered = 0;
/*
  if (question's hint) {
 	display and set value
 } */

const loadInPrompt = element => element.classList.add("prompt-load-animation");
const loadOutPrompt = element => {
	element.classList.add("prompt-exit-animation");
	// add later to change cursor to default bc hover still can see cursor
};

function insertNewPrompt(promptNumber) { // promptNumber corresponds to the element index of the promptData array
	const newPromptInfo = promptData[promptNumber];

    const newSection = document.createElement("section"); // create entire new section for new screen
    newSection.classList.add("center", "future");

    this.newDiv = document.createElement("div"); // container for everything on the new screen
    if (Object.keys(newPromptInfo["optionChoices"]).length >= 3) {
    	newDiv.classList.add("margin-top-more"); // extra spacing so it doesn't hit counters for mobile
    } else {
    	newDiv.classList.add("margin-top");
    }
    newDiv.dataset.promptNum = promptNumber;

    const promptDiv = document.createElement("div"); // div for the actual prompt & add the question from array
    promptDiv.classList.add("prompt");
    promptDiv.innerHTML = "<h6>" + newPromptInfo["prompt"] +"</h6>";
    
    const questionDiv = document.createElement("div"); // div for the question below prompt
    questionDiv.classList.add("question");
    questionDiv.appendChild(document.createTextNode(newPromptInfo["question"]));
    
    const optionDiv = createOptions(newPromptInfo["optionChoices"]);

    newDiv.appendChild(promptDiv);
    newDiv.appendChild(questionDiv);
    newDiv.append(optionDiv);
    newSection.appendChild(newDiv);

    Reveal.getSlidesElement().append(newSection);
    Reveal.sync();

};

function createOptions(optionsInfo) {
	const optionCount = Object.keys(optionsInfo).length;
	let optionClassNames;

	// parent option div
	const parentOption = document.createElement("div"); 
	// add the right class for # amount option choices
	switch(optionCount) {
		case 2:
			parentOption.classList.add("two-option-section", "disable-selection");
			optionClassNames = ["option"];
			twoOrFourOptions();
			console.log("TWOOOO options");
			break;
		case 3:
			parentOption.classList.add("three-option-section", "disable-selection");
			optionClassNames = ["option", "three-option"];
			threeOptions();
			console.log("THREEEE options");
			break;
		case 4:
			parentOption.classList.add("two-option-section", "four-option-section", "disable-selection");
			optionClassNames = ["option", "four-option"];
			twoOrFourOptions();
			console.log("FOURRRRRRR options");
			break;
		default:
			console.log("!!! Option amount is not btwn. 2-4 !!!");
	};

	function twoOrFourOptions() { // NEED MORE SPACING ON ROW S
		let optionsList = loopAllOptions();
		optionsList.forEach(innerOptionDiv => {parentOption.appendChild(innerOptionDiv)}); // append every option created above to parent div
	};

	function threeOptions() { // need another function bc element styling different
		let optionsList = loopAllOptions();
		// instead of .forEach loop, manually add them in bc it needs to be in different row divs
		const row1 = document.createElement("div");
		row1.classList.add("three-option-row1");
		row1.appendChild(optionsList[0]);
		row1.appendChild(optionsList[1]);

		const row2 = document.createElement("div");
		row2.classList.add("three-option-row2");
		row2.appendChild(optionsList[2]);

		parentOption.appendChild(row1);
		parentOption.appendChild(row2);
	};

   	function loopAllOptions() {
   		let allOptions = []
   		const divLoadOut = this.newDiv;
		Object.keys(optionsInfo).forEach(option => { // loop through to add values
			let optionIndex = allOptions.push(document.createElement("div")) - 1; // push to the list, which returns count of list, index will be -1
			optionClassNames.forEach(className => {allOptions[optionIndex].classList.add(className)}); // loops thru all classes needed & add
			allOptions[optionIndex].title = option;
			allOptions[optionIndex].appendChild(document.createTextNode(option)); // insert the actual text
			// add the data attributes so changes can be reflected
			// allOptions[optionIndex].dataset.resultID = optionsInfo[option]["resultID"];
			// allOptions[optionIndex].dataset.deathChange = optionsInfo[option]["deathChange"];
			// allOptions[optionIndex].dataset.hospitalChange = optionsInfo[option]["hospitalChange"];
			// allOptions[optionIndex].dataset.positivityChange = optionsInfo[option]["positivityRateChange"];
			// add event listeners
			allOptions[optionIndex].addEventListener("click", function optionClicked() {
				monthQuestionAnswered++;
				totalQuestionAnswered++;
				loadOutPrompt(divLoadOut);
				changeCounters(optionsInfo[option]["deathChange"], optionsInfo[option]["hospitalChange"], optionsInfo[option]["positivityRateChange"]);
				setResultBody(resultData[optionsInfo[option]["resultID"]]);
				loadInResult();
				allOptions[optionIndex].removeEventListener("click", optionClicked);
			});
		});
		return allOptions;
   	}

   	return parentOption;
};

function startLoadingEventListeners() {
	Reveal.on("slidechanged", loadAnimations);
};

function loadAnimations() {
	console.log("new section");
	let promptToBeLoaded = document.querySelector("div.slides > section.center.present > div"); // selects the present loading animation div
	loadInPrompt(promptToBeLoaded);
};

/*********************************************
  Result Circle
 *********************************************/
const resultCircle = document.getElementById("result");
const resultBody = document.querySelector("#result > span.result-text");
const resultContinue = document.querySelector("#result > div");

const loadInResult = () => {
	let clueButton = document.querySelector(".clue");
	clueButton.classList.add("temp-no-display");
	resultCircle.classList.remove("no-display");
	resultCircle.classList.remove("result-exit-animation");
	resultCircle.classList.add("result-load-animation");
	resultContinue.addEventListener("click", continueAfterResult);
};
const exitOutResult = () => {
	resultCircle.classList.add("result-exit-animation");
	resultCircle.addEventListener("animationend", resultDisplayNone);
	resultCircle.addEventListener("webkitAnimationEnd", resultDisplayNone);
};
const resultDisplayNone = () => {
	resultCircle.classList.add("no-display");
	removeResultEvent();
};
const removeResultEvent = () => {
	resultCircle.removeEventListener("animationend", resultDisplayNone);
	resultCircle.removeEventListener("webkitAnimationEnd", resultDisplayNone);
};

const setResultBody = info => {resultBody.textContent = info};

function continueAfterResult() {
	exitOutResult();
	resultCircle.classList.remove("result-load-animation");
	// check if lost code here
	// or win or last slide etc or last prompt in month or last month
	// if (lost) xyz
	let monthScreenElements;
	if (lastPromptOfMonth()) {
		monthScreenElements = newMonthScreen(currentMonthName);
		monthScreenElements[3].classList.remove("no-animations");
		monthScreenElements.forEach(element => element.classList.add("rotateIn"));
	}
	Reveal.next(); 
	resultContinue.removeEventListener("click", continueAfterResult);
};

const lastPromptOfMonth = () => monthQuestionAnswered >= monthlyQuestions[currentMonthName]["questions"].length;

/*********************************************
  Nation Input & More Info Screen
 *********************************************/
// constants for the functions about inserting new nation name
const submitName = document.getElementById("submitName");
const inputName = document.getElementById("inputName");
const errorElement = document.getElementById("error");
const audio = new Audio("assets/music/demised_to_shield_end_portion.mp3");
audio.volume = 0.05; // lower volume to 0.05 from 0.5
const mute = document.getElementById("mute");

function mutePlay() {
	audio.play();
	mute.addEventListener("click", () => {
		if (audio.muted) {
			audio.muted = false;
			console.log("cici cute");
			mute.style.background = "url('assets/icons/speaker.svg') no-repeat";
		} else {
			audio.muted = true;
			console.log("cici cutest");
			mute.style.background = "url('assets/icons/mute.svg') no-repeat";
		}
	});
};

function displayMuteButton(displayValue) {
	if (displayValue) {
		mute.style.display = "block";
	} else {
		mute.style.display = "none";
	}
}


//once the button is clicked, goes to next slide, replaces nation name, plays audio
submitName.addEventListener("click", function() {
	if (checkInput()) {
		nextSlide();
		replaceNationName();
		mutePlay();
		displayMuteButton(true);
	} else {
		console.log("cici brainz"); //change later
	}
});

//tells player that the country name must be between 3-15 chars
submitName.addEventListener("click", (e) => {
	let messages = [];
	//makes general message
	if (checkInput() === false) {
		messages.push("Nation name must be between 3 to 15 characters without numbers.")
	}

	if (messages.length > 0) {	
		e.preventDefault();
		errorElement.innerText = messages;
	}
}); 

//gets user input name and inserts into span 
function replaceNationName() {
	let newNationName = inputName.value; //gets value of inputName and assigns to newNationName
	document.querySelectorAll(".nationName").forEach(item => {
		item.innerText = newNationName;
	});
};

//checks if user put anything into text
//edit to allow users to put in space as well/length
function checkInput() {
	let newNationName = inputName.value.trim(); //removes whitespace on both ends
	const letters = /^[A-Za-z]+$/;
	//changing regex to allow for space + alphabet, but no numbers
	const letterSpaceNoNumbers = /^[a-zA-Z][a-zA-Z\s]*$/; 
	if (newNationName.length > 2 && newNationName.length < 15 && newNationName.match(letterSpaceNoNumbers/*letters*/)) {
		return true;
	} else {
		return false;
	}
};

/*********************************************
  Timeline
 *********************************************/
const startTimeline = document.getElementById("startTimeline");
const month_1 = document.getElementById("month-1");
const month_meter = document.getElementById("month-meter");
const num_month = document.getElementById("num-month");
 

//when player clicks "accept the challenge," adds a class of current to the first month and hide mute button
startTimeline.addEventListener("click", () => {
	month_1.classList.add("current");
	displayMuteButton(false);
	removeAllNoDisplay(); // show everything hidden (counter, month, nav)
	countingAnimation(populationCounter, 0, 1000000, 1000);
	countingAnimation(hospitalCounter, 0, 8, 750);
	startLoadingEventListeners();
	startGame(); // organize and make all of this into one single function later?

});

// align w option choices
//replace increaseButton for another button that then changes the month number
// increaseButton.addEventListener("click", () => {
// 	if (parseInt(num_month.innerText) < 12) {
// 		num_month.innerText = parseInt(num_month.innerText) + 1;
// 	}
// });

function removeAddClass() {
	let month_x = document.querySelector(".current");
	let nextMonthNumber = parseInt(month_x.innerText) + 1;
	let nextMonth = "month-" + nextMonthNumber;
	let month_y = document.getElementById(nextMonth);

	month_x.classList.remove("current");
	month_x.classList.add("previous");
	month_y.classList.add("current");
};

//change button later
// increaseButton.addEventListener("click", () => {
// 	removeAddClass()
// });

/*********************************************
  Monthing 
 *********************************************/
const allMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 // let currentMonthName = allMonthsNames[parseInt(document.querySelector(".current").innerText, 10) - 1];
let currentMonthName = "January";

function startGame() { // loads January prompts
	insertNewPrompt(0);
 	insertNewPrompt(1);
 	insertNewPrompt(2);
 	Reveal.next();
};

function newMonth(monthName) { // creates new prompt for the month
 	let indexesOfPrompts = monthlyQuestions[monthName]["questions"];
 	if (monthlyQuestions[monthName]["randomizable"]) indexesOfPrompts.sort(randomizeList); // randomize prompts for certain months
 	indexesOfPrompts.forEach(index => insertNewPrompt(index));
 	questionsAnswered = 0;
};

function newMonthScreen(monthName) {
	if (monthName === "December") { 
	// if it's december, no more months left, they didn't lose, so end game screen
	} else {
		let nextMonthName = allMonthNames[parseInt(document.querySelector(".current").textContent, 10)];
		// add code here to change the month timeline and meter 
		const newSection = document.createElement("section");
		newSection.classList.add("center", "future", "month-screen");

		const h3Title = document.createElement("h3");
		h3Title.classList.add("new-month-title");
		h3Title.textContent = "New Month";

		const h6Announcement = document.createElement("h6");
		h6Announcement.textContent = "You made it through " + monthName + "!";

		const pText = document.createElement("p");
		pText.classList.add("new-month-text");
		pText.textContent = "So far, you have made " + totalQuestionAnswered + " decisions, and the health of your country is " + countryHealthStatus();

		const newMonthContinue = document.createElement("div");
		newMonthContinue.classList.add("button-slide", "button-sliding-animation", "new-month-button", "no-animations");
		newMonthContinue.textContent = "Continue";
		newMonthContinue.addEventListener("click", function createNextMonthPrompts() {
			monthlyQuestions[nextMonthName]["questions"].forEach(questionIndex => { // returns index of questions
				insertNewPrompt(questionIndex);
			});
			newMonthContinue.removeEventListener("click", createNextMonthPrompts);
			console.log("new prompts created for month of " + nextMonthName);
			[h3Title, h6Announcement, pText, newMonthContinue].forEach(element => {
				element.classList.add("rotateOut");
			});
			h3Title.addEventListener("animationend", () => Reveal.next());
			h3Title.addEventListener("webkitAnimationEnd", () => Reveal.next());
		});

		newSection.appendChild(h3Title);
		newSection.appendChild(h6Announcement);
		newSection.appendChild(pText);
		newSection.appendChild(newMonthContinue);

		Reveal.getSlidesElement().append(newSection);
		Reveal.sync();
		return newSection.children; // return all elements for load in animation
	};
};

function countryHealthStatus() {
	if (virusData <= 15) {
		return "looking phenomenal!";
	} else if (virusData <= 35) {
		return "looking adequate.";
	} else {
		return "not doing so well...";
	}
}

/*********************************************
  Losing
 *********************************************/
function losingScreen(reason) {
	const lostReasonTitle = document.getElementById("reason-lost");
	const lostReasonText = document.getElementById("reason");
	switch(reason) {
		case "death":
			lostReasonTitle.textContent = "Your death count exceeded 10,000";
			lostReasonText.textContent = "That's one in every hundred people of your population dying!";
			break;
		case "hospital":
			lostReasonTitle.textContent = "Your hospital capacity exceeded 100%";
			lostReasonText.textContent = "Your hospitals are overfilled, meaning that the sickest patients who are about to die has nowhere to go";
			break;
		case "virus":
			lostReasonTitle.textContent = "The virus positivity rate exceeded 50%";
			lostReasonText.textContent = "That's one in two people of your population contracting the virus!";
			break;
	};
	Reveal.removeEventListener("slidechanged", loadAnimations);
	Reveal.slide(10);
	document.getElementById("losing-screen").classList.add("heartBeatAnimation");
	
};

/*********************************************
  Clue
 *********************************************/
let showClue = document.querySelector(".show-clue");
let getClue = document.querySelector(".clue");
const clues = [
	["This is for month 1", "This is for month 1 too"],
	["This is for month 3", "This is for month 3 too and cici is the cutest of all <3"],
 	["Month 6", "3*2=6"]
];

function displayHintOption(displayValue) {
	if (displayValue) {
		getClue.style.display = "block"
	} else {
		getClue.style.display = "none"
	}
};

// don't show for now
// startTimeline.addEventListener("click", () => {
// 	displayHintOption(true);
// });

function displayHint(displayValue) {
	if (displayValue) {
		showClue.style.display = "block"
	} else {
		showClue.style.display = "none"
	}
};



getClue.addEventListener("click", () => {
	//declaring variables
	let currentMonth = document.querySelector(".current");
	let currentMonthNumber = parseInt(currentMonth.innerText);
	//find number month 
 	showClue.innerText = clues[currentMonthNumber - 1][1];
 	displayHint(true);
 	console.log("ouch!"); // u cute <3

/* 	if (showClue.style.display = "none") {
 		showClue.style.display = "block";
 		console.log("hidden");
 	} 
 	if (showClue.style.display = "block") {
 		showClue.style.display = "none";
 		console.log("hey");
 	}*/
 });
