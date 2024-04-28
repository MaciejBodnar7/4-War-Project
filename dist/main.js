console.log("War-Project")

const drawBtn = document.getElementById("draw-cards-btn")
drawBtn.disabled
drawBtn.classList.toggle("disabled")
let deckId
const images = document.getElementById("images")
let cardsToRender

document.addEventListener("click", function (e) {
  console.log(e.target.id) //Console log
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
  //render cards from drawCards
  console.log(item)
  const postArr = item
    .map(items => {
      return `
      <div class="flex flex-col text-center text-2xl ">
        <img class="imgs" src="${items.image}" alt="card">
        <p>${items.value}</p>
      </div>
    `
    })
    .join("")
  images.innerHTML = postArr
}
