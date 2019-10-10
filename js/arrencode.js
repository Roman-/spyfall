// arrencode.js contains funcs for encoding and decoding array of numbers
// so that it's impossible to guess game outcome (original array) by looking at encoded numbers.
// Since we include game outcome in the URL, we should encode it and also embed KEY int the URL

// convert array of numbers to encoded string
// key - random encoding key
// returns array of encoded values. Their permutation is affected too
function numArrayEncode(array, key) {
    // encode numbers themself
    var clone = array.slice(0);
    // 1. change indeces
    addIndecesToEls(clone, keyToXy(key, Glob.elsMin, Glob.elsMax));

    // 2. encode numbers
    for (let i = 0; i < clone.length; i++)
        clone[i] = encodeNumber(clone[i], key);

    // 3. encode permutation
    let encoded = encodeArrayPerm(clone, key);

    // 4. add indeces to final array
    addIndecesToEls(encoded, keyToXy(key, Glob.elsMin, Glob.elsMax));
    return encoded;
}

// encoded array of numbers to decoded array of numbers
function encodedToNumArray(encodedArr, key) {
    let encoded = [];
    encodedArr.forEach(function (s) {
        let intValue = (typeof s == 'string') ? parseInt(s) : s;
        encoded.push(intValue);
    });

    // 1. remove indeces from final array
    addIndecesToEls(encoded, -1 * keyToXy(key, Glob.elsMin, Glob.elsMax));
    // 2. decode numbers
    let decoded = [];
    encoded.forEach(function (n) {
        decoded.push(decodeNumber(n, key));
    });

    // 3. decode permutation
    decoded = decodeArrayPerm(decoded, key);

    // 4. decrease by indeces
    addIndecesToEls(decoded, -1*keyToXy(key, Glob.elsMin, Glob.elsMax));
    return decoded;
}

// to each element of the numeric array arr adds its index multiplied by factor
function addIndecesToEls(arr, factor = 1) {
    for (let i = 0; i < arr.length; i++)
        arr[i] = arr[i] + i*factor;
}

// run tests to ensure
function runEncodingTests() {
    let testsCount = 0;
    for (key = 1; key < 10000; key += (1+randomNumber(20))) {
        for (let attempt = 0; attempt < 5; attempt++) {
            let array = makeRandomArray();
            let encodedString = numArrayEncode(array, key);
            let decoded = encodedToNumArray(encodedString, key);
            if (JSON.stringify(array) != JSON.stringify(decoded)) {
                console.error("miss! array, encodedString, decoded, key = ", array, encodedString, decoded, key);
                return false;
            } else {
                testsCount++;
            }
        }
    }
    console.log("encoding tests: " + testsCount + " tests ran successfully");
    return true;
}


/* functions to encode */

Glob.k1Min = 2;
Glob.k2Min = 5;
Glob.k1Scale = 30;
Glob.k2Scale = 47;
Glob.elsMin = 1;
Glob.elsMax = 8;

// returns *seemingly random* float number from 0 to 1 based on key
function keyTo01(key) {
    let sin = Math.sin(key);
    sin = (sin === 1) ? 0.99999 : sin; // non-inclusive
    return (1 + sin)/2;
}

// returns *seemingly random* integer number from x (inclusive) to y (non-inclusive) based on key
function keyToXy(key, x, y) {
    let ss = keyTo01(key);
    return Math.floor(x + ss*(y-x));
}

// returns number encoded with key
function encodeNumber(num, key) {
    ss = keyTo01(key);
    k1 = Math.floor(Glob.k1Min + ss*Glob.k1Scale);
    k2 = Math.floor(Glob.k2Min + ss*Glob.k2Scale);

    code = num * k1 + k2;
    return code;
}


// returns number decoded with key
function decodeNumber(code, key) {
    ss = keyTo01(key);
    k1 = Math.floor(Glob.k1Min + ss*Glob.k1Scale);
    k2 = Math.floor(Glob.k2Min + ss*Glob.k2Scale);

    // misc check
    if ((code - k2) % k1 !== 0)
        console.error("encoding number: code,k1,k2= ",code,k1,k2);

    return ((code - k2) / k1);
}

// returns array of swaps
// len - length of array to be encoded with swapArray
function makeSwapArray(key, len) {
    // generate array of indeces to be swapped
    let numberOfSwaps = 10;
    let output = [];
    for (let i = 0; i < numberOfSwaps*2; i++) {
        let nextKey = key + i;
        ss = keyTo01(nextKey);
        let nextIndex = Math.floor(ss * len);
        output.push(nextIndex);
    }
    return output;
}

// swaps 2 elements of array
function swapInArr(arr, i1, i2) {
    let temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
}

// performs swaps on array a using swapArray
// direct = true for encoding, false for decoding
function performSwaps(a, swapArray, direct) {
    let inc = direct ? 2 : -2;
    let begin = direct ? 0 : (swapArray.length - 2);
    for (let i = begin; (i >= 0 && i < swapArray.length); i += inc) {
        let index1 = swapArray[i];
        let index2 = swapArray[i+1];
        swapInArr(a, index1, index2);
    }
}

// encodes array permutations
// arr - array to encode
// returns array encoded
function encodeArrayPerm(arr, key) {
    var clone = arr.slice(0);
    let swapArr = makeSwapArray(key, clone.length);
    performSwaps(clone, swapArr, true);
    return clone;
}

// encodes array permutations
// arr - array to encode
function decodeArrayPerm(arr, key) {
    var clone = arr.slice(0);
    let swapArr = makeSwapArray(key, clone.length);
    performSwaps(clone, swapArr, false);
    return clone;
}
