const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[1px] bg-background/10 z-50">
      <div className="flex space-x-3">
        <span className="w-3 h-3 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full animate-[wave_1.2s_ease-in-out_infinite]"></span>
        <span className="w-3 h-3 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full animate-[wave_1.2s_ease-in-out_infinite_0.2s]"></span>
        <span className="w-3 h-3 bg-gradient-to-r from-amber-500 to-amber-700 rounded-full animate-[wave_1.2s_ease-in-out_infinite_0.4s]"></span>
      </div>
    </div>
  );
};

export default Loader;
