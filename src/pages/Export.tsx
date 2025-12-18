import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Download,
  Video,
  FileText,
  FileDown,
  ChevronRight,
  CheckCircle,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportOption {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  format: string;
  size: string;
  selected: boolean;
}

export default function Export() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);
  
  const [exportOptions, setExportOptions] = useState<ExportOption[]>([
    {
      id: "video-hd",
      title: "HD Video",
      description: "Full quality video with AI voiceover and captions",
      icon: Video,
      format: "MP4",
      size: "~45 MB",
      selected: true,
    },
    {
      id: "video-sd",
      title: "SD Video",
      description: "Compressed video for faster sharing",
      icon: Video,
      format: "MP4",
      size: "~15 MB",
      selected: false,
    },
    {
      id: "docs-pdf",
      title: "Documentation (PDF)",
      description: "Step-by-step guide with screenshots",
      icon: FileText,
      format: "PDF",
      size: "~2 MB",
      selected: true,
    },
    {
      id: "docs-md",
      title: "Documentation (Markdown)",
      description: "Plain text documentation for wikis",
      icon: FileDown,
      format: "MD",
      size: "~50 KB",
      selected: false,
    },
  ]);

  const toggleOption = (optionId: string) => {
    setExportOptions((prev) =>
      prev.map((opt) =>
        opt.id === optionId ? { ...opt, selected: !opt.selected } : opt
      )
    );
  };

  const selectedCount = exportOptions.filter((opt) => opt.selected).length;

  const handleExport = async () => {
    if (selectedCount === 0) {
      toast({
        variant: "destructive",
        title: "No options selected",
        description: "Please select at least one export option.",
      });
      return;
    }

    setIsExporting(true);

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setIsExporting(false);
    setExportComplete(true);

    toast({
      title: "Export complete!",
      description: `${selectedCount} file(s) are ready for download.`,
    });
  };

  const handleDownloadAll = () => {
    toast({
      title: "Download started",
      description: "Your files are being prepared for download.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className={`
              w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-soft
              ${exportComplete ? "bg-green-500" : "gradient-primary"}
            `}>
              {exportComplete ? (
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              ) : (
                <Download className="w-10 h-10 text-primary-foreground" />
              )}
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              {exportComplete ? "Export Complete!" : "Export Your Project"}
            </h1>
            <p className="text-muted-foreground text-lg">
              {exportComplete 
                ? "Your files are ready for download." 
                : "Select the formats you'd like to export."
              }
            </p>
          </div>

          {!exportComplete ? (
            <>
              {/* Export Options */}
              <div className="space-y-4 mb-8">
                {exportOptions.map((option) => (
                  <div
                    key={option.id}
                    onClick={() => toggleOption(option.id)}
                    className={`
                      p-5 rounded-xl border cursor-pointer transition-all duration-200
                      ${option.selected 
                        ? "border-primary bg-accent/50 shadow-soft" 
                        : "border-border bg-card hover:border-primary/30"
                      }
                    `}
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox 
                        checked={option.selected}
                        onCheckedChange={() => toggleOption(option.id)}
                        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      
                      <div className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shrink-0
                        ${option.selected ? "gradient-primary" : "bg-muted"}
                      `}>
                        <option.icon className={`w-6 h-6 ${option.selected ? "text-primary-foreground" : "text-muted-foreground"}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{option.title}</h3>
                          <span className="px-2 py-0.5 text-xs font-medium rounded bg-muted">
                            {option.format}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                      
                      <span className="text-sm text-muted-foreground shrink-0">
                        {option.size}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Export Button */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => navigate(`/preview/${id || "new"}`)}
                  className="flex-1 sm:flex-none"
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back to Preview
                </Button>
                <Button
                  variant="hero"
                  size="xl"
                  className="flex-1"
                  onClick={handleExport}
                  disabled={selectedCount === 0 || isExporting}
                >
                  {isExporting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Exporting...
                    </>
                  ) : (
                    <>
                      Export {selectedCount} File{selectedCount !== 1 ? "s" : ""}
                      <ChevronRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Download Section */}
              <div className="rounded-2xl border border-border bg-card overflow-hidden mb-8">
                <div className="p-6 border-b border-border bg-muted/30">
                  <h3 className="font-semibold">Ready for Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Click on any file to download individually
                  </p>
                </div>
                
                <div className="divide-y divide-border">
                  {exportOptions.filter((opt) => opt.selected).map((option) => (
                    <div
                      key={option.id}
                      className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={handleDownloadAll}
                    >
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{option.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {option.format} • {option.size}
                        </p>
                      </div>
                      
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="hero"
                  size="xl"
                  className="flex-1"
                  onClick={handleDownloadAll}
                >
                  <Download className="w-5 h-5" />
                  Download All
                </Button>
                <Button
                  variant="outline"
                  size="xl"
                  onClick={() => navigate("/dashboard")}
                >
                  Back to Dashboard
                </Button>
              </div>
            </>
          )}

          {/* Info Box */}
          <div className="mt-8 p-4 rounded-xl bg-accent/50 border border-primary/10">
            <p className="text-sm text-muted-foreground text-center">
              <strong className="text-foreground">Tip:</strong> You can always re-export your project later from the dashboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
