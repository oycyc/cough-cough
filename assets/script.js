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
	// responsive
	width: "85%",
	height: "85%",
	margin: 0.01,
	minScale: 1, // no scale, hard code responsiveness
	maxScale: 1
});


/*********************************************
  Landing Screen
 *********************************************/
const virusSprites = document.getElementById("virus-background-animation")
const landingContinueBtn = document.getElementById("landingPageContinue");
// instead of animating whole parent div, animate individual element inside parent div 
// so center positioning doesn't mess up after the animation
const landingScreenEls = [document.getElementById("title"), document.getElementById("landing-text"), landingContinueBtn];

landingContinueBtn.addEventListener("click", function landingContinue() {
	landingScreenEls.forEach(element => element.classList.remove("zoomInDown"));
	landingScreenEls.forEach(element => element.classList.add("zoomOut"));
	virusSprites.classList.add("prompt-exit-animation");

	landingContinueBtn.addEventListener("animationend", animationEnd);
	landingContinueBtn.addEventListener("webkitAnimationEnd", animationEnd);

	function animationEnd() { // when animation ends, continue on
		Reveal.next();
		virusSprites.remove(); // lots of animation elements & css, better to just delete it so it doesn't use much memory
		toggleVisibility(document.getElementById("navigation"));
		// both eventlisteners are added, if only one runs, the other eventlistener wouldn't be removed
		// so remove both outside of function
		landingContinueBtn.removeEventListener("animationend", animationEnd);
		landingContinueBtn.removeEventListener("webkitAnimationEnd", animationEnd);
	};
}, {once: true});

Reveal.on("ready", event => { // when page loads and is ready
	landingScreenEls.forEach(element => element.classList.add("zoomInDown")); 
}, {once: true});

/*********************************************
  Utility Functions
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
	while (hiddenElements.length)  // list api method is live so changes are reflected automatically
		hiddenElements[0].classList.remove("temp-no-display");
};

const randomizeList = (a, b) => 0.5 - Math.random(); // use in array.sort(randomizeList);

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

function nextSection(count) {
	if (count) {
		for (let i = 0; i < count - 1; i++) { 
		// 'count - 1' to take into account the proceeding code regardless if count was a parameter
			Reveal.next();
		};
	};
	Reveal.next();
};

function skipSections() {
	zoomOutSkipIntro()
	Reveal.slide(9)
};


/*********************************************
  Counters
 *********************************************/
// DOM elements
const counterParentDiv = document.getElementById("counters");
const populationCounter = document.getElementById("population-counter");
const deathsCounter = document.getElementById("deaths-counter");
const hospitalCounter = document.getElementById("hospital-capacity");
const virusCounter = document.getElementById("virus-positivity");
const hospitalPercentSign = document.getElementById("hospital-percent");
const virusPercentSign = document.getElementById("virus-percent");
const populationArrow = document.getElementById("population-arrow");
const deathArrow = document.getElementById("death-arrow");
const hospitalArrow = document.getElementById("hospital-arrow");
const virusArrow = document.getElementById("virus-arrow");
const populationChange = document.getElementById("population-change");
const deathChange = document.getElementById("death-change");
const hospitalChange = document.getElementById("hospital-change");
const virusChange = document.getElementById("virus-change");
// data itself
let populationData = 1000000;
let deathData = "?"; // stat not unlocked in the beginning of the game
let hospitalData = 8;
let virusData = "?"; // stat not unlocked in the beginning of the game

populationCounter.textContent = commaFormat(populationData); // in case animation doesn't run
deathsCounter.textContent = deathData;
hospitalCounter.textContent = hospitalData;
virusCounter.textContent = virusData;

