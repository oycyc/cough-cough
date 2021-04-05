// all the prompt and its corresponding data
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

// result of player's choices' information
const resultCircleData = [
	{"answerChoice1": "Loosening restrictions while there is no major immunity and the virus is still prominent is certainly not a good idea. In the United States, the CDC recommended families not travel for Thanksgiving & the December holiday season, yet still, for Thanksgiving alone, there were 10 million people that traveled by air. In just two weeks following, cases and hospitalizations increased by about 20%, and the deaths jumped 39%.",
	 "answerChoice2": "Loosening restrictions while there is no major immunity and the virus is still prominent is certainly not a good idea. In the United States, the CDC recommended families not travel for Thanksgiving & the December holiday season, yet still, for Thanksgiving alone, there were 10 million people that traveled by air. In just two weeks following, cases and hospitalizations increased by about 20%, and the deaths jumped 39%.",
	}, // prompt 0

];

const clueData = [ // data correspond to question index, if no clue, have empty string
	"test",
	"test"
]

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
};