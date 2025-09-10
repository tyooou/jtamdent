"use client";

import { useEffect } from "react";

export default function InstagramSection() {
  useEffect(() => {
    // Load EmbedSocial script
    const loadScript = () => {
      // Check if script already exists
      if (document.getElementById("EmbedSocialHashtagScript")) {
        return;
      }

      const script = document.createElement("script");
      script.id = "EmbedSocialHashtagScript";
      script.src = "https://embedsocial.com/cdn/ht.js";
      script.async = true;
      document.getElementsByTagName("head")[0].appendChild(script);
    };

    loadScript();

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
    <div
      className="embedsocial-hashtag"
      data-ref="cb9c0965f4c4339654109d39e1ae2a6f6db179e6"
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
  );
}
