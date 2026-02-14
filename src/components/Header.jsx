import React, { useEffect, useRef } from 'react'
import menuIcon from '../assets/menu-line.svg'
import youtubeIcon from '../assets/youtube.png'
import searchIcon from '../assets/search-line.svg'
import bellIcon from '../assets/bell.png'
import userIcon from '../assets/account.png'
import micIcon from '../assets/mic.png'
import closeIcon from '../assets/close.png'
import { useDispatch, useSelector } from 'react-redux'
import { openSearchBox, toggleMenu, closeSearchBox } from '../utils/navslice'
import SidebarMenu from './SidebarMenu'
import { YOUTUBE_SEARCH_API } from '../constants.js'
import { Link, useNavigate } from 'react-router-dom'

export const HeaderLeftSide = () => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  function handleToggle(){
    dispatch(toggleMenu())
  }

  return (
    <div className='flex  shrink-0 justify-between items-center gap-2'>
      <button className='p-2 rounded-full hover:bg-gray-200 shrink-0' onClick={()=>handleToggle()}>
        <img className='h-6 w-6  cursor-pointer' src={menuIcon} alt="Menu" />
      </button>       
      <Link to={'/'}> 
        <div className='flex cursor-pointer shrink-0 items-center'
          // onClick={() => navigation('/')}
        >
          <img className='h-7 w-7 ' src={youtubeIcon} alt="Menu" />
          <h1 className='text-xl font-semibold pl-0.5 inline-block transform scale-x-[0.8] scale-y-[1.2] origin-left'>YouTube</h1>
        </div>
      </Link>
    </div>
  );
}

