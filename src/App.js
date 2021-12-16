import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/img1.png", matched: false},
  {"src": "/img/img2.png", matched: false},
  {"src": "/img/img3.png", matched: false},
  {"src": "/img/img4.png", matched: false},
  {"src": "/img/img5.png", matched: false},
  {"src": "/img/img6.png", matched: false},
  {"src": "/img/img7.png", matched: false},
  {"src": "/img/img8.png", matched: false}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  // shuffle cards

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
  }
  
  // handle a choice
  const handleChoice = (card) => {
    console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    // not compare here because it chua update
  }

  // compare 2 selected cards, use effect nhu kieu watch
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            return card;
          })
        })
      } else {
        console.log("FALSE")
      }
      setTimeout(() => resetTurn(), 1000)
    }
  }, [choiceOne, choiceTwo])

  // reset choice & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  // start a new game automatically 
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Memory game</h1>
      <button onClick={shuffleCards} className="normal-text">New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key={card.id}>
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}/>
          </div>
        ))}
      </div>
      <p className="normal-text">Turns: {turns}</p>
    </div>
  );
}

export default App;
