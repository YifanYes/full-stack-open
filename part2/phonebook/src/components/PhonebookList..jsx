const PhonebookList = ({ phonebook }) => {
  return (
    <>
      {phonebook.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  )
}

export default PhonebookList
