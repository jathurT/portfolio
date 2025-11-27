"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionWrapper from "../ui/SectionWrapper";
import recommendationsData from "@/data/recommendations.json";
import { Recommendation } from "@/types";

export default function Recommendations() {
  const recommendations = recommendationsData as Recommendation[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [expandedCards, setExpandedCards] = useState<{ [key: string]: boolean }>({});
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play carousel
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextRecommendation();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isPaused]);

  const nextRecommendation = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const prevRecommendation = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const toggleExpand = (id: string) => {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  // Slide variants for smooth animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  };

  return (
    <SectionWrapper
      id="recommendations"
      className="bg-gradient-to-br from-emerald-50/30 to-white dark:from-gray-800 dark:to-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
            Recommendations
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full mb-6" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            What colleagues and mentors say about working with me
          </p>
        </motion.div>

        {/* Featured Carousel */}
        <div className="mb-20">
          <div
            className="relative max-w-5xl mx-auto px-4 sm:px-12 md:px-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden border border-emerald-100 dark:border-gray-700"
                >
                  {/* Decorative Background */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full" style={{ backgroundImage: "linear-gradient(to bottom right, #2E6F40, #00674F)" }} />
                  </div>

                  {/* Quote Icon */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 opacity-10">
                    <FaQuoteLeft size={60} className="text-emerald-600 sm:w-20 sm:h-20" />
                  </div>

                  <div className="relative z-10">
                    {/* Recommender Info */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6">
                      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-lg flex-shrink-0" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
                        {recommendations[currentIndex].name.charAt(0)}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
                          {recommendations[currentIndex].name}
                        </h3>
                        <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-base sm:text-lg mb-1">
                          {recommendations[currentIndex].position}
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-2">
                          {recommendations[currentIndex].company} • {recommendations[currentIndex].relationship}
                        </p>
                        <a
                          href={recommendations[currentIndex].linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors"
                        >
                          <FaLinkedin size={24} />
                          <span className="text-sm font-medium">View LinkedIn Profile</span>
                        </a>
                      </div>
                    </div>

                    {/* Recommendation Text */}
                    <div className="bg-emerald-50/50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base sm:text-lg italic">
                        "{recommendations[currentIndex].recommendation}"
                      </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {recommendations[currentIndex].date}
                      </p>
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
                        <span className="text-sm font-medium">LinkedIn Recommendation</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevRecommendation}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95 z-20"
              style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}
              aria-label="Previous recommendation"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={nextRecommendation}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all hover:scale-110 active:scale-95 z-20"
              style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}
              aria-label="Next recommendation"
            >
              <FaChevronRight size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {recommendations.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8"
                      : "w-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                  style={index === currentIndex ? { backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" } : {}}
                  aria-label={`Go to recommendation ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* All Recommendations Grid */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            All Recommendations
          </h3>
          <div className="grid sm:grid-cols-2 gap-6">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
                      {rec.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 dark:text-white truncate">
                        {rec.name}
                      </h4>
                      <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                        {rec.position}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {rec.company}
                      </p>
                    </div>
                  </div>
                  <a
                    href={rec.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors flex-shrink-0"
                  >
                    <FaLinkedin size={24} />
                  </a>
                </div>

                {/* Recommendation Text */}
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    "{expandedCards[rec.id] ? rec.recommendation : truncateText(rec.recommendation, 180)}"
                    {rec.recommendation.length > 180 && (
                      <button
                        onClick={() => toggleExpand(rec.id)}
                        className="text-emerald-600 dark:text-emerald-400 font-semibold ml-2 hover:underline inline-flex items-center"
                      >
                        {expandedCards[rec.id] ? "Show less" : "Read more"}
                      </button>
                    )}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <span className="font-medium">{rec.relationship}</span>
                  <span>{rec.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
