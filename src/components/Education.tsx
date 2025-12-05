"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  GraduationCap,
  MapPin,
  Award,
  BookOpen,
  Globe,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const degreeRef = useRef<HTMLHeadingElement>(null);
  const universityRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);
  const learningRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Education card animations
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.5, rotation: -15 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        degreeRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        universityRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );

      if (detailsRef.current) {
        const detailItems = detailsRef.current.querySelectorAll("div");
        detailItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
              delay: index * 0.1, // Slight stagger for details
              scrollTrigger: {
                trigger: contentRef.current,
                start: "top 90%",
                end: "top 60%",
                scrub: 0.5,
                toggleActions: "play none none none",
              },
            }
          );
        });
      }

      gsap.fromTo(
        linkRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );

      // Additional learning cards animation
      learningRefs.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50, // Left for first, right for second
            rotation: index % 2 === 0 ? -5 : 5,
          },
          {
            opacity: 1,
            x: 0,
            rotation: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.5,
              toggleActions: "play none none none",
            },
          }
        );

        const icon = el.querySelector("svg");
        if (icon) {
          gsap.fromTo(
            icon,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                end: "top 60%",
                scrub: 0.5,
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="bg-background py-24 px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <div ref={contentRef} className="text-center">
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Education
            </h2>
            <p className="text-xl text-muted-foreground text-pretty">
              Academic foundation in computer science and engineering.
            </p>
          </div>

          {/* Education Card */}
          <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300">
            {/* University Logo/Icon */}
            <div ref={logoRef} className="flex justify-center mb-6">
              <div className="p-4 bg-primary/10 rounded-full">
                <GraduationCap className="w-12 h-12 text-primary" />
              </div>
            </div>

            {/* Degree Information */}
            <div className="space-y-4">
              <h3
                ref={degreeRef}
                className="text-3xl font-bold text-foreground"
              >
                Bachelor of Science in Computer Science and Engineering
              </h3>

              <div
                ref={universityRef}
                className="text-primary font-semibold text-lg"
              >
                American International University-Bangladesh
              </div>

              {/* Details Grid */}
              <div
                ref={detailsRef}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-border"
              >
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Dhaka, Bangladesh</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Sept 2020 - June 2024</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span className="text-sm">Computer Science</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">CGPA: 3.98 / 4.00</span>
                </div>
              </div>

              {/* University Link */}
              <div ref={linkRef} className="mt-6">
                <a
                  href="https://www.aiub.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  Visit University Website
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Additional Learning */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              ref={(el) => {
                if (el) {
                  learningRefs.current[0] = el;
                }
              }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  Honors & Awards
                </h4>
              </div>
              <p className="text-muted-foreground text-sm">
                Summa Cum Laude Honors and Gold Medal (2025). Dean&apos;s List Honors (5 semesters).
              </p>
            </div>

            <div
              ref={(el) => {
                if (el) {
                  learningRefs.current[1] = el;
                }
              }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Globe className="w-5 h-5 text-accent" />
                </div>
                <h4 className="text-lg font-semibold text-foreground">
                  Certifications
                </h4>
              </div>
              <p className="text-muted-foreground text-sm">
                CISCO IT Essentials Certificate (2021).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
