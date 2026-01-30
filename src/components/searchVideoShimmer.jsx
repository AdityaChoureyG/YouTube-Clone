import React from 'react'

const SearchVideoItem = () => {
    return (
        <div className='w-full flex flex-col sm:flex-row cursor-pointer gap-4 p-2 rounded-2xl border-gray-200 hover:bg-gray-100 transition-colors duration-300 items-stretch animate-pulse'>
            {/* thumbnail shimmer (50% on md+) */}
            <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 rounded-lg overflow-hidden relative'>
                <div className='w-full aspect-video bg-gray-200'>
                </div>
            </div>

            {/* content shimmer (50% on md+) */}
            <div className='w-full sm:w-1/2 md:w-1/2 lg:w-1/2 flex flex-col  gap-6'>
                {/* Title shimmer */}
                <div className='space-y-2'>
                    <div className='h-5 bg-gray-200 rounded w-full'></div>
                    <div className='h-5 bg-gray-200 rounded w-4/5'></div>
                </div>

                {/* Channel info shimmer */}
                <div className='flex items-center gap-3'>
                    <div className='w-8 h-8 rounded-full bg-gray-200 flex-shrink-0'></div>
                    <div className='flex-1 space-y-2'>
                        <div className='h-3 bg-gray-200 rounded w-2/5'></div>
                    </div>
                </div>

                {/* Description shimmer */}
                <div className='space-y-2 hidden sm:block'>
                    <div className='h-5 bg-gray-200 rounded w-full'></div>
                    <div className='h-5 bg-gray-200 rounded w-5/6'></div>
                </div>
            </div>
        </div>
    )
}

const SearchVideoShimmer = () => {
  return (
    <div className='px-4'>
        <SearchVideoItem />
        <SearchVideoItem />
        <SearchVideoItem />
        <SearchVideoItem />
        <SearchVideoItem />
    </div>
  )
}

export default SearchVideoShimmer