const HeaderMiddle = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [suggestionResult, setSuggestionResult] = React.useState([]);
  const [showSuggestion, setShowSuggestion] = React.useState(false);
  const navigation = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    if(searchQuery.trim() === "") return;
    inputRef.current.blur();
    navigation(`/result?search_query=${searchQuery}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchQuery.trim()) {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestion(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function getSearchSuggestion() {
    try {
      const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const data = await response.json();
      setSuggestionResult(data[1] || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }

  return (
    <>
      <div className='hidden sm:flex flex-col relative flex-1 md:max-w-lg mx-2' ref={containerRef}>
        <div className="flex items-center w-full bg-white border border-gray-300 rounded-full px-4 py-2 focus-within:border-blue-500 focus-within:shadow-md">
          {/* Input Section */}
          <input
            type="text"
            ref={inputRef}
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 font-normal"
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
            onFocus={() => searchQuery && setShowSuggestion(true)}
            onKeyDown={(e) => {
              if(e.key === "Enter") handleSearch();
            }}
          />
          
          {/* Search Button */}
          <button 
            className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors shrink-0"
            onClick={(e) => handleSearch(e)}
          >
            <img className='w-5 h-5' src={searchIcon} alt="Search" />
          </button>
        </div>

        {/* Search Suggestion Dropdown */}
        {
          (showSuggestion && searchQuery.trim() && suggestionResult.length > 0) &&
          <ul className='absolute top-12 left-0 right-0 p-2 border border-gray-300 bg-white rounded-2xl shadow-lg z-50 max-h-96 overflow-y-auto'>
            {
              suggestionResult.map((item, idx) => (
                <Link to={`/result?search_query=${item}`} key={idx} onClick={() => { setShowSuggestion(false); inputRef.current?.blur(); }}>
                  <li className='flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-lg'>
                    <img className='w-4 h-4 mr-3' src={searchIcon} alt="search" />
                    <span className='font-normal text-black text-sm line-clamp-2'>{item}</span>
                  </li>
                </Link>
              ))
            }
          </ul>
        }
      </div>

      {/* Mobile Search Icon */}
      <div className='sm:hidden flex shrink-0 items-center'>
        <button className='cursor-pointer p-2 rounded-full hover:bg-gray-200 transition-colors shrink-0'
          onClick={() => dispatch(openSearchBox())}
        >
          <img className='w-6 h-6' src={searchIcon} alt="search" />
        </button>
      </div>
    </>
  )
};

const HeaderRightSide = () => {
  return (
    <div className='flex sm:gap-5 mx-2 justify-between items-center  shrink-0'>
      <button className='cursor-pointer p-1.5 rounded-full hover:bg-gray-200'>
        <img className='w-7 h-7 ' src={bellIcon} alt="notification" />
      </button>

      <button className='cursor-pointer'
      >
        <img className='w-8 h-8 ' src={userIcon} alt="user" />
      </button>
    </div>
  )
}

const SearchHeader = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [suggestionResult, setSuggestionResult] = React.useState([]);
  const [showSuggestion, setShowSuggestion] = React.useState(false);
  const navigation = useNavigate();
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const handleCloseSearchBox = () => {
    dispatch(closeSearchBox());
    setShowSuggestion(false);
    setSearchQuery("");
  }

  const handleSearch = (e) => {
    if(searchQuery.trim() === "") return;
    inputRef.current.blur();
    navigation(`/result?search_query=${searchQuery}`);
    handleCloseSearchBox();
  }

  useEffect(() => {
    if(inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if(searchQuery.trim()) {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    }
  }, [searchQuery]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestion(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  async function getSearchSuggestion() {
    try {
      const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
      const data = await response.json();
      setSuggestionResult(data[1] || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  }

  return (
    <div className='flex items-center justify-between gap-2 sm:gap-3 w-full h-full px-2' ref={containerRef}>
      {/* Close Button */}
      <button 
        className='cursor-pointer rounded-full p-2 hover:bg-gray-200 shrink-0 transition-colors'
        onClick={handleCloseSearchBox}
      >
        <img className='w-5 h-5 sm:w-6 sm:h-6' src={closeIcon} alt="close" />
      </button>

      {/* Search Input Section */}
      <div className="flex flex-col flex-1 relative min-w-0">
        <div className="flex items-center w-full bg-white border border-gray-300 rounded-full px-3 sm:px-4 py-2 focus-within:border-blue-500 focus-within:shadow-md">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search"
            className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 font-normal text-sm sm:text-base min-w-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onKeyDown={(e) => {
              if(e.key === "Enter") handleSearch();
            }}
          />
        </div>

        {/* Search Suggestions */}
        {
          (showSuggestion && searchQuery.trim() && suggestionResult.length > 0) &&
          <ul className='fixed top-16 left-0 right-0 mx-2 sm:absolute sm:top-12 sm:left-0 sm:right-0 p-2 border border-gray-300 bg-white rounded-2xl shadow-lg z-50 max-h-64 sm:max-h-80 overflow-y-auto w-[calc(100%-1rem)]'>
            {
              suggestionResult.map((item, idx) => (
                <Link to={`/result?search_query=${item}`} key={idx} onClick={() => { handleCloseSearchBox(); }}>
                  <li className='flex items-center px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-lg'>
                    <img className='w-4 h-4 mr-2 sm:mr-3 shrink-0' src={searchIcon} alt="search" />
                    <span className='font-normal text-black text-xs sm:text-sm line-clamp-2'>{item}</span>
                  </li>
                </Link>
              ))
            }
          </ul>
        }
      </div>

      {/* Search Button */}
      <button 
        className='cursor-pointer p-2 rounded-full hover:bg-gray-200 shrink-0 transition-colors'
        onClick={handleSearch}
      >
        <img className='w-5 h-5 sm:w-6 sm:h-6' src={searchIcon} alt="search" />
      </button>

      {/* Mic Button */}
      <button className='cursor-pointer p-2 rounded-full hover:bg-gray-200 shrink-0 transition-colors'>
        <img className='w-5 h-5 sm:w-6 sm:h-6' src={micIcon} alt="mic" />
      </button>

      
    </div>
  )
}

const Header = () => {
  const isSearchOpen = useSelector(state => state.nav.isSearchOpen);

  return (
  <>
    <div className='font-bold fixed top-0 left-0 right-0 w-full px-4.5 h-16 flex justify-between items-center sm:gap-2 transition-all duration-300 bg-white/90 backdrop-blur-md z-40'>
      {
        (isSearchOpen) ?
         <SearchHeader />
          :
         <>
          <HeaderLeftSide />
          <HeaderMiddle />
          <HeaderRightSide />
         </>
      }

    </div>
      <SidebarMenu />
  </>
  )
}

export default Header