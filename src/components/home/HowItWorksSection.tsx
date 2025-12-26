import { Upload, HelpCircle, CheckCircle, UserCheck } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Item Reported",
    description: "Finder uploads found item with photos and sets up proof-of-ownership questions.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HelpCircle,
    title: "Claim Submitted",
    description: "Owner submits a claim answering questions only the real owner would know.",
    color: "bg-accent/10 text-accent-foreground",
  },
  {
    icon: UserCheck,
    title: "Finder Reviews",
    description: "Human-in-the-loop: Finder reviews answers and approves or rejects the claim.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: CheckCircle,
    title: "Item Returned",
    description: "Once verified, coordinate a safe campus location for item handoff.",
    color: "bg-success/10 text-success",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our multi-level verification system ensures items go back to their rightful owners.
            No fake claims, no hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
              )}

              <div className="bg-card rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative z-10">
                {/* Step number */}
                <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shadow-md">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`h-14 w-14 rounded-xl ${step.color} flex items-center justify-center mb-4`}>
                  <step.icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
