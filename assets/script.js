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

/*https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/hidden hide money counters*/

let moneyCounter = document.getElementById("money-counter");
let increaseButton = document.getElementById("increase-test");
let count = moneyCounter.innerHTML;

increaseButton.addEventListener("click", () => {
  count++
  moneyCounter.innerHTML = count;
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