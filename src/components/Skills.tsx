"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code, Database, Cloud, Brain, Globe } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: [
      { name: "JavaScript" },
      { name: "TypeScript" },
      { name: "C++" },
      { name: "C#" },
      { name: "Python" },
      { name: "PHP" },
      { name: "SQL" },
      { name: "HTML5" },
      { name: "CSS3" },
    ],
  },
  {
    title: "Frameworks/Technologies",
    icon: Cloud,
    skills: [
      { name: "React.js" },
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "Express.js" },
      { name: "ASP.NET" },
      { name: "Git" },
      { name: "GitHub" },
      { name: "Firebase" },
      { name: "Vercel" },
      { name: "Netlify" },
      { name: "MATLAB" },
      { name: "MS Excel" },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "MongoDB" },
      { name: "MySQL" },
      { name: "PostgreSQL" },
    ],
  },
  {
    title: "Soft Skills",
    icon: Brain,
    skills: [
      { name: "Problem Solving" },
      { name: "Communication" },
      { name: "Teamwork" },
      { name: "Decision Making" },
      { name: "Project Management" },
      { name: "Observation" },
    ],
  },
  {
    title: "Spoken Languages",
    icon: Globe,
    skills: [
      { name: "Bangla" },
      { name: "English" },
      { name: "Hindi" },
    ],
  },
];

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Category cards animation
      categoriesRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
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

        // Skill tags animation with arranging effect
        const skillTags = el.querySelectorAll(".skill-tag");
        skillTags.forEach((tag) => {
          // Randomize initial position for arranging effect
          const randomX = (Math.random() - 0.5) * 100; // Random x: -50 to 50
          const randomY = (Math.random() - 0.5) * 50; // Random y: -25 to 25
          gsap.fromTo(
            tag,
            { opacity: 0, scale: 0.8, x: randomX, y: randomY },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
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
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="bg-background py-24 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            A comprehensive toolkit spanning full-stack development, AI/ML, and
            modern DevOps practices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.title}
                ref={(el) => {
                  categoriesRef.current[index] = el;
                }}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="skill-tag bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-full px-4 py-2 transition-all duration-300 hover:scale-105 cursor-default"
                    >
                      <span className="text-foreground font-medium text-sm">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
