const Footer = () => {
  return (
    <div>
      {/* Download */}
      <div className='' style={{ perspective: '1000px' }}>
        <img className='w-[100vw] object-contain' src='Download.png' alt='' />
        <div className='h-[12%] -bg-[#06020285] absolute bottom-[19%] w-full flex justify-center'>
          <a href='#' className='w-[15%] h-full ml-[2%] -bg-[green]'></a>
        </div>
      </div>
      {/* more than */}
      <div className='' style={{ perspective: '1000px' }}>
        <img className='w-[100vw] object-contain' src='Footer.png' alt='' />
        <div className='flex justify-between'>
          <div className='h-[8%] -bg-[#06020285] absolute bottom-[41%] w-[21%] flex justify-end'>
            <a href='#' className='w-[60%] h-full -bg-[green]'></a>
          </div>
          <div className='h-[46%] -bg-[#06020285] absolute bottom-[29%] left-[30.5%] w-[8%] flex flex-col justify-between pt-[5.2%] pb-[.5%]'>
            <a
              href='/about'
              className='w-[80%] h-[10%] bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='/home'
              className='w-[80%] h-[10%] bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='/faqs'
              className='w-[80%] h-[10%] bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='/contact'
              className='w-[80%] h-[10%] bg-opacity-35 -bg-[green]'
            ></a>
          </div>
          <div className='h-[27%] -bg-[#06020285] absolute bottom-[48%] left-[44.5%] w-[8%] flex flex-col justify-between pt-[5.2%] pb-[.5%]'>
            <a
              href='/help'
              className='w-[80%] h-[22%] bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='/faqs'
              className='w-[80%] h-[22%] bg-opacity-35 -bg-[green]'
            ></a>
          </div>
          <div className='h-[46%] -bg-[#06020285] absolute bottom-[29%] left-[60.5%] w-[8%] flex flex-col justify-between pt-[5.2%] pb-[.5%]'>
            <a
              href='/PrivacyPolicy'
              className='w-[81%] h-[10%] bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='/Contact'
              className='w-[80%] h-[10%] bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='/Terms'
              className='w-[100%] h-[10%] bg-opacity-35 -bg-[green]'
            ></a>
            <div className='w-[80%] h-[10%] bg-opacity-35 -bg-[green]'></div>
          </div>
          <div className='h-[5%] -bg-[#06020285] absolute bottom-[29%] left-[76.5%] w-[17%] flex justify-between ps-[.5%] pe-[.5%]'>
            <a
              href='#'
              className='w-[11%] h-full bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='#'
              className='w-[12%] h-full bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='#'
              className='w-[10%] h-full bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='#'
              className='w-[13%] h-full bg-opacity-35 -bg-[green]'
            ></a>
            <a
              href='#'
              className='w-[11%] h-full bg-opacity-35 -bg-[green]'
            ></a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
