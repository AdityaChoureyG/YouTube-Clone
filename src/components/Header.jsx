import React from 'react'
import menuIcon from '../assets/menu-line.svg'
import youtubeIcon from '../assets/youtube.png'
import searchIcon from '../assets/search-line.svg'
import bellIcon from '../assets/bell.png'
import userIcon from '../assets/account.png'

const Header = () => {
  return (
  <>
    <div className='font-bold px-6 h-14 flex justify-between  items-center'>
      <div className='flex items-center gap-6'>
        <img className='h-6 w-6 cursor-pointer'  src={menuIcon} alt="Menu" />
        <div className='flex cursor-pointer'>
          <img className='h-7 w-7'  src={youtubeIcon} alt="Menu" />
          <h1 className='text-xl font-semibold px-0.5 inline-block transform scale-x-[0.8] scale-y-[1.2] origin-left'>YouTube</h1>
        </div>
      </div>

      <div className="flex items-center w-full max-w-130 h-7">
        {/* 1. Input Section */}
        <div className="flex flex-1 items-center bg-white border border-gray-300 rounded-l-full px-4 py-1.5 focus-within:border-blue-800 focus-within:shadow-inner">
          <input
            type="text"
            placeholder="Search"
            className="w-full font-normal h-7 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-base"
          />
        </div>

        {/* 2. Search Button Section */}
        <button className="cursor-pointer flex items-center justify-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-5 py-2 hover:bg-gray-200 transition-colors">
          <img className='w-7 h-6' src={searchIcon} alt="Search" />
        </button>
      </div>

      <div className='flex w-52 justify-evenly'>
        <button className='cursor-pointer p-1.5 rounded-full hover:bg-gray-200'>
          <img className='w-7 h-7' src={bellIcon} alt="notification" />
        </button>

        <button className='cursor-pointer'>
          <img className='w-8 h-8' src={userIcon} alt="user" />
        </button>
      </div>
    </div>
    
  </>
  )
}

export default Header