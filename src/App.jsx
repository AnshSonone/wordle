import { useEffect, useState } from 'react'
import './App.css'
import data from './data/api.json'
import Line from './Line'

function App() {

  const [solution, setSolution] = useState('')
  const [guesses, setGuesses] = useState(Array(6).fill(null))
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameOver, setIsGameOver] = useState(false)
  const [isWon, setIsWon] = useState(false)
  const [firstChar, setFirstChar] = useState('')
  const [lastChar, setLastChar] = useState('')
  const [isHint, setIsHint] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const randWord = data[Math.floor(Math.random() * data.length)]
      setSolution(randWord.toLowerCase())
    }

    fetchData()
  }, [])

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver){
        return;
      }

      
      if (event.key === 'Enter') {
        if (currentGuess.length != 5){
          return
        } 

        const newGuess = [...guesses]
        newGuess[guesses.findIndex(val => val == null)] = currentGuess
        setGuesses(newGuess)
        setCurrentGuess('')

        const isCorrect = solution == currentGuess
        if (isCorrect){
          setIsWon(true)
          setIsGameOver(true)
        }
      }

      if (event.key === 'Backspace'){
        setCurrentGuess(currentGuess.slice(0,-1))
        return;
      }

      if (currentGuess.length >= 5){
        return;
      }

      const isLetter = event.key.match(/^[a-z]{1}$/) != null
      if (isLetter){
        setCurrentGuess(oldGuess => oldGuess + event.key)
      }
    }

    window.addEventListener('keydown', handleType)

    return () => window.removeEventListener('keydown', handleType)
  }, [currentGuess, isGameOver, solution])

  const handleHint = () => {
    const firstChar = solution[0].toUpperCase()
    const lastChar = solution[4].toUpperCase()
    setFirstChar(firstChar)
    setLastChar(lastChar)
    setIsHint(true)
  }

  return (
    <div className='board'>
      <div>
        <p>Type using keyboard</p>
      </div>
      {
        isGameOver && <div className='answer'>
        <h2>Answer:</h2>
        <h2>{solution}</h2>
      </div>
      }
      {
        guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex(val => val == null)
          return (
            <div key={i}>
            <Line 
            guess={isCurrentGuess ? currentGuess : guess ?? ''} 
            isFinal={!isCurrentGuess && guess != null} 
            solution={solution}
            />
            </div>
          )
        })
      }

      <div className='hint' onClick={handleHint}>
        <button>Hint</button>
      </div>

      {
        isHint && <div>
            <h2>Word start with {firstChar} and end with {lastChar}</h2>
          </div>
      }
      {
        isGameOver && isWon && <div>
        <h2 className='won'>You Guessed Right.</h2>
      </div>
      }
    </div>
  )
}

export default App
