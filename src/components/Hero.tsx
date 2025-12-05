"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Github, Linkedin, Mail, Download, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const elements = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.from(elements.current.filter(Boolean), {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5,
    });

    // Floating animation for the profile image
    gsap.to(elements.current[0], {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: 2,
    });
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="pt-25 sm:pt-0 min-h-screen flex items-center justify-center bg-background relative overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div
        ref={heroRef}
        className="text-center max-w-4xl mx-auto px-4 relative z-10"
      >
        {/* Profile Image */}
        <div
          ref={(el) => {
            elements.current[0] = el;
          }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-accent p-1">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold text-primary">
              AT
            </div>
          </div>
        </div>

        {/* Name and Title */}
        <div
          ref={(el) => {
            elements.current[1] = el;
          }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-balance">
            <span className="text-foreground">Asif Ahmed</span>{" "}
            <span className="text-primary">Tanjid</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Software Engineer
          </p>
        </div>

        {/* Description */}
        <div
          ref={(el) => {
            elements.current[2] = el;
          }}
          className="mb-8"
        >
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            <em className="text-accent not-italic">
              Building clean, scalable applications.
            </em>{" "}
            Motivated junior Software Engineer with hands-on experience in full-stack development using React, Next.js, Node.js, and Odoo customization.
          </p>
        </div>

        {/* Contact Info */}
        <div
          ref={(el) => {
            elements.current[3] = el;
          }}
          className="mb-8 text-sm text-muted-foreground space-y-1"
        >
          <p>Dhaka, Bangladesh • (+880) 1812444020</p>
          <p>asifahmedtanjid@gmail.com</p>
        </div>

        {/* Action Buttons */}
        <div
          ref={(el) => {
            elements.current[4] = el;
          }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <Button
            onClick={scrollToContact}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base cursor-pointer"
          >
            <Mail className="w-4 h-4 mr-2" />
            Get In Touch
          </Button>
          <Button
            variant="outline"
            asChild
            className="border-border hover:bg-secondary px-8 py-3 text-base bg-transparent"
          >
            <a href="/Asif Ahmed Tanjid_Resume.pdf" download>
              <Download className="w-4 h-4 mr-2 text-foreground" />
              <span className="text-foreground">Download CV</span>
            </a>
          </Button>
        </div>

        {/* Social Links */}
        <div
          ref={(el) => {
            elements.current[5] = el;
          }}
          className="flex justify-center space-x-6 mb-12"
        >
          <a
            href="https://github.com/AsifAhmedTanjid"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/asifahmedtanjid"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:asifahmedtanjid@gmail.com"
            className="p-3 rounded-full bg-secondary/50 hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={(el) => {
            elements.current[6] = el;
          }}
          className="animate-bounce"
        >
          <button
            onClick={scrollToAbout}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
