
const request = require('request');
const appConfig = require('../config');
const fetch = require("node-fetch");

module.exports = {
    getDefinition: async(word) => {
        request(appConfig.fourtytwowordsInfo.url + 'word/' + word + '/definitions?api_key=' + appConfig.fourtytwowordsInfo.apiKey, async(error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var defArray = JSON.parse(body);
                
                if (defArray && Array.isArray(defArray) && defArray.length > 0) {
                    var def = "";
                    var i = 1;
                    defArray.forEach((obj) => {
                        def += i +". "+ obj.text + "\n";
                        i++;
                    })
                   console.log('\nDefinition:', def);
                } else {
                    console.warn('The word doesn\'t exist')
                }
            } else {
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });
    },
    getRandomWord(){
        var options = {
            url: appConfig.fourtytwowordsInfo.url + 'words/randomWord?limit=1&includeRelated=true&sourceDictionaries=ahd&useCanonical=false&includeTags=false&api_key=' + appConfig.fourtytwowordsInfo.apiKey,
            headers: {
                'User-Agent': 'request'
            }
        };
        return new Promise(function(resolve, reject) {
               request.get(options, function(error, response, body) {
                   if (error) {
                       reject(error);
                   } else {
                       resolve(JSON.parse(body));
                   }
               })
        })
    },
    getDefinitionWord(word){
        var options = {
            url: appConfig.fourtytwowordsInfo.url + 'word/' + word + '/definitions?api_key=' + appConfig.fourtytwowordsInfo.apiKey,
            headers: {
                'User-Agent': 'request'
            }
        };
        return new Promise(function(resolve, reject) {
               request.get(options, function(error, response, body) { 
                let getResponse = JSON.parse(body);
                console.log(getResponse);
               // console.log(getResponse.error)
                   if (getResponse.error) {
                       reject(getResponse.error);
                   } else {
                       resolve(getResponse);
                   }
               })
        })
    },
    wordOfTheDay: () => {
        request(appConfig.fourtytwowordsInfo.url + '/word/wordOfTheDay?api_key=' + appConfig.fourtytwowordsInfo.apiKey, async(error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var wordOfTheDay = JSON.parse(body);
                if (wordOfTheDay) {
                    console.log("\nwordOfTheDay: " + (wordOfTheDay && wordOfTheDay.word ? wordOfTheDay.word : ''))
                } else {
                    console.warn('Failed while getting the antonyms of word.')
                }
            } else {
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });
    },
    getSynonym: (word) => {
        request(appConfig.fourtytwowordsInfo.url + 'word/' + word + '/relatedWords?api_key=' + appConfig.fourtytwowordsInfo.apiKey, async(error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var synArray = JSON.parse(body);
                if (synArray && Array.isArray(synArray) && synArray.length > 0) {
                    console.log("\nSynonyms: " + (synArray[0] ? synArray[0].words.join(",") : ''));
                } else {
                    console.warn('Failed while getting the synonyms of word.')
                }
            } else {
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });
    },
    getAntonym: (word) => {
        request(appConfig.fourtytwowordsInfo.url + 'word/' + word + '/relatedWords?api_key=' + appConfig.fourtytwowordsInfo.apiKey, async(error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var antArray = JSON.parse(body);
                if (antArray && Array.isArray(antArray) && antArray.length === 0) {
                    console.warn('Failed while getting the antonyms of word.')
                } else {
                    console.log("\nAntonyms: " + (antArray[0] ? antArray[0].words.join(",") : ''));
                }
            } else {
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });

    },
    getExample: (word) => {
        request(appConfig.fourtytwowordsInfo.url + 'word/' + word + '/examples?api_key=' + appConfig.fourtytwowordsInfo.apiKey, async(error, response, body) => {
            if (error)
                console.warn('Oops! Something went wrong!!!\n Error :', error);
            if (response && response.statusCode == 200) {
                var exObj = JSON.parse(body);
                if (exObj.examples && Array.isArray(exObj.examples) && exObj.examples.length > 0) {
                    var def = "";
                    var i = 1;
                    exObj.examples.forEach((obj) => {
                        def += i +". "+ obj.text + "\n";
                        i++;
                    })
                    console.log('\nExamples: \n', def);
                } else {
                    console.warn('The word doesn\'t exist')
                }

            } else {
                console.warn('Oops! Something went wrong!!!\n Error :', body);
            }
        });
    },
    startGame: () => {
        console.warn('Work in progress');
    }
}