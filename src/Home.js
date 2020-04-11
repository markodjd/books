import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import "./App.css";

function Home() {
  const [items, setItems] = useState([]);
  const [obj, setObj] = useState({});
  let [activePage, setPage] = useState(1);

  const preventSubmition = (e) => {
    e.preventDefault();
    fetchItems();
  };

  const fetchItems = async () => {
    const input = document.querySelector("input");
    if (input.value) {
      const data = await fetch(
        `http://openlibrary.org/search.json?q=${input.value.toLowerCase()}&page=${activePage}`
      );
      const item = await data.json();
      setItems(item.docs);
      setObj(item);
      if (activePage > Math.ceil(item.num_found / 100)) {
        activePage = 1;
        setPage(activePage);
        fetchItems();
      }
    }
  };

  const handlePageChange = async (pageNumber) => {
    activePage = pageNumber;
    await fetchItems();
    setPage(pageNumber);
  };

  if (items.length > 0) {
    return (
      <div className="Home">
        <form onSubmit={preventSubmition.bind(this)}>
          <div className="form-group">
            <label>Book:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search book..."
            />
          </div>
          <button onClick={fetchItems} type="button" className="btn btn-info">
            Search
          </button>
        </form>
        <div>
          <Pagination
            className="pagination"
            hideDisabled={true}
            itemClass="page-item"
            linkClass="page-link"
            activePage={activePage}
            itemsCountPerPage={100}
            totalItemsCount={obj.num_found ? obj.num_found : 100}
            pageRangeDisplayed={100}
            onChange={handlePageChange.bind(this)}
          />
        </div>
        <div className="books">
          {items
            .filter((item) => item.cover_i)
            .map((item, i) => {
              return (
                <Link key={i} to={`/about/${item.isbn ? item.isbn[0] : null}`}>
                  <div className="book">
                    <img
                      src={`http://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`}
                      alt="thumbnail"
                    />
                    <h1>
                      {item.title} ({item.first_publish_year})
                    </h1>
                    <h3>{item.author_name}</h3>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="Home">
        <form onSubmit={preventSubmition.bind(this)}>
          <div className="form-group">
            <label>Book:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Search book..."
            />
          </div>
          <button onClick={fetchItems} type="button" className="btn btn-info">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Home;
