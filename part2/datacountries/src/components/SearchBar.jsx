const SearchBar = ({ searchText, handleFindCountries }) => {
  return (
    <div>
      find countries
      <input value={searchText} onChange={handleFindCountries} />
    </div>
  )
}

export default SearchBar
