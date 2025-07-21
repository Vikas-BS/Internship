import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Search, Mic } from "lucide-react";
import useDebounce from "../Debounce";



const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchRef = useRef(null);
  const listRef = useRef(null);
  const debouncedQuery = useDebounce(query, 100);

  useEffect(() => {
    if (debouncedQuery?.trim()) {
      fetchMovies(debouncedQuery);
      setIsOpen(true);
    } else {
      setMovies([]);
      setIsOpen(false);
    }
  }, [debouncedQuery]);

  const fetchMovies = async (q) => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: "0c0fee3fa5647ecc6542b11376d4136b",
            query: q,
          },
        }
      );
      setMovies(data.results || []);
      setHighlightedIndex(-1);
    } catch (error) {
      console.error("API error:", error);
      setMovies([]);
    }
  };

  const handleVoiceSearch = () => {
    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-IN";
    recognition.start();
    recognition.onresult = (e) => {
      const voiceQuery = e.results[0][0].transcript;
      setQuery(voiceQuery);
    };
  };

  const handleOutsideClick = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen || movies.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % movies.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + movies.length) % movies.length);
    } else if (e.key === "Enter") {
      if (highlightedIndex >= 0 && movies[highlightedIndex]) {
        setQuery(movies[highlightedIndex].title);
        setIsOpen(false);
      } else {
        handleSearch();
      }
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const el = listRef.current.children[highlightedIndex];
      if (el) el.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <nav className="w-full bg-black/30 shadow-sm px-6 py-3 fixed top-0 left-0 z-50">
      <div className="flex justify-center ">
        <div
          className="relative w-full max-w-2xl  flex items-center"
          ref={searchRef}
        >
          <input
            type="text"
            placeholder="Search movies"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full px-5 py-2 text-white rounded-l-full border-none  bg-black/70 focus:outline-none focus:ring-0 text-sm"
          />
          <button className="bg-black/70 px-4 py-2 border-none  rounded-r-full ">
            <Search className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={handleVoiceSearch}
            className="ml-3 p-2 bg-black/70  rounded-full"
          >
            <Mic className="w-5 h-5 text-white" />
          </button>

          {isOpen && movies.length > 0 && (
            <div
              className="absolute top-full w-full   mt-4  bg-black/70 border text-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto transition-all duration-200"
              ref={listRef}
            >
              <div></div>
              {movies.map((movie, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setHighlightedIndex(idx)}
                  onClick={() => {
                    setQuery(movie.title);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer  ${
                    idx === highlightedIndex
                      ? "bg-black/30"
                      : "hover:bg-black/30"
                  }`}
                >
                  {movie.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MovieSearch;
