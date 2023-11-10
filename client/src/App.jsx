import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const urlOrigin = 'http://localhost:4000/r/';

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
    setIsInvalid(false);
    
  };
  const handleUrlCopy = () =>{
    navigator.clipboard.writeText(shortUrl);
    alert('Link coppied seccesfuly');
  }

  

  const handleUrlSubmit = async (event) => {
    event.preventDefault();
    setShortUrl('');
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/shorten", {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 300) {
        setIsSuccess(false);
        setIsInvalid(true);
        setTimeout(() => setIsInvalid(false), 2000);
        
      } else if (response.ok) {
        setUrl('');
        const shortCode = await response.json();
        setShortUrl(urlOrigin + shortCode);
        setIsSuccess(true);
        
      }
    } catch (error) {
      console.error('Error:', error);
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="logo">Sqwik</h1>
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path
          fill="#a58772"
          d="M45,-65.2C55.6,-54.3,59.6,-37.5,65,-21.1C70.4,-4.7,77.1,11.3,73.8,24.7C70.4,38.1,57,49,43,57C29,65,14.5,70,0.2,69.7C-14,69.4,-28.1,63.7,-43.2,56.1C-58.4,48.5,-74.8,39,-81.9,24.8C-89.1,10.5,-87.1,-8.6,-78.6,-22.6C-70,-36.7,-54.9,-45.8,-40.8,-55.6C-26.6,-65.3,-13.3,-75.8,2,-78.5C17.2,-81.2,34.4,-76.2,45,-65.2Z"
          transform="translate(100 100) scale(-1,1)"
        />
      </svg>
      <div className="form-overlay"></div>
      <div className="form-container">
      
        <form onSubmit={handleUrlSubmit}>
          <h3 className="label">
            <span class="material-symbols-outlined">link</span> Enter your link here
          </h3>
          <input type="text" onChange={handleUrlChange} value={url} />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Shortening...' : 'Shorten'}
          </button>
          <div className={`warning ${isInvalid ? 'visible' : ''}`}>Invalid Url</div>
          <div className="short-url">
            {isSuccess && <p>URL Shortened Successfully! click it copy ot</p>}
            <h3 onClick={handleUrlCopy}>{shortUrl}</h3>
          </div>
        </form>
      </div>
      <div className="additional-info">
        <p>This is a simple URL shortening service. Enter your link, and it will provide you with a shortened URL.</p>
        <p>Feel free to check out the project on GitHub:</p>
        <a href="https://github.com/abderrahimrhitrif/Blog" target="_blank" rel="noopener noreferrer">
          <img src="https://img.shields.io/github/stars/abderrahimrhitrif/Blog?style=social" alt="" />
        </a>
      </div>
      
      <a
        className="github-button"
        href="https://github.com/your-username/your-url-shortener"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub
      </a>
      

    </>
  );
}

export default App;