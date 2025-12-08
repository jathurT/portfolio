"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiExternalLink, HiSearch, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import SectionWrapper from "../ui/SectionWrapper";
import ProjectModal from "../ui/ProjectModal";
import projectsData from "@/data/projects.json";
import { Project } from "@/types";

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const projects = projectsData as Project[];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", ...new Set(projects.map((p) => p.category))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    const element = document.getElementById("projects");
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Generate pagination numbers with ellipsis
  const getPaginationRange = () => {
    const range: (number | string)[] = [];
    const showEllipsisThreshold = 5; // Show ellipsis if more than 5 pages

    if (totalPages <= showEllipsisThreshold) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // Always show first page
      range.push(1);

      // Show ellipsis or pages around current page
      if (currentPage <= 3) {
        // Near start
        for (let i = 2; i <= 4; i++) {
          range.push(i);
        }
        range.push('...');
      } else if (currentPage >= totalPages - 2) {
        // Near end
        range.push('...');
        for (let i = totalPages - 3; i < totalPages; i++) {
          range.push(i);
        }
      } else {
        // Middle
        range.push('...');
        range.push(currentPage - 1);
        range.push(currentPage);
        range.push(currentPage + 1);
        range.push('...');
      }

      // Always show last page
      range.push(totalPages);
    }

    return range;
  };

  return (
    <>
      <SectionWrapper id="projects" className="bg-gradient-to-br from-white to-emerald-50/20 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
              Featured Projects
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
          </motion.div>

          {/* Search and Filter */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <HiSearch
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2"
                  style={{ "--tw-ring-color": "#2E6F40" } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "text-white shadow-lg"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                  style={selectedCategory === category ? { backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" } : {}}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => handleProjectClick(project)}
                whileHover={{ y: -8 }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 text-white text-xs font-bold rounded-full shadow-lg" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
                      Featured
                    </span>
                  </div>
                )}

                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="text-white text-lg font-semibold"
                    >
                      Click to view details
                    </motion.div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white transition-colors" style={{ "--hover-color": "#2E6F40" } as React.CSSProperties} onMouseEnter={(e) => e.currentTarget.style.color = '#2E6F40'} onMouseLeave={(e) => e.currentTarget.style.color = ''}>
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="transition-colors flex items-center gap-1 text-sm font-medium"
                        style={{ color: "#2E6F40" }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#00674F'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#2E6F40'}
                      >
                        <HiExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1 text-sm font-medium"
                      >
                        <FaGithub size={16} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination */}
          {totalPages > 1 && filteredProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-col items-center gap-6"
            >
              {/* Page Numbers */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                    currentPage === 1
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-300 dark:border-gray-600"
                  }`}
                  aria-label="Previous page"
                >
                  <HiChevronLeft size={24} />
                </motion.button>

                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {getPaginationRange().map((page, index) => {
                    if (page === '...') {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400 font-semibold flex-shrink-0"
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handlePageChange(page as number)}
                        className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 flex-shrink-0 ${
                          currentPage === page
                            ? "text-white shadow-lg"
                            : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-300 dark:border-gray-600"
                        }`}
                        style={
                          currentPage === page
                            ? { backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }
                            : {}
                        }
                      >
                        {page}
                      </motion.button>
                    );
                  })}
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${
                    currentPage === totalPages
                      ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-300 dark:border-gray-600"
                  }`}
                  aria-label="Next page"
                >
                  <HiChevronRight size={24} />
                </motion.button>
              </div>

              {/* Page Info */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages} • Showing {paginatedProjects.length} of {filteredProjects.length} projects
              </div>
            </motion.div>
          )}

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No projects found matching your criteria.
              </p>
            </motion.div>
          )}
        </div>
      </SectionWrapper>

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
