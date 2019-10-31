// Global variable to enumerate full month names
export const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

// Global variable to enumerate week day names
export const WEEKDAY = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

// Add Ndays to provided date
export const addUTCDays = (date, Ndays) => {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + Ndays);
    return result;
};

// Map month value to full month string
export const dateToUTCFullMonthName = (dateTime) =>
    MONTHS[dateTime.getUTCMonth()];

// Map weekday value to full weekday name string
export const dateToUTCWeekdayName = (dateTime) => WEEKDAY[dateTime.getUTCDay()];

// Return the (first) longest word from a string
export const longestWord = (str) => {
    if (!str || !str.length) {
        return "";
    }

    const words = str.split(" ");
    const winner = {longestWord: words[0], maxLength: words[0].length};
    words.forEach((word) => {
        if (word.length > winner.maxLength) {
            winner.longestWord = word;
            winner.maxLength = word.length;
        }
    });

    return winner.longestWord;
};


// Shuffle the items in an array
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // eslint-disable-line no-param-reassign
    }
};
