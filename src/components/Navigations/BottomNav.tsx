const BottomNav = () => {
  return (
    <footer className="p-1 text-center text-sm text-gray-600 flex justify-between items-center">
      <div className="w-[300px] h-2  hidden md:block" />
      <p className="flex-1 text-left md:text-left text-xs md:text-sm text-wrap">
        © {new Date().getFullYear()} TradeGamerz.{' '}
        <br className="block md:hidden" /> All rights reserved.
      </p>
      <div className="text-right text-[8px] md:text-sm ">
        Developed by <br className="block md:hidden" />
        <a
          href="https://devsonsteroids.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          Devs On Steroids
        </a>
      </div>
    </footer>
  );
};

export default BottomNav;
