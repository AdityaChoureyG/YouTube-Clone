import React, { useEffect, useState } from 'react';
import { YOUTUBE_API_URL } from '../constants';
import VideoShimmer from './VideoShimmer';
import calculateTimeStamp from '../utils/timestamp';
import calculateViewCount from '../utils/calculareViewCount'
import calculatePublishedDate from '../utils/calculatePublishedDate'


const VideoItem = ({item}) => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <div className="flex flex-col gap-2 cursor-pointer transition-all duration-300 hover:bg-gray-100 p-2 rounded-xl group">
                
                {/* 1. THUMBNAIL CONTAINER */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200">
                    <img 
                        src={item.snippet.thumbnails.high.url} 
                        alt="thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Timestamp */}
                    <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-md font-medium">
                        {calculateTimeStamp(item.contentDetails.duration)}
                    </span>
                </div>

                {/* 2. VIDEO INFO */}
                <div className="flex gap-3 pt-1">
                {/* Channel Icon */}
                    <div className="shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 overflow-hidden">
                        <img src="https://i.pravatar.cc/150?u=channel" alt="avatar" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                        <h3 className="font-bold text-sm text-gray-900 leading-tight line-clamp-2">
                            {item.snippet.title}
                        </h3>
                        
                        <div className="mt-1 text-xs text-gray-600">
                            <p className="hover:text-gray-900 transition-colors">{item.snippet.channelTitle}</p>
                            <div className="flex items-center gap-1">
                                <span>{calculateViewCount(item.statistics.viewCount)} views</span>
                                <span>•</span>
                                <span>{calculatePublishedDate(item.snippet.publishedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const VideoContainer = () => {
    const [Videos, setVideos] = React.useState([]);

    useEffect(()=>{
        getVideos();
    }, []);

    async function getVideos(){
        const response = await fetch(YOUTUBE_API_URL);
        const data = await response.json();
        console.log(data.items);
        setVideos(data.items);
    }

    return (Videos.length == 0) ? (<VideoShimmer />) : (
        <>
            <div className='px-5 flex flex-wrap justify-center'>
            {
                Videos.map((item) => {
                    return <VideoItem  key={item.id} item={item}/>
                })
            }
           </div>
        </>
    )
}
export default VideoContainer;