function changeCounters(death, hospital, positive) {
	arrowChangeVisibility(true);
	if (deathData === "?" || virusData === "?") { 
		// deaths & virus positivity rate not unlocked yet, so don't change
		countingAnimation(hospitalCounter, hospitalData, hospitalData + hospital, 2250);
		hospitalData += hospital;
		populationArrow.classList.add("no-display");
		populationChange.classList.add("no-display");
		deathArrow.classList.add("no-display");
		deathChange.classList.add("no-display");
		virusArrow.classList.add("no-display");
		virusChange.classList.add("no-display");
		countingAnimation(hospitalChange, 0, hospital, 750);
	} else {
		countingAnimation(populationCounter, populationData, populationData - death, 2250);
		populationData -= death; 
		countingAnimation(populationChange, 0, -death, 750);
		// deaths
		countingAnimation(deathsCounter, deathData, deathData + death, 2250);
		deathData += death;
		countingAnimation(deathChange, 0, death, 750);
		// hospital
		countingAnimation(hospitalCounter, hospitalData, hospitalData + hospital, 2250);
		hospitalData += hospital;
		countingAnimation(hospitalChange, 0, hospital, 750);
		// virus positivity
		countingAnimation(virusCounter, virusData, virusData + positive, 2250);
		virusData += positive;
		countingAnimation(virusChange, 0, positive, 750);
	};

	// add in increase/decrease arrow icons
	populationArrow.src = "assets/icons/red_decrease.svg";
	deathArrow.src = "assets/icons/red_increase.svg";
	hospitalArrow.src = (hospital >= 0) ? "assets/icons/red_increase.svg":"assets/icons/green_decrease.svg";
	virusArrow.src = (positive >= 0) ? "assets/icons/red_increase.svg":"assets/icons/green_decrease.svg";

	// check to see if color change needed
	if (deathData >= 5000 && deathData < 7500) {
		deathsCounter.classList.add("to-red");
	} else if (deathData >= 7500) {
		deathsCounter.classList.add("to-dark-red");
	};

	if (hospitalData >= 50 && hospitalData < 75) {
		hospitalCounter.classList.add("to-light-red");
		hospitalPercentSign.classList.add("to-light-red");
	} else if (hospitalData >= 75 && hospitalData < 90) {
		hospitalCounter.classList.add("to-red");
		hospitalPercentSign.classList.add("to-red");
	} else if (hospitalData >= 90) {
		hospitalCounter.classList.add("to-dark-red");
		hospitalPercentSign.classList.add("to-dark-red");
	};

	if (virusData >= 25 && virusData < 35) {
		virusCounter.classList.add("to-light-red");
		virusPercentSign.classList.add("to-light-red");
	} else if (virusData >= 35 && virusData < 40) {
		virusCounter.classList.add("to-red");
		virusPercentSign.classList.add("to-red");
		changePopulationIcon();
	} else if (virusData >= 40) {
		virusCounter.classList.add("to-dark-red");
		virusPercentSign.classList.add("to-dark-red");
		changePopulationIcon(); // function is called here just in case decision made had a drastic change
	};
};

function arrowChangeVisibility(display) {
	if (display) {
		populationArrow.classList.remove("no-display");
		populationChange.classList.remove("no-display");
		deathArrow.classList.remove("no-display");
		deathChange.classList.remove("no-display");
		hospitalArrow.classList.remove("no-display");
		hospitalChange.classList.remove("no-display");
		virusArrow.classList.remove("no-display");
		virusChange.classList.remove("no-display");
	} else {
		populationArrow.classList.add("no-display");
		populationChange.classList.add("no-display");
		deathArrow.classList.add("no-display");
		deathChange.classList.add("no-display");
		hospitalArrow.classList.add("no-display");
		hospitalChange.classList.add("no-display");
		virusArrow.classList.add("no-display");
		virusChange.classList.add("no-display");
	}
}

function changePopulationIcon() {
	document.querySelector("#counters > div:nth-child(1) > div > img").src = "assets/icons/redpopulation.svg";
	// function not needed anymore after the svg is changed once, but if statement will keep calling it, wasting memory
	// so change function to do nothing after it has run once
	changePopulationIcon = function() {};
};

function checkLosing() {
	if (deathData >= 10000 && hospitalData >= 100) {
		losingScreen("death and hospital");
		return true;
	} else if (deathData >= 10000 && virusData >= 50) {
		losingScreen("death and virus");
		return true;
	} else if (hospitalData >= 100 && virusData >= 50) {
		losingScreen("hospital and virus");
		return true;
	} else if (deathData >= 10000 && hospitalData >= 100 && virusData >= 50) {
		losingScreen("death and hospital and virus");
		return true;
	}
	else if (deathData >= 10000) {
		losingScreen("death");
		return true;
	} else if (hospitalData >= 100) {
		losingScreen("hospital");
		return true;
	} else if (virusData >= 50) {
		losingScreen("virus");
		return true;
	}
};

