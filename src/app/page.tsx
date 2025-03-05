import Faq from "./pages/common/Faq";
import Footer from "./pages/common/Footer";
import Header from "./pages/common/Header";
import About from "./pages/home/About";
import BlogSection from "./pages/home/BlogSection";
import Contact from "./pages/home/Contact";
import Hero from "./pages/home/Hero";
import Projects from "./pages/home/Projects";
import Skills from "./pages/home/Skills";

export default function Home() {
  return (
    <main>
      <Header/>
      <Hero/>
      <Skills/>
      <About/>
      <Projects/>
      <BlogSection/>
      <Faq/>
      <Contact/>
      <Footer/>
    </main>
  );
}
