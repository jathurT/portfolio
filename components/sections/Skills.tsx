"use client";

import { motion } from "framer-motion";
import {
  FaReact,
  FaNode,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaServer,
  FaPython,
  FaJava,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiFigma,
  SiSpring,
  SiQuarkus,
  SiHtml5,
  SiOracle,
  SiMysql,
  SiNeo4J,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiNumpy,
  SiJenkins,
  SiKubernetes,
  SiEthereum,
  SiSolidity,
  SiGo,
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
  FaPython,
  FaJava,
  SiSpring,
  SiQuarkus,
  SiHtml5,
  SiOracle,
  SiMysql,
  SiNeo4J,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiNumpy,
  SiJenkins,
  SiKubernetes,
  SiEthereum,
  SiSolidity,
  SiGo,
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
          <h2 className="text-4xl md:text-5xl   font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
        </motion.div>

        <div className="space-y-8">
          {skills.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                <span className="w-1 h-6 rounded-full" style={{ backgroundImage: "linear-gradient(to bottom, #2E6F40, #00674F)" }} />
                {category.category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {category.skills.map((skill, skillIndex) => {
                  const Icon = iconMap[skill.icon] || FaServer;
                  return (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: skillIndex * 0.05,
                      }}
                      whileHover={{ y: -4 }}
                      className="relative bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 group overflow-hidden"
                    >
                      {/* Animated background on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundImage: "linear-gradient(135deg, #2E6F40, #00674F)" }} />

                      <div className="relative flex flex-col items-center text-center gap-2">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-sm" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
                          <Icon size={24} />
                        </div>
                        <div className="w-full">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                            {skill.name}
                          </h4>
                          <div className="flex items-center justify-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                            <span className="px-2 py-0.5 rounded-full" style={{ backgroundColor: `rgba(46, 111, 64, ${skill.proficiency / 100 * 0.2})` }}>
                              {skill.proficiency}%
                            </span>
                            <span>•</span>
                            <span>{skill.yearsOfExperience}y</span>
                          </div>
                        </div>
                      </div>

                      {/* Subtle bottom indicator */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
                        <motion.div
                          className="h-full"
                          style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: skillIndex * 0.05 + 0.2,
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
