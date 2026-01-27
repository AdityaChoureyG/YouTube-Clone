import VideoContainer from "./VideoContainer";

const buttonItems = ['All', 'Music', 'Data Structure', 'Mixes', 'Live', 'System Design', 'Software Engineering', 'Masala films', 'Ghazal', 'News', 'Recently uploaded', 'Media', "Movies", "Cricket", "Tech", "Cooking", "React", "Tailwind"];

const ButtonItem = ({label}) => {
    return (
        <div className='bg-gray-200 rounded-xl whitespace-nowrap '>
            <button className='px-3 py-1 text-black font-medium cursor-pointer'>{label}</button>
        </div>
    )
}

const ButtonContainer = () => {
    return (
        <div className='w-full overflow-x-auto  h-14 px-5 text-sm gap-4 shrink-0 bg-white flex items-center sticky top-0 z-10 overscroll-x-none button-container'>
            { 
                buttonItems.map((item, idx) => <ButtonItem label={item} key={idx} />)
            }
        </div>
    )
}



const MainBody = () => {
  return (
    <div className='w-full  ml-19 overflow-y-auto'>
        <ButtonContainer />
        <VideoContainer />
        {/* <VideoShimmer /> */}
    </div>
  )
}

export default MainBody