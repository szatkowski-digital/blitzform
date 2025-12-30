import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

export default function BottomSlideModal({
  show,
  onClose,
  message,
  duration = 3000,
}) {
  useEffect(() => {
    if (!show) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [show, duration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 w-full bg-n-8 p-6 shadow-lg flex justify-center items-center gap-6 z-50 border-t border-n-3"
        >
          <p className="body-sm">{message}</p>
          <button
            onClick={onClose}
            className="text-n-1 px-4 py-2 hover:bg-n-1 hover:text-n-8 cursor-pointer"
          >
            Zamknij
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