function newMonthCounters() { // simluate real world, natural data movement
	let randomDeath = Math.floor(Math.random() * (25 - 1 + 1) + 1);
	let randomHospital = Math.floor(Math.random() * (5 - -1 + 1) + -1);
	let randomVirus = Math.floor(Math.random() * (2 - -1 + 1) + -1);
	arrowChangeVisibility(true);

	countingAnimation(populationCounter, populationData, populationData - randomDeath, 1000);
	populationData -= randomDeath;
	countingAnimation(populationChange, 0, -randomDeath, 750);
	// 
	countingAnimation(deathsCounter, deathData, deathData + randomDeath, 1000);
	deathData += randomDeath;
	countingAnimation(deathChange, 0, randomDeath, 750);
	// 
	countingAnimation(hospitalCounter, hospitalData, hospitalData + randomHospital, 1000);
	hospitalData += randomHospital;
	countingAnimation(hospitalChange, 0, randomHospital, 750);
	// 
	countingAnimation(virusCounter, virusData, virusData + randomVirus, 1000);
	virusData += randomVirus;
	countingAnimation(virusChange, 0, randomVirus, 750);

	hospitalArrow.src = (randomHospital >= 0) ? "assets/icons/red_increase.svg":"assets/icons/green_decrease.svg";
	virusArrow.src = (randomVirus >= 0) ? "assets/icons/red_increase.svg":"assets/icons/green_decrease.svg";

	return [randomDeath, randomHospital, randomVirus];
};

/*********************************************
  Timeline
 *********************************************/
const startTimeline = document.getElementById("startTimeline");
const month_1 = document.getElementById("month-1");
const month_meter = document.getElementById("month-meter");
const num_month = document.getElementById("num-month");
 

//when player clicks "accept the challenge," adds a class of current to the first month
startTimeline.addEventListener("click", function timelineButtonEvent() {
	month_1.classList.add("current");
	audio.muted = true;
	countingAnimation(populationCounter, 0, 1000000, 1000);
	countingAnimation(hospitalCounter, 0, 8, 750);
	startGame();
	// remove eventlistener for skip element
	skipIntro.removeEventListener("click", skipSections);
}, {once: true});

function changeMonthText() { //change top right month number on smaller screens
	if (parseInt(num_month.innerText) < 12) {
		num_month.innerText = parseInt(num_month.innerText) + 1;
 	}
}

function removeAddClass() { //when moving on, find current month to remove class and add class of current to next month 
	let month_x = document.querySelector(".current");
	let nextMonthNumber = parseInt(month_x.innerText) + 1;
	let nextMonth = "month-" + nextMonthNumber;
	let month_y = document.getElementById(nextMonth);

	month_x.classList.remove("current");
	month_x.classList.add("previous");
	month_y.classList.add("current");
};

/*********************************************
  Creating New Prompts & Options
*********************************************/
let monthQuestionAnswered = 0;
let totalQuestionAnswered = 0;

const loadInPrompt = element => element.classList.add("prompt-load-animation");
const loadOutPrompt = element => element.classList.add("prompt-exit-animation");

function insertNewPrompt(promptNumber, monthName) { // promptNumber corresponds to the element index of the promptData array
	this.promptNumber = promptNumber; // so child functions can access it too
	this.monthName = monthName;
	const newPromptInfo = promptData[promptNumber];

    const newSection = document.createElement("section"); // create entire new section for new screen
    newSection.classList.add("center", "future");

    this.newDiv = document.createElement("div"); // container for everything on the new screen, this stmt for child function eventListener loading out
    if (Object.keys(newPromptInfo["optionChoices"]).length >= 3) {
    	newDiv.classList.add("margin-top-more"); // extra spacing so it doesn't hit counters for mobile
    } else {
    	newDiv.classList.add("margin-top");
    };

    const promptDiv = document.createElement("div"); // div for the actual prompt & add the question from array
    promptDiv.classList.add("prompt");
    promptDiv.innerHTML = "<h6>" + newPromptInfo["prompt"] +"</h6>";
    
    const questionDiv = document.createElement("div"); // div for the question below prompt
    questionDiv.classList.add("question");
    questionDiv.appendChild(document.createTextNode(newPromptInfo["question"]));
    
    const optionDiv = createOptions(newPromptInfo["optionChoices"]);

    newDiv.appendChild(promptDiv);
    newDiv.appendChild(questionDiv);
    newDiv.appendChild(optionDiv);
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
			break;
		case 3:
			parentOption.classList.add("three-option-section", "disable-selection");
			optionClassNames = ["option", "three-option"];
			threeOptions();
			break;
		case 4:
			parentOption.classList.add("two-option-section", "four-option-section", "disable-selection");
			optionClassNames = ["option", "four-option"];
			twoOrFourOptions();
			break;
		default:
			console.log("!!! Option amount is not btwn. 2-4 !!!");
	};

	function twoOrFourOptions() { // append the option elements
		let optionsList = loopAllOptions();
		optionsList.forEach(innerOptionDiv => {parentOption.appendChild(innerOptionDiv)}); // append every option created above to parent div
	};

	function threeOptions() { // diff. function from above bc element styling different
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

   	function loopAllOptions() { // creates the actual option elements + event listeners needed
   		const inputPromptNumber = this.promptNumber;
   		const divLoadOut = this.newDiv;
   		const monthName = this.monthName;
   		let allOptions = [];

		Object.keys(optionsInfo).forEach(option => { // loop all options to add values
			let optionIndex = allOptions.push(document.createElement("div")) - 1; // push to the list, which returns count of list, index will be -1
			optionClassNames.forEach(className => {allOptions[optionIndex].classList.add(className)}); // loops thru all classes needed & add
			allOptions[optionIndex].title = option;
			allOptions[optionIndex].appendChild(document.createTextNode(option)); // insert the actual text
			// add event listeners
			allOptions[optionIndex].addEventListener("click", function optionClicked() { // when they choose an option:
				// counters to keep track
				monthQuestionAnswered++;
				totalQuestionAnswered++;
				// load out prompt, change the counter, change the result circle, then load result circle
				loadOutPrompt(divLoadOut);
				changeCounters(optionsInfo[option]["deathChange"], optionsInfo[option]["hospitalChange"], optionsInfo[option]["positivityRateChange"]);
				updateCharting(monthName, optionsInfo[option]["deathChange"], optionsInfo[option]["hospitalChange"], optionsInfo[option]["positivityRateChange"]);		
				setResultBody(resultData[optionsInfo[option]["resultID"]]);
				loadInResult();
				// delete all the options after one option is chosen
				divLoadOut.addEventListener("animationend", removeOptionsAfterClicked);
				divLoadOut.addEventListener("webkitAnimationEnd", removeOptionsAfterClicked);

				function removeOptionsAfterClicked() {
					parentOption.remove();
					divLoadOut.removeEventListener("animationend", removeOptionsAfterClicked);
					divLoadOut.removeEventListener("webkitAnimationEnd", removeOptionsAfterClicked);
				};

				isTestingKitPrompt(inputPromptNumber); // individual case, checks if it's the prompt to unlock Deaths & Virus counters
			});
		});

		return allOptions; // returns all the individual options for parent function to append into parent element
   	};
   	return parentOption; // returns the parent element w/ all the individual options appended to it
};

