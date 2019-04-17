import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = "https://hn.algolia.com/api/v1/search?query=";

const App = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getResults();
  }, [query]);

  const getResults = async () => {
    const { data: results } = await axios.get(API_URL + `${query}`);
    setResults(results.hits);
  };

  const handleChange = event => {
    event.preventDefault();
    setQuery(event.target.value.trim());
  };

  return (
    <div>
      {/* 
      Header
      NewsList
      NewsItem
      */}
      <h1>Hacker News</h1>
      <input
        type="text"
        value={query}
        onChange={event => {
          handleChange(event);
        }}
      />
      <ul>
        {results.map(result => (
          <li key={result.objectID}>
            <a href={result.url}>{result.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
