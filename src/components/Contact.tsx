"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Send,
  ArrowRight,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const formTitleRef = useRef<HTMLDivElement>(null);
  const formInputsRef = useRef<
    (HTMLInputElement | HTMLTextAreaElement | null)[]
  >([]);
  const formButtonRef = useRef<HTMLButtonElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const contactInfoTitleRef = useRef<HTMLDivElement>(null);
  const contactCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const additionalInfoRef = useRef<HTMLDivElement>(null);
  const socialButtonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      gsap.fromTo(
        formTitleRef.current,
        { opacity: 0, x: -50, rotation: -5 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );

      formInputsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: formRef.current,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.5,
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.fromTo(
        formButtonRef.current,
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        contactInfoTitleRef.current,
        { opacity: 0, x: 50, rotation: 5 },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          duration: 0.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );

      contactCardsRef.current.forEach((el) => {
        if (!el) return;
        const randomX = (Math.random() - 0.5) * 80;
        const randomY = (Math.random() - 0.5) * 40;
        gsap.fromTo(
          el,
          { opacity: 0, x: randomX, y: randomY },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactInfoRef.current,
              start: "top 90%",
              end: "top 60%",
              scrub: 0.5,
              toggleActions: "play none none none",
            },
          }
        );
      });

      gsap.fromTo(
        additionalInfoRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: contactInfoRef.current,
            start: "top 90%",
            end: "top 60%",
            scrub: 0.5,
            toggleActions: "play none none none",
          },
        }
      );

      socialButtonsRef.current.forEach((el, index) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: contactInfoRef.current,
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormData({ name: "", email: "", message: "" }); // Clear form immediately

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!", {
          description: "I'll get back to you soon.",
          icon: <CheckCircle className="w-5 h-5" />,
          duration: 3000,
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Failed to send message", {
        description: "Please try again later.",
        icon: <AlertCircle className="w-5 h-5" />,
        duration: 3000,
      });
      // Optionally restore form data if submission fails
      // setFormData(formData)
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "asifahmedtanjid@gmail.com",
      href: "mailto:asifahmedtanjid@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+88 01812444020",
      href: "tel:+8801812444020",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dhaka, Bangladesh",
      href: null,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Asif Ahmed Tanjid",
      href: "https://www.linkedin.com/in/asifahmedtanjid",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-background py-24 px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let&apos;s discuss your next project
            and create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div
            ref={formRef}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <div ref={formTitleRef} className="mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Send a Message
              </h3>
              <p className="text-muted-foreground">
                Fill out the form below and I will respond soon.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  ref={(el) => {
                    formInputsRef.current[0] = el;
                  }}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  ref={(el) => {
                    formInputsRef.current[1] = el;
                  }}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  ref={(el) => {
                    formInputsRef.current[2] = el;
                  }}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                ref={(el) => {
                  formButtonRef.current = el;
                }}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Send className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          <div ref={contactInfoRef} className="space-y-8">
            <div ref={contactInfoTitleRef}>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Get in Touch
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I am excited about new opportunities and collaborations. Reach
                out to discuss your project or ideas.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                const content = (
                  <div
                    ref={(el) => {
                      contactCardsRef.current[index] = el;
                    }}
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="font-medium text-foreground">
                        {item.value}
                      </p>
                    </div>
                    {item.href && (
                      <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />
                    )}
                  </div>
                );

                return item.href ? (
                  <a
                    key={index}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="block hover:scale-[1.02] transition-transform"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                );
              })}
            </div>

            <div
              ref={additionalInfoRef}
              className="bg-card border border-border rounded-xl p-6"
            >
              <h4 className="font-semibold text-foreground mb-3">
                Response Time
              </h4>
              <p className="text-muted-foreground text-sm">
                I typically respond within 24 hours. For urgent inquiries, use
                phone or LinkedIn.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                ref={(el) => {
                  socialButtonsRef.current[0] = el;
                }}
                asChild
                variant="outline"
                size="sm"
                className="text-foreground"
              >
                <a
                  href="https://www.linkedin.com/in/asifahmedtanjid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
              <Button
                ref={(el) => {
                  socialButtonsRef.current[1] = el;
                }}
                asChild
                variant="outline"
                size="sm"
                className="text-foreground"
              >
                <a
                  href="https://github.com/AsifAhmedTanjid"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
