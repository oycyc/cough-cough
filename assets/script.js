Reveal.initialize({
	controls: false,
	hash: false,
	progress: false,
	keyboard: false, 
	touch: false,
	autoSlideStoppable: false,
	postMessage: false,
	hideInactiveCursor: false,
	// transitions
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

	// plugins: [ ]
});




let moneyCounter = document.getElementById("money-counter");
let increaseButton = document.getElementById("increase-test");
let count = 1000000;
moneyCounter.innerHTML = commaFormat(count);

/*********************************************
  testing stuff
 *********************************************/
function commaFormat(value) {
	return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // regex to put commas into numbers
}

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
  Loading Prompts
 *********************************************/

 // KEEP THIS HERE FOR NOW, LATER WHEN FUNCTIONAL PUT IN ANOTHER JS FILE AND IMPORT IT..
const promptData = [
	{"prompt": "The Affordable Care Act requires you get health insurance. The good news? Your child is covered by the state. The bad? You aren’t. Jiaqi is beautiful! She's my forever love! ❤",
	"question": "Who does cici love forever?", 
	"optionChoices": {"Jiaqi": {"deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
	                  "Shao": {"deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}}
	}, // prompt 0

	{"prompt": "Prompt 2",
	"question": "Who does cici love forever?", 
	"optionChoices": {"Jiaqi": {"deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
	                  "Shao": {"deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}}
	},
];
 // KEEP THIS HERE FOR NOW, LATER WHEN FUNCTIONAL PUT IN ANOTHER JS FILE AND IMPORT IT..
const resultCircleData = [
	{"answerChoice1": "Loosening restrictions while there is no major immunity and the virus is still prominent is certainly not a good idea. In the United States, the CDC recommended families not travel for Thanksgiving & the December holiday season, yet still, for Thanksgiving alone, there were 10 million people that traveled by air. In just two weeks following, cases and hospitalizations increased by about 20%, and the deaths jumped 39%.",
	 "answerChoice2": "Loosening restrictions while there is no major immunity and the virus is still prominent is certainly not a good idea. In the United States, the CDC recommended families not travel for Thanksgiving & the December holiday season, yet still, for Thanksgiving alone, there were 10 million people that traveled by air. In just two weeks following, cases and hospitalizations increased by about 20%, and the deaths jumped 39%.",
	}, // prompt 0

]
 // KEEP THIS HERE FOR NOW, LATER WHEN FUNCTIONAL PUT IN ANOTHER JS FILE AND IMPORT IT..
const questionsPerMonth = {
	"January": 3,
	"February": 2,
	"March": 2,
	"April": 2,
	"May": 2,
	"June": 2,
	"July": 2,
	"August": 2,
	"September": 2,
	"October": 2,
	"November": 2,
	"December": 3
}


function insertNewPrompt(promptNumber) { // promptNumber corresponds to the element index of the promptData array
	const newPromptInfo = promptData[promptNumber];

    const newSection = document.createElement("section"); // create entire new section for new screen
    newSection.classList.add("center", "future");

    const promptDiv = document.createElement("div"); // div for the actual prompt & add the question from array
    promptDiv.classList.add("prompt");
    promptDiv.innerHTML = "<h6>" + newPromptInfo["prompt"] +"</h6>";
    
    const questionDiv = document.createElement("div"); // div for the question below prompt
    questionDiv.classList.add("question");
    questionDiv.appendChild(document.createTextNode(newPromptInfo["question"]));
    
    const optionDiv = document.createElement("div"); // div for the option section
    optionDiv.classList.add("option-section", "disable-selection");


	console.log("option count: " + Object.keys(newPromptInfo["optionChoices"]).length);

   	let optionsList = []; // loop through all option choices and add corresponding values
   	Object.keys(newPromptInfo["optionChoices"]).forEach(option => {
   		let optionIndex = optionsList.push(document.createElement("div")) - 1;
   		optionsList[optionIndex].classList.add("option");
   		optionsList[optionIndex].title = option;
   		optionsList[optionIndex].appendChild(document.createTextNode(option));
   	});

   	optionsList.forEach(innerOptionDiv => { // append every option created above to the parent optionDiv
   		optionDiv.appendChild(innerOptionDiv);
   	});   	

    newSection.appendChild(promptDiv);
    newSection.appendChild(questionDiv);
    newSection.append(optionDiv);

    
    Reveal.getSlidesElement().append(newSection);
    Reveal.sync();
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
		getClue.style.display = "grid"
	} else {
		getClue.style.display = "none"
	}
};

startTimeline.addEventListener("click", () => {
	displayHintOption(true);
});

function displayHint(displayValue) {
	if (displayValue) {
		showClue.style.display = "grid"
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
 	console.log("ouch!");

/* 	if (showClue.style.display = "none") {
 		showClue.style.display = "block";
 		console.log("hidden");
 	} 
 	if (showClue.style.display = "block") {
 		showClue.style.display = "none";
 		console.log("hey");
 	}*/
 });
