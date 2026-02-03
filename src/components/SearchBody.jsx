import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import { YOUTUBE_API_KEYY } from '../constants';
import calculateViewCount from '../utils/calculateViewCount';
import calculatePublishedDate from '../utils/calculatePublishedDate';
import SearchVideoShimmer from './searchVideoShimmer';
import { useInView } from 'react-intersection-observer';

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
            <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 rounded-lg overflow-hidden relative'>
                <div className='w-full aspect-video'>
                    <img src={item?.snippet?.thumbnails?.high?.url}
                     alt='thumbnail' 
                     className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                    />
                </div>
                {/* <span className='absolute bottom-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded-sm font-medium'>
                    {item?.duration || '12:34'}
                </span> */}
            </div>

            {/* content (50% on md+) */}
            <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 flex flex-col justify-between'>
                <div>
                    <h3 className='text-sm md:text-lg lg:text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2'>
                        {item?.snippet?.title}
                    </h3>

                    <div className='mt-2 flex items-center gap-2 text-xs md:text-sm text-gray-600'>
                        {/* <span>{item?.views || '508 views'}</span>
                        <span className='px-2'>•</span> */}
                        <span>{calculatePublishedDate(item?.snippet?.publishedAt)}</span>
                    </div>

                    <div className='mt-3 flex items-center gap-3 text-xs md:text-sm text-gray-600'>
                        <div className='flex items-center gap-3'>
                            <div className='w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex-shrink-0'>
                                <img src={item?.channelAvatar || 'https://picsum.photos/seed/picsum/200/200'} alt={item?.channel} className='w-full h-full object-cover' />
                            </div>

                            <div className='flex items-center gap-2'>
                                <span className='font-medium text-gray-800'>{item?.snippet?.channelTitle}</span>
                                
                            </div>
                        </div>

                    </div>

                    <p className='mt-3 text-sm hidden sm:block text-gray-600 line-clamp-2'>{item?.snippet?.description || 'A short description that summarizes the video content and helps users decide if it matches their search.'}</p>
                </div>

            </div>
        </div>
    )
}

const SearchVideoContainer = () => {
    const [searchParam] = useSearchParams();
    const query = searchParam.get('search_query');
    const [searchResult, setSearchResult] = useState([]);
    const [nextPageToken, setNextPageToken] = useState("");
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [ref, inView] = useInView({
        threshold : 0
    })

    async function getSearchResult() {
        console.log("Fetching search results for ", query);
        const response = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&pageToken=${nextPageToken}&q=${query}&key=${YOUTUBE_API_KEYY}`)
        const data = await response.json();
        console.log("Search results: ");
        console.log(data);
        setSearchResult((prev) => {
            const existingIds = new Set(prev.map(i => i.id?.videoId || i.id));
            const incoming = data?.items || [];
            const newItems = incoming.filter(i => {
                const id = i.id?.videoId || i.id;
                return !existingIds.has(id);
            });
            return [...prev, ...newItems];
        });
        setNextPageToken(data?.nextPageToken);
        // mark initial load as finished after results arrive
        setIsInitialLoad(false);
    }

    // Initial load on query change
    useEffect(() => {
        setSearchResult([]);
        setNextPageToken("");
        setIsInitialLoad(true);
    }, [query]);

    // Call on initial load
    useEffect(() => {
        if (isInitialLoad && query) {
            getSearchResult();
        }
    }, [isInitialLoad, inView, query]);

    // Call on sentinel trigger (infinite scroll)
    useEffect(() => {
        if (inView && !isInitialLoad && query) {
            getSearchResult();
        }
    }, [inView, isInitialLoad, query]);

    if (isInitialLoad) return (<SearchVideoShimmer />);

    if (!isInitialLoad && searchResult.length === 0) {
        return (
            <div className='px-4'>
                <div className='text-gray-600 py-8'>No results found for "{query}"</div>
            </div>
        )
    }

    return (
        <>
            <div className='px-4'>
                {
                    searchResult && 
                    searchResult.map((item) => {
                        return <Link to={`/watch?v=${item.id.videoId}`} key={item.id.videoId}>
                            <VideoItem item={item} />
                        </Link>
                    })
                }
            </div>

            {/* the sentinel : marker */}
            <div ref={ref}  className="w-full flex  flex-col flex-wrap justify-center items-center">
                
                <>
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600"></div>
                </>
            </div>
        </>
    )
}

const SearchBody = () => {

  return (
    <div className='w-full h-full bg-white sm:ml-20 overflow-auto'>
        <ButtonContainer />
        <SearchVideoContainer />
    </div>
  )
}

export default SearchBody