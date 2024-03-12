let users = {
  benanderson: {
    id: 'benanderson',
    password:'password123',
    name: 'Benjamin Anderson',
    avatarURL: "https://i.postimg.cc/FH1nJ6gx/avatar4.jpg",
    answers: {
      "8xf0y6ziyjabvozdd253nd": 'optionOne',
      "6ni6ok3ym7mf1p33lnez": 'optionOne',
      "am8ehyc8byjqgar0jgpub9": 'optionTwo',
      "loxhs1bqm25b708cmbf3g": 'optionTwo'
    },
    questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9']
  },
  annako: {
    id: 'annako',
    password:'abc321',
    name: 'Anna Kowalczyk',
    avatarURL: "https://i.postimg.cc/7PnKf47z/avatar1.jpg", 
    answers: {
      "vthrdm985a262al8qx3do": 'optionOne',
      "xj352vofupe1dqz9emx13r": 'optionTwo',
    },
    questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
  },
  lucarossi: {
    id: 'lucarossi',
    password:'xyz123',
    name: 'Luca Rossi',
    avatarURL: "https://i.postimg.cc/vTHC2Z9J/avatar2.jpg",
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
      "vthrdm985a262al8qx3do": 'optionTwo',
      "6ni6ok3ym7mf1p33lnez": 'optionOne'
    },
    questions: ['6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r'],
  },
  dubois: {
    id: 'dubois',
    password:'pass246',
    name: 'Pierre Dubois',
    avatarURL: "https://i.postimg.cc/J0qdbV2p/avatar3.jpg",
    answers: {
      "xj352vofupe1dqz9emx13r": 'optionOne',
    },
    questions: [],
  }
}

let questions = {
  "8xf0y6ziyjabvozdd253nd": {
    id: '8xf0y6ziyjabvozdd253nd',
    author: 'benanderson',
    timestamp: 1700754192235,
    optionOne: {
      votes: ['benanderson'],
      text: 'buy a house in the suburbs',
    },
    optionTwo: {
      votes: [],
      text: 'rent an apartment in the city'
    }
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: '6ni6ok3ym7mf1p33lnez',
    author: 'lucarossi',
    timestamp: 1700740000631,
    optionOne: {
      votes: [],
      text: 'take a gap year to travel',
    },
    optionTwo: {
      votes: ['lucarossi', 'benanderson'],
      text: 'start a new job immediately'
    }
  },
  "am8ehyc8byjqgar0jgpub9": {
    id: 'am8ehyc8byjqgar0jgpub9',
    author: 'benanderson',
    timestamp: 1700655802264,
    optionOne: {
      votes: [],
      text: 'adopt a dog from a shelter',
    },
    optionTwo: {
      votes: ['benanderson'],
      text: 'purchase a purebred puppy from a breeder'
    }
  },
  "loxhs1bqm25b708cmbf3g": {
    id: 'loxhs1bqm25b708cmbf3g',
    author: 'annako',
    timestamp: 1700575962234,
    optionOne: {
      votes: [],
      text: 'try skydiving for the first time',
    },
    optionTwo: {
      votes: ['benanderson'],
      text: 'scuba diving in a coral reef'
    }
  },
  "vthrdm985a262al8qx3do": {
    id: 'vthrdm985a262al8qx3do',
    author: 'annako',
    timestamp: 1700776863253,
    optionOne: {
      votes: ['annako'],
      text: 'start a new hobby',
    },
    optionTwo: {
      votes: ['lucarossi'],
      text: 'continue with current interests'
    }
  },
  "xj352vofupe1dqz9emx13r": {
    id: 'xj352vofupe1dqz9emx13r',
    author: 'lucarossi',
    timestamp: 1700747601631,
    optionOne: {
      votes: ['lucarossi', 'dubois'],
      text: 'explore a dense rainforest alone',
    },
    optionTwo: {
      votes: ['annako'],
      text: 'join a guided wildlife tour in the Amazon'
    }
  },
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getUsers () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...users}), 1000)
  })
}

export function _getQuestions () {
  return new Promise((resolve) => {
    setTimeout(() => resolve({...questions}), 1000)
  })
}

function formatQuestion ({ optionOneText, optionTwoText, author }) {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  }
}

export function _saveQuestion (question) {
  return new Promise((resolve, reject) => {
    if (!question.optionOneText || !question.optionTwoText || !question.author) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }

    const formattedQuestion = formatQuestion(question)
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion
      }

      resolve(formattedQuestion)
    }, 1000)
  })
}

export function _saveQuestionAnswer ({ authedUser, qid, answer }) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }

    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser].answers,
            [qid]: answer
          }
        }
      }

      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...questions[qid][answer],
            votes: questions[qid][answer].votes.concat([authedUser])
          }
        }
      }

      resolve(true)
    }, 500)
  })
}
