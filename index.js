var _ = require("underscore"),
  Mocha = require("mocha"),
  expect = require("chai").expect,
  mocha = getTesterInstance.call(this);

// GLOBAL STRING FOR TESTING
var tale_of_two_cities = `
  It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.
`;

/*
   GIVEN: a string, this is usually a bunch of words but doesn't need to be.
          Could just be single characters as well as what we think of as words.

   RETURN:
      An object (hashmap) that contains the 10 longest words and their counts.
      All output words must be lower cased. If there's a tie in length then
        alphabetical order matters and fall back to that.

   ERRORS:
      If the input string doesn't have at least 10 words then return null.
      The input must be a string otherwise return `null`

*/

function makeObject(arrOne, arrTwo) {
  let newObject = {};
  for (let i = 0; i < arrOne.length; i++) {
    newObject[arrOne[i]] = arrTwo[i];
  }
  return newObject;
}

function topTenWordLengthCounts(the_words) {
  /* thought process: sort words by length and alphabetize to only grab the 10 with the longest length, then conditional to make sure there are only strings being passed in
  we will add it to the hash_of_Words object with key value pairs of the word and length
  convert all to lower case by toLowerCase and remove the punctuation
  */

  var hash_of_words = {};

  //needed to make into a string so I could use some methods that belong to string prototype
  let stringWords = the_words.toString();

  let removePunct = removePunctuation(stringWords);

  let lowercaseWords = removePunct.toLowerCase();

  //this splits into individual words at each space
  let splitWords = lowercaseWords.split(" ");

  //this will sort the words by alphabetical ascending order
  let alphaSortWords = splitWords.sort();

  //takes the alphabetically sorted words and sorts by length
  let sortedWords = alphaSortWords.sort(function(x, y) {
    return y.length - x.length;
  });

  //then slicing to keep just the top 10 words
  let topTen = sortedWords.slice(0, 10);

  //making an array with the length values
  let wordLength = topTen.map(x => {
    return x.length;
  });
  // console.log("wordLength", wordLength);

  //need a reduce to turn the arrays into one obj using the function above
  var hash_of_words = makeObject(topTen, wordLength);
  // console.log("hash of words", hash_of_words)

  if (typeof sortedWords == "string") {
    return null;
    // then checking to make sure there are no numbers
  } else if (typeof the_words === "number") {
    return null;
  }

  return hash_of_words;
}

// Here's a helper function for you. Use it in good health.
// pass in a string you want to have puncuation removed from it.
function removePunctuation(str) {
  return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
}

// useful links:  http://chaijs.com/guide/styles/#expect
describe("Test finding the top 10 longest words in the string", function() {
  var top_ten_words = {
    foolishness: 11,
    incredulity: 11,
    authorities: 11,
    superlative: 11,
    comparison: 10,
    everything: 10,
    darkness: 8,
    received: 8,
    noisiest: 8,
    insisted: 8
  };

  it("Sending an integer should return null", function() {
    expect(topTenWordLengthCounts(1)).to.equal(null);
  });

  it("The object returned should match the given object", function() {
    expect(topTenWordLengthCounts(tale_of_two_cities)).to.deep.equal(
      top_ten_words
    );
  });

  it("Strings should be lower cased", function() {
    expect(topTenWordLengthCounts("A B C D E F G H I J")).to.deep.equal({
      a: 1,
      b: 1,
      c: 1,
      d: 1,
      e: 1,
      f: 1,
      g: 1,
      h: 1,
      i: 1,
      j: 1
    });
  });
});

mocha.run();

// you can ignore everything below this line
// #########################################

function getTesterInstance() {
  var mocha = new Mocha({ ui: "bdd" });

  // Bit of a hack, sorry! (blame coderpad)
  mocha.suite.emit("pre-require", this, "solution", mocha);

  return mocha;
}
