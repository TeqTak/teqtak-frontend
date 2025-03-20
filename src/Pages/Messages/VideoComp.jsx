import React, { useEffect, useState } from 'react'

const VideoComp = (props) => {
    const [videoUrl, setVideoUrl] = useState('')

    const getVideoUrl = (e) => {
        let data = e.split("=")[1]
        data = JSON.parse(data)
        setVideoUrl(data.fileUrl)

    }
    useEffect(() => { getVideoUrl(props.payload) }, [])

    return (
        <div className='w-[20rem] max-[480px]:w-[13rem] max-[375px]:w-[10rem] rounded-[1rem] z-30   gap-5 flex flex-col  items-center shadow-inner border-solid border-[#a5a5a5] border-[1px] '>
            <video
                alt="Video content"
                controls
                className='w-[19.973rem] h-[15rem] object-cover rounded-lg'
                src={videoUrl} />
        </div>
    )
}

export default VideoComp