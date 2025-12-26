import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { mockItems } from "@/data/mockItems";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  MapPin,
  Calendar,
  Tag,
  ArrowLeft,
  MessageCircle,
  Shield,
  Clock,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const statusColors = {
  available: "bg-success/10 text-success border-success/20",
  claimed: "bg-warning/10 text-warning border-warning/20",
  returned: "bg-muted text-muted-foreground border-muted",
};

const statusLabels = {
  available: "Available for Claim",
  claimed: "Claim in Progress",
  returned: "Returned to Owner",
};

// Mock verification questions for demo
const mockQuestions = [
  "What color is the item?",
  "Any distinguishing marks or stickers?",
  "What was inside (if applicable)?",
];

const ItemDetail = () => {
  const { id } = useParams();
  const item = mockItems.find((i) => i.id === id);

  const [showClaimForm, setShowClaimForm] = useState(false);
  const [claimData, setClaimData] = useState({
    lostLocation: "",
    lostTime: "",
    answers: ["", "", ""],
    additionalInfo: "",
  });

  if (!item) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Item Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The item you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/browse">
            <Button variant="hero">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Browse
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAnswerChange = (index: number, value: string) => {
    setClaimData((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[index] = value;
      return { ...prev, answers: newAnswers };
    });
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate
    if (!claimData.lostLocation) {
      toast.error("Please enter where you lost the item");
      return;
    }

    const hasAnswers = claimData.answers.some((a) => a.trim());
    if (!hasAnswers) {
      toast.error("Please answer at least one verification question");
      return;
    }

    toast.success("Claim submitted! The finder will review your answers.");
    setShowClaimForm(false);
  };

  return (
    <Layout>
      <Helmet>
        <title>{item.title} - CampusFind</title>
        <meta
          name="description"
          content={`Found: ${item.title} at ${item.location}. ${item.description}`}
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/browse" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to all items
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="w-full aspect-square object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <Badge
                variant="outline"
                className={`${statusColors[item.status]} mb-4`}
              >
                {statusLabels[item.status]}
              </Badge>
              <h1 className="font-display text-3xl font-bold mb-2">{item.title}</h1>
              <p className="text-muted-foreground">{item.description}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Tag className="h-4 w-4" />
                  <span className="text-sm">Category</span>
                </div>
                <p className="font-medium">{item.category}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Found at</span>
                </div>
                <p className="font-medium">{item.location}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">Date</span>
                </div>
                <p className="font-medium">{item.date}</p>
              </div>
            </div>

            {/* Verification Info */}
            <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-display font-semibold mb-1">
                    Proof of Ownership Required
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    To claim this item, you'll need to answer verification questions
                    that only the real owner would know.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {item.status === "available" && !showClaimForm && (
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="hero"
                  size="lg"
                  className="flex-1"
                  onClick={() => setShowClaimForm(true)}
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Claim This Item
                </Button>
              </div>
            )}

            {/* Claim Form */}
            {showClaimForm && (
              <form
                onSubmit={handleSubmitClaim}
                className="bg-card border border-border rounded-2xl p-6 space-y-6 animate-slide-up"
              >
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1">
                    Submit Your Claim
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Answer the questions below. The finder will review your responses.
                  </p>
                </div>

                {/* Location & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="lostLocation" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      Where did you lose it? *
                    </Label>
                    <Input
                      id="lostLocation"
                      placeholder="e.g., Library 2nd floor"
                      value={claimData.lostLocation}
                      onChange={(e) =>
                        setClaimData((prev) => ({
                          ...prev,
                          lostLocation: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="lostTime" className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Approximate time lost
                    </Label>
                    <Input
                      id="lostTime"
                      placeholder="e.g., Around 2 PM"
                      value={claimData.lostTime}
                      onChange={(e) =>
                        setClaimData((prev) => ({
                          ...prev,
                          lostTime: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                {/* Verification Questions */}
                <div className="space-y-4">
                  <Label className="text-base">Verification Questions</Label>
                  {mockQuestions.map((question, index) => (
                    <div key={index} className="bg-secondary/50 rounded-xl p-4">
                      <p className="text-sm font-medium mb-2">{question}</p>
                      <Input
                        placeholder="Your answer..."
                        value={claimData.answers[index]}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                {/* Additional Info */}
                <div>
                  <Label htmlFor="additionalInfo">
                    Additional information (optional)
                  </Label>
                  <Textarea
                    id="additionalInfo"
                    placeholder="Any other details that prove ownership..."
                    value={claimData.additionalInfo}
                    onChange={(e) =>
                      setClaimData((prev) => ({
                        ...prev,
                        additionalInfo: e.target.value,
                      }))
                    }
                    rows={3}
                  />
                </div>

                <div className="flex gap-3">
                  <Button type="submit" variant="hero" className="flex-1">
                    Submit Claim
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowClaimForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}

            {item.status === "claimed" && (
              <div className="bg-warning/10 border border-warning/20 rounded-xl p-5">
                <p className="text-warning font-medium">
                  This item has a pending claim and is being verified.
                </p>
              </div>
            )}

            {item.status === "returned" && (
              <div className="bg-muted rounded-xl p-5">
                <p className="text-muted-foreground">
                  This item has been returned to its owner.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
