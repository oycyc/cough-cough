// all the prompt and its corresponding data
const promptData = [
	{"prompt": "Your citizens are unsure of what the news regarding the transmission of the virus entails.",
	"question": "How will you keep your citizens safe from the virus?", 
	"optionChoices": 
		{"Advise citizens to avoid gathering with others and stay safe": 
			{"resultID": 0, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	         "Require citizens to wear masks in all public places": 
	     		{"resultID": 1, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	    	},
   	"hint": false
	}, // prompt 0

	{"prompt": "Currently, your country doesn't have a steady supply of virus testing, which is crucial for keeping a outbreak under control. As the virus circulate increasingly, more and more citizens are curious of whether or not they have contracted the disease and want to get tested.",
	"question": "How will you get testing kits?", 
	"optionChoices": 
		{"Have your nation's scientists develop a plan for testing for the disease": 
			{"resultID": 2, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}, 
		 "Request testing kits from neighboring countries": 
		 	{"resultID": 2, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
		 "Request testing kits from an international health organization": 
		 	{"resultID": 2, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
		}
	},

	{"prompt": "Now that you've expanded your country's testing capabilities, it's much easier locate outbreaks in individual local communities. Contact tracers can then let more people if know they've been exposed to the virus and ask them to quarantine.",
	"question": "Should the quarantine be mandatory?", 
	"optionChoices": 
		{"Make self-isolating quarantine mandatory": 
			{"resultID": 3, "deathChange": 55, "hospitalChange": 25, "positivityRateChange": 550}, 
		 "Only ask and recommend people to quarantine": 
		 	{"resultID": 3, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 10}
		}
	},

	{"prompt": "The disease has spread drastically despite the actions you've done so far. You are thinking of advising the head of government to be more serious and declare this a public health emergency as more potential cases rises.",
	"question": "Will you declare this virus an emergency?", 
	"optionChoices": 
		{"Declare the virus a national emergency and give more info to the public": 
			{"resultID": 4, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	     	 "Try to calm the country down and give more info to the public": 
	     		{"resultID": 4, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	    }
	}, //prompt 3 feb

	{"prompt": "Global air travel is fast way of spreading the virus. One individual from the other side of the world that is infected could potentially spread the virus to a new region that's never seen the virus ever before.",
	"question": "How will you restrict international travel?", 
	"optionChoices": 
		{"Shut down international travel entirely": 
			{"resultID": 5, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
		 "Ban travel from & to virus hotspots": 
		 	{"resultID": 5, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
	    	 "Advise citizens against traveling": 
	     		{"resultID": 5, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	    }
	},

	{"prompt": "Large public gatherings are beginning to raise concerns in the community. When one person contracts the disease and goes to public gatherings, the number of people infected can double or triple in a matter of days.",
	"question": "Will you restrict public gatherings?", 
	"optionChoices": 
		{"Put a restriction on the number of people allowed in a public gathering": 
			{"resultID": 6, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	    	 "No restrictions on public gatherings": 
	     		{"resultID": 6, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
	    	 "Order a complete lockdown of the country aside from essential services": 
	     		{"resultID": 6, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	    }
	},

	{"prompt": "Along with advising the head of government to declare this a public health emergency, public awareness campaigns are helpful in promoting precautionary measures like hand washing and mask wearing.",
	"question": "Will you launch public awareness campaigns?", 
	"optionChoices": 
		{"Launch public awareness campaigns": 
			{"resultID": 7, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0}
		}
	}, //prompt 6 march

	{"prompt": "The discussion regarding the restriction of public gatherings has led your citizens to question whether schools should be closed due to the number of people in school buildings.",
	"question": "How will schools operate?", 
	"optionChoices": 
		{"Move all students into a virtual environment to learn": 
			{"resultID": 8, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	     	 "Keep all schools open": 
	     		{"resultID": 8, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
	   	 "Keep younger children in school buildings and move older children into a virtual environment": 
	   	 	{"resultID": 8, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	   	}
	},

	{"prompt": "Some doctors have contracted the disease, and hospital supplies are running low. Many felt an obligation to return to work to earn money for family and care for more patients due to the lack of doctors.",
	"question": "Will you offer assistance to healthcare workers?", 
	"optionChoices": 
		{"Offer assistance by providing more medical supplies and add benefits for doctors": 
			{"resultID": 9, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	     	 "Ignore their needs": 
	     		{"resultID": 9, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	    }
	}, //prompt 8 april

	{"prompt": "A new treatment has been made and the clinical trial data looks very promising. Patients treated with this treatment would have less severe symptoms and a faster recovery time. The company is asking you to approve it for public consumer usage.",
	"question": "Will you approve this new treatment?", 
	"optionChoices": 
		{"Approve it": 
			{"resultID": 10, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	     	 "Reject it": 
		 	{"resultID": 10, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	 	}
	}, //may

	{"prompt": "Your citizens often gather closely in large groups in many leisure facilities, shops, and workplaces.",
	"question": "Do workplaces and various facilities have to shut down?", 
	"optionChoices": 
		{"Keep them completely open": 
			{"resultID": 11, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	     	 "Shut them down": 
	     		{"resultID": 11, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0},
	   	 "Allow them to open with some restrictions": 
	   	 	{"resultID": 11, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	   	}
	}, //prompt 10 june

	{"prompt": "As the virus positivity rate increases, contact tracing becomes a key part of identifying possible virus transmissions.",
	"question": "How will you improve the contact tracing system?", 
	"optionChoices": 
		{"Update citizens on the extent to which the virus had spread on social media platforms": 
			{"resultID": 12, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	     	 "Develop an app to monitor potential cases": 
	     		{"resultID": 12, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	    	}
	},

	{"prompt": "A neighboring nation just opened its doors to international travel, and some citizens are urging for your nation to do the same.",
	"question": "Will you change your travel policy?", 
	"optionChoices": 
		{"Allow borders to open": 
			{"resultID": 13, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
		 "Enact a mandatory quarantine of 14 days for all visitors": 
			{"resultID": 13, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	    	 "Keep the borders shut": 
	     		{"resultID": 13, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	    }
	}, //12 august

	{"prompt": "Back to school season is approaching soon. Citizens are wondering if there is a change as to how children will be taught.",
	"question": "How will schools operate?", 
	"optionChoices": 
		{"Allow students back into the school building with mask and social distancing guidelines": 
			{"resultID": 14, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	     	 "Require students to learn in a virtual environment": 
	     		{"resultID": 14, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	    }
	},

	{"prompt": "Scientists have discovered a new variant of the virus, and your citizens lack information regarding the new variant.",
	"question": "How will you find out more about the variant?", 
	"optionChoices": 
		{"Keep track of developments in the new variant": 
			{"resultID": 15, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
		 "Obtain current scientific findings on the new variant from other countries": 
		 	{"resultID": 15, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
		}
	},

	{"prompt": "Many of your citizens want to visit their friends and family this holiday season.",
	"question": "Will you change any traveling restrictions?", 
	"optionChoices": 
		{"Allow citizens to travel in and out of the nation if they show prove of a negative test within 72 hours": 
			{"resultID": 17, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
		 "Recommend people not to travel": 
		 	{"resultID": 16, "deathChange": 5, "hospitalChange": 9, "positivityRateChange": 0},
	 	 "Loosen restrictions": 
	 	 	{"resultID": 17, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
	 	}
	},

	{"prompt": "You received news of a promising vaccine that could be used to treat the virus.",
	"question": "Will you approve the vaccine?", 
	"optionChoices": 
		{"Approve and administer the vaccine to your citizens.": 
			{"resultID": 18, "deathChange": 0, "hospitalChange": 0, "positivityRateChange": 0}
		}
	},
];

// result of player's choices' information
// index corresponds with resultID key value from promptData
const resultData = [
	// resultID 0
	"With only recommendations to stay safe and no enforcement, citizens can still go out and unknowingly spread the disease to each other without safety measures like wearing a mask. In the United Kingdom, the failure to prevent mass gatherings even after two weeks of the initial virus detection turned out to be devastating for the community.",
	// resultID 1
	"Like the flu, a key step in preventing the transmission of the new virus is to create a barrier between your mouth and nose and those around you. Requiring your citizens to wear a mask in all public settings can prevent others from unknowingly spreading the disease to each other, which was an effective step Hong Kong took as a mitigation policy.",
	// resultID 2
	"As long as your country has the capacity to test everyone who wants to get tested, the source doesn't matter greatly. Some countries like Germany and South Korea manufactured their own tests while others purchased testing kits from other countries like South Korea in the beginning then created their own tests in their homeland labs later.",
	//3
	"Quarantining is key in slowing the spread of a virus. If an infected person isolates, then they wouldn't spread the virus to others. While most states in America don't have direct mandates for self-isolating after positive testing, other countries like South Korea make it required to quarantine and even give people free necessity care packages (in some cases financial aid too)."
	//4
	/*"In the United States, President Trump declared COVID-19 a national emergency on March 13, 2020, when there were already 1,629 reported cases and 41 deaths. If it had been any later, the situation would have been even worse. Many scientists still to this day consider the timing of the emergency declaration to be too late already.",
	//5
	"Your citizens might think you're being overly cautious, but over time, they will be glad you took the measures early. Overall, countries who blocked travel earlier did better with virus control than countries who did it later/looser."
	//6
	"Similar to Serbia, prohibiting citizens from gathering with others would enable the virus positivity, hospitalization, and death rates caused by the virus to stabilize, rather than increase. Putting a restriction on the number of people allowed in a public gathering would be best if other measures such as social distancing were followed."
	//7
	"By the beginning of April 2020, most countries had public information campaigns on the Covid-19 pandemic. The public information campaigns can help to dispel misinformation regarding the disease and reinforce the importance of preventive measures such as mask-wearing and social distancing."
	//8
	"Worldwide, researchers conducted studies to discover if schools were a major site of virus transmission, and data suggests that there is no strong correlation between school openings and increased Covid-19 cases. Interestingly, Sweden closed its upper-secondary schools while allowing lower-secondary schools to remain open during the pandemic. A recent study analyzing Sweden's schools suggests that in-person schooling affected teachers' infection rates negatively."
	//9
	"Determined doctors and healthcare workers are fighting in the front line of this battle, but many have reported a shortage of supplies in hospitals, which puts staff and patients at risk. In a survey taken by 925 Afghan healthcare workers, less than 50% had access to disposable gowns, face shields, and medical masks. Countries like Albania and Greece have allocated money to increase wages or provide bonuses for healthcare workers."
	//10
	"On May 1st, 2020, an antiviral medication that targets COVID-19 called Remdesvir was approved by the FDA for emergency use. This medication still holds to be a very effective therapy and is very important to prevent excess deaths. Even President Trump was on a Remdesvir treatment when he contracted the virus in October 2020."
	/11
	"Many leisure facilities, restaurants, and workplaces are indoors and allow visitors to gather in large groups. This could allow the infection rates to rise, especially if people are not taking the correct safety precautions. In Gabon, clients must show proof of a valid negative COVID-19 test in order to enter restaurants, and anyone above the age of 5 is required to wear masks."
	//12
	"Contact tracing is key in mitigating the spread of the virus. In Taiwan, authorities were able to successfully identify cases by utilizing data and technology to provide real-time alerts about possible infected persons. Similarly, contact tracers in Singapore would create a detailed log of the patient's movement upon the detection of a confirmed case. Both countries were able to establish a sense of trust in the community."
	//13
	"Around the end of March 2020, most countries around the world either had a ban on high-risk regions or had a total border closure. Mongolia had a ban on high-risk regions ever since the end of January 2020 and enacted a total border closure at the end of March 2020. The border closure is still in effect as of April 7, 2021."
	//14
	"Schools are closed, but many public facilities are still open; this condition could still propel virus spread in communities. Although Italy opened its schools, non-essential businesses were closed, and Italy’s new virus caseloads dropped as low as 200 a day."
	//15
	"Over time, scientists noticed mutations in SARS-CoV-2 emerging around the world. Evidence suggests that although current vaccines could be less effective against some of the new strains, it does not mean that vaccines will not offer protection against them. In addition, scientists are keeping track of major mutations and can adjust the vaccine development process accordingly."
	//16
	"A recommendation is only a recommendation and is not very effective for crucial health policies. In the United States, the CDC recommended families not travel for Thanksgiving & the December holiday season, yet for Thanksgiving alone, there were 10 million people that traveled by air. In just two weeks following, cases and hospitalizations increased by about 20%, and the deaths jumped 39%."
	//17
	"Loosening restrictions while there is no major immunity and the virus is still prominent is certainly not a good idea. In the United States, the CDC recommended families not travel for Thanksgiving & the December holiday season, yet still, for Thanksgiving alone, there were 10 million people that traveled by air. In just two weeks following, cases and hospitalizations increased by about 20%, and the deaths jumped 39%."
	//18
	"Administering the vaccine is a great step towards preventing the transmission of disease and decreasing the death count in your nation! However, your nation's citizens will still need to do their part and practice safety measures such as wearing masks to contain the disease."
*/];


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
