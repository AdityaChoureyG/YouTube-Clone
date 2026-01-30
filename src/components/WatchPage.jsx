import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");

  return (
    <div className="px-5 flex flex-col w-full">
      <div className="flex">
        <div>
          <iframe
            width="1000"
            height="550"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-xl shadow-2xl"
          ></iframe>
        </div>
        
        {/* You can add live chat or related videos here on the right */}
      </div>
    </div>
  );
};

export default WatchPage;