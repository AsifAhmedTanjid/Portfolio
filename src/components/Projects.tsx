"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, ArrowUpRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "Event Horizon",
    subtitle: "Event Management Platform",
    description:
      "A full-stack event management platform with a modern, space-themed UI and fully responsive design.",
    highlights: [
      "Firebase authentication (Email/Password + Google)",
      "Secure protected routes",
      "Real-time search and category filtering",
      "Event creation and management dashboard",
    ],
    tech: ["Next.js 16", "Tailwind CSS", "Firebase Auth", "Node.js", "Express"],
    link: "https://event-horizon-jet.vercel.app/",
    github: "https://github.com/AsifAhmedTanjid/EventHorizon",
    featured: true,
    category: "Full-Stack",
  },
  {
    name: "Flavorhood",
    subtitle: "Food Review Platform",
    description:
      "A food review platform for users to add, update, delete, and search reviews with responsive UI.",
    highlights: [
      "Firebase authentication and protected routes",
      "Favorites and dynamic review search",
      "User-specific review list",
      "MongoDB regex search",
    ],
    tech: ["React 19", "Vite", "Tailwind CSS", "DaisyUI", "Firebase", "TanStack Query"],
    link: "https://flavorhood.netlify.app/",
    github: "https://github.com/AsifAhmedTanjid/Flavourhood-client-side",
    featured: true,
    category: "Full-Stack",
  },
  {
    name: "E-Sports Tournament Management",
    subtitle: "Tournament API System",
    description:
      "RESTful API backend for managing e-sports tournaments, including teams, players, matches, and results.",
    highlights: [
      "CRUD operations for entities",
      "Player registration system",
      "Match scheduling logic",
      "Result tracking",
    ],
    tech: ["C#", "ASP.NET", "MSSQL"],
    link: null,
    github: "https://github.com/AsifAhmedTanjid/E-Sports-Tournament-Management-system",
    featured: false,
    category: "Backend",
  },
  {
    name: "Food Delivery System",
    subtitle: "Online Ordering Platform",
    description:
      "Online platform for food ordering and delivery, allowing users to browse menus, place orders, and track deliveries.",
    highlights: [
      "Admin panel for management",
      "Order tracking system",
      "Restaurant management",
      "User-friendly interface",
    ],
    tech: ["PHP", "JavaScript", "MySQL"],
    link: null,
    github: "https://github.com/AsifAhmedTanjid/FoodDeliverySystem",
    featured: false,
    category: "Full-Stack",
  },
  {
    name: "Super Shop Management",
    subtitle: "Retail Inventory System",
    description:
      "Desktop application for managing a retail shop's inventory, sales, and customer data.",
    highlights: [
      "Windows Forms GUI",
      "Oracle Database integration",
      "Inventory tracking",
      "Sales management",
    ],
    tech: ["C#", "Oracle Database", "Windows Forms"],
    link: null,
    github: "https://github.com/AsifAhmedTanjid/SuperShopManagementSystem",
    featured: false,
    category: "Desktop",
  },
  {
    name: "Criminal Activity Detection",
    subtitle: "Research Project",
    description:
      "Research on detecting criminal activities in real-time footage using deep convolutional neural networks.",
    highlights: [
      "91.56% accuracy achieved",
      "Utilized ResNet-50 and VGG-19 architectures",
      "Image recognition and classification",
      "Real-time footage analysis",
    ],
    tech: ["Python", "Deep Learning", "ResNet-50", "VGG-19"],
    link: null,
    github: null,
    featured: false,
    category: "AI/ML",
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Full-Stack", "Frontend", "Backend", "Desktop", "AI/ML"];
  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

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

      // Cards animation
      cardsRef.current.forEach((el) => {
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
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-background py-24 px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty mb-8">
            A collection of applications I have built, from full-stack platforms
            to AI-powered tools.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                size="sm"
                onClick={() => setFilter(category)}
                className={`text-sm ${
                  filter === category
                    ? "bg-primary text-white border border-primary"
                    : "bg-transparent text-foreground border border-border hover:bg-primary/10"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.name}
              ref={(el: HTMLDivElement | null) => {
                cardsRef.current[index] = el;
              }}
              className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-500 ${
                project.featured ? "lg:col-span-2" : ""
              }`}
            >
              {/* Project Header */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                    <p className="text-primary font-medium text-sm mb-3">
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                    {project.category}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-foreground mb-3">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {project.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium border border-accent/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  {project.link && (
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary hover:bg-primary/90"
                    >
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-foreground"
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
