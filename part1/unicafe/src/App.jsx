import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <p>
    {text} {value}
  </p>
)

const Statistics = ({ good, neutral, bad }) => {
  const isGreaterThanZero = good + neutral + bad

  return (
    <>
      {isGreaterThanZero ? (
        <>
          <h2>statistics</h2>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={good + neutral + bad} />
          <StatisticLine text="average" value={((good - bad) / (good + neutral + bad)).toFixed(2)} />
          <StatisticLine text="positive" value={Math.round((good / (good + neutral + bad)) * 100, 2)} />
        </>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
