
import { LuDownload, LuPlayCircle } from 'react-icons/lu';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <div className="bg-[#e4efff] max-md:pb-20 flex w-[100vw] justify-between flex-row ">
      {/* Content Section */}
      <div className="mx-4  md:pt-16 w-1/2 ">
        <p className="text-[#1a3766]">
          <span className="lg:text-[40px] md:text-[30px] sm:text-[20px] text-[15px]  leading-tight">
            Revolutionizing social <br /> media for
          </span>{" "}
          <br />{" "}
          <span className="font-bold leading-tight lg:text-[45px] md:text-[35px] sm:text-[25px] text-[20px] underline">
            Entrepreneurs and <br /> Investors
          </span>
        </p>
        <p className="text-[#697B98] lg:text-[20px] md:text-[16px] sm:text-[14px] text-[10px] lg:w-1/2 md:w-3/4 w-full" >
          Turn your vision into reality. Join the exclusive network connecting
          ambitious entrepreneurs with investors.
        </p>
        <div className="flex mt-8 flex-row gap-4 w-[70%]">
          <button className="lg:text-[20px] md:text-[16px] sm:text-[14px] text-[10px] p-2 rounded flex items-center gap-2 text-white bg-[#6165F3] shadow-lg"
            style={{ boxShadow: "0px 15px 15px #6166f350" }}
          >
            <LuDownload className='lg:text-[20px] md:text-[16px] sm:text-[14px] text-[10px]' />Download&nbsp;Now
          </button>
          <Link to={'/signup'}
            className="lg:text-[20px] md:text-[16px] sm:text-[14px] text-[10px] p-2 flex items-center gap-2 rounded bg-[#C6DBFF] text-[#6165F3]">
            <LuPlayCircle className='lg:text-[20px] md:text-[16px] sm:text-[14px] text-[10px]' />Signup&nbsp;now
            {/* </button> */}
          </Link>
        </div>
      </div>

      <div className='relative -z-0'>
        <img src="Images/HeroFigma.png" className='
                  lg:h-[50rem]
                  md:h-[35rem]
                  sm:h-[25rem]
                  h-[20rem]
                  lg:-z-20
                  lg:relative
                  lg:top-[-10rem]
                  md:top-[-7rem]
                  sm:top-[-5rem]
                  top-[-3rem]
                  lg:right-[-1.5rem]
                  --h-auto 
                  relative
                  left-3 ' alt="" />
      </div>
    </div>
  );
};

export default HeaderComponent;
