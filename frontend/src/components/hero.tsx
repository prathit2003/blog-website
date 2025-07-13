const Hero = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white h-screen py-8 lg:pb-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-400 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              id="blogverse-pattern"
              x="50%"
              y={-1}
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            fill="url(#blogverse-pattern)"
            width="100%"
            height="100%"
            strokeWidth={0}
          />
        </svg>
      </div>
      <div className="flex justify-between items-center w-full h-full py-6">
        <div className="max-w-2xl mx-10 sm:mx-12 lg:mx-16">
          <div className="text-left">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Discover, Learn, and Get Inspired with the Best Blogs
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Explore expert insights, trending stories, and thought-provoking
              articles – all in one place
            </p>
            <div className="mt-10 flex items-center justify-start gap-x-6">
              <a
                href="#"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-lg hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Start Blogging
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Learn more <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        <img
          src="/images/hero.jpg"
          alt="image depicting traveling, food, and history"
          className="h-full w-[600px] mr-20 object-cover rounded-3xl  shadow-2xl shadow-gray-500 transform hover:scale-105 hover:-rotate-1 transition duration-500"
        />
      </div>
    </div>
  );
};

export default Hero;
