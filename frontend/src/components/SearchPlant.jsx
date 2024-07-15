function SearchPlant() {
  return (
    <>
      <main className="mx-4">
        <h1>Search Plant</h1>
        <form>
          <label htmlFor="search">Search</label>
          <input type="text" id="search" name="search" />
          <button>Search</button>
        </form>
      </main>
    </>
  );
}

export default SearchPlant;
