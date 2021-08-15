import './main.css';

if (module.hot) {
  module.hot.accept();
}

document.getElementById("next").addEventListener("click", buttonClick);
document.getElementById("change-mode").addEventListener("click", openChangeMode);
document.getElementById("close-change-mode").addEventListener("click", closeChangeMode);
document.getElementById("change-game-mode").addEventListener("click", changeMode);
document.getElementById("modeSelector").addEventListener("change", displayOptions);


// generate question
window.addEventListener('load', () => {
  changeMode();
});

let game = "Pronunciation Practice";
let wordGender = "Masculine";
let wordNum = "Singular";
let wordCase = "Nominative";
let syllables = 1;


const alphaArray = [ 
  ["α", "a", 1], 
  ["β", "b", 2], 
  ["γ", "g", 2], 
  ["δ", "d", 2], 
  ["ε", "&#277", 1],
  ["ζ", "z", 2], 
  ["η", "&#257", 1], 
  ["θ", "th", 2], 
  ["ι", "i", 1], 
  ["κ", "k", 2], 
  ["λ", "l", 2], 
  ["μ", "m", 2], 
  ["ν", "n", 2], 
  ["ξ", "x", 2], 
  ["ο", "&#335", 1], 
  ["π", "p", 2], 
  ["ρ", "r", 2], 
  ["σ", "s", 2], 
  ["τ", "t", 2], 
  ["υ", "oo", 1], 
  ["φ", "ph", 2], 
  ["χ", "k" /*or "ch"*/, 2], 
  ["ψ", "ps", 2], 
  ["ω", "&#333", 1], 
  ["αι", "&#299", 3], 
  ["ει", "&#257", 3], 
  ["οι", "oi", 3], 
  ["αυ", "ow", 3], 
  ["ου", "oo", 3], 
  ["υι", "w&#275", 3], 
  ["ευ", "yoo", 3], 
  ["ηυ", "yoo", 3] ];

const parsingArray = [
  ["λόγος", "Masculine", "Singular", "Nominative", 2],
  ["λόγου", "Masculine", "Singular", "Genative", 2],
  ["λόγῳ", "Masculine", "Singular", "Dative", 2],
  ["λόγον", "Masculine", "Singular", "Accusative", 2],
  ["λόγοι", "Masculine", "Plural", "Nominative", 2],
  ["λόγων", "Masculine", "Plural", "Genative", 2],
  ["λόγοις", "Masculine", "Plural", "Dative", 2],
  ["λόγους", "Masculine", "Plural", "Accusative", 2],
  ["γραφή", "Feminine", "Singular", "Nominative", 1],
  ["γραφῆς", "Feminine", "Singular", "Genative", 1],
  ["γραφῇ", "Feminine", "Singular", "Dative", 1],
  ["γραφήν", "Feminine", "Singular", "Accusative", 1],
  ["γραφαί", "Feminine", "Plural", "Nominative", 1],
  ["γραφῶν", "Feminine", "Plural", "Genative", 1],
  ["γραφαῖς", "Feminine", "Plural", "Dative", 1],
  ["γραφάς", "Feminine", "Plural", "Accusative", 1],
  ["ὥρα", "Feminine", "Singular", "Nominative", 1],
  ["ὥρας", "Feminine", "Singular", "Genative", 1],
  ["ὥρᾳ", "Feminine", "Singular", "Dative", 1],
  ["ὥραν", "Feminine", "Singular", "Accusative", 1],
  ["ὧραι", "Feminine", "Plural", "Nominative", 1],
  ["ὡρῶν", "Feminine", "Plural", "Genative", 1],
  ["ὥραις", "Feminine", "Plural", "Dative", 1],
  ["ὥρας", "Feminine", "Plural", "Accusative", 1],
  ["ἔργον", "Neuter", "Singular", "Nominative", 2],
  ["ἔργου", "Neuter", "Singular", "Genative", 2],
  ["ἔργῳ", "Neuter", "Singular", "Dative", 2],
  ["ἔργον", "Neuter", "Singular", "Accusative", 2],
  ["ἔργα", "Neuter", "Plural", "Nominative", 2],
  ["ἔργων", "Neuter", "Plural", "Genative", 2],
  ["ἔργοις", "Neuter", "Plural", "Dative", 2],
  ["ἔργα", "Neuter", "Plural", "Accusative", 2],
] 

// Type 1 = vowel, 2 = consonant, 3 = dipthong
function createAlphabet (x) {
  const vow = (x[2] == 1);
  const cons = (x[2] == 2);
  const dipth = (x[2] == 3);
  
  return {
    greek: x[0],
    english: x[1],
    vowel: vow,
    consonant: cons,
    dipthong: dipth
  };
}

