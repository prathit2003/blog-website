import { PencilIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { ServerIcon } from "@heroicons/react/20/solid";

const About = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
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

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold text-indigo-600">
                About Blogverse
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                Empowering Every Voice. Shaping the Future of Blogging.
              </h1>
              <p className="mt-6 text-xl text-gray-700">
                Blogverse is more than a platform—it's a movement. We’re on a
                mission to amplify stories, share authentic perspectives, and
                foster a thriving community of creators and readers around the
                globe. Whether you're a beginner blogger or a seasoned
                storyteller, Blogverse gives you the tools to make your voice
                heard.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <img
            alt="Blogverse platform screenshot"
            src="https://tailwindui.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 ring-1 shadow-xl ring-gray-400/10 sm:w-[57rem]"
          />
        </div>

        {/* Features and Details */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base text-gray-700 lg:max-w-lg">
              <p>
                At Blogverse, we champion freedom of expression, innovation, and
                community. We understand the power of words, and we provide a
                platform where your thoughts can take flight— from personal
                journals to professional insights.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <PencilIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Built for Writers.
                    </strong>{" "}
                    Create, edit, and publish beautiful content effortlessly
                    with our distraction-free editor.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <GlobeAltIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Global Reach.
                    </strong>{" "}
                    Share your stories with a global audience and build a loyal
                    readership around your niche.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <ServerIcon
                    className="mt-1 h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Reliable & Secure.
                    </strong>{" "}
                    With daily backups and modern infrastructure, your content
                    is safe and always accessible.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                From personal blogs to professional portfolios, Blogverse adapts
                to your needs and grows with your journey. Join a vibrant
                ecosystem of creators and take your blog to the next level.
              </p>

              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                Ready to write your story?
              </h2>
              <p className="mt-6">
                Start blogging today with Blogverse and make your mark on the
                world—one post at a time. Whether it’s lifestyle, tech, travel,
                or philosophy, your audience is waiting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
