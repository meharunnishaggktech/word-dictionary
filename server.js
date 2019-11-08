#!/usr/bin/env node

const co = require('co');
const prompt = require('co-prompt');
const program = require('commander');
const wordnikApi = require('./apis/fourtytwowords-api');
const inquirer = require('inquirer')



if (process.argv.length == 2) {
    let getRandomWord = wordnikApi.getRandomWord()
    .then((response) => console.log("randomWord Is: "+ response.word) +"\n"+
                        wordnikApi.getDefinition(response.word) +"\n"+
                        wordnikApi.getExample(response.word) +"\n"+
                        wordnikApi.getSynonym(response.word) +"\n"+
                        wordnikApi.getAntonym(response.word)
    )
    .catch((err) => console.error(err));
}
program.arguments('command', 'word').action(async(command, word) => { 
    switch (command['args'][0]) {
        case 'def':
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
                console.log("Wait");
                // wordnikApi.getRandomWord();
                // if (word && typeof word == 'string') {
                //     console.log('\nGetting "Details" of the word: "%s" \n', word);
                //     wordnikApi.getDefinition(word)
                //     wordnikApi.getSynonym(word)
                //     wordnikApi.getAntonym(word)
                //     wordnikApi.getExample(word)
                // } else {
                //     console.log('Please enter valid word \n');
                // }
                // break;
            }
       
        case "play":
            {

                var questions = [{
                    type: 'input',
                    name: 'name',
                    message: "Please enter the word",
                }]



                inquirer.prompt(questions).then(answers => {
                    console.log(`${answers['name']}!`)

                    let enterWord = `${answers['name']}`;
                    let getRandomWord = wordnikApi.getDefinitionWord(enterWord)
                    .then(//(response) => console.log("word Is: "+ response) //+"\n"+
                                        //  wordnikApi.getDefinition(enterWord) +"\n"+
                                        //  wordnikApi.getSynonym(enterWord) //+"\n"+
                                        // wordnikApi.getAntonym(enterWord)
                                        
                                       
                    )
                    .catch((error) => console.error(error));
                })



                // if (word && typeof word == 'string') {
                //     console.log('\nPreparing the ground for a game \n');
                //     wordnikApi.startGame(word);
                // } else {
                //     console.log('Please enter valid word play \n');
                // }
                //break;
            }
        default:
            {
                //console.log(word[0]);
                // if (typeof word[0] == 'object')
                //     var word = command;
                // if (word[0] && typeof word[0] == 'string') {
                //     console.log('\nGetting "Details" of the word : "%s". \n', word[0]);
                //     wordnikApi.getDefinition(word[0]);
                //     wordnikApi.getSynonym(word[0]);
                //     wordnikApi.getAntonym(word[0]);
                //     wordnikApi.getExample(word[0]);
                // } else {
                //     console.log('Please enter valid word default \n');
                // }
                // break;
            }
    }
}).parse(process.argv);

