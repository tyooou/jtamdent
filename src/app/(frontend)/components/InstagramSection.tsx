"use client";

import { useEffect } from "react";

export default function InstagramSection() {
  useEffect(() => {
    // Load EmbedSocial script
    const script = document.createElement("script");
    script.src = "https://embedsocial.com/cdn/ht.js";
    script.id = "EmbedSocialHashtagScript";

    // Only load if not already loaded
    if (!document.getElementById("EmbedSocialHashtagScript")) {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup script on unmount
      const existingScript = document.getElementById(
        "EmbedSocialHashtagScript"
      );
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <div className="text-black flex flex-col items-center p-10 gap-10 md:gap-20 md:flex-row">
      <div
        className="embedsocial-hashtag"
        data-ref="13e1431e4f66a9103247f1cce32bc3bfe999b984"
      >
        <a
          className="feed-powered-by-es feed-powered-by-es-feed-img es-widget-branding"
          href="https://embedsocial.com/social-media-aggregator/"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram widget"
        >
          <img
            src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp"
            alt="EmbedSocial"
          />
          <div className="es-widget-branding-text">Instagram widget</div>
        </a>
      </div>
    </div>
  );
}
