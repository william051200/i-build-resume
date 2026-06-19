import type { Resume } from "../types";

/** Example resume used by the "Load sample" button. */
export function sampleResume(): Resume {
  return {
    fullName: "Jane Doe",
    title: "Senior Software Engineer",
    email: "jane.doe@example.com",
    phone: "+1 555 123 4567",
    location: "Seattle, WA",
    linkedin: "linkedin.com/in/janedoe",
    website: "janedoe.dev",
    summary:
      "Senior software engineer with 8+ years building scalable cloud services. Proven track record leading teams and shipping reliable, high-impact products.",
    skills:
      "JavaScript, TypeScript, Python, AWS, Docker, Kubernetes, System Design, Leadership",
    experience: [
      {
        title: "Senior Software Engineer",
        company: "Acme Cloud",
        location: "Seattle, WA",
        start: "Jan 2021",
        end: "Present",
        bullets:
          "Led migration of monolith to microservices, improving deploy speed 4x.\nMentored 5 engineers and established code review standards.\nReduced infrastructure costs by 30% through autoscaling.",
      },
      {
        title: "Software Engineer",
        company: "Bright Apps",
        location: "Portland, OR",
        start: "Jun 2017",
        end: "Dec 2020",
        bullets:
          "Built customer-facing dashboard used by 50k+ users.\nImproved API latency by 60% via caching and query tuning.",
      },
    ],
    education: [
      {
        degree: "B.Sc. Computer Science",
        school: "State University",
        location: "Eugene, OR",
        start: "2013",
        end: "2017",
        notes: "GPA 3.9 / Dean's List",
      },
    ],
    projects: [
      {
        name: "OpenResume CLI",
        link: "github.com/janedoe/openresume",
        description:
          "An open-source command-line tool for generating resumes from JSON. 1.2k+ stars.",
      },
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
      },
    ],
  };
}
