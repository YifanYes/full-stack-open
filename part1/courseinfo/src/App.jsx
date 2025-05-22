const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

const Part = ({ name, exercise }) => {
  return (
    <p>
      {name} {exercise}
    </p>
  )
}

const Content = ({ part1, part2, part3 }) => {
  return (
    <>
      <Part name={part1.name} exercise={part1.exercises} />
      <Part name={part2.name} exercise={part2.exercises} />
      <Part name={part3.name} exercise={part3.exercises} />
    </>
  )
}

const Total = ({ exercisesList }) => {
  return <p>Number of exercises {exercisesList.reduce((acc, curr) => acc + curr, 0)}</p>
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header courseName={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total exercisesList={[part1.exercises, part2.exercises, part3.exercises]} />
    </div>
  )
}

export default App
