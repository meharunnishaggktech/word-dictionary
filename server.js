#!/usr/bin/env node

const co = require('co')
const prompt = require('co-prompt')
const program = require('commander')
const wordnikApi = require('./apis/fourtytwowords-api')
const inquirer = require('inquirer')
var stringShuffle = require("string-shuffle")

if (process.argv.length == 2) {
    let getRandomWord = wordnikApi.getRandomWord()
    .then((response) => console.log("Random     Word Is: "+ response.word) +"\n"+
                        wordnikApi.getDefinition(response.word) +"\n"+
                        wordnikApi.getExample(response.word) +"\n"+
                        wordnikApi.getSynonym(response.word) +"\n"+
                        wordnikApi.getAntonym(response.word)
    )
    .catch((err) => console.error(err));
}
program.arguments('command', 'word').action(async(command, word) => { 
    switch (command['args'][0]) {
        case "def":
            { 
                if (word[1] && typeof word[1] == 'string') {
                    console.log('\nGetting "Definition" of the word: "%s" \n', word[1]);
                    wordnikApi.getDefinition(word[1]);
                } else {
                    console.log('Please enter valid word def \n');
                }
                break;
            }
        case "syn":
            {
                if (word[1] && typeof word[1] == 'string') {
                    console.log('\nGetting "Synonyms" of the word: "%s" \n', word[1]);
                    wordnikApi.getSynonym(word[1]);
                } else {
                    console.log('Please enter valid word syn \n');
                }
                break;
            }
        case "ant":
            {
                if (word[1] && typeof word[1] == 'string') {
                    console.log('\nGetting "Antonyms" of the word: "%s" \n', word[1]);
                    wordnikApi.getAntonym(word[1]);
                } else {
                    console.log('Please enter valid word ant \n');
                }
                break;
            }
        case "ex":
            {
                if (word[1] && typeof word[1] == 'string') {
                    console.log('\nGetting "Example" of the word: "%s" \n', word[1]);
                    wordnikApi.getExample(word[1]);
                } else {
                    console.log('Please enter valid word ex \n');
                }
                break;
            }
        case "dict":
            {
                if (word[1] && typeof word[1] == 'string') {
                    console.log('\nGetting "Details" of the word: "%s" \n', word[1]);
                    wordnikApi.getDefinition(word[1])
                    wordnikApi.getSynonym(word[1])
                    wordnikApi.getAntonym(word[1])
                    wordnikApi.getExample(word[1])
                } else {
                    console.log('Please enter valid word \n');
                }
                break;
            }
        case "play":
            {
                var questions = [{
                    type: 'input',
                    name: 'name',
                    message: "Please enter the word !",
                }]
                inquirer.prompt(questions).then(answers => {
                    let enterWord = `${answers['name']}`;
                    let getRandomWord = wordnikApi.getWordDefinition(enterWord)
                    .then((response) => {
                        if (JSON.parse(response.body).error) {
                            console.log(JSON.parse(response.body).error) 
                            var reWord = [{
                                type: 'input',
                                name: 'name',
                                message: "Please enter the word again: ",
                            }]
                            inquirer.prompt(reWord).then(secondWord => {
                                let secondAddedWord = `${secondWord['name']}`
                                let getSecondRandomWord = wordnikApi.getWordDefinition(secondAddedWord)
                                .then((response) => {
                                    if (JSON.parse(response.body).error) {
                                      return wordnikApi.getfinalResult(secondAddedWord)
                                    } else {
                                        wordnikApi.getDefinition(enterWord) +"\n"+
                                        wordnikApi.getSynonym(enterWord) +"\n"+
                                        wordnikApi.getAntonym(enterWord) 
                                    }
                                });
                           });

                        } else {
                            wordnikApi.getDefinition(enterWord) +"\n"+
                            wordnikApi.getSynonym(enterWord) +"\n"+
                            wordnikApi.getAntonym(enterWord) 
                        }           
                })
                .catch((error) => console.log("error comming"));
                })
            }
            
        default:
            {
               // console.log('Please enter valid word default \n');
            }
    }
}).parse(process.argv);

