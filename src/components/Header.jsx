import React, { useEffect, useRef } from 'react'
import menuIcon from '../assets/menu-line.svg'
import youtubeIcon from '../assets/youtube.png'
import searchIcon from '../assets/search-line.svg'
import bellIcon from '../assets/bell.png'
import userIcon from '../assets/account.png'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/navslice'
import SidebarMenu from './SidebarMenu'
import { YOUTUBE_SEARCH_API } from '../constants'
import { Link, useNavigate, useNavigation } from 'react-router-dom'

export const HeaderLeftSide = () => {
  const dispatch = useDispatch();
  // const navigation = useNavigation();

  function handleToggle(){
    dispatch(toggleMenu())
  }

  return (
    <div className='flex w-40 shrink-0 justify-between items-center gap-2'>
      <button className='p-2 rounded-full hover:bg-gray-200 shrink-0' onClick={()=>handleToggle()}>
        <img className='h-6 w-6  cursor-pointer' src={menuIcon} alt="Menu" />
      </button>       
      <Link to={'/'}> 
        <div className='flex cursor-pointer shrink-0 items-center'
          // onClick={() => navigation('/')}
        >
          <img className='h-7 w-7 ' src={youtubeIcon} alt="Menu" />
          <h1 className='text-xl font-semibold px-0.5 inline-block transform scale-x-[0.8] scale-y-[1.2] origin-left'>YouTube</h1>
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

  const handleSearch = (e) => {
    if(searchQuery.trim() === "") return;
    console.log("Searching for ", searchQuery);
    // setShowSuggestion(false);
    inputRef.current.blur();
    navigation(`/result?search_query=${searchQuery}`);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      getSearchSuggestion();
    }, 200);

    return () => {
      clearTimeout(timer);
    }
  }, [searchQuery]);

  async function getSearchSuggestion() {
    const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const data = await response.json();
    setSuggestionResult(data[1]);
    console.log(data[1]);
  }

  return (
    <div className='flex flex-col relative flex-1 md:flex-none md:w-full md:max-w-100 lg:w-full lg:max-w-130 h-7 mx-2'>
      <div className="flex items-center flex-1 md:flex-none md:w-full md:max-w-100 lg:w-full lg:max-w-130 h-7 mx-2">
        {/* 1. Input Section */}
        <div className="sm:px-0 flex flex-1 items-center bg-white border border-gray-300 rounded-l-full px-3 md:px-4 py-1.5 focus-within:border-blue-800 focus-within:shadow-inner">
          <input
            type="text"
            ref={inputRef}
            placeholder="Search"
            className="w-full font-normal h-7 bg-transparent outline-none text-black placeholder-gray-500 text-sm md:text-base"
            value={searchQuery}
            onChange={(e)=> setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setShowSuggestion(false)}
            onKeyDown={(e) => {
                if(e.key === "Enter")  handleSearch();
              }
            }
          />
        </div>

        {/* 2. Search Button Section */}
        <button className="cursor-pointer flex items-center justify-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-2 md:px-5 py-2 hover:bg-gray-200 transition-colors"
          onClick={(e) => handleSearch(e)}
        >
          <img className='w-6 h-6 md:w-7 md:h-6' src={searchIcon} alt="Search" />
        </button>
      </div>

      {/* search suggestion */}
      {
        (showSuggestion) && (suggestionResult.length != 0) &&
        <ul className='suggestion-container absolute top-10 left-0 right-0 mx-2 p-2 mt-2 border border-gray-300 bg-white rounded-2xl shadow-2xl max-w-full md:max-w-600 z-50 max-h-96 overflow-y-auto'>
          {
            suggestionResult.map((item, idx) => {
              return <li key={idx} className='flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 rounded-lg'>
                <img className='w-4 h-4 mr-3 text-gray-500' src={searchIcon} alt="search" />
                <span className='font-medium text-black text-sm md:text-base line-clamp-2'>{item}</span>
              </li>
            })
          }
        </ul>
      }
      
    </div>
  )
};

const HeaderRightSide = () => {
  return (
    <div className='flex w-25 mx-2 justify-between items-center  shrink-0'>
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

const Header = () => {
  return (
  <>
    <div className='font-bold fixed top-0 left-0 right-0 w-full px-4.5 h-16 flex justify-between items-center gap-2 transition-all duration-300 bg-white/90 backdrop-blur-md z-40'>
      
      <HeaderLeftSide />
      <HeaderMiddle />
      <HeaderRightSide />

    </div>
    <SidebarMenu />
  </>
  )
}

export default Header