import { useState } from 'react'

const Header = ({text}) => <h1> {text} </h1>

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>

const StatsDisplay = ({text, rating}) => {
  return (
    <div>
      <p>{text}: {rating}</p>
    </div>
  )

}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Give Feedback"></Header>

      <Button onClick={() => setGood(good+1)} text="Good"></Button>
      <Button onClick={() => setNeutral(neutral+1)} text="Neutral"></Button>
      <Button onClick={() => setBad(bad+1)} text="Bad"></Button>

      <Header text="Statistics"></Header>
      <StatsDisplay text="Good" rating={good}></StatsDisplay>
      <StatsDisplay text="Neutral" rating={neutral}></StatsDisplay>
      <StatsDisplay text="Bad" rating={bad}></StatsDisplay>

    </div>
  )
}

export default App