

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col h-screen bg-black text-white animate-pulse">

      <header className="bg-black flex items-center justify-between px-4 py-3 shadow-md border-b border-white">
        <div className="w-24 h-8 bg-gray-800 rounded"></div>
        <div className="w-64 h-8 bg-gray-800 rounded"></div>
        <div className="w-8 h-8 bg-gray-800 rounded"></div>
      </header>


      <div className="bg-gray-800 text-center py-2"></div>

      <div className="flex flex-1 overflow-hidden">

        <aside className="w-1/4 bg-black p-6 overflow-y-auto border-r border-white">
          <div className="h-6 w-32 bg-gray-800 rounded mb-4"></div>
          <ul>
            {Array.from({ length: 5 }).map((_, idx) => (
              <li className="mb-3 flex items-center gap-3" key={idx}>
                <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                <div className="w-3/4 h-4 bg-gray-800 rounded"></div>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 bg-black p-6 overflow-y-auto">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="border border-gray-700 p-6 rounded-md mb-6 bg-gray-900"
            >
              <div className="w-1/2 h-6 bg-gray-800 rounded mb-2"></div>
              <div className="w-1/3 h-4 bg-gray-800 rounded mb-4"></div>
              <div className="w-full h-4 bg-gray-800 rounded mb-2"></div>
              <div className="w-5/6 h-4 bg-gray-800 rounded"></div>
              <div className="flex justify-between items-center mt-4">
                <div className="w-20 h-4 bg-gray-800 rounded"></div>
                <div className="flex gap-4">
                  <div className="w-6 h-4 bg-gray-800 rounded"></div>
                  <div className="w-6 h-4 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </main>
      </div>


      <div className="fixed top-0 right-0 w-64 h-full bg-black p-4 z-50 shadow-lg">
        <div className="w-8 h-8 bg-gray-800 rounded-full mb-6"></div>
        <ul className="space-y-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="w-3/4 h-6 bg-gray-800 rounded mb-4"
            ></div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default LoadingSkeleton;