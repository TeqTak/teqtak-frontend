import { useEffect, useState } from 'react'
import { REACT_APP_API_BASE_URL } from '../../ENV'
import Experimental_Video from './EXPERIMENTAL_SingleVideo'




const EXPERIMENTAL_All_Vidoes = () => {
    // const video_ = {
    //     "data": {
    //         "videoUrl": "https://ct-aws.s3.us-east-1.amazonaws.com/1733928715396-Video%201067477734898676.mp4",
    //         "userId": "a576317e-2c0c-44cd-8a1d-f25ac361261f",
    //         "updatedAt": "2024-12-11T14:51:56.699Z",
    //         "_id": "d8d34390-7a0e-4a4e-bac3-ae9abad8b56a",
    //         "createdAt": "2024-12-11T14:51:56.699Z",
    //         "videoName": "1733928715396-Video 1067477734898676.mp4",
    //         "videoDesc": "Hello ",
    //         "videoTags": [
    //             "user"
    //         ],
    //         "videoVisibility": "Anyone"
    //     },
    //     "user": {
    //         "signedInBy": "google",
    //         "isBlocked": "false",
    //         "role": "entrepreneur",
    //         "updatedAt": "2024-12-11T14:40:17.416Z",
    //         "Users_PK": "a576317e-2c0c-44cd-8a1d-f25ac361261f",
    //         "createdAt": "2024-12-03T08:42:08.692Z",
    //         "email": "codingsfirst@gmail.com",
    //         "name": "codings"
    //     }
    // }


const [vidoes, setVidoes] = useState([])
const fetchVidoesData = async () => {
    const res = await fetch(`${REACT_APP_API_BASE_URL}/upload`)
    const data = await res.json()
    console.log({ videos: data.data })
    setVidoes(data.data)
}

useEffect(() => {
    fetchVidoesData()
}, [])

// const logger = () => {
//     console.log({
//         vidoes

//     })
// }
return (
    <>
        <div className="overflow-auto h-[95vh] ">
        {/* <button onClick={logger}>logger</button> */}
        {/* <div>EXPERIMENTAL_All_Vidoes</div> */}
        {vidoes && vidoes.map((video, i) => (
            <Experimental_Video
                key={i}
                userId={video.user.Users_PK || "nothinng"}
                videoId={video.data._id || "nothinng"}
                videoDesc={video.data.videoDesc  || "nothinng"}
                videoUrl={video.data.videoUrl || "nothinng"}
                videoTags={video.data.videoTags || "nothinng"}
                userPic={video.user.picUrl || "loading.jpg"}
                userName={video.user.name || "nothinng"}
                userRole={video.user.role || "nothinng"}
                isSub={false }
            />
        ))
        }
        </div>
    </>
)
}

export default EXPERIMENTAL_All_Vidoes