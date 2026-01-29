import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { YOUTUBE_API_KEYY } from '../constants';

const buttonItems = ['All', 'Music', 'Data Structure', 'Mixes', 'Live', 'System Design', 'Software Engineering', 'Masala films', 'Ghazal', 'News', 'Recently uploaded', 'Media', "Movies", "Cricket", "Tech", "Cooking", "React", "Tailwind"];

const ButtonItem = ({label}) => {
    return (
        <div className='bg-gray-200 rounded-xl whitespace-nowrap'>
            <button className='px-3 py-1 text-black font-medium cursor-pointer'>{label}</button>
        </div>
    )
}

const ButtonContainer = () => {
    return (
        <div className='w-full overflow-x-auto h-14 px-5 text-sm gap-4 shrink-0 transition-all duration-300 bg-white/90 backdrop-blur-md flex items-center sticky top-0 z-10 overscroll-x-none button-container'>
            { 
                buttonItems.map((item, idx) => <ButtonItem label={item} key={idx} />)
            }
        </div>
    )
}

const VideoItem = ({item}) => {
    return (
        <div className='w-full flex flex-col sm:flex-row cursor-pointer gap-4 p-2  rounded-2xl border-gray-200 hover:bg-gray-100 transition-colors duration-300 items-stretch'>
            {/* thumbnail (50% on md+) */}
            <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 rounded-lg overflow-hidden bg-gray-200 relative'>
                <div className='w-full aspect-video'>
                    <img src={'https://picsum.photos/536/354'}
                     alt='thumbnail' 
                     className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                    />
                </div>
                <span className='absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded-sm font-medium'>
                    {item?.duration || '12:34'}
                </span>
            </div>

            {/* content (50% on md+) */}
            <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 flex flex-col justify-between'>
                <div>
                    <h3 className='text-sm md:text-lg lg:text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2'>
                        {item?.title || 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, exercitationem?'}
                    </h3>

                    <div className='mt-2 flex items-center gap-2 text-xs md:text-sm text-gray-600'>
                        <span>{item?.views || '508 views'}</span>
                        <span className='px-2'>•</span>
                        <span>{item?.time || '1 hour ago'}</span>
                    </div>

                    <div className='mt-3 flex items-center gap-3 text-xs md:text-sm text-gray-600'>
                        <div className='flex items-center gap-3'>
                            <div className='w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0'>
                                <img src={item?.channelAvatar || 'https://picsum.photos/seed/picsum/200/200'} alt={item?.channel} className='w-full h-full object-cover' />
                            </div>

                            <div className='flex items-center gap-2'>
                                <span className='font-medium text-gray-800'>{item?.channel || 'Channel Name'}</span>
                                {item?.verified && (
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='w-4 h-4 text-gray-500' fill='currentColor'>
                                        <path d='M12 2a1 1 0 0 1 .9.55l1.6 3.24 3.58.52a1 1 0 0 1 .56 1.7l-2.59 2.53.61 3.56a1 1 0 0 1-1.45 1.05L12 15.4l-3.21 1.69a1 1 0 0 1-1.45-1.05l.61-3.56L5.36 7.99a1 1 0 0 1 .56-1.7l3.58-.52L11.1 2.55A1 1 0 0 1 12 2z' />
                                    </svg>
                                )}
                            </div>
                        </div>

                    </div>

                    <p className='mt-3 text-sm hidden sm:block text-gray-600 line-clamp-3'>{item?.description || 'A short description that summarizes the video content and helps users decide if it matches their search.'}</p>
                </div>

            </div>
        </div>
    )
}

const SearchVideoContainer = () => {
    const [searchParam] = useSearchParams();
    const query = searchParam.get('search_query');
    const [searchResult, setSearchResult] = useState([]);

    async function getSearchResult() {
        console.log("Fetching search results for ", query);
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=surfing &key=${YOUTUBE_API_KEYY}`)
        const data = response.json();
        console.log(data);
        setSearchResult(data?.items)
    }

    useEffect(() => {
        getSearchResult();
    }, [searchParam]);

    return(
        <div className='px-4'>
            {
                searchResult && 
                searchResult.map((item) => {
                    return <VideoItem item={item} key={item.id.videoId} />
                })
            }
        </div>
    )
}

const SearchBody = () => {

  return (
    <div className='w-full h-full bg-white ml-20 overflow-auto'>
        <ButtonContainer />
        <SearchVideoContainer />
    </div>
  )
}

export default SearchBody