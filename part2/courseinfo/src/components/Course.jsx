import Content from './Content'
import Header from './Header'
import TotalExercises from './TotalExercises'

const Course = ({ course }) => (
  <>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <TotalExercises parts={course.parts} />
  </>
)

export default Course
