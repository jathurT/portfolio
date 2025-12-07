"use client";

import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiExternalLink, HiAcademicCap, HiCalendar, HiCheckCircle, HiDocumentText } from "react-icons/hi";
import { Certification } from "@/types";
import { formatDate } from "@/lib/utils";
import Button from "./Button";

interface CertificationModalProps {
  certification: Certification | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function CertificationModal({
  certification,
  isOpen,
  onClose,
}: CertificationModalProps) {
  if (!certification) return null;

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
                className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
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
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <HiAcademicCap size={36} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2">{certification.name}</h2>
                        <p className="text-emerald-100 text-lg">{certification.issuingOrganization}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    {/* Certification Details */}
                    <div className="mb-8 grid md:grid-cols-2 gap-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(46, 111, 64, 0.1)" }}>
                          <HiCalendar size={20} style={{ color: "#2E6F40" }} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                            Issue Date
                          </h4>
                          <p className="text-gray-900 dark:text-white font-medium">
                            {formatDate(certification.issueDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "rgba(46, 111, 64, 0.1)" }}>
                          <HiDocumentText size={20} style={{ color: "#2E6F40" }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
                            Credential ID
                          </h4>
                          <p className="text-gray-900 dark:text-white font-medium break-all text-sm">
                            {certification.credentialId}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                        <HiCheckCircle size={24} style={{ color: "#2E6F40" }} />
                        About This Certification
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {certification.description}
                      </p>
                    </div>

                    {/* Skills */}
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                        Skills Covered
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {certification.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="flex gap-4">
                      <Button
                        onClick={() => window.open(certification.credentialUrl, "_blank")}
                        className="flex items-center gap-2"
                      >
                        <HiExternalLink size={20} />
                        Verify Credential
                      </Button>
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
