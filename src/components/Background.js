import React from 'react';
import './Background.css';

const Background = () => {
  return (
    <ul className="background">
      {[...Array(10)].map((_, index) => (
        <li key={index}></li>
      ))}
    </ul>
  );
};

export default Background;
