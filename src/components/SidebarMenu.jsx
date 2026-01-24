import React from 'react'
import menuIcon from '../assets/menu-line.svg'
import youtubeIcon from '../assets/youtube.png'
import homeIcon from '../assets/home.png'
import exploreIcon from '../assets/compass.png'
import subscriptionsIcon from '../assets/subscribe.png'
import likeIcon from '../assets/like.png'
import historyIcon from '../assets/history.png'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toggleMenu } from '../utils/navslice'

const MenuItem = ({ icon, label }) => (
  <div className='flex items-center gap-7 px-7 py-3 hover:bg-gray-200 cursor-pointer'>
    <img className='h-6 w-6 ' src={icon} alt={label} />
    <span className='text-base font-normal'>{label}</span>
  </div>
);

const SidebarMenu = () => {
    const dispatch = useDispatch();
    const isMenuOpen = useSelector(state => state.nav.isMenuOpen);

    function handleToggle(){
        dispatch(toggleMenu());
    }
    return (
        <>
            <div 
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
                isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`} 
                onClick={() => dispatch(toggleMenu())}
            />
        
            <div className={`fixed top-0 left-0 w-64 h-full bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
                }`}>
                <div className='flex items-center gap-5 p-5 h-14'>
                    <button className='rounded-full p-2 hover:bg-gray-200' onClick={()=>handleToggle()}>
                        <img className='h-6 w-6 cursor-pointer'  src={menuIcon} alt="Menu" />
                    </button>
                    <div className='flex cursor-pointer'>
                        <img className='h-7 w-7'  src={youtubeIcon} alt="Menu" />
                        <h1 className='text-xl font-semibold px-0.5 inline-block transform scale-x-[0.8] scale-y-[1.2] origin-left'>YouTube</h1>
                    </div>
                </div>

                <MenuItem icon={homeIcon} label="Home" />
                <MenuItem icon={exploreIcon} label="Explore" />
                <MenuItem icon={subscriptionsIcon} label="Subscriptions" />
                <MenuItem icon={likeIcon} label="Liked Videos" />
                <MenuItem icon={historyIcon} label="History" />
            </div>
        </>
    )
}

export default SidebarMenu