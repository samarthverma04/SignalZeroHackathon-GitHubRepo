import { Package, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-xl gradient-hero flex items-center justify-center">
                <Package className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">CampusFind</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              A secure and trusted platform to help reunite lost items with their rightful owners
              on campus. Powered by proof-of-ownership verification.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/browse" className="hover:text-primary transition-colors">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/report" className="hover:text-primary transition-colors">
                  Report Found Item
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-primary transition-colors">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link to="/how-it-works" className="hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CampusFind. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for our campus community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
