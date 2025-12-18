import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Upload as UploadIcon, 
  Video, 
  FileVideo, 
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [projectName, setProjectName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      if (!projectName) {
        setProjectName(file.name.replace(/\.[^/.]+$/, ""));
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a video file (MP4, MOV, WebM, etc.)",
      });
    }
  }, [projectName, toast]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!projectName) {
        setProjectName(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  }, [projectName]);

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadProgress(0);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !projectName.trim()) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both a video file and project name.",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate upload completion
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      toast({
        title: "Upload complete!",
        description: "Your video is now being processed by AI.",
      });

      setTimeout(() => {
        navigate("/processing/new");
      }, 500);
    }, 2500);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-soft">
              <Video className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Upload Your Recording
            </h1>
            <p className="text-muted-foreground text-lg">
              Drop your screen recording and let AI transform it into a polished product video.
            </p>
          </div>

          {/* Upload Area */}
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Project Name
              </label>
              <Input
                placeholder="e.g., Product Onboarding Tutorial"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="h-12"
              />
            </div>

            {/* Dropzone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Video File
              </label>
              
              {!selectedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`
                    relative border-2 border-dashed rounded-2xl p-12
                    transition-all duration-300 cursor-pointer
                    ${isDragging 
                      ? "border-primary bg-accent" 
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                    }
                  `}
                >
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileSelect}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  <div className="text-center">
                    <div className={`
                      w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center
                      transition-colors
                      ${isDragging ? "bg-primary text-primary-foreground" : "bg-muted"}
                    `}>
                      <UploadIcon className="w-8 h-8" />
                    </div>
                    <p className="font-medium mb-2">
                      {isDragging ? "Drop your video here" : "Drag & drop your video"}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileVideo className="w-4 h-4" />
                        MP4, MOV, WebM
                      </span>
                      <span>Max 500MB</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-border rounded-2xl p-6 bg-card">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center shrink-0">
                      <FileVideo className="w-7 h-7 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                      
                      {isUploading && (
                        <div className="mt-3">
                          <div className="h-2 rounded-full bg-muted overflow-hidden">
                            <div 
                              className="h-full gradient-primary transition-all duration-300"
                              style={{ width: `${Math.min(uploadProgress, 100)}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {uploadProgress < 100 
                              ? `Uploading... ${Math.round(uploadProgress)}%`
                              : "Upload complete!"
                            }
                          </p>
                        </div>
                      )}
                    </div>
                    {!isUploading && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={handleRemoveFile}
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    )}
                    {uploadProgress >= 100 && (
                      <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* AI Features Info */}
            <div className="rounded-xl bg-accent/50 border border-primary/10 p-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-primary-foreground" />
                </span>
                AI will automatically:
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Generate a polished script from your recording
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Add professional AI voiceover
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Create smart auto-zooms on key actions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Generate step-by-step documentation
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={handleSubmit}
              disabled={!selectedFile || !projectName.trim() || isUploading}
            >
              {isUploading ? (
                <>Processing...</>
              ) : (
                <>
                  Start Processing
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
