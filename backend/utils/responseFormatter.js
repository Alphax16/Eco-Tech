function toTitleCase(str) {
    let words = str.split(' ');

    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    return words.join(' ');
}

function getNextElementAfterLastDelimiter(inputString, delimiter='\n') {
    var lines = inputString.split(delimiter);
    console.log(lines);
    return lines[lines.length - 2];
}

function removeEscapeSequences(inputString) {
    return inputString.replace(/\\[bfnrtv'"\\]/g, '');
}

module.exports = { toTitleCase, getNextElementAfterLastDelimiter, removeEscapeSequences };
