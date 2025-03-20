import Heros from './Components/Heros'
import PowerFull from './Components/PowerFull'
import PostVideo from './Components/PostVideo'
import World from './Components/World'
import MoreThan from './Components/MoreThan'
import Footer from './Components/Footer'
import SliderComp from './Components/SliderComp'

const LandingPage = () => {
  return (
    <div> 
      <Heros />
      <PowerFull/>
      <PostVideo/>
      <World/>
      <SliderComp/>
      <MoreThan/>
      <Footer/>
    </div>
  )
}

export default LandingPage