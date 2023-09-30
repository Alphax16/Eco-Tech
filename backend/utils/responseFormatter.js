function toTitleCase(str) {
    let words = str.split(' ');

    words = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

    return words.join(' ');
}

module.exports = { toTitleCase };
