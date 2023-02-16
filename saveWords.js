var saveGroups = 
// input here
{
    "name": "test",
    "global_identifier": "b61454dd-e830-4ac0-a2bc-72ea98c71822",
    "updaterId": null,
    "words": [
        {
            "word_id": 0,
            "rule_id": 0,
            "word": "시골에는 오락이",
            "newWord": null,
            "is_regexp": false,
            "is_complete_matching": false,
            "is_case_sensitive": false,
            "is_include_href": false,
            "dirty": false,
            "isNew": false,
            "deleted": false,
            "insert_date": 0,
            "update_date": 0,
            "delete_date": 0,
            "regExp": null,
            "label": null,
            "checkedNodes": []
        }
    ]
};

var JSON_WORD_GROUP_CONVERSION_RULE = [
            ["global_identifier", "g"],
            ["name", "n"]
];
function getWordGroupJSONKey(group){
    return "G-" + group.global_identifier;
};
function convertWordToJSON(word){
    var flags = [];
    if (word.is_regexp) {
        flags.push(CustomBlockerStorage.JSON_WORD_FLAG_REGEXP);
    }
    if (word.is_complete_matching) {
        flags.push(CustomBlockerStorage.JSON_WORD_FLAG_COMPLETE_MATCHING);
    }
    if (word.is_case_sensitive) {
        flags.push(CustomBlockerStorage.JSON_WORD_FLAG_CASE_SENSITIVE);
    }
    if (word.is_include_href) {
        flags.push(CustomBlockerStorage.JSON_WORD_FLAG_INCLUDE_HREF);
    }
    if (flags.length > 0) {
        var obj = {};
        obj["w"] = word.word;
        obj["f"] = flags;
        return obj;
    }
    else {
        return word.word;
    }
};
function convertWordGroupToJSON(group){
    var obj = {};
    for (var _i = 0, _a = JSON_WORD_GROUP_CONVERSION_RULE; _i < _a.length; _i++) {
        var prop = _a[_i];
        obj[prop[1]] = group[prop[0]];
    }
    obj["w"] = [];
    for (var _b = 0, _c = group.words; _b < _c.length; _b++) {
        var word = _c[_b];
        obj["w"].push(convertWordToJSON(word));
    }
    return obj;
};

var jsonObj = convertWordGroupToJSON(saveGroups);
var obj = {};
saveGroups.updaterId = UUID.generate();
obj[getWordGroupJSONKey(saveGroups)] = jsonObj;

chrome.storage.sync.set(obj, function (){
    console.log("Saved rule.");
});
