const RandomQuteAPIUrl = 'http://api.quotable.io/random'
const quoteDisplay = document.getElementById('quoteDisplay')
const quoteInput = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')

quoteInput.addEventListener('input', () => {
  const arrayQuote = quoteDisplay.querySelectorAll('span')
  const arrayValue = quoteInput.value.split('')
  let correct = true
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index]
    if(character == null){
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    }else if(character === characterSpan.innerText){
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    }else{
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })

  if (correct) getNextRandomQute()
})

async function getRandomQute() {
    const response = await fetch(RandomQuteAPIUrl)
    const data = await response.json()
    return data.content;
  }
  
async function getNextRandomQute() {
  const quote = await getRandomQute()
  quoteDisplay.innerText = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText  = character
    quoteDisplay.appendChild(characterSpan)
  })
  quoteInput.value = null
  startTimer()
}


let startDate

function startTimer(){
  timerElement.innerText = 0
  startDate = new Date()
  setInterval(() => {
    timerElement.innerText = getTimerTime()
  }, 1000);
}

function getTimerTime(){
 return Math.floor((new Date() - startDate) / 1000, 2)
}

getNextRandomQute()