import React, { useEffect, useState } from 'react';
import { YOUTUBE_VIDEOS_API, YOUTUBE_API_KEYY } from '../constants';
import VideoShimmer  from './VideoShimmer';
import calculateTimeStamp from '../utils/timestamp';
import calculateViewCount from '../utils/calculateViewCount'
import calculatePublishedDate from '../utils/calculatePublishedDate'
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';


const VideoItem = ({item}) => {
    const [channelIcon, setChannelIcon] = useState("");

    async function getProfile() {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${item?.snippet?.channelId}&key=${YOUTUBE_API_KEYY}`);
        const data = await response.json();
        setChannelIcon(data.items[0].snippet.thumbnails.default.url);
    }

    // useEffect(() => {
    //     getProfile();
    // }, [item?.snippet?.channelId]);

    return (
        <div className="flex flex-col gap-2 cursor-pointer transition-all duration-300 hover:bg-gray-100 p-2 rounded-xl group h-full">
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
                        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                        <img src={null} alt="avatar" />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col">
                        <h3 className="font-bold text-md text-gray-900 leading-tight line-clamp-2">
                            {item.snippet.title}
                        </h3>
                        
                        <div className="mt-1 text-sm text-gray-600">
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
    )
}

const VideoContainer = () => {
    const [Videos, setVideos] = React.useState([]);
    const [nextPageToken, setNextPageToken] = React.useState("");
    const [ref, inView] = useInView({
        threshold : 0
    });

    useEffect(() => {
        async function fetchVideos() {
            const response = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=15&pageToken=${nextPageToken}&regionCode=IN&key=${YOUTUBE_API_KEYY}`);
            const data = await response.json();
            console.log(data);
            setNextPageToken(data?.nextPageToken);
            setVideos((prev) => {
                const existingIds = new Set(prev.map(i => i.id?.videoId || i.id));
                const incoming = data?.items || [];
                const newItems = incoming.filter(i => {
                    const id = i.id?.videoId || i.id;
                    return !existingIds.has(id);
                });
                return [...prev, ...newItems];
            });
        }

        if (Videos.length === 0 || (inView && nextPageToken)) {
            fetchVideos();
        }
    }, [inView]);

    return (Videos.length == 0) ? (<VideoShimmer />) : (
        <>
                <div className='px-1 flex flex-wrap justify-center'>
                    {
                        Videos.map((item) => {
                            const key = item.id?.videoId || item.id;
                            return (
                                <Link to={`/watch?v=${key}`} key={key} className="w-full sm:w-1/2 lg:w-1/3 p-2 block h-full">
                                    <VideoItem item={item} />
                                </Link>
                            )
                        })
                    }
                </div>

                {/* The Sentinel: When this div enters view, more videos load */}
                <div ref={ref}  className="w-full flex flex-col flex-wrap justify-center items-center">
                    {nextPageToken ? (
                    <>
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-red-600"></div>
                    </>
                    ) : (
                    <p>No more videos to load!</p>
                    )}
                </div>
        </>
    )
}
export default VideoContainer;