// all the prompt and its corresponding data
const promptData = [
	{"prompt": "The Affordable Care Act requires you get health insurance. The good news? Your child is covered by the state. The bad? You aren’t. Jiaqi is beautiful! She's my forever love! ❤",
	"question": "Who does cici love forever?", 
	"optionChoices": {"Jiaqi": {"resultID": 0, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	                  "Shao": {"resultID": 0, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}},
    "hint": false
	}, // prompt 0

	{"prompt": "The Affordable Care Act requires you get health insurance. The good news? Your child is covered by the state. The bad? You aren’t. Jiaqi is beautiful! She's my forever love! ❤",
	"question": "Who does cici love forever?", 
	"optionChoices": {"Jiaqi": {"resultID": 1, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}, 
					  "asd": {"resultID": 1, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
					  "ddd": {"resultID": 0, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
					  "Shao": {"resultID": 0, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}}
	},

	{"prompt": "The Affordable Care Act requires you get health insurance. The good news? Your child is covered by the state. The bad? You aren’t. Jiaqi is beautiful! She's my forever love! ❤",
	"question": "Who does cici love forever?", 
	"optionChoices": {"Allow citizens to travel internationally if their virus test is negative.": {"resultID": 0, "deathChange": 55, "hospitalChange": 55, "positivityRateChange": 550}, 
					  "Allow citizens to travel internationally if their virus teasdst is negative.": {"resultID": 0, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
					  "Allow citizens to travel internationally if thedir virus teasdst is negative.": {"resultID": 0, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}}
	},
];

// result of player's choices' information
// index corresponds with resultID key value from promptData
const resultData = [
	// resultID 0
	"asd restrictions while there is no major immunity and the virus is still prominent is certainly not a good idea. In the United States, the CDC recommended families not travel for Thanksgiving & the December holiday season, yet still, for Thanksgiving alone, there were 10 million people that traveled by air. In just two weeks following, cases and hospitalizations increased by about 20%, and the deaths jumped 39%.",
	// resultID 1
	"Loosening restrictions while there is no major immunity and the virus is still prominent is certainly not a good idea. In the United States, the CDC recommended families not travel for Thanksgiving & the December holiday season, yet still, for Thanksgiving alone, there were 10 million people that traveled by air. In just two weeks following, cases and hospitalizations increased by about 20%, and the deaths jumped 39%.",
];


const monthlyQuestions = { // "questions" array is the indexes of the question
	"January": {"questions": [0, 1, 2], "randomizable": false},
	"February": {"questions": [0, 1, 2], "randomizable": false},
	"March": {"questions": [0, 1, 2], "randomizable": false},
	"April": {"questions": [0, 1, 2], "randomizable": true},
	"May": {"questions": [0, 1, 2], "randomizable": false},
	"June": {"questions": [0, 1, 2], "randomizable": false},
	"July": {"questions": [0, 1, 2], "randomizable": false},
	"August": {"questions": [0, 1, 2], "randomizable": false},
	"September": {"questions": [0, 1, 2], "randomizable": false},
	"October": {"questions": [0, 1, 2], "randomizable": false},
	"November": {"questions": [0, 1, 2], "randomizable": false},
	"December": {"questions": [0, 1, 2], "randomizable": false}
};

let gameData = { // just to make sure option choices doesn't repeat?
	"lockdown": false,
	"travel restrictions": false,
	"testing": true
};

let criticalDecisions = [];
