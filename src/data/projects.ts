export interface Project {
  id: string;
  title: string;
  description: string;
  originalImage: string;
  imitationImage: string;
  previewMedia?: ProjectPreviewMedia;
  interactive?: boolean;
  interactiveDemo?: "page-curl" | "wiper-typography";
  referenceEmbed?: string; // iframe src URL
  referenceUser?: { name: string; url: string };
}

export interface ProjectPreviewMediaSource {
  src: string;
  type: "video/mp4" | "video/webm";
}

export interface ProjectPreviewMedia {
  type: "video";
  poster: string;
  sources: ProjectPreviewMediaSource[];
}

export const projects: Project[] = [
  {
    id: "ios-curl-animation",
    title: "iOS Page Curl",
    description:
      "An interactive recreation of the classic iOS page curl transition — the corner-peel effect used in iBooks and Apple Maps. Drag any corner to peel the page back and reveal the reverse side.",
    originalImage: "/images/love-jones-cover.jpg",
    imitationImage: "/images/love-jones-cover.jpg",
    previewMedia: {
      type: "video",
      poster: "/images/love-jones-cover.jpg",
      sources: [
        {
          src: "/videos/ios-curl-animation-preview.webm?v=20260311e",
          type: "video/webm",
        },
        {
          src: "/videos/ios-curl-animation-preview.mp4?v=20260311e",
          type: "video/mp4",
        },
      ],
    },
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
    previewMedia: {
      type: "video",
      poster: "/images/wiper-typography-cover.png",
      sources: [
        {
          src: "/videos/wiper-typography-preview.webm?v=20260311g",
          type: "video/webm",
        },
        {
          src: "/videos/wiper-typography-preview.mp4?v=20260311g",
          type: "video/mp4",
        },
      ],
    },
    interactive: true,
    interactiveDemo: "wiper-typography",
    referenceEmbed: "https://www.youtube.com/embed/cpEeqACsF_Q?start=588",
    referenceUser: {
      name: "Jongmin Kim",
      url: "https://blog.cmiscm.com/?page_id=3023",
    },
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
