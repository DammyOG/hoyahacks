"use client";
import { useSession } from "@/components/providers/session";
import { useEffect, useState } from "react";
import { Project } from "@/types/mongodb";
import Sidebar from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";

export default function ProjectFiles() {
  const { session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Add session change listener for updates
  useEffect(() => {
    const handleSessionChange = () => {
      fetchProjects(); // Refetch projects on session change
    };

    window.addEventListener("sessionUpdate", handleSessionChange);
    return () => {
      window.removeEventListener("sessionUpdate", handleSessionChange);
    };
  }, []);

  // Fetch projects function
  const fetchProjects = async () => {
    const storedSession = localStorage.getItem("userSession");
    const userEmail = storedSession
      ? JSON.parse(storedSession).email
      : session?.email;

    if (!userEmail) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userEmail}/projects`
      );
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchProjects();
  }, [session?.email]);

  const handleDownload = async (projectName: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/download-project/${projectName}`
      );
      if (!response.ok) throw new Error("Failed to download project");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${projectName}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading project:", error);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 p-8 ml-64 text-white">Loading...</div>
      </div>
    );

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar />
      <div className="flex-1 p-8 ml-64">
        <h1 className="text-3xl font-bold mb-8 text-white">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="relative rounded-lg overflow-hidden shadow-lg bg-gray-800 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
              style={{
                backgroundImage: project.projectPicture
                  ? `url(http://localhost:5000/api/users/project-picture/${project.name}/cover.jpg)`
                  : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "200px",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-60 p-6 flex flex-col justify-between backdrop-blur-[2px] transition-all duration-300 hover:backdrop-blur-none">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 mt-auto">
                  {project.projectLink && (
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition"
                    >
                      GitHub
                    </a>
                  )}
                  <button
                    onClick={() => handleDownload(project.name)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition ml-auto"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