function isTestingKitPrompt(promptNumber) {
	if (promptNumber === 1) {
		countingAnimation(deathsCounter, 1, 16, 1000);
		deathData = 16;
		populationData -= deathData;
		countingAnimation(virusCounter, 1, 8, 1000); 
		virusData = 8;
	} else if (promptNumber === 2) {
		populationArrow.classList.remove("no-display");
		populationChange.classList.remove("no-display");
		deathArrow.classList.remove("no-display");
		deathChange.classList.remove("no-display");
		virusArrow.classList.remove("no-display");
		virusChange.classList.remove("no-display");
		// function isn't needed after this runs, the 'Deaths' & 'Virus' counters are unlocked and can't be unlocked again
		// but the function will keep getting called so garbage collection can't be used, hence redefine function to do nothing
		isTestingKitPrompt = function() {};
	};
};

function startLoadingEventListeners() { // every time user goes to new section, add the loading in animation
	Reveal.on("slidechanged", loadAnimations);
};

function loadAnimations() {
	let promptToBeLoaded = document.querySelector("div.slides > section.center.present > div"); // selects the present loading animation div
	loadInPrompt(promptToBeLoaded);
};

/*********************************************
  Result Circle
 *********************************************/
const resultCircle = document.getElementById("result");
const resultBody = document.querySelector("#result > span.result-text");
const resultContinue = document.querySelector("#result > div");

const loadInResult = () => { // remove old animation and make it appear with new animation, eventListener for when Continue btn clicked
	resultCircle.classList.remove("no-display");
	resultCircle.classList.remove("result-exit-animation");
	resultCircle.classList.add("result-load-animation");
	resultContinue.addEventListener("click", continueAfterResult); // don't need {once: true} bc same element div, just changed text
};
const exitOutResult = () => { // add exit animation, then when animation ends, make it disappear
	resultCircle.classList.add("result-exit-animation");
	resultCircle.addEventListener("animationend", resultDisplayNone);
	resultCircle.addEventListener("webkitAnimationEnd", resultDisplayNone);
};
const resultDisplayNone = () => { // makes it disappear and remove the eventListener reduce memory usage
	resultCircle.classList.add("no-display");
	removeResultEvent();
};
const removeResultEvent = () => {
	resultCircle.removeEventListener("animationend", resultDisplayNone);
	resultCircle.removeEventListener("webkitAnimationEnd", resultDisplayNone);
};

const setResultBody = info => {resultBody.textContent = info};

