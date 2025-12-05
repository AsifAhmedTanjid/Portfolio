"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Animate title
      if (titleRef.current) {
        tl.from(titleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Animate content
      if (contentRef.current) {
        tl.from(
          contentRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }

      const animateSkills = () => {
        if (skillsRef.current) {
          const skillElements =
            skillsRef.current.querySelectorAll(".skill-item");
          if (skillElements.length > 0) {
            gsap.set(skillElements, { opacity: 0, y: 20 });

            gsap.to(skillElements, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: skillsRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            });
          }
        }
      };

      setTimeout(animateSkills, 200);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const techStack = [
    "JavaScript",
    "TypeScript",
    "React.js",
    "Next.js",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "MongoDB",
    "Python",
    "C#"
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen bg-background from-background via-background to-muted/20 py-24 px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-pattern opacity-50"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            About Me
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text">
            Software Engineer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Passionate about building clean, scalable applications and delivering efficient business solutions
          </p>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-primary rounded-full"></div>
                  Current Role
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I am currently working at{" "}
                  <span className="text-primary font-semibold">
                    NN Services and Engineering Limited
                  </span>
                  , where I maintain and extend Odoo 18 ERP modules and develop HRM systems.
                </p>
              </div>

              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:bg-card/80 transition-all duration-300">
                <h3 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-accent rounded-full"></div>
                  Expertise
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I specialize in full-stack development using React, Next.js, Node.js, and Odoo customization. I am eager to contribute to a collaborative engineering team while continuously learning.

                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 via-accent/20 to-transparent rounded-3xl p-8 backdrop-blur-sm border border-border/50">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Quality Focused
                  </h3>
                  <p className="text-muted-foreground">
                    Committed to writing clean, maintainable code with
                    comprehensive testing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Current Tech Stack
            </h3>
            <p className="text-muted-foreground">
              Technologies I work with on a daily basis
            </p>
          </div>

          <div
            ref={skillsRef}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6"
          >
            {techStack.map((skill, index) => (
              <div key={index} className="skill-item group relative">
                <div className="bg-gradient-to-br from-card via-card to-card/50 backdrop-blur-sm border border-border/50 rounded-xl px-6 py-4 text-center hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-accent/5 transition-all duration-300 cursor-default hover:scale-105 hover:-translate-y-1 shadow-lg hover:shadow-xl">
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {skill}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
