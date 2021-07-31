// Add the following:
// - Letter names
// - Multiple syllables
// - Better layout
// - final form
// - dipthong vowels
// I'd like an array with the alphabet + dipthongs. This would let me do alphabet exercises. But I would need a way to get the vowels and the consonants. I could do this with a second array of 0s and 1s. This would be easy enough.
// Additional exercises
// - random alphabet
// - order alphabet
// - alphabet names
// - transliterate words
// add dipthongs
// add breathing marks

window.addEventListener('load', (event) => {
  document.getElementById("next").addEventListener("click", function() {
    buttonClick()
  })
});

window.addEventListener('load', (event) => {
  document.getElementById("mode").addEventListener("change", function () {
    console.log("changed")
    game = document.getElementById("mode").value;
    console.log(game);
    document.getElementById("title").innerHTML = game;
  })
});

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
  ["λογος", "Masculine", "Singular", "Nominative", 2],
  ["λογου", "Masculine", "Singular", "Genative", 2],
  ["λογω", "Masculine", "Singular", "Dative", 2],
  ["λογον", "Masculine", "Singular", "Accusative", 2],
  ["λογοι", "Masculine", "Plural", "Nominative", 2],
  ["λογων", "Masculine", "Plural", "Genative", 2],
  ["λογοις", "Masculine", "Plural", "Dative", 2],
  ["λογους", "Masculine", "Plural", "Accusative", 2],
  ["γραφη", "Feminine", "Singular", "Nominative", 1],
  ["γραφης", "Feminine", "Singular", "Genative", 1],
  ["γραφην", "Feminine", "Singular", "Dative", 1],
  ["γραφη", "Feminine", "Singular", "Accusative", 1],
  ["γραφαι", "Feminine", "Plural", "Nominative", 1],
  ["γραφων", "Feminine", "Plural", "Genative", 1],
  ["γραφαις", "Feminine", "Plural", "Dative", 1],
  ["γραφασ", "Feminine", "Plural", "Accusative", 1],
  ["ωρα", "Feminine", "Singular", "Nominative", 1],
  ["ωρας", "Feminine", "Singular", "Genative", 1],
  ["ωρα", "Feminine", "Singular", "Dative", 1],
  ["ωραν", "Feminine", "Singular", "Accusative", 1],
  ["εργον", "Neuter", "Singular", "Nominative", 2],
  ["εργου", "Neuter", "Singular", "Genative", 2],
  ["εργω", "Neuter", "Singular", "Dative", 2],
  ["εργον", "Neuter", "Singular", "Accusative", 2],
  ["εργα", "Neuter", "Plural", "Nominative", 2],
  ["εργων", "Neuter", "Plural", "Genative", 2],
  ["εργοις", "Neuter", "Plural", "Dative", 2],
  ["εργα", "Neuter", "Plural", "Accusative", 2],
] 

function createParsingWords (x) {
  return {
    greek: x[0],
    gender: x[1],
    number: x[2],
    case: x[3],
    declension: x[4]
  };
}

function checkEdgeCases() {
  //check for final sigma and double gamma
}

const alphabet = alphaArray.map(createAlphabet);
const vowels = alphabet.filter(
  function(x){
    if(x.vowel === true || x.dipthong === true){
      return x;
    }
  });

const parsingWords = parsingArray.map(createParsingWords);

const consonants = alphabet.filter(
  function(x){
    if(x.consonant === true) {
      return x;
    }
  });

let game = "Pronunciation Practice";

console.log(alphabet);

const myWords = ["και", "Αβρααμ", "Ιησους", "θεος", "λογος", "αγγελος", "θελω"];

const practice = {
  question: "",
  answer: "",
  answerShown: true,
  generateQandA: function () {
    if(game === "Pronunciation Practice") {
      let vowelChoice = getRandomInt(vowels.length)
      let consonantChoice = getRandomInt(consonants.length);
      let vowelBool = getRandomInt(2) == 1 ;
      if (vowelBool) {
        if(consonants[consonantChoice].greek ==="σ") {consonants[consonantChoice].greek = "ς"};
        this.question = vowels[vowelChoice].greek + consonants[consonantChoice].greek;
        this.answer = vowels[vowelChoice].english + consonants[consonantChoice].english;
      } else {
        this.question = consonants[consonantChoice].greek + vowels[vowelChoice].greek;
        this.answer = consonants[consonantChoice].english + vowels[vowelChoice].english;
      }
    } else if (game === "Parsing Practice") {
      let word = getRandomInt(parsingArray.length);
      this.question = parsingWords[word].greek;
      this.answer = parsingWords[word].gender + " " + parsingWords[word].number + " " + parsingWords[word].case;
    }
  },
  updatePage: function () {
      document.getElementById("greek").innerHTML = this.question;
      document.getElementById("answer").innerHTML = this.answer;
      console.log(this.question);
      console.log(this.answer);
    }
};

buttonClick();

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
