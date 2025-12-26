import { Button } from "@/components/ui/button";
import { Search, PlusCircle, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20 lg:py-32 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <Shield className="h-4 w-4" />
            Verified Campus Users Only
          </div>

          {/* Main Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance animate-slide-up">
            Lost Something on Campus?{" "}
            <span className="text-primary">We'll Help You Find It.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up stagger-1">
            A secure lost & found platform with proof-of-ownership verification.
            Only the real owner gets their item back.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up stagger-2">
            <Link to="/browse">
              <Button variant="hero" size="xl" className="group">
                <Search className="h-5 w-5" />
                Find My Item
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/report">
              <Button variant="outline" size="xl">
                <PlusCircle className="h-5 w-5" />
                Report Found Item
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 animate-slide-up stagger-3">
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary">250+</div>
              <div className="text-sm text-muted-foreground mt-1">Items Returned</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground mt-1">Verification Rate</div>
            </div>
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-primary">24hr</div>
              <div className="text-sm text-muted-foreground mt-1">Avg. Return Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
