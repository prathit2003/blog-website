import Header from "../components/appbar";
import Hero from "../components/hero";
import Footer from "../components/footer";
import About from "../components/about";
import LatestRead from "../components/latestread";
import GetStarted from "../components/getstarted";
import Testimonial from "../components/testimonial";
export default function Example() {
  return (
    <div className="bg-white">
      <Header />
      <div className="relative isolate">
        <Hero />
      </div>
      <LatestRead />
      <About />
      <Testimonial />
      <GetStarted />
      <Footer />
    </div>
  );
}
