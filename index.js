const fs = require('fs')
const { prompt } = require('inquirer')
const generateMarkdown = require('./utils/generateMarkdown.js')
const util = require('util')

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
    default: 'Title'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Describe what your project is about.',
    default: 'Descriptions'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the steps required to install your project?',
    default:
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Describe instructions and usages for your project.'
  },
  {
    type: 'list',
    name: 'license',
    message: 'Select a license for your project.',
    choices: ['Mozilla Public License 2.0', 'Apache License 2.0', 'MIT License']
  },
  {
    type: 'input',
    name: 'contributors',
    message: 'Who also contributed to this project?'
  },
  {
    type: 'input',
    name: 'test',
    message: 'Provide any tests or example on how to run your project.'
  }
]

function writeInFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) { console.log(err) }
    console.log(`Congrats! README.md have been updated!`)
  })
}

const writeFileAsync = util.promisify(writeInFile)

async function init() {
  try {
    const userResponse = await prompt(questions)
    console.log('Inputs: ', userResponse)

    const markdown = generateMarkdown(userResponse)
    console.log(markdown)

    await writeFileAsync('exampleREADME.md', markdown)
  }
  catch (err) { console.log(err) }
}

init()