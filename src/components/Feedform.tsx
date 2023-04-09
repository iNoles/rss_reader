import React from "react";

interface FeedFormType {
  getRss: React.FormEventHandler<HTMLFormElement>,
  handleOnChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function FeedForm({ getRss, handleOnChange }: FeedFormType) {
    return (
    <form onSubmit={getRss}>
        <input
          className="p-2 mt-4 md:mt-0 w-5/6 md:mx-4"
          type="url"
          name="rssUrl"
          id="rssUrl"
          placeholder="https://www.example.com/.rss"
          onChange={(e) => handleOnChange(e) }
          required
        />
        <button
          className="bg-green-500 text-white p-2 rounded-md mt-4 md:mt-0 transition-all hover:bg-green-400"
          type="submit">
          Submit
        </button>
    </form>
    );
}
