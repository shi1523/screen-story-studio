import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Video, 
  Clock, 
  MoreHorizontal, 
  Play,
  FileText,
  Trash2,
  Edit,
  Download,
  FolderOpen
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Project {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  status: "completed" | "processing" | "draft";
  createdAt: string;
  hasDocumentation: boolean;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Product Onboarding Tutorial",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=225&fit=crop",
    duration: "3:42",
    status: "completed",
    createdAt: "2 hours ago",
    hasDocumentation: true,
  },
  {
    id: "2",
    title: "Feature Walkthrough - Dashboard",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    duration: "5:18",
    status: "completed",
    createdAt: "Yesterday",
    hasDocumentation: true,
  },
  {
    id: "3",
    title: "API Integration Guide",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    duration: "2:15",
    status: "processing",
    createdAt: "3 hours ago",
    hasDocumentation: false,
  },
  {
    id: "4",
    title: "Settings Configuration",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    duration: "1:45",
    status: "draft",
    createdAt: "5 days ago",
    hasDocumentation: false,
  },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects] = useState<Project[]>(mockProjects);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: Project["status"]) => {
    const styles = {
      completed: "bg-green-100 text-green-700 border-green-200",
      processing: "bg-yellow-100 text-yellow-700 border-yellow-200",
      draft: "bg-muted text-muted-foreground border-border",
    };
    const labels = {
      completed: "Completed",
      processing: "Processing",
      draft: "Draft",
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-1">My Projects</h1>
              <p className="text-muted-foreground">Manage your video projects and documentation</p>
            </div>
            <Link to="/upload">
              <Button variant="hero" size="lg">
                <Plus className="w-5 h-5" />
                New Project
              </Button>
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-elevated hover:border-primary/20 transition-all duration-300"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-muted overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/20 transition-colors flex items-center justify-center">
                      <Link
                        to={project.status === "processing" ? `/processing/${project.id}` : `/preview/${project.id}`}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Button variant="glass" size="icon-lg" className="rounded-full">
                          <Play className="w-6 h-6" />
                        </Button>
                      </Link>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-foreground/80 text-primary-foreground text-xs font-medium">
                      {project.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm" className="shrink-0">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Export
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {project.createdAt}
                        </span>
                        {project.hasDocumentation && (
                          <span className="flex items-center gap-1 text-primary">
                            <FileText className="w-3.5 h-3.5" />
                            Docs
                          </span>
                        )}
                      </div>
                      {getStatusBadge(project.status)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <FolderOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try a different search term" : "Create your first video project"}
              </p>
              <Link to="/upload">
                <Button variant="hero">
                  <Plus className="w-5 h-5" />
                  Create Project
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
