Reveal.initialize({
	controls: false,
	hash: false,
	progress: false, // add css directly to a selector on div or body
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
/*	preloadIframes: null,
	autoAnimateEasing: 'ease',
	autoAnimateDuration: 1.0,
	autoAnimateUnmatched: true,
*/
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
	item.addEventListener("click", event => {
		Reveal.next();
		console.log("Reveal next, onto: " + Reveal.getSlidePastCount());
	})
});

function goTo(x) {
	Reveal.slide(x);
	console.log("Going to slide: " + x);
}

function consoleTest(x) {
	console.log("It worked! " + x);
}