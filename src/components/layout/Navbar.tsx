import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Video, 
  ChevronDown, 
  Play, 
  FileText, 
  Languages, 
  Mic, 
  Presentation,
  PenLine,
  HelpCircle,
  Users,
  BookOpen,
  MessageCircleQuestion,
  Megaphone
} from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [productOpen, setProductOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform">
            <Video className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl">Clueso</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {/* Product Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setProductOpen(true)}
            onMouseLeave={() => setProductOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Product
              <ChevronDown className={`w-4 h-4 transition-transform ${productOpen ? "rotate-180" : ""}`} />
            </button>
            
            {productOpen && (
              <div className="absolute top-full left-0 pt-2 animate-fade-in">
                <div className="bg-background rounded-2xl shadow-elevated border border-border p-6 w-[580px]">
                  <div className="grid grid-cols-2 gap-8">
                    {/* Capabilities */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Capabilities</p>
                      <div className="space-y-4">
                        <a href="#" className="flex items-start gap-3 group/item">
                          <div className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center shrink-0">
                            <Play className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium group-hover/item:text-primary transition-colors">Videos</p>
                            <p className="text-sm text-muted-foreground">Studio style videos for any product</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 group/item">
                          <div className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium group-hover/item:text-primary transition-colors">Documentation</p>
                            <p className="text-sm text-muted-foreground">Step by step articles with screenshots</p>
                          </div>
                        </a>
                      </div>
                    </div>
                    
                    {/* Features */}
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Features</p>
                      <div className="space-y-4">
                        <a href="#" className="flex items-start gap-3 group/item">
                          <div className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center shrink-0">
                            <Languages className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium group-hover/item:text-primary transition-colors">Translate</p>
                            <p className="text-sm text-muted-foreground">Translate your videos and docs</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 group/item">
                          <div className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center shrink-0">
                            <Mic className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium group-hover/item:text-primary transition-colors">AI Voiceovers</p>
                            <p className="text-sm text-muted-foreground">Professional AI-generated voices</p>
                          </div>
                        </a>
                        <a href="#" className="flex items-start gap-3 group/item">
                          <div className="w-10 h-10 rounded-lg border border-primary/20 flex items-center justify-center shrink-0">
                            <Presentation className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium group-hover/item:text-primary transition-colors">Slides to video</p>
                            <p className="text-sm text-muted-foreground">Convert static slides into videos</p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  {/* Changelog */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <a href="#" className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors group/changelog">
                      <div className="flex-1">
                        <p className="font-semibold group-hover/changelog:text-primary transition-colors">Changelog</p>
                        <p className="text-sm text-muted-foreground">See what's new in Clueso</p>
                      </div>
                      <div className="w-16 h-16 rounded-lg gradient-primary flex items-center justify-center">
                        <Megaphone className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
              Resources
              <ChevronDown className={`w-4 h-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`} />
            </button>
            
            {resourcesOpen && (
              <div className="absolute top-full left-0 pt-2 animate-fade-in">
                <div className="bg-background rounded-2xl shadow-elevated border border-border p-4 w-[320px]">
                  <div className="space-y-1">
                    <a href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group/item">
                      <PenLine className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium group-hover/item:text-primary transition-colors">Blog</p>
                        <p className="text-sm text-muted-foreground">Latest news and practical guides</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group/item">
                      <HelpCircle className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium group-hover/item:text-primary transition-colors">Help Center</p>
                        <p className="text-sm text-muted-foreground">Learn how to use Clueso</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group/item">
                      <Users className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium group-hover/item:text-primary transition-colors">Customer Stories</p>
                        <p className="text-sm text-muted-foreground">Hear from our customers</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group/item">
                      <BookOpen className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium group-hover/item:text-primary transition-colors">Video Glossary</p>
                          <span className="px-2 py-0.5 text-xs font-medium rounded bg-primary text-primary-foreground">New</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Unhinged list of all things video production</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted transition-colors group/item">
                      <MessageCircleQuestion className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium group-hover/item:text-primary transition-colors">FAQs</p>
                        <p className="text-sm text-muted-foreground">Frequently asked questions</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Pricing
          </a>
          <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            Careers
          </a>
        </div>

        <div className="flex items-center gap-3">
          {isLanding ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm" className="font-medium">Sign In</Button>
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
