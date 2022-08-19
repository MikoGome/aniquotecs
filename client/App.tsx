import React, {useState, useEffect} from "react";
import "./stylesheets/App.scss";

const App = ():JSX.Element  => {

  const [anime, setAnime] = useState({});
  const [image, setImage] = useState('');

  useEffect(() => {
    fetch('https://animechan.vercel.app/api/random')
      .then(response => response.json())
      .then((anime: animeType) => {
        setAnime(anime);
        fetch('/api/search', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(anime)
        })
          .then(response => response.json())
          .then((imgUrl: string) => {
            setImage(imgUrl);
          });
      });
  }, []);

  return(
    <div className="app">
      <div className="info">
        <h1>{anime.anime}</h1>
        <h2>{anime.quote}</h2>
        <h3>{anime.character && '-'+anime.character}</h3>
      </div>
      <div className="image">
        <img src={image}/>
      </div>
    </div>
  )
}

interface animeType {
  anime: string,
  character: string,
  quote: string
}

export default App;