function continueAfterResult() { // when they click Continue button:
	exitOutResult();
	if (checkLosing()) return; // if lost, run checkLosing function which directs to losing screen and stop the THIS function
	arrowChangeVisibility(false);
	resultCircle.classList.remove("result-load-animation");
	// check if last prompt of month bc then u win
	if (lastPromptOfMonth() && currentMonthName === "December") {
		Reveal.removeEventListener("slidechanged", loadAnimations); // remove the eventListener that adds an animation every time to add a different animation
		Reveal.slide(11);
		document.getElementById("success").classList.add("jackInTheBox");
		return; // stop everything, won already
	} else if (lastPromptOfMonth()) { // checks to see if it's the last prompt of the month, if so, there's no prompt left so do other commands
		let monthScreenElements = newMonthScreen(currentMonthName);
		monthScreenElements[3].classList.remove("no-animations"); // individual case, it's a div and an earlier eventListener loads every prompt on view to create an animation, but we want a diff. animation
		monthScreenElements.forEach(element => element.classList.add("rotateIn"));
		changeMonthData();
		newMonthCounters();
		chartButton.style.display = "none";
		nextSection();
		resultContinue.removeEventListener("click", continueAfterResult);
		return;
	};

	nextSection(); 
	resultContinue.removeEventListener("click", continueAfterResult);
};

const lastPromptOfMonth = () => monthQuestionAnswered >= monthlyQuestions[currentMonthName]["questions"].length;

function changeMonthData() {
	monthQuestionAnswered = 0;
	currentMonthName = allMonthNames[parseInt(document.querySelector(".current").innerText, 10)];
};



/*********************************************
  Monthing 
 *********************************************/
const allMonthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentMonthName = "January";

function startGame() { // loads January prompts manually
	insertNewPrompt(0, "January");
 	insertNewPrompt(1, "January");
 	insertNewPrompt(2, "January");
 	chartButton.style.display = "block"; // show chart button
 	displayIntroButtons(false); // remove mute & skip btn
 	removeAllNoDisplay(); // show everything hidden (counter, month, nav)
 	startLoadingEventListeners(); // on every new prompt, load in animation
 	nextSection(3); // 3 bc winning screen and losing screen are preloaded sections
};

// function newMonth(monthName) { // creates new prompt for the month
//  	let indexesOfPrompts = monthlyQuestions[monthName]["questions"];
//  	if (monthlyQuestions[monthName]["randomizable"]) indexesOfPrompts.sort(randomizeList); // randomize prompts for certain months
//  	indexesOfPrompts.forEach(index => insertNewPrompt(index));
//  	questionsAnswered = 0;
// };
// when there's more prompts, some months' prompts can be randomized

const iconSwitches = {
	"January": "assets/icons/calendar1.svg",
	"February": "assets/icons/calendar-travel.svg", 
	"March": "assets/icons/calendar-book.svg", 
	"April": "assets/icons/calendar-stethoscope.svg", 
	"May": "assets/icons/pill.svg", 
	"June": "assets/icons/calendar-work.svg", 
	"July": "assets/icons/medical-app.svg", 
	"August": "assets/icons/calendar-group.svg", 
	"September": "assets/icons/calendar-cap.svg", 
	"October": "assets/icons/microscope.svg", 
	"November": "assets/icons/pandemic.svg", 
	"December": "assets/icons/vaccine.svg"
}

