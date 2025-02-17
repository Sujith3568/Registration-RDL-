import React from 'react';
import {Link } from 'react-router-dom';



function Home(){
  return(
    <>
    <ul>
      <li>
        <Link to="/About">About</Link>
      </li>
      <li>
        <Link to="/Content">Content</Link>
      </li>
    </ul>
    </>
  )
}

export default Home ;