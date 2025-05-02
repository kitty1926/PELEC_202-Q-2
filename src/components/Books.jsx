import React, { useState, useEffect } from "react";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async (searchQuery, pageNum) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${searchQuery}&page=${pageNum}&limit=10`
      );
      const data = await res.json();
      setBooks(data.docs || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (query) fetchBooks(query, page);
  }, [page]);

  const handleSearch = () => {
    setPage(1); // Reset to first page on new search
    fetchBooks(query, 1);
  };

  return (
    <div>
      <h2>Book Search</h2>
      <input
        type="text"
        placeholder="Search books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {books.map((book, index) => (
            <p key={index}>{book.title} by {book.author_name?.join(", ")}</p>
          ))}
          <div>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
            <button onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookSearch;