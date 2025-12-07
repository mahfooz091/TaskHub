import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturesGrid from "./FeaturesGrid";
import Workflow from "./Workflow";
import Testimonials from "./Testimonials";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-linear-to-br from-blue-500 to-purple-600">
        <Hero />
        <FeaturesGrid />
        <Workflow />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}