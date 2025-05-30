const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>

      <h4>Languages</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default Country
