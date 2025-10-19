import HeroSection from "../../components/HeroSection";
import CardFeature1 from "../../components/CardFeatures/CardFeature1";
import CardFeature2 from "../../components/CardFeatures/CardFeature2";
import CardFeature3 from "../../components/CardFeatures/CardFeature3";
import WorldSection from "../../components/WorldSection.jsx";
import PricingSection from "../../components/PricingSection/index.jsx";
import CardShowcase from "../../components/CardShowcase/index.jsx";

const Home = () => {
  
  return(
    <div>
      <HeroSection />
      <WorldSection />
      <CardFeature1 />
      <CardFeature2 />
      <CardFeature3 />
      <CardShowcase />
      <PricingSection />
    </div>
  );
};

export default Home;