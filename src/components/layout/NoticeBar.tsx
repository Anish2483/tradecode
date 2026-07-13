import { useState } from "react";
import { X, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

export function NoticeBar() {
  const [visible, setVisible] = useState(true);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden bg-brand text-brand-foreground"
        >
          <div className="container-x flex items-center justify-between gap-4 py-2.5">
            <div className="flex-1" />
            <div className="flex items-center gap-2 text-sm font-medium text-center">
              <Zap className="h-3.5 w-3.5 shrink-0" />
              <span>
                🚀 Tradecode is now accepting AI & Robotics projects for Q3 2025.{" "}
                <Link to="/contact" className="underline underline-offset-2 hover:opacity-80 font-semibold">
                  Book a free consultation →
                </Link>
              </span>
            </div>
            <div className="flex-1 flex justify-end">
              <button
                onClick={() => setVisible(false)}
                aria-label="Dismiss notice"
                className="grid h-6 w-6 place-items-center rounded hover:bg-white/20 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
