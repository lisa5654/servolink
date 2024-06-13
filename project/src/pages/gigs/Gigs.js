import React, { useRef, useState,useEffect } from "react";
import "./Gigs.css";
import { gigs } from "../../data";
import GigCard from "../../components/gigCard/GigCard";
import { useLocation } from 'react-router-dom';


function Gigs() {
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const location = useLocation();
  const [category, setCategory] = useState('');

  // Extract the query parameters from the URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    setCategory(cat);
    console.log(cat)
  }, [location]);


  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };
  console.log(gigs[0].category)
  
  const apply = ()=>{
    console.log(minRef.current.value)
    console.log(maxRef.current.value)
  }

  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Liverr &gt; Graphics & Design &gt;</span>
        <h1>{category ? `${category}` : 'All Gigs'}</h1>
        <p>
          Explore the boundaries of art and technology with Liverr's AI artists
        </p>
        <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div>
        <div className="cards">
      {/* Check if category is set and filter gigs */}
      {category && gigs.filter(gig => gig.category === category).map(gig => (
        <GigCard key={gig.id} item={gig} />
      ))}
    </div>
      </div>
    </div>
  );
}

export default Gigs;
