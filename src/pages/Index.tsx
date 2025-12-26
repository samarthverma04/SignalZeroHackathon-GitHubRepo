import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/home/HeroSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";
import { Helmet } from "react-helmet-async";


const Index = () => {
  return (
    <Layout>
      <Helmet>
        <title>CampusFind - Lost & Found System for College</title>
        <meta
          name="description"
          content="A secure lost and found platform for campus. Find lost items or report found ones with proof-of-ownership verification."
        />
      </Helmet>
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
    </Layout>
  );
};

export default Index;
