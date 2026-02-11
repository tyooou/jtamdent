"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Slogan() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("‎ ‎ ");
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    if (message && message !== "‎ ‎ ") {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("‎ ‎ ");

    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Thank you! We'll send you the pricing brochure soon.");
        setEmail("");
      } else {
        const errorData = await response.json();
        setMessage(
          errorData.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
      console.error("Error submitting email:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="gap-6 md:gap-8 flex flex-col text-left">
      <h1 className="text-6xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight">
        Dental content simplified.
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-zinc-200 mt-0">
        Where every smile gets the spotlight.
      </h2>
      <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto md:mx-0">
          Want more information? Enter your email below for an free info and price brochure:
      </p>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto md:mx-0 w-full">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 w-full">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white py-2 px-6 pl-8 sm:px-6 md:px-4 rounded-full flex-1 text-black text-base sm:text-base md:text-sm min-w-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none w-full"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 md:px-4 md:py-2 rounded-full hover:bg-zinc-800 active:bg-zinc-900 text-base sm:text-base md:text-sm whitespace-nowrap transition-colors focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none disabled:opacity-50 w-full sm:w-auto cursor-pointer"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
        <AnimatePresence>
          {message && message !== "‎ ‎ " && showMessage && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-4 text-base sm:text-lg md:text-xl text-white text-center md:text-left"
            >
              {message}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
