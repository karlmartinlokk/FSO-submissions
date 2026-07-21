import { useState } from 'react'

const Header = ({text}) => <h1> {text} </h1>

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>

const StatsDisplay = (props) => {
  if (props.text == "Positive") {
    return (
      <tr>
        <th>{props.text}</th>
        <td>{props.value}%</td>
      </tr> 
    )}
    return (
      <tr>
        <th>{props.text}</th>
        <td>{props.value}</td>
      </tr>
    )
}

const Statistics = (props) => {
  const total = props.good+props.neutral+props.bad
  if (props.good == 0 && props.neutral == 0 && props.bad == 0)  {
    return (
    <p>No feedback given</p>
    )}
    return (
      <table>
        <tbody>
          <StatsDisplay text="Good" value={props.good}></StatsDisplay>
          <StatsDisplay text="Neutral" value={props.neutral}></StatsDisplay>
          <StatsDisplay text="Bad" value={props.bad}></StatsDisplay>
          <StatsDisplay text="Total" value={total}></StatsDisplay>
          <StatsDisplay text="Average" value={(props.good-props.bad)/total}></StatsDisplay>
          <StatsDisplay text="Positive" value={props.good/total*100}></StatsDisplay>
        </tbody>
      </table>
    )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="Give Feedback"></Header>

      <Button onClick={() => {setGood(good+1)}} text="Good"></Button>
      <Button onClick={() => setNeutral(neutral+1)} text="Neutral"></Button>
      <Button onClick={() => setBad(bad+1)} text="Bad"></Button>

      <Header text="Statistics"></Header>

      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App