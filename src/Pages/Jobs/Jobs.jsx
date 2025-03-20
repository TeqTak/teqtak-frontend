import React, { Fragment, useEffect, useState } from "react";
import JobFilters from "./JobFilters";
import AllJobsCategories from "./AllJobsCategories";

function Jobs() {
  const [data, setData] = useState([]);
  const [filterLoopData, setFilterLoopData] = useState([]);

  return (
    <Fragment>
      <section className="h-full w-full">
        <JobFilters jobFilter={{data,setFilterLoopData,filterLoopData}}/>
        <AllJobsCategories job={{data,setData,filterLoopData,setFilterLoopData}}/>
      </section>
    </Fragment>
  );
}

export default Jobs;
