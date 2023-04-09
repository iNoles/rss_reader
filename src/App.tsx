import React, { useState } from 'react';
import FeedForm from './components/Feedform';

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
    setItems(feedItems);
  }

  return (
    <div className="container mx-auto mt-5 p-4 bg-white">
       <h4>URL</h4>
       <FeedForm getRss={getRss} handleOnChange={handleOnChange }/>
       { items.map((item) => {
        return (
          <div className="flex">
          <div className="flex-none w-48">
            <img src={item.thumbnail ? item.thumbnail : ""} />
          </div>
          <div className="flex-auto p-6">
            <h2 className="text-lg font-bold">{item.title}</h2>
            <p className="text-base mt-3 mb-1">{item.description}</p>
            <a target="_blank" rel="noreferrer" href={item.link ? item.link : ""}>
              <button className="bg-blue-500 text-white p-2 text-sm rounded-md mt-2">Read article</button>
            </a>
          </div>
         </div>
        )
       })}
       </div>
  );
}
