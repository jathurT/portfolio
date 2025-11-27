"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiExternalLink } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { Project } from "@/types";
import Button from "./Button";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  isOpen,
  onClose,
}: ProjectModalProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-gray-900/80 hover:bg-gray-900 text-white flex items-center justify-center transition-colors"
                >
                  <HiX size={24} />
                </button>

                {/* Content */}
                <div className="max-h-[90vh] overflow-y-auto">
                  {/* Header */}
                  <div className="p-8 text-white" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
                    <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
                    <p className="text-emerald-100">{project.description}</p>
                  </div>

                  <div className="p-8">
                    {/* Long Description */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        About This Project
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {project.longDescription}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Technologies Used
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="mb-8 grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          Category
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {project.category}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                          Duration
                        </h4>
                        <p className="text-gray-900 dark:text-white">
                          {new Date(project.startDate).toLocaleDateString()} -{" "}
                          {new Date(project.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                      {project.liveUrl && (
                        <Button
                          onClick={() => window.open(project.liveUrl, "_blank")}
                          className="flex items-center gap-2"
                        >
                          <HiExternalLink size={20} />
                          View Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          onClick={() =>
                            window.open(project.githubUrl, "_blank")
                          }
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <FaGithub size={20} />
                          View on GitHub
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
