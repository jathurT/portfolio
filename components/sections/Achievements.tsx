"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiCode, HiStar, HiUsers, HiGlobe, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FaMedal, FaAward, FaTrophy } from "react-icons/fa";
import SectionWrapper from "../ui/SectionWrapper";
import achievementsData from "@/data/achievements.json";
import { Achievement } from "@/types";

const iconMap: { [key: string]: any } = {
  trophy: FaTrophy,
  code: HiCode,
  medal: FaMedal,
  award: FaAward,
  star: HiStar,
};

const ITEMS_PER_PAGE = 2;

export default function Achievements() {
  const achievements = achievementsData as Achievement[];
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(achievements.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedAchievements = achievements.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of achievements section
    const element = document.getElementById("achievements");
    if (element) {
      const offset = 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <SectionWrapper
      id="achievements"
      className="bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
            Achievements & Awards
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            Recognition and accolades earned through competitive programming and hackathons
          </p>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8 min-h-[600px]"
          >
            {paginatedAchievements.map((achievement, index) => {
            const Icon = iconMap[achievement.icon] || FaTrophy;
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="relative group"
              >
                {/* Background Gradient Blob */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500"
                  style={{ background: achievement.color }}
                />

                {/* Main Card */}
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-opacity-50 overflow-hidden h-full"
                  style={{ borderColor: achievement.color }}
                >
                  {/* Top Accent Bar */}
                  <div
                    className="h-2 w-full"
                    style={{ background: `linear-gradient(to right, ${achievement.color}, ${achievement.color}dd)` }}
                  />

                  <div className="p-8">
                    {/* Icon and Category */}
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
                        style={{ background: `linear-gradient(135deg, ${achievement.color}, ${achievement.color}dd)` }}
                      >
                        <Icon className="text-3xl text-white" />
                      </div>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-md"
                        style={{ backgroundColor: achievement.color }}
                      >
                        {achievement.category}
                      </span>
                    </div>

                    {/* Title and Organization */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r transition-all"
                      style={{ backgroundImage: `linear-gradient(to right, ${achievement.color}, ${achievement.color}dd)` }}
                    >
                      {achievement.title}
                    </h3>
                    <div className="flex items-center gap-2 mb-4">
                      <FaAward style={{ color: achievement.color }} />
                      <p className="text-gray-600 dark:text-gray-400 font-semibold">
                        {achievement.organization}
                      </p>
                      <span className="text-gray-400 dark:text-gray-600">•</span>
                      <p className="text-gray-500 dark:text-gray-500 text-sm">
                        {achievement.date}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                      {achievement.description}
                    </p>

                    {/* Stats Section */}
                    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                      {/* Rank */}
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/50 dark:to-transparent">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${achievement.color}20` }}
                        >
                          <FaMedal style={{ color: achievement.color }} size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Ranking</p>
                          <p className="text-lg font-bold" style={{ color: achievement.color }}>
                            {achievement.rank}
                          </p>
                        </div>
                      </div>

                      {/* Global Rank (if available) */}
                      {achievement.globalRank && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/50 dark:to-transparent">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${achievement.color}20` }}
                          >
                            <HiGlobe style={{ color: achievement.color }} size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Global Standing</p>
                            <p className="text-lg font-bold" style={{ color: achievement.color }}>
                              {achievement.globalRank}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Total Participants */}
                      {achievement.totalParticipants && (
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-700/50 dark:to-transparent">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${achievement.color}20` }}
                          >
                            <HiUsers style={{ color: achievement.color }} size={20} />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Competition</p>
                            <p className="text-lg font-bold text-gray-900 dark:text-white">
                              {achievement.totalParticipants}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Decorative Corner Element */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-5 transform translate-x-8 -translate-y-8"
                  >
                    <Icon className="w-full h-full" />
                  </div>
                </div>
              </motion.div>
            );
          })}
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
