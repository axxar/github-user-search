import {React, useState } from "react";
import './App.css';

function App() {

  const [userName, setUserName] = useState("");
  const [items, updateItems] = useState([]);

  const submitSearchQueryForm = (event) => {
    event.preventDefault();
    fetch("https://api.github.com/search/users?q=" + userName)
      .then((res) => res.json())
      .then(
        (result) => {
          updateItems(result.items.slice(0, 5));
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="bg-gray-900 h-screen items-center">
      <h1 className="font-bold text-3xl text-white p-10 font-mono">
        Hello and Welcome!
      </h1>
      <form
        class="flex items-center p-10 pt-0"
        onSubmit={submitSearchQueryForm}
      >
        <label for="simple-search" class="sr-only">
          Search GitHub Users
        </label>
        <div class="relative w-full">
          <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="simple-search"
            class="border text-sm rounded-lg block w-full pl-10 p-2.5  bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search GitHub Users"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          class="p-2.5 ml-2 text-sm font-medium rounded-lg focus:ring-4 focus:outline-none bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 focus:text-white"
        >
          <svg
            class="w-10 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </form>
      <div class="mx-10 relative overflow-x-auto shadow-md rounded-lg">
        <table class="w-full text-left text-gray-500 dark:text-gray-400">
          <tbody>
            {items.map((item, index) => (
              <tr className="border-b bg-gray-800 border-gray-700">
                <td className="px-6 py-4">
                  <img
                    src={item.avatar_url}
                    width="50"
                    height="60"
                    alt="User avatar"
                  />
                </td>
                <td className="px-6 py-4 text-white">
                  <a href={item.html_url} target="_blank" rel="noreferrer">{item.login}</a>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;