import React from "react";
import "./Featured.css";

function Featured() {
  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
          Discover the ideal <span>freelance</span> services tailored for your business.
          </h1>
          <div className="search">
            <div className="searchInput">
 s             <img src="./img/search.png" alt="" />
              <input type="text" placeholder='Try "building mobil app"' />
            </div>
            <button>Search</button>
          </div>
          <div className="popular">
            <span>Popular:</span>
            <button>Web Design</button>
            <button>WordPress</button>
            <button>Logo Design</button>
            <button>AI Services</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Featured;
