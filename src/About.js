import React, { useState, useEffect } from "react";
import "./App.css";

function About({ match }) {
  useEffect(() => {
    fetchItems();
  });

  const [items, setItems] = useState({});

  const id = match.params.id;
  const fetchItems = async () => {
    if (id) {
      const data = await fetch(
        `https://openlibrary.org/api/books?bibkeys=ISBN:${match.params.id}&format=json&jscmd=data`
      );
      const items = await data.json();
      setItems(items["ISBN:" + id]);
    }
  };

  if (id === "null") {
    return (
      <div className="About">
        <h1>No available details about this book</h1>
      </div>
    );
  } else {
    return (
      <div className="About">
        <div className="container">
          <div className="row">
            <div className="col-4">
              <img
                className="thumbnail"
                src={
                  items.cover
                    ? items.cover.large
                    : `http://covers.openlibrary.org/b/isbn/${id}-L.jpg`
                }
                alt="thumbnail"
              />
              <p>
                Find more about the book{" "}
                <a target="_blank" rel="noopener noreferrer" href={items.url}>
                  here
                </a>
                .
              </p>
            </div>
            <div className="col-8">
              <h1 className="title">Title: {items.title}</h1>
              <h3 className="subtitle">
                Subtitle: {items.subtitle || "No subtitle"}
              </h3>
              <h3 className="author">
                Author:
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={items.authors ? items.authors[0].url : "#"}
                >
                  {items.authors ? items.authors[0].name : "Unknown"}
                </a>
              </h3>
              <h3 className="publishers">
                Publishers:{" "}
                {items.publishers ? items.publishers[0].name : "Unknown"}
              </h3>
              <h3 className="year">Published: {items.publish_date}</h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
