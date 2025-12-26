import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MapPin,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";

// Mock data for dashboard
const myFoundItems = [
  {
    id: "1",
    title: "Black Leather Wallet",
    location: "Library, 2nd Floor",
    date: "Dec 24, 2024",
    status: "active",
    claimsCount: 2,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop",
  },
];

const myClaims = [
  {
    id: "c1",
    itemTitle: "Blue Backpack",
    itemImage: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop",
    status: "pending",
    submittedDate: "Dec 23, 2024",
  },
  {
    id: "c2",
    itemTitle: "Silver Watch",
    itemImage: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&h=100&fit=crop",
    status: "approved",
    submittedDate: "Dec 20, 2024",
  },
];

const pendingReviews = [
  {
    id: "r1",
    claimantName: "Anonymous User",
    itemTitle: "Black Leather Wallet",
    submittedDate: "Dec 25, 2024",
    answers: [
      { question: "What color is the wallet?", answer: "Black with brown interior" },
      { question: "What IDs were inside?", answer: "College ID and library card" },
      { question: "Any stickers on it?", answer: "Yes, a small smiley sticker" },
    ],
    lostLocation: "Library, 2nd floor",
    lostTime: "Around 2 PM",
    confidenceScore: 87,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("found");

  const handleApprove = (id: string) => {
    toast.success("Claim approved! Contact details will be shared.");
  };

  const handleReject = (id: string) => {
    toast.info("Claim rejected. The claimant will be notified.");
  };

  return (
    <Layout>
      <Helmet>
        <title>Dashboard - CampusFind</title>
        <meta name="description" content="Manage your found items and claims." />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            My Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your found items, track claims, and review ownership proofs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myFoundItems.length}</p>
                <p className="text-sm text-muted-foreground">Items Found</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{pendingReviews.length}</p>
                <p className="text-sm text-muted-foreground">Pending Reviews</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Search className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myClaims.length}</p>
                <p className="text-sm text-muted-foreground">My Claims</p>
              </div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Items Returned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="found" className="gap-2">
              <Package className="h-4 w-4" />
              Items I Found
            </TabsTrigger>
            <TabsTrigger value="claims" className="gap-2">
              <Search className="h-4 w-4" />
              My Claims
            </TabsTrigger>
            <TabsTrigger value="reviews" className="gap-2 relative">
              <AlertCircle className="h-4 w-4" />
              Pending Reviews
              {pendingReviews.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                  {pendingReviews.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Items I Found */}
          <TabsContent value="found">
            <div className="space-y-4">
              {myFoundItems.length > 0 ? (
                myFoundItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.location} • {item.date}
                      </p>
                    </div>
                    <Badge variant="secondary">{item.claimsCount} claims</Badge>
                    <Link to={`/item/${item.id}`}>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card border border-border rounded-xl">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">No items reported</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Found something on campus? Report it to help someone.
                  </p>
                  <Link to="/report">
                    <Button variant="hero">Report Found Item</Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>

          {/* My Claims */}
          <TabsContent value="claims">
            <div className="space-y-4">
              {myClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="bg-card border border-border rounded-xl p-4 flex items-center gap-4"
                >
                  <img
                    src={claim.itemImage}
                    alt={claim.itemTitle}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold truncate">{claim.itemTitle}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted: {claim.submittedDate}
                    </p>
                  </div>
                  <Badge
                    variant={claim.status === "approved" ? "default" : "secondary"}
                    className={
                      claim.status === "approved"
                        ? "bg-success text-success-foreground"
                        : claim.status === "pending"
                        ? "bg-warning/10 text-warning border-warning/20"
                        : ""
                    }
                  >
                    {claim.status === "approved" ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approved
                      </>
                    ) : (
                      <>
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </>
                    )}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Pending Reviews */}
          <TabsContent value="reviews">
            <div className="space-y-6">
              {pendingReviews.length > 0 ? (
                pendingReviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-card border border-border rounded-2xl overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">
                          Claim for: {review.itemTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Submitted: {review.submittedDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            review.confidenceScore >= 80
                              ? "bg-success/10 text-success"
                              : review.confidenceScore >= 50
                              ? "bg-warning/10 text-warning"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          {review.confidenceScore}% Confidence
                        </div>
                      </div>
                    </div>

                    {/* Location & Time Match */}
                    <div className="p-4 bg-secondary/30 border-b border-border">
                      <p className="text-sm font-medium mb-2">Location & Time Comparison</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">Lost at:</span>
                            <p className="font-medium">{review.lostLocation}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">Lost around:</span>
                            <p className="font-medium">{review.lostTime}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Answers */}
                    <div className="p-4 space-y-3">
                      <p className="text-sm font-medium">Verification Answers</p>
                      {review.answers.map((qa, index) => (
                        <div
                          key={index}
                          className="bg-secondary/50 rounded-lg p-3"
                        >
                          <p className="text-sm text-muted-foreground mb-1">
                            {qa.question}
                          </p>
                          <p className="font-medium">{qa.answer}</p>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="p-4 border-t border-border flex gap-3">
                      <Button
                        variant="success"
                        className="flex-1"
                        onClick={() => handleApprove(review.id)}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Approve Claim
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleReject(review.id)}
                      >
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-card border border-border rounded-xl">
                  <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">All caught up!</h3>
                  <p className="text-sm text-muted-foreground">
                    No pending claims to review right now.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Dashboard;
