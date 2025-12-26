import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Plus, Trash2, HelpCircle, CheckCircle } from "lucide-react";
import { categories } from "@/data/mockItems";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

interface VerificationQuestion {
  id: string;
  question: string;
  answer: string;
}

const ReportItem = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    date: "",
    time: "",
    description: "",
  });

  const [questions, setQuestions] = useState<VerificationQuestion[]>([
    { id: "1", question: "", answer: "" },
  ]);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addQuestion = () => {
    if (questions.length >= 5) {
      toast.error("Maximum 5 verification questions allowed");
      return;
    }
    setQuestions((prev) => [
      ...prev,
      { id: Date.now().toString(), question: "", answer: "" },
    ]);
  };

  const removeQuestion = (id: string) => {
    if (questions.length <= 1) {
      toast.error("At least one verification question is required");
      return;
    }
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, field: "question" | "answer", value: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.title || !formData.category || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    const validQuestions = questions.filter((q) => q.question && q.answer);
    if (validQuestions.length === 0) {
      toast.error("Please add at least one verification question with an answer");
      return;
    }

    toast.success("Item reported successfully! It will be visible once approved.");
    // Reset form
    setFormData({
      title: "",
      category: "",
      location: "",
      date: "",
      time: "",
      description: "",
    });
    setQuestions([{ id: "1", question: "", answer: "" }]);
    setImagePreview(null);
  };

  return (
    <Layout>
      <Helmet>
        <title>Report Found Item - CampusFind</title>
        <meta
          name="description"
          content="Report a found item on campus. Add photos and set up verification questions to ensure it goes back to the right owner."
        />
      </Helmet>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-2">
            Report Found Item
          </h1>
          <p className="text-muted-foreground">
            Help reunite lost items with their owners. Add verification questions
            that only the real owner would know.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Image Upload */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <Label className="text-base font-display font-semibold mb-4 block">
              Item Photo
            </Label>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                imagePreview
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {imagePreview ? (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-48 rounded-lg mx-auto"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2"
                    onClick={() => setImagePreview(null)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <label className="cursor-pointer block">
                  <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium mb-1">Click to upload photo</p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-display font-semibold text-lg mb-4">Item Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Item Name *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Black Leather Wallet"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleInputChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c !== "All").map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="location">Where did you find it? *</Label>
              <Input
                id="location"
                placeholder="e.g., Library, 2nd Floor near study desks"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date Found</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="time">Approximate Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Add any additional details about the item..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>
          </div>

          {/* Verification Questions */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-display font-semibold text-lg flex items-center gap-2">
                  <HelpCircle className="h-5 w-5 text-primary" />
                  Verification Questions
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Add questions only the real owner would know the answer to.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {questions.map((q, index) => (
                <div
                  key={q.id}
                  className="bg-secondary/50 rounded-xl p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Question {index + 1}
                    </span>
                    {questions.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeQuestion(q.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Input
                    placeholder="e.g., What color is the wallet?"
                    value={q.question}
                    onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                  />
                  <Input
                    placeholder="Expected answer (e.g., Black with brown trim)"
                    value={q.answer}
                    onChange={(e) => updateQuestion(q.id, "answer", e.target.value)}
                  />
                </div>
              ))}

              {questions.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={addQuestion}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Question
                </Button>
              )}
            </div>

            <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                Good Question Examples
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• What ID was inside the wallet?</li>
                <li>• Any stickers or scratches on the item?</li>
                <li>• What was the approximate cash amount?</li>
                <li>• Is one earbud side missing?</li>
              </ul>
            </div>
          </div>

          {/* Submit */}
          <Button type="submit" variant="hero" size="xl" className="w-full">
            Submit Found Item
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default ReportItem;
