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

increaseButton.addEventListener("click", () => {
	count++
	moneyCounter.innerHTML = commaFormat(count);
});


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

let gameData = { // just to make sure option choices doesn't repeat?
	"lockdown": false,
	"travel restrictions": false,
	"testing": true
};


/*********************************************
  Counters
 *********************************************/
const counterParentDiv = document.getElementById("counters");
const populationCounter = document.getElementById("population-counter");
const deathsCounter = document.getElementById("deaths-counter");
const hospitalCounter = document.getElementById("hospital-capacity");
const virusCounter = document.getElementById("virus-positivity");

let population = 1000000;
let deaths = "?"; // stat not unlocked in the beginning of the game
let hospital = 8;
let virus = "?"; // stat not unlocked in the beginning of the game

populationCounter.innerText = commaFormat(population); // in case animation doesn't run
deathsCounter.innerText = deaths;
hospitalCounter.innerText = hospital;
virusCounter.innerText = virus;

function newMonth() { // simluate real world, natural data movement

}


/*********************************************
  Loading Prompts
 *********************************************/
const initialPrompt = document.getElementById("initial-prompt");

const loadInPrompt = element => element.classList.add("prompt-load-animation");
const loadOutPrompt = element => element.classList.add("prompt-exit-animation");

function insertNewPrompt(promptNumber) { // promptNumber corresponds to the element index of the promptData array
	const newPromptInfo = promptData[promptNumber];

    const newSection = document.createElement("section"); // create entire new section for new screen
    newSection.classList.add("center", "future");

    const newDiv = document.createElement("div"); // container for everything on the new screen
    if (Object.keys(newPromptInfo["optionChoices"]).length >= 3) {
    	newDiv.classList.add("margin-top-more"); // extra spacing so it doesn't hit counters for mobile
    } else {
    	newDiv.classList.add("margin-top");
    }

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

	console.log("option count: " + optionCount);

	// parent option div
	const parentOption = document.createElement("div"); 
	// add the right class for # amount option choices
	switch(optionCount) {
		case 2:
			parentOption.classList.add("two-option-section", "disable-selection");
			optionClassNames = ["option"];
			twoOrFourOptions();
			console.log("TWOOOO");
			break;
		case 3:
			parentOption.classList.add("three-option-section", "disable-selection");
			optionClassNames = ["option", "three-option"];
			threeOptions();
			console.log("THREEEE");
			break;
		case 4:
			parentOption.classList.add("two-option-section", "four-option-section", "disable-selection");
			optionClassNames = ["option", "four-option"];
			twoOrFourOptions();
			console.log("FOURRRRRRR");
			break;
		default:
			console.log("!!! Option amount is not btwn. 2-4 !!!");
	};

	function twoOrFourOptions() {
		let optionsList = [];
		Object.keys(optionsInfo).forEach(option => { // loop through to add values
			let optionIndex = optionsList.push(document.createElement("div")) - 1; // push to the list, which returns count of list, index will be -1
			optionClassNames.forEach(className => {optionsList[optionIndex].classList.add(className)}); // loops thru all classes needed & add
			optionsList[optionIndex].title = option;
			optionsList[optionIndex].appendChild(document.createTextNode(option)); // insert the actual text
		});

		optionsList.forEach(innerOptionDiv => {parentOption.appendChild(innerOptionDiv)}); // append every option created above to parent div
	};

	function threeOptions() { // need another function bc element styling different
		let optionsList = [];
		Object.keys(optionsInfo).forEach(option => { // loop through to add values
			let optionIndex = optionsList.push(document.createElement("div")) - 1; // push to the list, which returns count of list, index will be -1
			optionClassNames.forEach(className => {optionsList[optionIndex].classList.add(className)}); // loops thru all classes needed & add
			optionsList[optionIndex].title = option;
			optionsList[optionIndex].appendChild(document.createTextNode(option)); // insert the actual text
		});
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
   	return parentOption;
};

/*********************************************
  Result Circle
 *********************************************/
const resultCircle = document.getElementById("result");

const loadInResult = () => {
	resultCircle.classList.remove("no-display");
	resultCircle.classList.add("result-load-animation");
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

/*********************************************
  Nation Input & More Info Screen
 *********************************************/
// constants for the functions about inserting new nation name
const submitName = document.getElementById("submitName");
const inputName = document.getElementById("inputName");
const errorElement = document.getElementById("error");
const audio = new Audio("assets/music/demised_to_shield_end_portion.mp3");
audio.volume = 0.5;
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
	loadInPrompt(initialPrompt);
});

//replace increaseButton for another button that then changes the month number
increaseButton.addEventListener("click", () => {
	if (parseInt(num_month.innerText) < 12) {
		num_month.innerText = parseInt(num_month.innerText) + 1;
	}
});

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
increaseButton.addEventListener("click", () => {
	removeAddClass()
});

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

startTimeline.addEventListener("click", () => {
	displayHintOption(true);
});

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
