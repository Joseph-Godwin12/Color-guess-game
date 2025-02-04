import { useEffect, useState } from "react"

export default function ColorGuessGame() {
  const colors = ["red", "blue", "green", "yellow", "purple", "orange"]
  
  const [targetColor, setTargetColor] = useState("")
  const [colorOptions, setColorOptions] = useState([])
  const [score, setScore] = useState(0)
  const [gameStatus, setGameStatus] = useState("")
  const [gameOver, setGameOver] = useState(false)

  const setUpGame = () => {
    const randomColor = colors.sort(() => 0.5 - Math.random())
    const selectedColor = randomColor.slice(0, 6)
    const correctColor = selectedColor[Math.floor(Math.random() * selectedColor.length)]

    setTargetColor(correctColor)
    setColorOptions(selectedColor.sort(() => 0.5 - Math.random()))
    setScore(0)
    setGameStatus("")
    setGameOver(false)
  }

  useEffect(() => {
    setUpGame()
  }, [])

  const handleColorGuess = (guessedColor) => {
    if (gameOver) return

    if (guessedColor === targetColor) {
      setScore(prevScore => prevScore + 1)
      setGameStatus("correct")
      setGameOver(true)
    } else {
      setGameStatus("wrong")
      setGameOver(true)
    }
  }


  return (
    <div className="game-container">
      <div className="game-wrapper">
        <h1 data-testid="gameInstructions">Guess the correct color!</h1>
        
        <div
          className="color-target"
          data-testid="colorBox"
          style={{backgroundColor: targetColor}}
        />
        
        <div className="color-options">
          {colorOptions.map((color, index) => (
            <button
            className="color-option"
              key={index}
              data-testid="colorOption"
              style={{backgroundColor: color}}
              onClick={() => handleColorGuess(color)}
            />
          ))}
        </div>
        
        <div className="game-feedback">
          <div
            className="game-status"
            data-testid="gameStatus"
          >
            {gameStatus === "correct" && (
              <div className="status-correct">
                ✓ Correct!
              </div>
            )}
            {gameStatus === "wrong" && (
              <div className="status-wrong">
                ✗ Wrong
              </div>
            )}
          </div>
          
          <div
            className="game-score"
            data-testid="score"
          >
            Score: {score}
          </div>
        </div>
        
        <button
          className="new-game"
          data-testid="newGameButton"
          onClick={setUpGame}
        >
          New game
        </button>
      </div>
    </div>
  )
}