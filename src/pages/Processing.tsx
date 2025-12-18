import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Volume2, 
  Zap, 
  FileText, 
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";

interface ProcessingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  status: "pending" | "processing" | "completed";
  progress: number;
}

export default function Processing() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [steps, setSteps] = useState<ProcessingStep[]>([
    {
      id: "transcribe",
      title: "Transcribing Audio",
      description: "Converting speech to text with AI",
      icon: Volume2,
      status: "pending",
      progress: 0,
    },
    {
      id: "script",
      title: "Generating Script",
      description: "Creating a polished, professional script",
      icon: Sparkles,
      status: "pending",
      progress: 0,
    },
    {
      id: "zooms",
      title: "Adding Smart Zooms",
      description: "Detecting key actions and adding zooms",
      icon: Zap,
      status: "pending",
      progress: 0,
    },
    {
      id: "docs",
      title: "Creating Documentation",
      description: "Generating step-by-step guide",
      icon: FileText,
      status: "pending",
      progress: 0,
    },
  ]);

  const [overallProgress, setOverallProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let currentStepIndex = 0;
    
    const processStep = () => {
      if (currentStepIndex >= steps.length) {
        setIsComplete(true);
        return;
      }

      setSteps((prev) => {
        const updated = [...prev];
        updated[currentStepIndex] = {
          ...updated[currentStepIndex],
          status: "processing",
        };
        return updated;
      });

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
          clearInterval(interval);
          
          setSteps((prev) => {
            const updated = [...prev];
            updated[currentStepIndex] = {
              ...updated[currentStepIndex],
              status: "completed",
              progress: 100,
            };
            return updated;
          });

          setOverallProgress(((currentStepIndex + 1) / steps.length) * 100);
          currentStepIndex++;
          
          setTimeout(processStep, 500);
        } else {
          setSteps((prev) => {
            const updated = [...prev];
            updated[currentStepIndex] = {
              ...updated[currentStepIndex],
              progress: Math.min(progress, 99),
            };
            return updated;
          });
        }
      }, 150);
    };

    const startTimeout = setTimeout(processStep, 1000);
    return () => clearTimeout(startTimeout);
  }, []);

  const getStepIcon = (step: ProcessingStep) => {
    if (step.status === "completed") {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    if (step.status === "processing") {
      return <step.icon className="w-5 h-5 text-primary animate-pulse" />;
    }
    return <step.icon className="w-5 h-5 text-muted-foreground" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className={`
                absolute inset-0 rounded-2xl gradient-primary
                ${!isComplete && "animate-pulse"}
              `} />
              <div className="absolute inset-0 flex items-center justify-center">
                {isComplete ? (
                  <CheckCircle className="w-10 h-10 text-primary-foreground" />
                ) : (
                  <Sparkles className="w-10 h-10 text-primary-foreground" />
                )}
              </div>
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              {isComplete ? "Processing Complete!" : "AI is Working..."}
            </h1>
            <p className="text-muted-foreground text-lg">
              {isComplete 
                ? "Your video and documentation are ready for review." 
                : "Transforming your recording into a polished product video."
              }
            </p>
          </div>

          {/* Overall Progress */}
          <div className="mb-10">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="font-medium">Overall Progress</span>
              <span className="text-muted-foreground">{Math.round(overallProgress)}%</span>
            </div>
            <div className="h-3 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full gradient-primary transition-all duration-500"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>

          {/* Processing Steps */}
          <div className="space-y-4 mb-10">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`
                  p-5 rounded-xl border transition-all duration-300
                  ${step.status === "processing" 
                    ? "border-primary/30 bg-accent/50" 
                    : step.status === "completed"
                    ? "border-green-200 bg-green-50/50"
                    : "border-border bg-card"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                    ${step.status === "completed" 
                      ? "bg-green-100" 
                      : step.status === "processing"
                      ? "bg-accent"
                      : "bg-muted"
                    }
                  `}>
                    {getStepIcon(step)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold">{step.title}</h3>
                      {step.status === "processing" && (
                        <span className="text-xs text-primary font-medium">
                          {Math.round(step.progress)}%
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    
                    {step.status === "processing" && (
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div 
                          className="h-full gradient-primary transition-all duration-300"
                          style={{ width: `${step.progress}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          {isComplete && (
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Button
                variant="hero"
                size="xl"
                className="flex-1"
                onClick={() => navigate(`/preview/${id || "new"}`)}
              >
                View Results
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          )}

          {/* Estimated Time */}
          {!isComplete && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                <Clock className="w-4 h-4" />
                Estimated time remaining: ~2 minutes
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
