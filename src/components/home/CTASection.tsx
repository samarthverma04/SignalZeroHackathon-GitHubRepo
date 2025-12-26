import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 sm:p-12 lg:p-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Join Your Campus Community
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
              Help Build a Trusted Campus Network
            </h2>

            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Whether you've lost something or found an item, you're helping create
              a more connected, caring campus community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button
                  variant="secondary"
                  size="xl"
                  className="group bg-white text-primary hover:bg-white/90"
                >
                  Get Started Free
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/browse">
                <Button
                  variant="ghost"
                  size="xl"
                  className="text-white border-2 border-white/30 hover:bg-white/10 hover:text-white"
                >
                  Browse Items
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
