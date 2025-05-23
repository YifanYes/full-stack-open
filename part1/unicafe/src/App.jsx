import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const isGreaterThanZero = good + neutral + bad

  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {isGreaterThanZero ? Math.round((good - bad) / (good + neutral + bad), 2) : 'no data'}</p>
      <p>positive {isGreaterThanZero ? `${Math.round((good / (good + neutral + bad)) * 100, 2)} %` : 'no data'}</p>
    </>
  )
}

export default App
