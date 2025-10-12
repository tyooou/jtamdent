"use client";

import { useState } from "react";

export default function Slogan() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("‎ ‎ ");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter an email address.");
      return;
    }

    setIsSubmitting(true);
    setMessage("‎ ‎ ");

    try {
      const response = await fetch("/api/emails", {
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
    } catch (error) {
      setMessage("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="gap-6 md:gap-8 flex flex-col text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
        Where every smile <br className="hidden sm:block" />
        <span className="sm:hidden">gets the spotlight.</span>
        <span className="hidden sm:inline">gets the spotlight.</span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto md:mx-0">
        Want more information? Enter your email below:
      </p>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto md:mx-0">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white p-4 sm:p-3 md:p-2 rounded-full flex-1 text-black text-base sm:text-base md:text-sm min-w-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-8 py-4 sm:px-6 sm:py-3 md:px-4 md:py-2 rounded-full hover:bg-zinc-800 active:bg-zinc-900 text-base sm:text-base md:text-sm whitespace-nowrap transition-colors focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
        {message && (
          <p className="mt-4 text-base sm:text-lg md:text-xl text-white text-center md:text-left">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
