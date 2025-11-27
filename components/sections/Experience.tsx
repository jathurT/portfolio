"use client";

import { motion } from "framer-motion";
import { HiBriefcase, HiLocationMarker, HiCalendar } from "react-icons/hi";
import SectionWrapper from "../ui/SectionWrapper";
import experienceData from "@/data/experience.json";
import { Experience as ExperienceType } from "@/types";
import { formatDate } from "@/lib/utils";

export default function Experience() {
  const experiences = experienceData as ExperienceType[];

  return (
    <SectionWrapper
      id="experience"
      className="bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900"
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
            Work Experience
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full" style={{ backgroundImage: "linear-gradient(to bottom, #2E6F40, #00674F)" }} />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row gap-8 items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full ring-4 ring-white dark:ring-gray-900 z-10" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />

                {/* Content Card */}
                <div
                  className={`w-full md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:text-right" : ""
                  }`}
                >
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    {/* Header */}
                    <div className="mb-4">
                      {exp.current && (
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full mb-3">
                          Current
                        </span>
                      )}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {exp.position}
                      </h3>
                      <div className="flex items-center gap-2 font-semibold text-lg mb-3" style={{ color: "#2E6F40" }}>
                        <HiBriefcase size={20} />
                        <span>{exp.company}</span>
                      </div>
                      <div
                        className={`flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400 ${
                          index % 2 === 0 ? "md:justify-end" : ""
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <HiLocationMarker size={16} />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <HiCalendar size={16} />
                          <span>
                            {formatDate(exp.startDate)} -{" "}
                            {exp.current ? "Present" : formatDate(exp.endDate!)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>

                    {/* Responsibilities */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Key Achievements:
                      </h4>
                      <ul
                        className={`space-y-2 ${
                          index % 2 === 0 ? "md:text-right" : ""
                        }`}
                      >
                        {exp.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="text-gray-600 dark:text-gray-400 text-sm flex items-start gap-2"
                          >
                            <span className="mt-1 flex-shrink-0" style={{ color: "#2E6F40" }}>
                              •
                            </span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
