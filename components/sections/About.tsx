"use client";

import { motion } from "framer-motion";
import { HiCode, HiLightningBolt, HiHeart } from "react-icons/hi";
import SectionWrapper from "../ui/SectionWrapper";

const highlights = [
  {
    icon: HiCode,
    title: "Clean Code",
    description: "Writing maintainable, scalable, and well-documented code",
  },
  {
    icon: HiLightningBolt,
    title: "Performance",
    description: "Optimizing for speed and efficiency in every project",
  },
  {
    icon: HiHeart,
    title: "User-Centric",
    description: "Designing with the end user experience in mind",
  },
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <SectionWrapper
      id="about"
      className="bg-gradient-to-br from-gray-50/50 to-emerald-50/30 dark:from-gray-900 dark:to-gray-800"
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
            About Me
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Hi, I&apos;m Jathurshan
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
              <p>
                I&apos;m a passionate Computer Engineering undergraduate at the University of Ruhuna, maintaining a 3.91 GPA
                while gaining hands-on industry experience as a Software Engineer Intern at IronOne. I thrive at the
                intersection of innovation and technology, transforming complex problems into elegant, scalable solutions.
              </p>
              <p>
                My expertise spans <span className="font-semibold text-[#2E6F40] dark:text-emerald-400">full-stack development</span> with
                Java Spring Boot and React, <span className="font-semibold text-[#2E6F40] dark:text-emerald-400">cloud-native architectures</span>,
                and <span className="font-semibold text-[#2E6F40] dark:text-emerald-400">machine learning</span>. From building enterprise-grade
                microservices to developing AI-powered applications, I bring both technical depth and creative problem-solving to every project.
              </p>
              <p>
                Beyond coding, I&apos;m deeply engaged in competitive programming and research publication. Currently, I&apos;m expanding my
                expertise into <span className="font-semibold text-[#2E6F40] dark:text-emerald-400">Blockchain Technology and Ethereum</span>,
                exploring decentralized applications and smart contract development. I believe in continuous learning, collaborative innovation,
                and writing code that makes a difference. Let&apos;s build something extraordinary together!
              </p>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                variants={itemVariants}
                className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-800 dark:to-gray-800 border border-emerald-100 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
                  <highlight.icon size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {highlight.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
