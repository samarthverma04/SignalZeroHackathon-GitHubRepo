import { Shield, Brain, MapPin, Clock, Mail, Users } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Proof-of-Ownership Questions",
    description: "Custom questions only the real owner can answer. Color, contents, distinguishing marks — you set the verification criteria.",
  },
  {
    icon: Mail,
    title: "Campus Email Verification",
    description: "Only verified @college.edu users can access the platform. No outsiders, no fake accounts.",
  },
  {
    icon: Users,
    title: "Human-in-the-Loop",
    description: "Finders review and approve claims manually. No automated handoffs to wrong people.",
  },
  {
    icon: MapPin,
    title: "Location Cross-Check",
    description: "Match where the item was lost vs. found. Higher confidence = faster approval.",
  },
  {
    icon: Clock,
    title: "Time Matching",
    description: "Verify approximate time of loss against when the item was found for added security.",
  },
  {
    icon: Brain,
    title: "AI Claim Scoring",
    description: "Smart confidence scoring analyzes claim descriptions to help finders make decisions.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Multi-Level Security
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our system uses layered authentication to prevent misuse and ensure
            secure, fair item recovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
