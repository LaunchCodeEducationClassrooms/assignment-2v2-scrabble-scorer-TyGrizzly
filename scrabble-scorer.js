// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
  console.log(letterPoints);
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question(`Let's play some scrabble!\n\nEnter a word to score: `);
   //return oldScrabbleScorer(word);
   return word;
};

// simpleScore: Define a function that takes a word as a parameter and returns a numerical score. Each letter within the word is worth 1 point.
let simpleScore = function(word) {
  word.toUpperCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    score += 1;
  }
  return score;
};

// vowelBonusScore: Define a function that takes a word as a parameter and returns a score. Each vowel within the word is worth 3 points, and each consonant is worth 1 point.
let vowelBonusScore = function(word) {
  word.toUpperCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    if ((word[i] === 'a') || (word[i] === 'e') || (word[i] === 'i') || (word[i] === 'o') || (word[i] === 'u')) {
      score += 3;
    } else {
      score += 1;
    }
  }
  return score;
};

let scrabbleScore = function(word) {
   word = word.toLowerCase();
  let score = 0;
  for (let i = 0; i < word.length; i++) {
    for (letter in newPointStructure) {
      if (letter === word[i]) {
        score += newPointStructure[letter];
      }
    }
  }
  return score;
};

// Finish writing the scoringAlgorithms array. It should be populated with three objects, one for each of the three scoring options. Each object should contain three keys: name, description, and scorerFunction.

let simpleScoreObject = {
  name: 'Simple Score',
  description: 'Each letter is worth 1 point.',
  scoringFunction: simpleScore
};

let vowelScoreObject = {
  name: 'Bonus Vowels',
  description: 'Vowels are 3 pts, consonants are 1 pt.',
  scoringFunction: vowelBonusScore
}; 

let scrabbleScoreObject = {
  name: 'Scrabble',
  description: 'Uses scrabble point system.',
  scoringFunction: scrabbleScore
};

const scoringAlgorithms = [simpleScoreObject, vowelScoreObject, scrabbleScoreObject];

// Call scorerPrompt() inside of runProgram() so that the program asks the user for a scoring algorithm after prompting for a word. Use the scoring object returned from scorerPrompt() to score the user's word and let the user know what score their word receives.

function scorerPrompt() {
   let scorerIndex = input.question(`Which scoring algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\n\nEnter 0, 1, or 2: `);
  return scoringAlgorithms[scorerIndex];
}

// Write the rest of the transform() function. It will need to take an object as a parameter - specifically the oldPointStructure object. Calling transform(oldPointStructure) will return an object with lowercase letters as keys. The value for each key will be the points assigned to that letter
function transform(oldObject) {
  let newObject = {};
  for (key in oldObject) {
    for (i = 0; i < oldObject[key].length; i++) {
      newObject[(oldObject[key][i]).toLowerCase()] = Number(key);
    }
  }
  return newObject;
};

let newPointStructure = transform(oldPointStructure);

newPointStructure[' '] = 0;

function runProgram() {
  let word = initialPrompt();
  let scorer = scorerPrompt(); 
  console.log(`Score for '${word}': ${scorer.scoringFunction(word)}`);    
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

