import React from 'react';
import { useState, useEffect } from 'react';
// Import your animation library
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Start animation after a short delay
    setTimeout(() => setIsAnimated(true), 500);
  }, []);

  const handleButtonClick = () => {
    navigate('/'); // Navigate to the homepage
  };

  return (
    <div className="not-found-container">
      {/* Animated Homer Simpson image with "D'oh!" */}
      <div className={`homer-image ${isAnimated ? 'animated' : ''}`}>
        {/* Replace with your animated Homer image */}
      </div>

      {/* Animated cloud with text */}
      <div className={`cloud-text ${isAnimated ? 'animated' : ''}`}>
        <p>Ay, caramba! You seem to be lost in the multiverse, friend.</p>
      </div>

      {/* Animated button */}
      <button className={`go-home-button ${isAnimated ? 'animated' : ''}`} onClick={handleButtonClick}>
        Take me back to Springfield!
      </button>
    </div>
  );
};

export default NotFound;