 import React from 'react'
 import homeIcon from '../assets/home.png'
 import accountIcon from '../assets/account.png'
 import subscriptionIcon from '../assets/subscription.png'
 import exploreIcon from '../assets/compass.png'
import { Link } from 'react-router-dom'


 const MenuItem = ({ icon, label }) => (
   <div className='flex flex-col items-center py-3 rounded-2xl hover:bg-gray-200 cursor-pointer'>
     <img className='h-6 w-6 mx-2 my-1' src={icon} alt={label} />
     <p className='text-[12px]'>{label}</p>
   </div>
 );

 const SidebarBody = () => {
   return (
     <div className='fixed left-0 top-16 w-20 px-1 h-[calc(100vh-64px)] bg-white z-20 '>
        <Link to={'/'}><MenuItem icon={homeIcon} label="Home" /></Link>
        <MenuItem icon={exploreIcon} label="Explore" />
        <MenuItem icon={subscriptionIcon} label="Subscriptions" />
        <MenuItem icon={accountIcon} label="You" />
     </div>
   )
 }
 
 export default SidebarBody