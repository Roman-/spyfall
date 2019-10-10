// generates random integer number from 0 (inclusive) to upperBound (non-inclusive)
function randomNumber(upperBound) {
    return Math.floor(Math.random()*upperBound);
}

// generates random array of random length
function makeRandomArray() {
    let result = [];
    let l = randomNumber(10) + 3;
    for (let i = 0; i < l; i++)
        result.push(randomNumber(10));
    return result;
}

// outputs error message to console and returns null.
// handy func to return this object from other functions
function yellError(msg) {
    console.error(msg);
    return null;
}