function newMonthScreen(monthName) {
	// creates the new month screen
	let nextMonthName = allMonthNames[parseInt(document.querySelector(".current").textContent, 10)];

	const newSection = document.createElement("section");
	newSection.classList.add("center", "future", "month-screen");

	const divContainer = document.createElement("div");
	divContainer.classList.add("logo-container");

	const imgIcon = document.createElement("img");
	imgIcon.classList.add("monthcon");
	imgIcon.src = iconSwitches[monthName];

	const secondImgIcon = document.createElement("img");
	secondImgIcon.classList.add("monthcon");
	secondImgIcon.src = iconSwitches[monthName];

	const h3Title = document.createElement("h3");
	h3Title.classList.add("new-month-title");
	h3Title.textContent = "New Month";

	divContainer.appendChild(imgIcon);
	divContainer.appendChild(h3Title);
	divContainer.appendChild(secondImgIcon);	

	const h6Announcement = document.createElement("h6");
	h6Announcement.classList.add("h6-announcement");
	h6Announcement.textContent = "You made it through " + monthName + "!";

	const pText = document.createElement("p");
	pText.classList.add("new-month-text");
	pText.textContent = "So far, you have made " + totalQuestionAnswered + " decisions, and the health of your country is " + countryHealthStatus();

	const newMonthContinue = document.createElement("div");
	newMonthContinue.classList.add("button-slide", "button-sliding-animation", "new-month-button", "no-animations");
	newMonthContinue.textContent = "View Month Summary";
	newMonthContinue.addEventListener("click", function createNextMonthPrompts() { // after they click continue button:
		changeMonthText(); // change the # in "Month #"
		removeAddClass(); // remove where the active is at in month timeline
		arrowChangeVisibility(false);
		monthlyQuestions[nextMonthName]["questions"].forEach(questionIndex => { // returns index of questions
			insertNewPrompt(questionIndex, nextMonthName);
		});
		console.log("new prompts created for month of " + nextMonthName);
		// exits out the new month screen and when it ends, go next section which should be the prompts created
		[divContainer, h6Announcement, pText, newMonthContinue].forEach(element => {
			element.classList.add("rotateOut");
		});
		divContainer.addEventListener("animationend", continueAfterAnimation);
		divContainer.addEventListener("webkitAnimationEnd", continueAfterAnimation);

		function continueAfterAnimation() {
			divContainer.removeEventListener("animationend", continueAfterAnimation);
			divContainer.removeEventListener("webkitAnimationEnd", continueAfterAnimation);
			chartDivElement.classList.add("chartFadeIn");
			chartDivElement.style.display = "grid";
			mobileScreenChartingHideCounter(mobileScreenMediaQuery);
			//Reveal.next();
		};
	}, {once: true});
	// finish creating the new month screen
	newSection.appendChild(divContainer);
	newSection.appendChild(h6Announcement);
	newSection.appendChild(pText);
	newSection.appendChild(newMonthContinue);
	Reveal.getSlidesElement().append(newSection);
	Reveal.sync();
	return newSection.children; // return all elements for load in animation
};

function countryHealthStatus() { // text for "the health of your country is..."
	if (virusData <= 15) {
		return "looking phenomenal!";
	} else if (virusData <= 35) {
		return "looking average.";
	} else {
		return "not doing so well...";
	};
};

/*********************************************
  Losing
 *********************************************/
function losingScreen(reason) {
	// html structure is already at section 1, so just change the text to the reason for losing
	// then go there and load the animation
	const lostReasonTitle = document.getElementById("reason-lost");
	const lostReasonText = document.getElementById("reason");
	switch(reason) {
		case "death":
			lostReasonTitle.textContent = "Your death count exceeded 10,000";
			lostReasonText.textContent = "That's one in every hundred people of your population dying!";
			break;
		case "hospital":
			lostReasonTitle.textContent = "Your hospital capacity exceeded 100%";
			lostReasonText.textContent = "Your hospitals are overfilled, meaning that the sickest patients who are about to die have nowhere to go.";
			break;
		case "virus":
			lostReasonTitle.textContent = "The virus positivity rate exceeded 50%";
			lostReasonText.textContent = "That's one in two people of your population contracting the virus!";
			break;
		case "death and hospital": 
			lostReasonTitle.textContent = "Fatalities exceeded 10,000 & hospital overfilled";
			lostReasonText.textContent = "10,000 people have died AND hospitals overfilled, meaning that the sickest patients are turned away.";
			break;
		case "death and virus": 
			lostReasonTitle.textContent = "Fatalities exceeded 10,000 & virus positivity > 50%";
			lostReasonText.textContent = "10,000 people have died from the virus AND one in two people of your population contracting the virus!";
			break;
		case "hospital and virus": 
			lostReasonTitle.textContent = "Hospitals overfilled & virus positivity exceeded 50%";
			lostReasonText.textContent = "That's one in two people of your population contracting the virus AND hospitals overfilled!";
			break;
		case "death and hospital and virus": 
			lostReasonTitle.textContent = "All of your health metrics exceeded!";
			lostReasonText.textContent = "10,000 fatalities, hospital overfill, and 50% virus positivity. The virus is out of control!";
			break;
	};
	Reveal.removeEventListener("slidechanged", loadAnimations); // remove the eventListener that adds an animation every time to add a different animation
	Reveal.slide(10);
	document.getElementById("losing-screen").classList.add("heartBeatAnimation");
};








/*********************************************
  Nation Name Input & More Info Screen
 *********************************************/
// constants for the functions about inserting new nation name
const submitName = document.getElementById("submitName");
const inputName = document.getElementById("inputName");
const errorElement = document.getElementById("error");
const audio = new Audio("assets/music/demised_to_shield_end_portion.mp3");
audio.volume = 0.1; // lower volume to 0.1 from 0.5
const mute = document.getElementById("mute");
const skipIntro = document.getElementById("intro-skip");

function mutePlay() { //play audio + allow user to mute/unmute during animation
	audio.play();
	mute.addEventListener("click", () => {
		if (audio.muted) {
			audio.muted = false;
			mute.style.background = "url('assets/icons/speaker.svg') no-repeat";
		} else {
			audio.muted = true;
			mute.style.background = "url('assets/icons/mute.svg') no-repeat";
		}
	});
};

