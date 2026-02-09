"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function UnsubscribePage() {
  const [email, setEmail] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, reason }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("You have been successfully unsubscribed from our mailing list.");
        setEmail("");
        setReason("");
      } else {
        setStatus("error");
        setMessage(data.error || "An error occurred. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("An error occurred. Please try again.");
      console.error("Unsubscribe error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Unsubscribe
          </h1>
          <p className="text-gray-400 text-base sm:text-lg">
            We&apos;re sorry to see you go.
          </p>
        </div>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-white text-lg font-medium mb-8">{message}</p>
            <button
              onClick={() => (window.location.href = "/")}
              className="inline-block px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition text-sm font-medium"
            >
              Return to Home
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-6 py-4 bg-transparent border-b-2 border-gray-700 text-white text-lg focus:border-white outline-none transition placeholder-gray-500"
                placeholder="your.email@example.com"
                disabled={status === "loading"}
              />
            </div>

            <div>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full px-6 py-4 bg-transparent border-b-2 border-gray-700 text-white text-lg focus:border-white outline-none transition resize-none placeholder-gray-500"
                placeholder="Reason (optional)"
                disabled={status === "loading"}
              />
            </div>

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-red-400 text-sm"
              >
                {message}
              </motion.div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {status === "loading" ? "Processing..." : "Unsubscribe"}
              </button>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="text-sm text-gray-500 hover:text-white transition bg-none border-none cursor-pointer p-0"
              >
                Changed your mind? Return to home.
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
