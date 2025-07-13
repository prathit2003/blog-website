const LatestRead = () => {
  const callouts = [
    {
      name: "Science & Curiosities",
      description:
        "Dive into discoveries, space, experiments, and weird facts.",
      imageSrc: "images/science.jpg",
      imageAlt:
        "A telescope under a starry sky with planets and constellations.",
      href: "/category/science",
    },
    {
      name: "History & Culture",
      description:
        "Uncover stories from the past and cultural treasures around the globe.",
      imageSrc: "images/history.jpg",
      imageAlt: "Ancient ruins with carvings and a guidebook on a stone bench.",
      href: "/category/history",
    },
    {
      name: "Travel Stories",
      description: "Explore the world through stories, guides, and tips.",
      imageSrc: "images/travel.jpg",
      imageAlt: "Open road with mountains and a backpack resting on a car.",
      href: "/category/travel",
    },
  ];

  return (
    <>
      <div className="my-12 px-4 sm:px-10 lg:px-16 max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-4xl text-center font-bold text-gray-900 tracking-tight text-balance">
          What’s Hot? Check Out Our Latest Reads
        </h1>
        <p className="mt-4 text-center text-lg text-gray-600 max-w-3xl mx-auto text-balance">
          Stay updated with fresh insights, trending stories, and expert
          opinions across various categories. From tech and lifestyle to health
          and finance, we’ve got something for everyone!
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {callouts.map((callout) => (
            <a
              key={callout.name}
              href={callout.href}
              className="group block rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="overflow-hidden">
                <img
                  src={callout.imageSrc}
                  alt={callout.imageAlt}
                  className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors duration-200">
                  {callout.name}
                </h3>
                <p className="mt-2 text-gray-600">{callout.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="my-8 flex items-center justify-center gap-x-6">
        <a
          href="#"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          browse Blogs
        </a>
        <a href="#" className="text-sm/6 font-semibold text-gray-900">
          see what's trending<span aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
};

export default LatestRead;