function createParsingWords (x) {
  return {
    greek: x[0],
    wordGender: x[1],
    wordNum: x[2],
    wordCase: x[3],
    declension: x[4]
  };
}

function checkEdgeCases() {
  return "ς";
}

const alphabet = alphaArray.map(createAlphabet);

const vowels = alphabet.filter(
  function(x){
    if(x.vowel === true || x.dipthong === true){
      return x;
    }
  });

const consonants = alphabet.filter(
  function(x){
    if(x.consonant === true) {
      return x;
    }
  });

const allParsingWords = parsingArray.map(createParsingWords);
let parsingWords = allParsingWords;

const practice = {
  question: "",
  answer: "",
  answerShown: true,
  generateQandA: function () {
    if(game === "Pronunciation Practice") {
      // Reset this.question/answer, then simply add the letters to it rather that redefine it
      // Then I can loop through for each syllable 
      let vowelBool = getRandomInt(2) == 1 ;
      this.question = "";
      this.answer = "";

      for( let i = 0 ; i < syllables ; i++) {
        let vowelChoice = getRandomInt(vowels.length)
        let consonantChoice = getRandomInt(consonants.length);

        if (vowelBool) {
          if(consonants[consonantChoice].greek ==="σ" && i == ( syllables - 1 ) ) {consonants[consonantChoice].greek = "ς"};
          this.question += vowels[vowelChoice].greek + consonants[consonantChoice].greek;
          this.answer += vowels[vowelChoice].english + consonants[consonantChoice].english;
        } else {
          this.question += consonants[consonantChoice].greek + vowels[vowelChoice].greek;
          this.answer += consonants[consonantChoice].english + vowels[vowelChoice].english;
        }

        if (i < syllables - 1 ) { this.answer += " - " }


      }

      
      
    } else if (game === "Parsing Practice") {
      let word = getRandomInt(parsingWords.length);
      this.question = parsingWords[word].greek;
      this.answer = parsingWords[word].wordGender + "<br/>" + parsingWords[word].wordNum + "<br/>" + parsingWords[word].wordCase;
    }
  },
  updatePage: function () {
      document.getElementById("greek").innerHTML = this.question;
      document.getElementById("answer").innerHTML = this.answer;
      console.log(this.question);
      console.log(this.answer);
    }
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function buttonClick () {
    if (practice.answerShown) {
      practice.generateQandA();
      practice.updatePage();
      document.getElementById("next").innerHTML = "Show Pronunciation";
      document.getElementById("answer").style.visibility = "hidden";
      practice.answerShown = false;
    } else {
      document.getElementById("next").innerHTML = "Next";
      document.getElementById("answer").style.visibility = "visible";
      practice.answerShown = true;
    }
}



function reset () {

}



function openChangeMode () {
  document.getElementById("settings").style.display = "flex";
  document.getElementById("modeSelector").value = game;

  // Display relevant options
  displayOptions();
}


function closeChangeMode () {
  document.getElementById("settings").style.display = "none";

}

function changeMode () {

  game = document.getElementById("modeSelector").value;
  wordGender = document.getElementById("genderSelector").value;
  wordNum = document.getElementById("numberSelector").value;
  wordCase = document.getElementById("caseSelector").value;


    if( game === "Parsing Practice" ) {

      document.getElementById("answerLabel").innerHTML = "Parsing";

      parsingWords = allParsingWords;

      if(wordGender !== "All") {
        parsingWords = allParsingWords.filter( (word) => { return word.wordGender === wordGender} );
      }     
      if(wordNum !== "All") {
        parsingWords = parsingWords.filter( (word) => { return word.wordNum === wordNum} )
      }
      if(wordCase !== "All") {
        parsingWords = parsingWords.filter( (word) => { return word.wordCase === wordCase} )
      }
    }
 
    if ( game === "Pronunciation Practice" ) {
      document.getElementById("answerLabel").innerHTML = "Pronunciation";
      syllables = document.getElementById("syllableSelector").value;
    }

  practice.answerShown = true;
  document.getElementById("title").innerHTML = game;
  buttonClick();

  closeChangeMode();
}

function displayOptions () {
  if( document.getElementById("modeSelector").value === "Parsing Practice") {
    document.getElementById("parsing-options").style.display = "flex";
    document.getElementById("pronunciation-options").style.display = "none";
  } else {
    document.getElementById("pronunciation-options").style.display = "block";
    document.getElementById("parsing-options").style.display = "none";  
  }
  

}