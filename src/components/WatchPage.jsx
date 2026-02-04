import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { toggleBodyMenu } from "../utils/navslice";
import { YOUTUBE_API_KEYY } from "../constants";
import calculateViewCount from "../utils/calculateViewCount";
import calculatePublishedDate from "../utils/calculatePublishedDate";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const dispatch = useDispatch();
  const [videoDetails, setVideoDetails] = useState(null);
  const [channelDetails, setChannelDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [nextPageTokenRelated, setNextPageTokenRelated] = useState("");
  const [showMoreDesc, setShowMoreDesc] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(true);
  const [ref, inView] = useInView({
    threshold: 0,
  });

  useEffect(() => {
    dispatch(toggleBodyMenu());
    return () => {
      dispatch(toggleBodyMenu());
    };
  }, [dispatch]);

  // Fetch video details
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        setLoadingDetails(true);
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEYY}`
        );
        const data = await response.json();
        console.log("video details data:", data);
        if (data.items && data.items.length > 0) {
          setVideoDetails(data.items[0]);
        }
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    if (videoId) {
      fetchVideoDetails();
    }
  }, [videoId]);

  // Fetch channel details
  useEffect(() => {
    const fetchChannelDetails = async () => {
      if (videoDetails?.snippet?.channelId) {
        try {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${videoDetails.snippet.channelId}&key=${YOUTUBE_API_KEYY}`
          );
          const data = await response.json();
          if (data.items && data.items.length > 0) {
            setChannelDetails(data.items[0]);
            setLoadingDetails(false);
          }
        } catch (error) {
          console.error("Error fetching channel details:", error);
          setLoadingDetails(false);
        }
      }
    };

    fetchChannelDetails();
  }, [videoDetails]);

  // Fetch related videos
  useEffect(() => {
    const fetchRelatedVideos = async () => {
      if (videoDetails?.snippet?.title) {
        try {
          const url = nextPageTokenRelated
            ? `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&pageToken=${nextPageTokenRelated}&q=${videoDetails.snippet.title}&type=video&key=${YOUTUBE_API_KEYY}`
            : `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${videoDetails.snippet.title}&type=video&key=${YOUTUBE_API_KEYY}`;
          
          const response = await fetch(url);
          const data = await response.json();
          
          if (data.items) {
            setNextPageTokenRelated(data?.nextPageToken || "");
            setRelatedVideos(prev => {
              const existingIds = new Set(prev.map(v => v.id.videoId));
              const newItems = data.items.filter(item => !existingIds.has(item.id.videoId));
              return [...prev, ...newItems];
            });
          }
        } catch (error) {
          console.error("Error fetching related videos:", error);
        }
      }
    };

    if (relatedVideos.length==0 || (videoId && videoDetails && inView && nextPageTokenRelated !== null)) {
      fetchRelatedVideos();
    }
  }, [inView, videoId, videoDetails]);

  if (loadingDetails) {
    return (
      <div className="w-full px-6 py-4">
        <div className="animate-pulse">
          <div className="w-full aspect-video bg-gray-300 rounded-lg mb-6"></div>
          <div className="space-y-4">
            <div className="h-6 bg-gray-300 rounded w-3/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-6 py-4 overflow-y-auto h-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Video Section */}
        <div className="lg:col-span-2">
          {/* Video Player */}
          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden shadow-lg mb-6">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          {/* Video Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
            {videoDetails?.snippet?.title}
          </h1>

          {/* Video Stats and Actions */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-4 mb-4">
            {/* Left: Channel and Subscribe */}
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              {/* Channel Avatar */}
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src={channelDetails?.snippet?.thumbnails?.default?.url}
                  alt="channel"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Channel Info */}
              <div className="flex-1">
                <h3 className="font-bold text-gray-900">
                  {videoDetails?.snippet?.channelTitle}
                </h3>
                <p className="text-sm text-gray-600">
                  {calculateViewCount(
                    channelDetails?.statistics?.subscriberCount
                  )}{" "}
                  subscribers
                </p>
              </div>

              {/* Subscribe Button */}
              <button className="px-6 py-2 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex gap-3">
              {/* Like Button */}
              <button
                onClick={() => {
                  setLiked(!liked);
                  if (disliked) setDisliked(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  liked
                    ? "bg-gray-200 text-gray-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">👍</span>
                <span className="text-sm font-bold">
                  {liked &&
                    videoDetails?.statistics?.likeCount &&
                    parseInt(videoDetails.statistics.likeCount) + 1}
                </span>
              </button>

              {/* Dislike Button */}
              <button
                onClick={() => {
                  setDisliked(!disliked);
                  if (liked) setLiked(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  disliked
                    ? "bg-gray-200 text-gray-900"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">👎</span>
              </button>

              {/* Share Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                <span className="text-xl">↗️</span>
                <span className="text-sm font-bold hidden sm:inline">Share</span>
              </button>

              {/* More Button */}
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                <span className="text-xl">•••</span>
              </button>
            </div>
          </div>

          {/* Video Description Section */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <div className="flex gap-4 text-sm text-gray-600 mb-3">
              <span className="font-bold">
                {calculateViewCount(videoDetails?.statistics?.viewCount)} views
              </span>
              <span>
                {calculatePublishedDate(videoDetails?.snippet?.publishedAt)}
              </span>
            </div>

            {/* Description */}
            <div
              className={`text-gray-900 text-sm leading-relaxed ${
                !showMoreDesc ? "line-clamp-2" : ""
              }`}
            >
              {videoDetails?.snippet?.description?.replace(/\n/g, " ")}
            </div>

            <button
              onClick={() => setShowMoreDesc(!showMoreDesc)}
              className="text-gray-900 font-bold text-sm mt-2 hover:text-gray-700"
            >
              {showMoreDesc ? "Show less" : "Show more"}
            </button>
          </div>

          {/* Comments Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Comments (
              {videoDetails?.statistics?.commentCount
                ? calculateViewCount(videoDetails.statistics.commentCount)
                : "0"}
              )
            </h2>

            {/* Comment Input */}
            <div className="flex gap-4 mb-6 pb-6 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full border-b-2 border-gray-300 focus:border-blue-600 outline-none py-2 text-sm text-gray-900 placeholder-gray-600"
                />
                <div className="flex gap-2 justify-end mt-3">
                  <button className="px-4 py-1 text-gray-600 font-bold hover:bg-gray-100 rounded transition-colors">
                    Cancel
                  </button>
                  <button className="px-4 py-1 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors">
                    Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Placeholder for Comments */}
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex gap-3 pb-4 border-b border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-gray-900">
                        User {i}
                      </h3>
                      <span className="text-xs text-gray-600">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      This is a sample comment. Great video!
                    </p>
                    <div className="flex gap-4 mt-2">
                      <button className="text-gray-600 hover:text-red-600 text-sm">
                        👍
                      </button>
                      <button className="text-gray-600 hover:text-red-600 text-sm">
                        👎
                      </button>
                      <button className="text-blue-600 text-sm font-bold">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar: Related Videos */}
        <div className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Recommended
          </h2>
          <div className="space-y-3 max-h-[100vh] overflow-y-auto">
            {relatedVideos.length > 0 ? (
              <>
                {relatedVideos.map((video) => (
                  <Link
                    key={video.id.videoId}
                    to={`/watch?v=${video.id.videoId}`}
                    className="flex gap-3 hover:bg-gray-100 rounded-lg p-2 transition-colors cursor-pointer group"
                  >
                    {/* Thumbnail */}
                    <div className="w-32 h-20 rounded-lg bg-gray-200 overflow-hidden shrink-0">
                      <img
                        src={video.snippet.thumbnails.medium.url}
                        alt={video.snippet.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Video Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600">
                        {video.snippet.title}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {video.snippet.channelTitle}
                      </p>
                      <p className="text-xs text-gray-500">
                        {calculatePublishedDate(video.snippet.publishedAt)}
                      </p>
                    </div>
                  </Link>
                ))}
                {nextPageTokenRelated && (
                  <div ref={ref} className="w-full flex flex-col justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-red-600"></div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center text-gray-500 py-8">Loading recommendations...</div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default WatchPage;