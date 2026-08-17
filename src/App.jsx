import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import MainSection from "./components/MainSection/MainSection";
import ConversionSection from "./components/ConversionSection/ConversionSection";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <MainSection />
        <ConversionSection />
      </main>
      <Footer />
    </>
  );
}

export default App;
