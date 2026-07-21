import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
   
  const [selected, setSelected] = useState(0)

  const handleClickNext = () => { //no params needed since the function is inside App where needed params are locally defined
    setSelected(Math.floor(Math.random()*anecdotes.length))
  }

  const handleClickVote = () => { //no params needed since the function is inside App where needed params are locally defined
    const newVotes = votes.map((vote, index) => {
        if (index === selected) {
          return vote+1
      }
      return vote
    })
    setVotes(newVotes)
  }

  return (
    <div>
      <Header text="Anecdote of the day"></Header>

      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <p>
        <button onClick={handleClickNext} >Next anecdote</button>
        <button onClick={handleClickVote}>Vote</button>
      </p>

      <Header text="Popular anecdote"></Header>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
      <p>- with {Math.max(...votes)} votes.</p>
    </div>
  )
}

export default App