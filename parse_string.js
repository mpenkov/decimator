//
// Parses Japanese numbers into integers.
//

var DIGIT_0 = "DIGIT_0";
var DIGIT_1 = "DIGIT_1";
var DIGIT_2 = "DIGIT_2";
var DIGIT_3 = "DIGIT_3";
var DIGIT_4 = "DIGIT_4";
var DIGIT_5 = "DIGIT_5";
var DIGIT_6 = "DIGIT_6";
var DIGIT_7 = "DIGIT_7";
var DIGIT_8 = "DIGIT_8";
var DIGIT_9 = "DIGIT_9";

var DIGIT_1J = "DIGIT_1J";
var DIGIT_2J = "DIGIT_2J";
var DIGIT_3J = "DIGIT_3J";
var DIGIT_4J = "DIGIT_4J";
var DIGIT_5J = "DIGIT_5J";
var DIGIT_6J = "DIGIT_6J";
var DIGIT_7J = "DIGIT_7J";
var DIGIT_8J = "DIGIT_8J";
var DIGIT_9J = "DIGIT_9J";

var MUL_JUU   = "MUL_JUU";
var MUL_HYAKU = "MUL_HYAKU";
var MUL_SEN   = "MUL_SEN";
var MUL_MAN   = "MUL_MAN";
var MUL_OKU   = "MUL_OKU";
var MUL_CHOU  = "MUL_CHOU";

var CHAR2TOK = {
    "0": DIGIT_0,
    "1": DIGIT_1,
    "2": DIGIT_2,
    "3": DIGIT_3,
    "4": DIGIT_4,
    "5": DIGIT_5,
    "6": DIGIT_6,
    "7": DIGIT_7,
    "8": DIGIT_8,
    "9": DIGIT_9,
    "０": DIGIT_0,
    "１": DIGIT_1,
    "２": DIGIT_2,
    "３": DIGIT_3,
    "４": DIGIT_4,
    "５": DIGIT_5,
    "６": DIGIT_6,
    "７": DIGIT_7,
    "８": DIGIT_8,
    "９": DIGIT_9,
    "一": DIGIT_1J,
    "二": DIGIT_2J,
    "三": DIGIT_3J,
    "四": DIGIT_4J,
    "五": DIGIT_5J,
    "六": DIGIT_6J,
    "七": DIGIT_7J,
    "八": DIGIT_8J,
    "九": DIGIT_9J,
    "十": MUL_JUU,
    "百": MUL_HYAKU,
    "千": MUL_SEN,
    "万": MUL_MAN,
    "億": MUL_OKU,
    "兆": MUL_CHOU
};

var TOK2INT = {
    DIGIT_0: 0,
    DIGIT_1: 1,
    DIGIT_2: 2,
    DIGIT_3: 3,
    DIGIT_4: 4,
    DIGIT_5: 5,
    DIGIT_6: 6,
    DIGIT_7: 7,
    DIGIT_8: 8,
    DIGIT_9: 9,
    DIGIT_1J: 1,
    DIGIT_2J: 2,
    DIGIT_3J: 3,
    DIGIT_4J: 4,
    DIGIT_5J: 5,
    DIGIT_6J: 6,
    DIGIT_7J: 7,
    DIGIT_8J: 8,
    DIGIT_9J: 9,
    MUL_JUU: 10,
    MUL_HYAKU: 1e2,
    MUL_SEN: 1e3,
    MUL_MAN: 1e4,
    MUL_OKU: 1e8,
    MUL_CHOU: 1e12
};

//
// multipliers in descending order
//
var MUL = [MUL_CHOU, MUL_OKU, MUL_MAN, MUL_SEN, MUL_HYAKU, MUL_JUU];

//
// Returns the zero-based index of key in array, starting the search at the
// start position.
// Returns -1 if not found.
//
function index_of(array, key, start) {
    for (var i = start; i < array.length; ++i) {
        if (array[i] === key) {
            return i;
        }
    }
    return -1;
}

