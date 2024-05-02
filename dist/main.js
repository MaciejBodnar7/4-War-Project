console.log("War-Project")

const remainingCardsP = document.getElementById("remaining-cards")

const drawBtn = document.getElementById("draw-cards-btn")
drawBtn.disabled
drawBtn.classList.toggle("disabled")

let meWins = 0
let compWins = 0
let deckId
let remainingCards

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
      drawBtn.disabled
      drawBtn.classList.toggle("disabled")
    }
  } else if (e.target.id === "draw-cards-btn") {
    if (deckId && remainingCards) {
      drawCards(deckId)
      remainingCardsP.innerHTML = `<p>Remaining cards: ${remainingCards}</p>`

      if (!remainingCards) {
        drawBtn.disabled
        drawBtn.classList.toggle("disabled")
      }
    }
  }
})

const newCardDeck = () => {
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      remainingCards = data.remaining
      deckId = data.deck_id
      console.log("Deck id = " + deckId)
      console.log("Remaining cards = " + remainingCards)
    })
}

const drawCards = item => {
  remainingCards -= 2
  // console.log(remainingCards)
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
  <p><span class="text-weight">My card: </span>${item[0].value} | Wins: ${meWins}</p>
  <img class="imgs" src="${item[0].image}" alt="">
  `
  secondDiv.innerHTML = `
  <img class="imgs" src="${item[1].image}" alt="">
  <p><span class="text-weight">Computer card: </span>${item[1].value} | Wins: ${compWins}</p>
  `

  whoWin.innerHTML = `<h2>${winnerOrNot(item)}</h2>`

  if (!remainingCards) {
    if (meWins > compWins) {
      whoWin.innerHTML = `<h2>You won!</h2>`
    } else if (meWins < compWins) {
      whoWin.innerHTML = `<h2>Computer won! :<</h2>`
    } else {
      whoWin.innerHTML = `<h2>Its a tie! Maybe try again!</h2>`
    }
  }
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
    meWins += 1
    return "You win"
  } else if (valueOne < valueTwo) {
    compWins += 1
    return "Computer win"
  } else if (valueOne == valueTwo) {
    return "tie"
  }
}
