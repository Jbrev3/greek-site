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

window.addEventListener('load', (event) => {document.getElementById("next").addEventListener("click", function(){buttonClick()})});

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

alphaArray = [ ["α", "a", 1], ["β", "b", 2], ["γ", "g", 2], ["δ", "d", 2], ["ε", "&#277", 1], ["ζ", "z", 2], ["η", "&#257", 1], ["θ", "th", 2], ["ι", "i", 1], ["κ", "k", 2], ["λ", "l", 2], ["μ", "m", 2], ["ν", "n", 2], ["ξ", "x", 2], ["ο", "&#335", 1], ["π", "p", 2], ["ρ", "r", 2], ["σ", "s", 2], ["τ", "t", 2], ["υ", "oo", 1], ["φ", "ph", 2], ["χ", "k" /*or "ch"*/, 2], ["ψ", "ps", 2], ["ω", "&#333", 1], ["αι", "ay", 3], ["ει", "&#257", 3], ["οι", "oy", 3], ["αυ", "ow", 3], ["ου", "oo", 3], ["υι", "we", 3], ["ευ", "yoo", 3], ["ηυ", "yoo", 3] ];

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
  
const consonants = alphabet.filter(
  function(x){
    if(x.consonant === true) {
      return x;
    }
  });

console.log(alphabet);

const myWords = ["και", "Αβρααμ", "Ιησους", "θεος", "λογος", "αγγελος", "θελω"];

const practice = {
  question: "",
  answer: "",
  answerShown: true,
  generateQandA: function () {
    let vowelChoice = getRandomInt(vowels.length)
    let consonantChoice = getRandomInt(consonants.length);
    let vowelBool = getRandomInt(2) == 1 ;
    if (vowelBool) {
      this.question = vowels[vowelChoice].greek + consonants[consonantChoice].greek;
      this.answer = vowels[vowelChoice].english + consonants[consonantChoice].english;
    } else {
      this.question = consonants[consonantChoice].greek + vowels[vowelChoice].greek;
      this.answer = consonants[consonantChoice].english + vowels[vowelChoice].english;
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
      document.getElementById("answer").style.color = "white";
      practice.answerShown = false;
    } else {
      document.getElementById("next").innerHTML = "Next";
      document.getElementById("answer").style.color = "black";
      practice.answerShown = true;
    }

}
