console.log("War-Project")

const drawBtn = document.getElementById("draw-cards-btn")
drawBtn.disabled
drawBtn.classList.toggle("disabled")

let deckId

const images = document.getElementById("images")
let cardsToRender

const me = document.getElementById("cards-value-me")
const comp = document.getElementById("cards-value-computer")

document.addEventListener("click", function (e) {
  // console.log(e.target.id) //Console log
  if (e.target.id === "new-card-deck-btn") {
    if (!deckId) {
      drawBtn.disabled
      drawBtn.classList.toggle("disabled")
      newCardDeck()
    } else {
      newCardDeck()
    }
  } else if (e.target.id === "draw-cards-btn") {
    if (deckId) {
      drawCards(deckId)
    }
  }
})

const newCardDeck = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      deckId = data.deck_id
      console.log(deckId)
    })
}

const drawCards = item => {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${item}/draw/?count=2`)
    .then(resp => resp.json())
    .then(data => {
      cardsToRender = data.cards
      render(cardsToRender)
    })
}

const render = item => {
  const firstDiv = document.getElementById("firstDiv")
  const secondDiv = document.getElementById("secondDiv")
  const whoWin = document.getElementById("who-win")
  //render cards from drawCards

  // console.log(item)
  firstDiv.innerHTML = `
  <p><span class="text-weight">Me: </span>${item[0].value}</p>
  <img class="imgs" src="${item[0].image}" alt="">
  `
  secondDiv.innerHTML = `
  <img class="imgs" src="${item[1].image}" alt="">
  <p><span class="text-weight">Computer: </span>${item[1].value}</p>
  `

  whoWin.innerHTML = `<h2>${winnerOrNot(item)}</h2>`
}

const winnerOrNot = item => {
  const valueMap = {
    ACE: "1",
    JACK: "11",
    QUEEN: "12",
    KING: "13",
    JOKER: "14",
  }

  for (let i = 0; i < item.length; i++) {
    const value = item[i].value
    if (value in valueMap) {
      item[i].value = valueMap[value]
    }
  }

  let valueOne = Number(item[0].value)
  let valueTwo = Number(item[1].value)

  if (valueOne > valueTwo) {
    return "You win"
  } else if (valueOne < valueTwo) {
    return "Computer win"
  } else if (valueOne == valueTwo) {
    return "tie"
  }
}
