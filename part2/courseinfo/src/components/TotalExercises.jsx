const TotalExercises = ({ parts }) => (
  <p style={{ fontWeight: 'bold' }}>Number of exercises {parts.reduce((acc, part) => acc + part.exercises, 0)}</p>
)

export default TotalExercises
