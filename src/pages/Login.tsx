import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Mail, Lock, ArrowRight, Shield } from "lucide-react";
import { toast } from "sonner";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email domain
    if (!email.endsWith(".edu")) {
      toast.error("Please use your college email (@college.edu)");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (isLogin) {
      toast.success("Welcome back! Redirecting...");
    } else {
      toast.success("Account created! Please check your email to verify.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <Helmet>
        <title>{isLogin ? "Sign In" : "Sign Up"} - CampusFind</title>
        <meta
          name="description"
          content="Sign in or create an account to use CampusFind lost and found system."
        />
      </Helmet>

      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center">
              <Package className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">CampusFind</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold mb-2">
              {isLogin ? "Welcome back" : "Create account"}
            </h1>
            <p className="text-muted-foreground">
              {isLogin
                ? "Sign in to access your dashboard"
                : "Join your campus community"}
            </p>
          </div>

          {/* Campus Email Notice */}
          <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-6 flex items-start gap-3">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Campus Email Required</p>
              <p className="text-muted-foreground">
                Only @college.edu emails can access this platform.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">College Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@college.edu"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" variant="hero" size="lg" className="w-full group">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          {/* Toggle */}
          <p className="text-center mt-6 text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-primary font-medium hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-1 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center text-white">
          <div className="h-20 w-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-8">
            <Package className="h-10 w-10" />
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">
            Reunite with your belongings
          </h2>
          <p className="text-white/80 text-lg">
            Our secure verification system ensures your lost items find their way
            back to you safely.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold">250+</div>
              <div className="text-sm text-white/70">Items Returned</div>
            </div>
            <div>
              <div className="text-3xl font-bold">98%</div>
              <div className="text-sm text-white/70">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold">24hr</div>
              <div className="text-sm text-white/70">Avg. Time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
