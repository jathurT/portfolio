"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { HiArrowDown } from "react-icons/hi";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Button from "../ui/Button";

export default function Hero() {
  const [text, setText] = useState("");
  const fullText = "Software Engineer Intern | Computer Engineering Undergraduate";
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowCursor(false);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-white via-emerald-50/30 to-white dark:from-gray-900 dark:via-emerald-900/20 dark:to-gray-900"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70"
          style={{ backgroundColor: "#2E6F40" }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70"
          style={{ backgroundColor: "#00674F" }}
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70"
          style={{ backgroundColor: "#355749" }}
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <motion.div variants={itemVariants} className="mb-6">
            <span className="font-semibold text-lg text-emerald-700 dark:text-emerald-400">
              Hello, I&apos;m
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
            style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F, #214C00)" }}
          >
            Jathurshan Thadchanamoorthy
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-8 h-12 font-medium"
          >
            {text}
            {showCursor && (
              <span className="inline-block w-0.5 h-8 ml-1 animate-pulse bg-emerald-700 dark:bg-emerald-400" />
            )}
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12"
          >
            Results-driven Computer Engineering student with strong experience in full-stack development, microservices, machine learning, and DevOps. Passionate about AI, Data Science, and scalable software systems.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button onClick={() => scrollToSection("#projects")} size="lg">
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection("#contact")}
              variant="outline"
              size="lg"
            >
              Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-6"
          >
            <motion.a
              href="https://github.com/jathurT"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 transition-colors"
              style={{
                '--hover-color': '#2E6F40'
              } as React.CSSProperties}
              onMouseEnter={(e) => e.currentTarget.style.color = '#2E6F40'}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub size={28} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/jathurt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 dark:text-gray-300 transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#00674F'}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin size={28} />
            </motion.a>
            <motion.a
              href="mailto:jathurshan_t_e23@engug.ruh.ac.lk"
              className="text-gray-700 dark:text-gray-300 transition-colors"
              onMouseEnter={(e) => e.currentTarget.style.color = '#214C00'}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEnvelope size={28} />
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.6 }}
      >
        <motion.button
          onClick={() => scrollToSection("#about")}
          className="flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors"
          onMouseEnter={(e) => e.currentTarget.style.color = '#2E6F40'}
          onMouseLeave={(e) => e.currentTarget.style.color = ''}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm font-medium">Scroll Down</span>
          <HiArrowDown size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
}
