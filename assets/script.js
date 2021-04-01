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
	minScale: 1, // change for scaling
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
  Nation Input & More Info Screen
 *********************************************/
// constants for the functions about inserting new nation name
const submitName = document.getElementById("submitName");
const inputName = document.getElementById("inputName");
const errorElement = document.getElementById("error");


//once the button is clicked, goes to next slide and replaces nation name
submitName.addEventListener("click", function() {
	if (checkInput()) {
		nextSlide();
		replaceNationName();
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
 

//when player clicks "accept the challenge," adds a class of current to the first month
startTimeline.addEventListener("click", () => {
	month_1.classList.add("current");
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
  Music
 *********************************************/
//add music during first animation/introduction
let audio = new Audio("assets/music/demised_to_shield_end_portion.mp3");

//if the user clicks only once, the music still plays without going to next animation, so change submitName
submitName.addEventListener("click", () => {
	audio.play();
});
