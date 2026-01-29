import React from 'react'

const VideoItem = () => {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/3 p-2 animate-pulse">
            <div className="flex flex-col gap-2 cursor-pointer  p-2 rounded-xl group">
                
                {/* 1. THUMBNAIL CONTAINER */}
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gray-200">
                    
                </div>

                {/* 2. VIDEO INFO */}
                <div className="flex gap-3 pt-1">
                {/* Channel Icon */}
                    <div className="shrink-0">
                        <div className="w-9 h-9 rounded-full bg-gray-200 overflow-hidden">
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="flex flex-col gap-2 w-full">

                        <div className='h-[1.5rem] w-4/5 bg-gray-200'></div>
                        <div className='h-[1.5rem] w-3/5 bg-gray-200'></div>

                    </div>
                </div>
            </div>
        </div>
    )
}

const VideoShimmer = () => {
  return (
    <div className='px-5 flex flex-wrap justify-center'>
        <VideoItem />
        <VideoItem />
        <VideoItem />
        <VideoItem />
        <VideoItem />
        <VideoItem />
    </div>
  )
}

export const ShortVideoShimmer = () => {
    return (
        <div className='px-5 flex flex-wrap justify-center'>
            <VideoItem />
            <VideoItem />
            <VideoItem />
        </div>
    )
}



export default VideoShimmer