"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Calendar, MapPin, Building2, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "NN Services and Engineering Limited",
    role: "Software Developer",
    period: "Oct 2025 – Present",
    location: "Dhaka, Bangladesh",
    type: "Full-time",
    current: true,
    bullets: [
      "Maintaining and extending Odoo 18 ERP modules, building custom modules using Python, XML, Odoo ORM.",
      "Developing HRM system with Next.js, TypeScript, Express, and PostgreSQL, focusing on attendance tracking.",
      "Implementing secure REST APIs and integrating them with the HRM frontend for real-time attendance and employee data processing.",
    ],
    technologies: ["Python", "XML", "Odoo", "Next.js", "TypeScript", "Express", "PostgreSQL"],
  },
  {
    company: "American International University-Bangladesh",
    role: "IT Intern",
    period: "Jan 2024 – May 2024",
    location: "Dhaka, Bangladesh",
    type: "Internship",
    current: false,
    bullets: [
      "Configured and troubleshot network devices using PuTTY for SSH access to routers and switches, implementing VLAN configurations and firewall rules.",
      "Deployed and maintained LAN/Wi-Fi infrastructure, including static IP assignments, router configurations, and Ethernet cabling for labs and classrooms.",
    ],
    technologies: ["PuTTY", "SSH", "VLAN", "Networking"],
  },
];

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
        },
      });

      // Timeline progress line animation
      gsap.fromTo(
        progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top",
          ease: "none",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
          },
        }
      );

      // Individual experience cards + dot animations
      itemsRef.current.forEach((el, index) => {
        if (!el) return;

        const isEven = index % 2 === 0;

        // Card entrance animation
        gsap.fromTo(
          el,
          {
            opacity: 0,
            x: isEven ? -100 : 100,
            y: 50,
            scale: 0.8,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 15%",
              toggleActions: "play none none none", // Changed to prevent reverse
            },
          }
        );

        // Timeline dot animation
        const dot = el.querySelector(".timeline-dot");
        if (dot) {
          gsap.fromTo(
            dot,
            {
              backgroundColor: "rgba(156, 163, 175, 0.6)", // muted-foreground
              scale: 1,
              boxShadow: "none",
            },
            {
              backgroundColor: "rgb(59, 130, 246)", // primary
              scale: 1.5,
              boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
              duration: 0.3,
              ease: "power2.out",
              scrollTrigger: {
                trigger: el,
                start: "top 60%",
                end: "bottom 40%",
                toggleActions: "play none none none", // Changed to prevent reverse
              },
            }
          );
        }

        // Card hover animations
        const card = el.querySelector(".experience-card");
        if (card) {
          gsap.set(card, { transformOrigin: "center" });

          card.addEventListener("mouseenter", () => {
            gsap.to(card, {
              scale: 1.02,
              y: -5,
              duration: 0.3,
              ease: "power2.out",
            });
          });

          card.addEventListener("mouseleave", () => {
            gsap.to(card, {
              scale: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-20 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            <Building2 className="w-4 h-4" />
            Professional Journey
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Work Experience
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Building scalable applications and exploring cutting-edge
            technologies across various domains, from full-stack development to
            AI and quantitative analysis.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Static line */}
          <div className="absolute left-5 sm:left-7 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-border/30"></div>
          {/* Animated progress line */}
          <div
            ref={progressLineRef}
            className="absolute left-5 sm:left-7 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/80 to-primary/40 origin-top"
          ></div>

          <div className="space-y-12 lg:space-y-16">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={(el) => {
                  itemsRef.current[index] = el;
                }}
                className={`flex items-start ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } flex-col lg:items-center max-w-76 sm:max-w-full`}
              >
                {/* Timeline dot */}
                <div
                  className={`timeline-dot absolute left-5 sm:left-7 lg:left-1/2 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-4 border-background z-20 transition-all duration-300 ${
                    exp.current
                      ? "bg-primary shadow-lg shadow-primary/50"
                      : "bg-muted-foreground/60"
                  }`}
                  style={{ transform: "translateX(-50%)" }}
                >
                  {exp.current && (
                    <div className="absolute inset-1 bg-primary-foreground rounded-full animate-pulse"></div>
                  )}
                  {exp.current && (
                    <div className="absolute -inset-2 border-2 border-primary/30 rounded-full animate-ping"></div>
                  )}
                </div>

                {/* Experience card */}
                <div
                  className={`ml-12 sm:ml-16 lg:ml-0 lg:w-5/12 ${
                    index % 2 === 0 ? "lg:mr-12" : "lg:ml-12"
                  } w-full`}
                >
                  <div className="experience-card group bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:border-primary/20">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                      <div className="flex-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {exp.role}
                        </h3>
                        <div className="flex items-center gap-2 text-primary font-semibold mb-3">
                          <Building2 className="w-5 h-5" />
                          <span className="text-lg">{exp.company}</span>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                          exp.current
                            ? "bg-primary/15 text-primary border border-primary/20"
                            : "bg-muted/80 text-muted-foreground border border-border/50"
                        }`}
                      >
                        {exp.type}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-primary/10 rounded-lg">
                          <Calendar className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-secondary/50 rounded-lg">
                          <MapPin className="w-4 h-4 text-secondary-foreground" />
                        </div>
                        <span className="font-medium">{exp.location}</span>
                      </div>
                    </div>

                    {/* Bullets */}
                    <ul className="space-y-3 mb-8">
                      {exp.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm sm:text-base text-foreground/90 leading-relaxed flex items-start gap-3"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary/60 rounded-full mt-2.5 flex-shrink-0"></div>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Technologies Used
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1.5 bg-secondary/80 hover:bg-secondary text-secondary-foreground rounded-lg text-sm font-medium transition-colors hover:scale-105 transform duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden lg:block lg:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
