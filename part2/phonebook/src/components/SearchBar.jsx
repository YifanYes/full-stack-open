const SearchBar = ({ searchText, handleFilterPersons }) => {
  return (
    <div>
      filter shown with
      <input value={searchText} onChange={handleFilterPersons} />
    </div>
  )
}

export default SearchBar
