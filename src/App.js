import axios from "axios"
import { useEffect, useState } from "react"


const App = () => {
  const [chosenLevel, setChosenLevel] = useState(null)
  const [words, setWords] = useState(null)
  const [correctAnswers, setCorrectAnswers] = useState([])
  const [clicked, setClicked] = useState([])
  const [score, setScore] = useState(0)
  
  const getRandomWords = () => {
    
    const options = {
      method: 'GET',
      url: 'http://localhost:8000/words',
      params: {level: chosenLevel, area: 'sat'}
    }

    axios.request(options).then(response => {
      setWords(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  console.log('correct answers', correctAnswers)

  console.log('clicked', clicked)

  useEffect(() => {
    if (chosenLevel) getRandomWords()
  }, [chosenLevel])

  const checkAnswer = (option, optionIndex, correctAnswer) => {
    if (optionIndex === correctAnswer) {
      setCorrectAnswers([...correctAnswers, option])
      setScore((score) => score + 1)
    } else {
      setScore((score) => score - 1)
    }

    setClicked([...clicked, option])
  }

  return (
    <div className="App">
      {!chosenLevel && <div className='level-selector'>
        <h1>Word Association App</h1>
        <p>Select your level to start</p>
        <select 
          name='levels' 
          id='levels' 
          value={chosenLevel} 
          onChange={e => setChosenLevel(e.target.value)}>
            <option value={null}>Select a level</option>
            <option value='1'>Level 1</option>
            <option value='2'>Level 2</option>
            <option value='3'>Level 3</option>
            <option value='4'>Level 4</option>
            <option value='5'>Level 5</option>
            <option value='6'>Level 6</option>
            <option value='7'>Level 7</option>
            <option value='8'>Level 8</option>
            <option value='9'>Level 9</option>
            <option value='10'>Level 10</option>
        </select>
      </div>}

      {chosenLevel && words && <div className='question-area'>
        <h1>Welcome to level: {chosenLevel}</h1>

        <h3>Your score is: {score}</h3>

        {words.quizlist.map((question, _questionIndex) => (
          <div key={_questionIndex} className='question-box'>
            {question.quiz.map((quizWord, _index) => (
              <p key={_index}>{quizWord}</p>
            ))}

            <div className='question-buttons'>
              {question.option.map((option, optionIndex) => (
                <div key={optionIndex} className='question-button'>
                  <button
                    disabled={clicked.includes(option)}
                    onClick={(() => checkAnswer(option, optionIndex + 1, question.correct))}>
                    {option}</button>
                    {correctAnswers.includes(option) && <p>Correct!</p>}
                </div>
              ))}
            </div>

            <p>{question.correct}</p>
          </div>
        ))}


      </div>}
    </div>
  )
}

export default App
