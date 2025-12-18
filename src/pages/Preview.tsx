import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Edit3,
  RefreshCcw,
  Download,
  FileText,
  Video,
  Clock,
  Sparkles,
  CheckCircle,
  Copy,
  ChevronRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ScriptSegment {
  id: string;
  timestamp: string;
  text: string;
  isEditing: boolean;
}

interface DocumentationStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  screenshot: string;
}

export default function Preview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [projectTitle, setProjectTitle] = useState("Product Onboarding Tutorial");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  const [scriptSegments, setScriptSegments] = useState<ScriptSegment[]>([
    {
      id: "1",
      timestamp: "0:00",
      text: "Welcome to our product onboarding tutorial. In this video, we'll walk you through the key features of our dashboard.",
      isEditing: false,
    },
    {
      id: "2",
      timestamp: "0:15",
      text: "First, let's take a look at the main navigation. You'll find all your projects listed here on the left sidebar.",
      isEditing: false,
    },
    {
      id: "3",
      timestamp: "0:32",
      text: "To create a new project, simply click the 'New Project' button in the top right corner of your screen.",
      isEditing: false,
    },
    {
      id: "4",
      timestamp: "0:48",
      text: "You can customize your project settings by clicking on the gear icon. Here you can change the name, add collaborators, and configure notifications.",
      isEditing: false,
    },
    {
      id: "5",
      timestamp: "1:10",
      text: "That's it! You're now ready to start using our platform. If you have any questions, check out our help center.",
      isEditing: false,
    },
  ]);

  const [documentation, setDocumentation] = useState<DocumentationStep[]>([
    {
      id: "1",
      stepNumber: 1,
      title: "Access the Dashboard",
      description: "Log in to your account and navigate to the main dashboard. You'll see an overview of all your projects and recent activity.",
      screenshot: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop",
    },
    {
      id: "2",
      stepNumber: 2,
      title: "Navigate Using the Sidebar",
      description: "The left sidebar contains all your project folders and navigation options. Click on any project to view its details.",
      screenshot: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop",
    },
    {
      id: "3",
      stepNumber: 3,
      title: "Create a New Project",
      description: "Click the 'New Project' button in the top right corner. Fill in the project name and select your preferred settings.",
      screenshot: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop",
    },
    {
      id: "4",
      stepNumber: 4,
      title: "Configure Project Settings",
      description: "Access project settings via the gear icon. Here you can customize notifications, add team members, and set permissions.",
      screenshot: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=340&fit=crop",
    },
  ]);

  const handleEditSegment = (id: string) => {
    setScriptSegments((prev) =>
      prev.map((seg) => ({
        ...seg,
        isEditing: seg.id === id ? !seg.isEditing : false,
      }))
    );
  };

  const handleUpdateSegment = (id: string, newText: string) => {
    setScriptSegments((prev) =>
      prev.map((seg) =>
        seg.id === id ? { ...seg, text: newText, isEditing: false } : seg
      )
    );
    toast({
      title: "Script updated",
      description: "Your changes have been saved.",
    });
  };

  const handleRegenerateSegment = (id: string) => {
    toast({
      title: "Regenerating...",
      description: "AI is creating a new version of this segment.",
    });
    
    setTimeout(() => {
      setScriptSegments((prev) =>
        prev.map((seg) =>
          seg.id === id
            ? { ...seg, text: seg.text + " [Regenerated with AI improvements]" }
            : seg
        )
      );
      toast({
        title: "Regeneration complete",
        description: "The segment has been updated.",
      });
    }, 1500);
  };

  const copyDocumentation = () => {
    const docText = documentation
      .map((step) => `Step ${step.stepNumber}: ${step.title}\n${step.description}`)
      .join("\n\n");
    navigator.clipboard.writeText(docText);
    toast({
      title: "Copied to clipboard",
      description: "Documentation has been copied.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              {isEditingTitle ? (
                <Input
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  onBlur={() => setIsEditingTitle(false)}
                  onKeyDown={(e) => e.key === "Enter" && setIsEditingTitle(false)}
                  autoFocus
                  className="text-2xl font-display font-bold h-auto py-1 px-2 w-auto max-w-md"
                />
              ) : (
                <h1 
                  className="font-display text-2xl md:text-3xl font-bold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setIsEditingTitle(true)}
                >
                  {projectTitle}
                  <Edit3 className="w-4 h-4 inline ml-2 text-muted-foreground" />
                </h1>
              )}
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
              </Button>
              <Link to={`/export/${id || "new"}`}>
                <Button variant="hero">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Video Preview */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
                {/* Video Player */}
                <div className="relative aspect-video bg-foreground/5">
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop"
                    alt="Video preview"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Play overlay */}
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-foreground/10 cursor-pointer"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    <Button 
                      variant="glass" 
                      size="icon-lg" 
                      className="rounded-full w-16 h-16"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8" />
                      ) : (
                        <Play className="w-8 h-8 ml-1" />
                      )}
                    </Button>
                  </div>
                  
                  {/* AI Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/80 text-primary-foreground text-xs font-medium">
                    <Sparkles className="w-3.5 h-3.5" />
                    AI Enhanced
                  </div>
                </div>

                {/* Video Controls */}
                <div className="p-4 border-t border-border">
                  {/* Progress Bar */}
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-3 cursor-pointer">
                    <div 
                      className="h-full gradient-primary transition-all duration-300"
                      style={{ width: "35%" }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button 
                        variant="ghost" 
                        size="icon-sm"
                        onClick={() => setIsPlaying(!isPlaying)}
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon-sm"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      <span className="text-sm text-muted-foreground">
                        1:15 / 3:42
                      </span>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Maximize className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Video Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                {[
                  { icon: Clock, label: "Duration", value: "3:42" },
                  { icon: Volume2, label: "Voiceover", value: "AI Generated" },
                  { icon: Sparkles, label: "Enhancements", value: "12 zooms" },
                ].map((stat) => (
                  <div 
                    key={stat.label}
                    className="p-4 rounded-xl border border-border bg-card text-center"
                  >
                    <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Script & Documentation Panel */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="script" className="h-full">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="script" className="flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    Script
                  </TabsTrigger>
                  <TabsTrigger value="docs" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Documentation
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="script" className="mt-0">
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-primary" />
                        AI-Generated Script
                      </h3>
                      <p className="text-sm text-muted-foreground">Click on any segment to edit</p>
                    </div>
                    
                    <div className="max-h-[500px] overflow-y-auto">
                      {scriptSegments.map((segment) => (
                        <div
                          key={segment.id}
                          className={`p-4 border-b border-border last:border-0 transition-colors ${
                            segment.isEditing ? "bg-accent/50" : "hover:bg-muted/50"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xs font-mono bg-muted px-2 py-1 rounded shrink-0">
                              {segment.timestamp}
                            </span>
                            
                            <div className="flex-1">
                              {segment.isEditing ? (
                                <Textarea
                                  defaultValue={segment.text}
                                  onBlur={(e) => handleUpdateSegment(segment.id, e.target.value)}
                                  className="min-h-[80px]"
                                  autoFocus
                                />
                              ) : (
                                <p 
                                  className="text-sm leading-relaxed cursor-pointer"
                                  onClick={() => handleEditSegment(segment.id)}
                                >
                                  {segment.text}
                                </p>
                              )}
                              
                              <div className="flex items-center gap-2 mt-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleEditSegment(segment.id)}
                                >
                                  <Edit3 className="w-3.5 h-3.5 mr-1" />
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleRegenerateSegment(segment.id)}
                                >
                                  <RefreshCcw className="w-3.5 h-3.5 mr-1" />
                                  Regenerate
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="docs" className="mt-0">
                  <div className="rounded-xl border border-border bg-card overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold flex items-center gap-2">
                          <FileText className="w-4 h-4 text-primary" />
                          Step-by-Step Guide
                        </h3>
                        <p className="text-sm text-muted-foreground">Auto-generated from your video</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={copyDocumentation}>
                        <Copy className="w-3.5 h-3.5 mr-1" />
                        Copy All
                      </Button>
                    </div>
                    
                    <div className="max-h-[500px] overflow-y-auto">
                      {documentation.map((step) => (
                        <div
                          key={step.id}
                          className="p-4 border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-sm shrink-0">
                              {step.stepNumber}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium mb-1">{step.title}</h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                {step.description}
                              </p>
                              <div className="rounded-lg overflow-hidden border border-border">
                                <img
                                  src={step.screenshot}
                                  alt={step.title}
                                  className="w-full h-32 object-cover"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
