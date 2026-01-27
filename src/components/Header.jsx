import React from 'react'
import menuIcon from '../assets/menu-line.svg'
import youtubeIcon from '../assets/youtube.png'
import searchIcon from '../assets/search-line.svg'
import bellIcon from '../assets/bell.png'
import userIcon from '../assets/account.png'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/navslice'
import SidebarMenu from './SidebarMenu'

export const HeaderLeftSide = () => {
  const dispatch = useDispatch();

  function handleToggle(){
    dispatch(toggleMenu())
  }

  return (
    <div className='flex w-40 shrink-0 justify-between items-center gap-2'>
      <button className='p-2 rounded-full hover:bg-gray-200 shrink-0' onClick={()=>handleToggle()}>
        <img className='h-6 w-6  cursor-pointer' src={menuIcon} alt="Menu" />
      </button>        
      <div className='flex cursor-pointer shrink-0 items-center'>
        <img className='h-7 w-7 ' src={youtubeIcon} alt="Menu" />
        <h1 className='text-xl font-semibold px-0.5 inline-block transform scale-x-[0.8] scale-y-[1.2] origin-left'>YouTube</h1>
      </div>
    </div>
  );
}

const HeaderMiddle = () => {
  return (
    <div className="hidden sm:flex items-center flex-1 md:flex-none md:w-full md:max-w-100 lg:w-full lg:max-w-130 h-7 mx-2">
      {/* 1. Input Section */}
      <div className="flex flex-1 items-center bg-white border border-gray-300 rounded-l-full px-3 md:px-4 py-1.5 focus-within:border-blue-800 focus-within:shadow-inner">
        <input
          type="text"
          placeholder="Search"
          className="w-full font-normal h-7 bg-transparent outline-none text-gray-800 placeholder-gray-500 text-sm md:text-base"
        />
      </div>

      {/* 2. Search Button Section */}
      <button className="cursor-pointer flex items-center justify-center bg-gray-100 border border-l-0 border-gray-300 rounded-r-full px-3 md:px-5 py-2 hover:bg-gray-200 transition-colors">
        <img className='w-6 h-6 md:w-7 md:h-6' src={searchIcon} alt="Search" />
      </button>
    </div>
  )
};

const HeaderRightSide = () => {
  return (
    <div className='flex w-25 mx-2 justify-between items-center  shrink-0'>
      <button className='cursor-pointer p-1.5 rounded-full hover:bg-gray-200'>
        <img className='w-7 h-7 ' src={bellIcon} alt="notification" />
      </button>

      <button className='cursor-pointer'>
        <img className='w-8 h-8 ' src={userIcon} alt="user" />
      </button>
    </div>
  )
}

const Header = () => {
  return (
  <>
    <div className='font-bold fixed top-0 left-0 right-0 w-full px-4.5 h-16 flex justify-between items-center gap-2 bg-white/70 backdrop-blur-sm z-40'>
      
      <HeaderLeftSide />
      <HeaderMiddle />
      <HeaderRightSide />

    </div>
    <SidebarMenu />
  </>
  )
}

export default Header