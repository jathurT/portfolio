"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiAcademicCap, HiCalendar, HiExternalLink, HiCheckCircle, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import SectionWrapper from "../ui/SectionWrapper";
import certificationsData from "@/data/certifications.json";
import { Certification as CertificationType } from "@/types";
import { formatDate } from "@/lib/utils";

const ITEMS_PER_PAGE = 3;

export default function Certifications() {
  const certifications = certificationsData as CertificationType[];
  const [selectedSkill, setSelectedSkill] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Extract all unique skills
  const allSkills = useMemo(() => {
    const skillsSet = new Set<string>();
    certifications.forEach(cert => {
      cert.skills.forEach(skill => skillsSet.add(skill));
    });
    return ["All", ...Array.from(skillsSet).sort()];
  }, [certifications]);

  // Filter certifications based on selected skill
  const filteredCertifications = useMemo(() => {
    if (selectedSkill === "All") {
      return certifications;
    }
    return certifications.filter(cert => cert.skills.includes(selectedSkill));
  }, [certifications, selectedSkill]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCertifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedCertifications = filteredCertifications.slice(startIndex, endIndex);

  // Reset to page 1 when filter changes
  const handleSkillChange = (skill: string) => {
    setSelectedSkill(skill);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of certifications section
    const element = document.getElementById("certifications");
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

  return (
    <SectionWrapper
      id="certifications"
      className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
            Certifications
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Professional certifications demonstrating expertise in modern technologies
          </p>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
        </motion.div>

        {/* Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Filter by Skill
            </h3>
            <div className="flex flex-wrap justify-center gap-2">
              {allSkills.map((skill) => (
                <motion.button
                  key={skill}
                  onClick={() => handleSkillChange(skill)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                    selectedSkill === skill
                      ? "text-white shadow-lg"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                  style={
                    selectedSkill === skill
                      ? { backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }
                      : {}
                  }
                >
                  {skill}
                </motion.button>
              ))}
            </div>
            <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredCertifications.length} certification{filteredCertifications.length !== 1 ? 's' : ''}
            </div>
          </div>
        </motion.div>

        {/* Certifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedSkill}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[480px]"
          >
            {paginatedCertifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 h-full flex flex-col overflow-hidden"
              >
                {/* Certificate Image/Icon */}
                <div className="relative h-28 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <HiAcademicCap className="text-5xl" style={{ color: "#2E6F40" }} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  {/* Certificate Name */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {cert.name}
                  </h3>

                  {/* Issuing Organization */}
                  <div className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{ color: "#2E6F40" }}>
                    <HiCheckCircle size={16} />
                    <span className="line-clamp-1">{cert.issuingOrganization}</span>
                  </div>

                  {/* Issue Date */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <HiCalendar size={16} />
                    <span>Issued: {formatDate(cert.issueDate)}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2 flex-grow">
                    {cert.description}
                  </p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cert.skills.slice(0, 4).map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs font-medium">
                        +{cert.skills.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-auto">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        ID: {cert.credentialId}
                      </div>
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm font-semibold hover:underline transition-colors"
                        style={{ color: "#2E6F40" }}
                      >
                        Verify
                        <HiExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-col items-center gap-6"
          >
            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  currentPage === 1
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:shadow-lg border border-gray-300 dark:border-gray-600"
                }`}
                aria-label="Previous page"
              >
                <HiChevronLeft size={24} />
              </motion.button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 ${
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
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-300 ${
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
              Page {currentPage} of {totalPages}
            </div>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