//
// Traditional Japanese numbers use Kanji exclusively (no Arabic numerals).
// Reads an array of tokens recursively and returns the number it represents.
//
function read_tokens_traditional(tokens) {
    if (tokens.length === 0) { // terminating case
        return 1;
    } 
    var start = 0;
    var result = 0;
    for (var i = 0; i < MUL.length && start < tokens.length; ++i) {
        var end = index_of(tokens, MUL[i], start);
        if (end === -1) {
            continue;
        }
        var factor = TOK2INT[MUL[i]];
        result += factor*read_tokens_traditional(tokens.slice(start, end));
        start = end + 1;

        //
        // TODO: a strict checker should also make sure MUL[i] doesn't appear
        // in tokens[end+1:].
        //
    }
    if (end !== tokens.length - 1) {
        result += TOK2INT[tokens[tokens.length-1]];
    }
    return result;
}

//
// The Japanese also write numbers using a mixture of Arabic numerals and 
// Kanji.
//
function read_tokens_mixed(tokens) {
    if (tokens.length === 0) { 
        return 1;
    } 
    var start = 0;
    var result = 0;
    for (var i = 0; i < MUL.length && start < tokens.length; ++i) {
        var end = index_of(tokens, MUL[i], start);
        if (end === -1) {
            continue;
        }
        var factor = TOK2INT[MUL[i]];
        result += factor*read_tokens_mixed(tokens.slice(start, end));
        start = end + 1;

        //
        // TODO: a strict checker should also make sure MUL[i] doesn't appear
        // in tokens[end+1:].
        //
    }
    if (start == 0) { // terminating case -- no multipliers found in string
        for (var i = 0; i < tokens.length; ++i) {
            result += TOK2INT[tokens[tokens.length-i-1]]*Math.pow(10, i);
        }
    }
    return result;
}

//
// Determine if the tokens represent a number in traditional or mixed form.
// Returns null otherwise.
//
function id_tokens(tokens) {
    var trad = 0;
    var arabic = 0;
    for (var i = 0; i < tokens.length; ++i) {
        switch (tokens[i]) {
            case DIGIT_0:
            case DIGIT_1:
            case DIGIT_2:
            case DIGIT_3:
            case DIGIT_4:
            case DIGIT_5:
            case DIGIT_6:
            case DIGIT_7:
            case DIGIT_8:
            case DIGIT_9:
                ++arabic;
                break;
            case DIGIT_1J:
            case DIGIT_2J:
            case DIGIT_3J:
            case DIGIT_4J:
            case DIGIT_5J:
            case DIGIT_6J:
            case DIGIT_7J:
            case DIGIT_8J:
            case DIGIT_9J:
            case MUL_JUU:
            case MUL_HYAKU:
            case MUL_SEN:
            case MUL_MAN:
            case MUL_OKU:
            case MUL_CHOU:
                ++trad;
                break;
        }
    }
    if (arabic) {
        return "mixed";
    } else if (trad) {
        return "traditional";
    }
    return null;
}

function parse_string(s) {
    if (s.length === 0) {
        return "";
    }

    var tokens = [];
    // ... a kingdom for a map() function...
    for (var i = 0; i < s.length; ++i) {
        var tok = CHAR2TOK[s[i]];
        //
        // Ignore unrecognized tokens.
        // TODO: stricter parser -- bail on unexpected tokens?
        //
        if (tok !== undefined) {
            tokens.push(tok);
        }
    }
    // TODO: check for traditional vs. mixed
    var result = "";
    var id = id_tokens(tokens);
    if (id == "traditional") {
        result = read_tokens_traditional(tokens);
    } else if (id == "mixed") {
        result = read_tokens_mixed(tokens);
    } else {
        return "";
    }
    //console.debug(s);
    //console.debug(tokens);
    //console.debug(result);
    return result;
}

function human_readable(number) {
    var divisors = {1e12: "trillion", 1e9: "billion", 1e6: "million", 1e3: "thousand"};
    var sorted = Object.keys(divisors);
    sorted.sort();
    sorted.reverse();
    var result = number;
    for (var i = 0; i < sorted.length; ++i) {
        var tmp = number/sorted[i];
        if (tmp >= 0.5) {
            result = tmp +  " " + divisors[sorted[i]];
            break;
        }
    }
    return result;
}