function displayIntroButtons(displayValue) {
	if (displayValue) {
		mute.style.display = "block";
		skipIntro.style.display = "flex";
	} else {
		mute.style.display = "none";
		skipIntro.style.display = "none";
	}
	zoomOutSkipIntro();
};

function zoomOutSkipIntro() {
	Reveal.on("slidechanged", event => { // when it reaches last intro animation slide, hide skip btn
		if (Reveal.getSlidePastCount() === 9) {
			skipIntro.classList.add("zoomOutSlow");
			skipIntro.addEventListener("animationend", () => {
				skipIntro.style.display = "none";
				skipIntro.remove(); // delete element after bc not used anymore & eventlistener
			});

			skipIntro.addEventListener("webkitAnimationEnd", () => {
				skipIntro.style.display = "none";
				skipIntro.remove(); // delete element after bc not used anymore & eventlistener
			});
		};
	});
}



//once the button is clicked, goes to next slide, replaces nation name, plays audio, add eventlisteners
submitName.addEventListener("click", function submitNameClick() {
	if (checkInput()) {
		nextSection();
		replaceNationName();
		mutePlay();
		displayIntroButtons(true);
		skipIntro.addEventListener("click", skipSections);
		submitName.removeEventListener("click", submitNameClick);
	};
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
  CHARTING
*********************************************/
// updates the charting data after each decision made
function updateCharting(month, deathChange, hospitalChange, virusChange) {
	const monthAbbreviations = {"January" : "Jan", "February" : "Feb", "March" : "Mar", "April" : "Apr", "May" : "May", "June" : "Jun", "July" : "Jul", "August" : "Aug", "September" : "Sep", "October" : "Oct", "November" : "Nov", "December" : "Dec"};

	decisionNumbering.push(`${monthAbbreviations[month]}. (${totalQuestionAnswered})`);
	deathChartData.push(deathChartData[deathChartData.length - 1] + deathChange);
	hospitalChartData.push(hospitalChartData[hospitalChartData.length - 1] + hospitalChange);
	virusChartData.push(virusChartData[virusChartData.length - 1] + virusChange);
	deathChart.update();
	percentageChart.update();
};

// updates the random data change that happens every month to simulate natural movement 
function fixChartNewMonthCounters(randomData) {
	deathChartData[deathChartData.length - 1] += randomData[0];
	hospitalChartData[hospitalChartData.length - 1] += randomData[1];
	virusChartData[virusChartData.length - 1] += randomData[2];
	deathChart.update();
	percentageChart.update();
};

// adds event listener for chart button
function newShowChartListener() {
	chartButton.addEventListener("click", () => {
		chartDivElement.classList.add("chartFadeIn");
		chartDivElement.style.display = "grid";
		mobileScreenChartingHideCounter(mobileScreenMediaQuery);
		chartScreenContinue.style.display = "none";
		chartButton.src = "assets/icons/exit.svg";

		if (!resultCircle.classList.contains("no-display")) {
			exitOutResult();
			newRemoveChartListener("result circle");
			return;
		};

		Reveal.getCurrentSlide().style.display = "none";
		newRemoveChartListener();
	}, {once: true});
};

// shows the chart after clicking icon and changes the icon
function newRemoveChartListener(specialCase) {
	chartButton.addEventListener("click", hideCharting);
	function hideCharting() {
		chartDivElement.classList.remove("chartFadeIn");
		chartDivElement.style.display = "none";
		chartScreenContinue.style.display = "block";
		mobileScreenChartingShowCounter(mobileScreenMediaQuery);
		chartButton.removeEventListener("click", hideCharting);
		chartButton.src = "assets/icons/chart.svg";
		newShowChartListener();

		if (specialCase) {
			loadInResult();
			return;
		};

		Reveal.getCurrentSlide().style.display = "block";;
	};
};

const chartDivElement = document.getElementById("history-charts");
const chartScreenContinue = document.getElementById("chartContinue");
const chartButton = document.getElementById("chart-icon");
newShowChartListener();
chartButton.style.display = "none";

const decisionNumbering = ["Beginning"];
const deathChartData = [0];
const hospitalChartData = [8];
const virusChartData = [0];

chartScreenContinue.addEventListener("click", () => {
	// zoom out when animation finish display none and next section
	chartDivElement.classList.add("zoomOut");
	chartDivElement.addEventListener("animationend", continueAfterChart);
	chartDivElement.addEventListener("webkitAnimationEnd", continueAfterChart);


	function continueAfterChart() {
		nextSection();
		chartButton.style.display = "block";
		chartDivElement.style.display = "none";
		chartDivElement.classList.remove("zoomOut");
		chartDivElement.removeEventListener("animationend", continueAfterChart);
		chartDivElement.removeEventListener("webkitAnimationEnd", continueAfterChart);
		mobileScreenChartingShowCounter(mobileScreenMediaQuery);
	}
})

const deathChartElement = document.getElementById('deathChart');
const deathChart = new Chart(deathChartElement, {
	type: "line",
	data: {
	    labels: decisionNumbering,
	    datasets: [{ 
		  data: deathChartData,
		  label: "Deaths",
		  borderColor: "#ff4c4c",
		  lineTension: 0
		  }]
 	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				title: {
					display: true,
					text: "Months (Decision #)",
					font: {
						family: "Georgia",
						weight: "bold",
					},
					color: "#f7ebc8",
					padding: {bottom: 4}
				},
				ticks: {
					font: {
						family: "Georgia",
					},
					color: "#d3d3d3"
				},
				grid: {
					// borderColor: "#c2c2c2",
					// color: "#c2c2c2"
				}
			},
			y: {
				beginAtZero: true,
				max: 10000,
				display: true,
				title: {
					display: true,
					text: "Total Deaths",
					font: {
						family: "Georgia",
						weight: "bold"
					},
					color: "#f7ebc8"
				},
				ticks: {
					font: {
						family: "Georgia",
					},
					color: "#d3d3d3"
				},
				grid: {
					// borderColor: "#c2c2c2",
					// color: "#c2c2c2"
				}
			}
		},
		plugins: {
			legend: {
				display: true,
				onClick: (e) => e.stopPropagation(),
				labels: {
					font: {
						family: "Georgia",
					},
					color: "#d3d3d3",
					padding: 1
				},
				title: {
					display: true,
					color: "#fffff0",
					text: "Goal: Keep your nation's deaths < 10,000",
					font: {
						family: "Georgia"
					},
				}
			},
			title: {
				display: true,
				text: "Deaths",
				color: "#e0d6ff",
				font: {
					family: "Georgia",
				},
				padding: {bottom: 4}

			},
		}
	}
})

