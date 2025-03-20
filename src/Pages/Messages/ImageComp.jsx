import React, { useEffect, useState } from 'react'

const ImageComp = (props) => {
    const [imgUrl, setImgUrl] = useState('')

    const getImageUrl = (e) => {
        let data = e.split("=")[1]
        console.log("get image url verbose")
        console.log("props ",props)
        console.log("data",data)
        data = JSON.parse(data)
        setImgUrl(data.fileUrl)
        return data.fileUrl

    }
    useEffect(() => { getImageUrl(props.payload) }, [])

    return (
        <div className='w-[20rem] max-[480px]:w-[13rem] max-[375px]:w-[10rem] rounded-[1rem] z-30   gap-5 flex flex-col  items-center shadow-inner border-solid border-[#a5a5a5] border-[1px] '>
            <img
                className='w-[19.973rem] h-[15rem] object-cover rounded-lg'
                src={imgUrl} alt="" />
        </div>
    )
}

export default ImageComp