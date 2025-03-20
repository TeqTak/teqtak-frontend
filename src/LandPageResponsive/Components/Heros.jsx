const Heros = () => {
  return (
    <div style={{ perspective: '1000px' }} className=''>
      <img className='w-[100vw] object-contain' src='Hero_2.png' alt='' />
      <div className='h-[7%] -bg-[#00000085] absolute top-[5%] w-[82%] left-1/2 -translate-x-1/2 flex justify-between items-center'>
        <div className='w-[100%] h-[100%] flex items-center'>
          <a
            href='#'
            className='h-[80%] w-[13%] cursor-pointer -backdrop-blur-lg bg-opacity-35 -bg-red-600'
          ></a>
          <div className='flex w-[38%] justify-between h-full items-center ml-[16%]'>
            <a
              href='/home'
              className='h-[50%] w-[16%] cursor-pointer -backdrop-blur-lg bg-opacity-35 -bg-red-600'
            ></a>
            <a
              href='/about'
              className='h-[50%] w-[23%] cursor-pointer -backdrop-blur-lg bg-opacity-35 -bg-red-600'
            ></a>
            <a
              href='/faqs'
              className='h-[50%] w-[13%] cursor-pointer -backdrop-blur-lg bg-opacity-35 -bg-red-600'
            ></a>
            <a
              href='/preview'
              className='h-[50%] w-[18%] cursor-pointer -backdrop-blur-lg bg-opacity-35 -bg-red-600'
            ></a>
          </div>
        </div>
        <a
          href='#'
          className='h-[80%] w-[14%] cursor-pointer -backdrop-blur-lg bg-opacity-35 -bg-red-600'
        ></a>
      </div>
      {/* <div className="
            buttons 
            pl-5
            flex
            left-[4.75rem]
            absolute
            bottom-[0px]

            ">
                <a href="https://teqtak.com/signup" className="w-[10rem] h-[17rem] bg-black"></a>
                <a href="https://teqtak.com/signup" className="w-[10rem] h-[17rem] bg-black"></a>
            </div> */}
      <div className='h-[7%] -bg-[#00000085] absolute bottom-[17%] w-[14%] flex ml-[25%]'>
        <div className='h-full'></div>
        <a
          href='https://teqtak.com/signup'
          className='h-full w-[100%] cursor-pointer -backdrop-blur-lg -bg-red-600'
        ></a>
      </div>
      <div className='h-[7%] -bg-[#00000085] absolute bottom-[17%] w-[15%] ml-[9%] flex justify-center'>
        <div className='h-full'></div>
        <a
          href='https://www.syngenta.com.pk'
          className='h-full w-[100%] cursor-pointer -backdrop-blur-lg -bg-slate-400'
        ></a>
      </div>
    </div>
  );
};

export default Heros;
