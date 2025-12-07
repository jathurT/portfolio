"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/jathurT",
      label: "GitHub",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/jathurt",
      label: "LinkedIn",
    },
    {
      icon: FaEnvelope,
      href: "mailto:jathurshan_t_e23@engug.ruh.ac.lk",
      label: "Email",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-4" style={{ backgroundImage: "linear-gradient(to right, #2E6F40, #00674F)" }}>
              Portfolio
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Crafting digital experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Skills", "Projects", "Experience", "Certifications", "Recommendations", "Contact"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase()}`}
                      className="text-gray-400 transition-colors"
                      onMouseEnter={(e) => e.currentTarget.style.color = '#2E6F40'}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-300"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundImage = "linear-gradient(to right, #2E6F40, #00674F)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundImage = "";
                    e.currentTarget.style.backgroundColor = "#1f2937";
                  }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm flex items-center gap-1">
              Made with <FaHeart className="text-red-500" size={14} /> by Jathurshan
            </p>
            <p className="text-gray-400 text-sm">
              © {currentYear} All rights reserved.
            </p>
            <button
              onClick={scrollToTop}
              className="text-gray-400 transition-colors text-sm"
              onMouseEnter={(e) => e.currentTarget.style.color = '#2E6F40'}
              onMouseLeave={(e) => e.currentTarget.style.color = ''}
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
