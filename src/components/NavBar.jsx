function NavBar({
  searchKeyword,
  handleInputChange,
  handleSortClick,
  sortAscending,
}) {
  return (
    <header className="header--serachbar">
      <input
        placeholder="Search University"
        value={searchKeyword}
        onChange={handleInputChange}
      />
      <button onClick={handleSortClick} className="header--button-sort">
        {sortAscending ? "Sort A-Z" : "Sort Z-A"}
      </button>
    </header>
  );
}

export default NavBar;
