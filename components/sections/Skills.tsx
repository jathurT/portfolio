"use client";

import { motion } from "framer-motion";
import {
  FaReact,
  FaNode,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaServer,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiFigma,
} from "react-icons/si";
import SectionWrapper from "../ui/SectionWrapper";
import skillsData from "@/data/skills.json";
import { SkillCategory } from "@/types";

const iconMap: { [key: string]: any } = {
  FaReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  FaNode,
  SiPostgresql,
  SiMongodb,
  FaServer,
  FaGitAlt,
  FaDocker,
  FaAws,
  SiFigma,
};

export default function Skills() {
  const skills = skillsData as SkillCategory[];

  return (
    <SectionWrapper
      id="skills"
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
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
        </motion.div>

        <div className="space-y-12">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                {category.category}
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = iconMap[skill.icon] || FaServer;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: skillIndex * 0.1,
                      }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
                          <Icon size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {skill.name}
                            </h4>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {skill.proficiency}%
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {skill.yearsOfExperience} years experience
                          </p>
                        </div>
                      </div>

                      {/* Animated Progress Bar */}
                      <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 left-0 h-full rounded-full"
                          style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1,
                            delay: skillIndex * 0.1 + 0.3,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
