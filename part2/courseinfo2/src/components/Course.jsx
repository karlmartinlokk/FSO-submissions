const Course = ({course}) => {
  return (
    <>
      <Header headerText = {course.name}></Header>
      <Content content={course.parts}></Content>
    </>
  )
}

const Header = ({headerText}) => <h1>{headerText}</h1>

const Content = ({content}) => {
  return (
    <>
      {content.map(part => (
        <Part key={part.id}content={part}></Part>
      ))}
      <Sum content={content}></Sum>
    </>
  )
}

const Part = ({content}) => <p>{content.name} {content.exercises}</p>

const Sum = ({content}) => {
  const total = content.reduce((sum, part) => sum + part.exercises, 0) /* 0 is the initial value of sum */
  return <p>total of {total} exercises</p>
}




export default Course