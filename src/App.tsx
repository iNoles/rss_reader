import React, { useState } from 'react';
import './App.css';

interface FeedItem {
  link: string | null | undefined;
  title: string | null| undefined;
  thumbnail: string | null | undefined;
  description: string | null | undefined;
}

export default function App() {
  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState<FeedItem[]>([]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRssUrl(event.target.value)
  };

  const getRss = async (event: React.FormEvent<HTMLFormElement>) => {
    // Preventing the page from reloading
    event.preventDefault();
    const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el: Element) => ({
      link: el.querySelector("link")?.textContent,
      title: el.querySelector("title")?.textContent,
      thumbnail: el.querySelector("thumbnail")?.getAttribute("url"),
      description: el.querySelector("description")?.textContent?.replace(/<[^>]+>/g, '')
    }));
    console.log(feedItems);
    setItems(feedItems);
  }

  return (
    <div className='container'>
       <h4>URL</h4>
       <form onSubmit={getRss}>
       <input
          type="url"
          name="rssUrl"
          id="rssUrl"
          placeholder="https://www.example.com/.rss"
          onChange={(e) => handleOnChange(e) }
          required
        />
        <button type='submit'>Submit</button>
       </form>
       { items.map((item) => {
        return (
          <div className='article'>
          <div className='article-image'>
            <img src={item.thumbnail ? item.thumbnail : ""} />
          </div>
          <div className='article-info'>
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <a target="_blank" rel="noreferrer" href={item.link ? item.link : ""}>
              <button>Read article</button>
            </a>
          </div>
         </div>
        )
       })}
       </div>
  );
}
