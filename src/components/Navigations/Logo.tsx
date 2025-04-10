import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/">
      <div className="bg-[url(/logo/logoblack.png)] dark:bg-[url(/logo/logowhite.png)] md:bg-[url(/logo/logo_mbl.png)] md:dark:bg-[url(/logo/logoMdDark.png)] w-10 h-8 md:w-46 md:h-10 bg-cover bg-no-repeat bg-center">
        {/* <div className="!hidden dark:!block bg-gray-700/30 backdrop-invert h-full w-full"></div> */}
      </div>
    </Link>
  );
};

export default Logo;
