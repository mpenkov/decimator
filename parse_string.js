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
    MUL_HYAKU: 100,
    MUL_SEN: 1000,
    MUL_MAN: 10000,
    MUL_OKU: 100000000,
    MUL_CHOU: 1000000000000
};

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
    var mul = [ MUL_CHOU, MUL_OKU, MUL_MAN, MUL_SEN, MUL_HYAKU, MUL_JUU ];
    var start = 0;
    var end = 0;
    var result = 0;
    for (var i = 0; i < mul.length && start < tokens.length; ++i) {
        end = index_of(tokens, mul[i], start);
        if (end === -1) {
            continue;
        }
        var factor = TOK2INT[mul[i]];
        //console.debug("mul[i] = " + mul[i]);
        //console.debug("factor = " + factor);
        result += factor*read_tokens_traditional(tokens.slice(start, end));
        start = end + 1;

        //
        // TODO: a strict checker should also make sure mul[i] doesn't appear
        // in tokens[end+1:].
        //
    }
    if (end !== tokens.length - 1) {
        result += TOK2INT[tokens[tokens.length-1]];
    }
    return result;
}

function parse_string(s) {
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
    var result = read_tokens_traditional(tokens);
    //console.debug(result);
    return result;
}
