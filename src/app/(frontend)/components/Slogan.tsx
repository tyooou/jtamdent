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
    <div className="gap-4 flex flex-col">
      <h1 className="text-7xl font-bold">
        Where every smile <br />
        gets the spotlight.
      </h1>
      <p className="text-xl">Want more information? Enter your email below:</p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white p-2 rounded-full flex-1 text-black w-[100px]"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-black text-white px-4 py-2 rounded-full hover:bg-zinc-800"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>
        </div>
        {message && <p className="mt-2 text-xl text-white">{message}</p>}
      </form>
    </div>
  );
}
