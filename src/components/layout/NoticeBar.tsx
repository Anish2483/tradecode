import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function NoticeBar() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden bg-[#0f62fe] text-white"
        >
          <div className="container-x flex items-center justify-between gap-4 py-2.5">
            <p className="text-xs font-medium flex items-center gap-2 flex-1 justify-center">
              <span className="hidden sm:inline text-white/70">New:</span>
              Tradecode Agentic AI Platform is now available for enterprise teams.{" "}
              <Link
                to="/services/agentic-ai"
                className="inline-flex items-center gap-1 font-semibold underline underline-offset-2 hover:no-underline"
              >
                Learn more <ArrowRight className="h-3 w-3" />
              </Link>
            </p>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss notice"
              className="shrink-0 grid h-6 w-6 place-items-center text-white/70 hover:text-white transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
