import { useState } from "react";

import "./SearchBar.css";

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");
/*
  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };
*/
  const handleChange = (value) => {
    setInput(value);
    //fetchData(value);
  };

  return (
    <div className="inputWrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" id="search">
            <path fill="#000" fillRule="evenodd" d="M14.192 15.606a7 7 0 1 1 1.414-1.414l5.172 5.172a1 1 0 0 1-1.414 1.414l-5.172-5.172ZM15 10a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z" clipRule="evenodd"></path>
        </svg>
        <input
            placeholder="Tìm kiếm..."
            value={input}
            onChange={(e) => handleChange(e.target.value)}
        />
    </div>
  );
};

export default SearchBar;