import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <Video className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl">Clueso</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Product
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Resources
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Careers
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isLanding ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="hero" size="sm">Start Free Trial</Button>
              </Link>
            </>
          ) : (
            <Link to="/">
              <Button variant="ghost" size="sm">Back to Home</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
