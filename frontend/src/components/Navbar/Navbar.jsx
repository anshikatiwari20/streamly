
import React, { useState, useRef, useEffect } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { FaRegStickyNote } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

export default function Navbar({ userInfo, handleSearch, getAllNotes }) {
  const [searchQuery, setSearchQuery] = useState("");

  const clearSearch = () => {
    setSearchQuery("");
    getAllNotes();
  };

  const navigate = useNavigate();
  const location = useLocation();

  const handleIconClick = () => {
    const token = localStorage.getItem('token');
    token ? navigate('/dashboard') : navigate('/login');
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchQuery.trim() ? handleSearch(searchQuery) : getAllNotes();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);


  return (
    <nav className="bg-gray-100 flex items-center justify-between px-6 py-3 drop-shadow-lg">
      <div className="font-bold text-2xl tracking-wide" style={{ color: '#1b263b' }}>
        Your Notes
      </div>
      {!(location.pathname === '/login' || location.pathname === '/signup') && (
        <SearchBar value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} handleSearch={() => handleSearch(searchQuery)} clearSearch={clearSearch} />
      )}
      {userInfo && <SettingsPopup />}
    </nav>
  );
}

function SettingsPopup() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "text-base");
  const navigate = useNavigate();
  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    // Remove only theme and font size classes, not all classes
    const themes = ["bg-[#1b263b]", "text-white", "bg-[#e0e1dd]", "text-[#1b263b]", "bg-[#778da9]"];
    const fontSizes = ["text-sm", "text-base", "text-lg"];
    document.body.classList.remove(...themes, ...fontSizes);
    if (theme === "dark") {
      document.body.classList.add("bg-[#1b263b]", "text-white");
    } else if (theme === "light") {
      document.body.classList.add("bg-[#e0e1dd]", "text-[#1b263b]");
    } else if (theme === "bluegray") {
      document.body.classList.add("bg-[#778da9]", "text-white");
    }
    document.body.classList.add(fontSize);
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
  }, [theme, fontSize]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
        title="Settings"
      >
  <FiSettings className="text-xl" style={{ color: '#1b263b' }} />
  <span className="hidden sm:inline text-base" style={{ color: '#1b263b' }}>Settings</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-lg z-50 p-4">
          <h3 className="font-bold text-lg mb-3" style={{ color: '#1b263b' }}>Settings</h3>
          <div className="mb-4">
            <label className="block font-semibold mb-1" style={{ color: '#1b263b' }}>Theme</label>
            <select
              value={theme}
              onChange={e => setTheme(e.target.value)}
              className="w-full border border-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-secondary text-black caret-black bg-white"
              style={{ backgroundColor: 'white', color: 'black' }}
            >
              <option style={{ color: 'black', backgroundColor: 'white' }} value="dark">Dark</option>
              <option style={{ color: 'black', backgroundColor: 'white' }} value="light">Light</option>
              <option style={{ color: 'black', backgroundColor: 'white' }} value="bluegray">Blue Gray</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1" style={{ color: '#1b263b' }}>Font Size</label>
            <select
              value={fontSize}
              onChange={e => setFontSize(e.target.value)}
              className="w-full border border-secondary rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-secondary text-black caret-black bg-white"
              style={{ backgroundColor: 'white', color: 'black' }}
            >
              <option style={{ color: 'black', backgroundColor: 'white' }} value="text-sm">Small</option>
              <option style={{ color: 'black', backgroundColor: 'white' }} value="text-base">Medium</option>
              <option style={{ color: 'black', backgroundColor: 'white' }} value="text-lg">Large</option>
            </select>
          </div>
          <button
            onClick={handleLogout}
            className="w-full mt-2 py-2 rounded-lg bg-red-500 text-white font-semibold text-base shadow hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
