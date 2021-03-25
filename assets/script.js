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

function commaFormat(value) {
  return value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'); // regex to put commas into numbers
}

/*https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden hide money counters*/

let moneyCounter = document.getElementById("money-counter");
let increaseButton = document.getElementById("increase-test");
let count = 1000000;
moneyCounter.innerHTML = commaFormat(count);

increaseButton.addEventListener("click", () => {
	count++
	moneyCounter.innerHTML = commaFormat(count);
});


document.querySelectorAll(".nextPrompt").forEach(item => {
	item.addEventListener("click", event => nextSlide());
});

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

//gets user input name and subs in into xyz 
function replaceNationName() {
	let newNationName = document.getElementById("inputName").value;
	document.querySelectorAll(".nationName").forEach(item => {
		item.innerHTML = newNationName;
	});
}

function checkInput() {
	let newNationName = document.getElementById("inputName").value;
	const letters = /^[A-Za-z]+$/;
	if (newNationName.length > 0 && newNationName.match(letters)) {
		return true;
	} else {
		return false;
	}
}

document.getElementById("submitName").addEventListener("click", function() {
	if (checkInput()) {
		nextSlide();
		replaceNationName();
	} else {
		console.log("cici brainz"); //change later
	}
});