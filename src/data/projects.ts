export interface Project {
  id: string;
  title: string;
  description: string;
  originalImage: string;
  imitationImage: string;
  interactive?: boolean;
  interactiveDemo?: "page-curl" | "wiper-typography";
  referenceEmbed?: string; // iframe src URL
  referenceUser?: { name: string; url: string };
}

export const projects: Project[] = [
  {
    id: "ios-curl-animation",
    title: "iOS Page Curl",
    description:
      "An interactive recreation of the classic iOS page curl transition — the corner-peel effect used in iBooks and Apple Maps. Drag any corner to peel the page back and reveal the reverse side.",
    originalImage: "/images/love-jones-cover.jpg",
    imitationImage: "/images/love-jones-cover.jpg",
    interactive: true,
    interactiveDemo: "page-curl",
    referenceEmbed:
      "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7431057068884885504?collapsed=1",
    referenceUser: {
      name: "Minsang Choi",
      url: "https://www.linkedin.com/posts/minsangchoi_metalshader-activity-7431057118914490368-L5TN",
    },
  },
  {
    id: "wiper-typography",
    title: "Wiper Typography",
    description:
      "A typography-based wipe simulation inspired by FFF where a moving band mechanically reveals and transforms text in real time with cursor control.",
    originalImage: "/images/wiper-typography-cover.png",
    imitationImage: "/images/wiper-typography-cover.png",
    interactive: true,
    interactiveDemo: "wiper-typography",
    referenceEmbed: "https://youtu.be/cpEeqACsF_Q?si=wlaLq1Gm4Ntcn731&t=588",
  },
  {
    id: "creative-portfolio",
    title: "Creative Portfolio",
    description:
      "A highly animated and interactive portfolio concept with large typography and masked images.",
    originalImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    imitationImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
  },
];