const percentageChartElement = document.getElementById('percentageChart');
const percentageChart = new Chart(percentageChartElement, {
	type: "line",
	data: {
	    labels: decisionNumbering,
	    datasets: [
		{ 
		  data: hospitalChartData,
		  label: "Hospital Capacity",
		  borderColor: "#3cba9f",
		  lineTension: 0
		},
		{ 
		  data: virusChartData,
		  label: "Virus Positivity",
		  borderColor: "#d11d53",
		  lineTension: 0
		}]
 	},
	options: {
		responsive: true,
		maintainAspectRatio: false,
		scales: {
			x: {
				title: {
					display: true,
					text: "Months (Decision #)",
					font: {
						family: "Georgia",
						weight: "bold"
					},
					color: "#f7ebc8",
					padding: {bottom: 2}

				},
				ticks: {
					font: {
						family: "Georgia",
					},
					color: "#d3d3d3"
				},
			},
			y: {
				beginAtZero: true,
				max: 100,
				display: true,
				title: {
					display: true,
					text: "Hospital & Virus (%)",
					font: {
						family: "Georgia",
						weight: "bold"
					},
					color: "#f7ebc8"
					//padding: {top: 0, left: 0, right: 0, bottom: 5}
				},
				ticks: {
					font: {
						family: "Georgia",
					},
					color: "#d3d3d3"
				}
			}
		},
		plugins: {
			legend: {
				display: true,
				labels: {
					font: {
						family: "Georgia",
					},
					color: "#d3d3d3",
					padding: 1
				},
				title: {
					display: true,
					color: "#fffff0",
					text: "Goal: Hospital Capacity < 100% & Virus Positivity < 50%",
					font: {
						family: "Georgia",
					}
				}
			},
			title: {
				display: true,
				color: "#e0d6ff",
				text: "Hospital Capacity & Virus Positivity",
				font: {
					family: "Georgia"
				},
				padding: {bottom: 4}
			},
		},
		interaction: {
			intersect: false,
			mode: "index"
		}
	}
})


// charting responsiveness
const mobileScreenMediaQuery = window.matchMedia('(max-width: 700px)');

function mobileScreenChartingHideCounter(mediaQuery) {
	if (mediaQuery.matches) {
		counterParentDiv.classList.add("no-display");
	}
}

function mobileScreenChartingShowCounter(mediaQuery) {
	if (mediaQuery.matches) {
		counterParentDiv.classList.remove("no-display");
	}
}