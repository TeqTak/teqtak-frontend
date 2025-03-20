import React, { Fragment, useState } from "react";
import PodcastFilters from "./PodcastFilters";
import PodcastTopVideos from "./PodcastTopVideos";

function Podcast() {
  const [recentdata,setRecentData] = useState([]);
  const [filterLoopData, setFilterLoopData] = useState([]);

  return (
    <Fragment>
      <div className="w-full h-full">
        <PodcastFilters data={{recentdata,setFilterLoopData}}/>
        <PodcastTopVideos data={{recentdata,setRecentData,filterLoopData,setFilterLoopData}}/>
      </div>
    </Fragment>
  );
}

export default Podcast;
