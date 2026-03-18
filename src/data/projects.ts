export interface Project {
  id: string;
  title: string;
  description: string;
  originalImage: string;
  imitationImage: string;
  previewMedia?: ProjectPreviewMedia;
  interactive?: boolean;
  interactiveDemo?: "page-curl" | "wiper-typography" | "bw-circle";
  referenceEmbed?: string; // iframe src URL
  referencePreview?: ProjectReferencePreview;
  referenceUser?: { name: string; url: string };
}

export interface ProjectReferencePreview {
  embed?: "official";
  platform: "threads";
  url: string;
  image: string;
  title: string;
  description: string;
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
    id: "black-white-circle",
    title: "Black & White Circle",
    description:
      "A monochrome yin-yang playground recreating SABUM's black and white circle study with a second pseudo-sync mode driven by YouTube playback time.",
    originalImage: "/images/black-white-circle-cover.svg",
    imitationImage: "/images/black-white-circle-cover.svg",
    interactive: true,
    interactiveDemo: "bw-circle",
    referencePreview: {
      embed: "official",
      platform: "threads",
      url: "https://www.threads.com/@byunsabum/post/DTkg4CWkyVS",
      image: "/images/threads-black-white-circle-reference.jpg",
      title: "Sabum Byun on Threads",
      description:
        "Inspired by the black and white spoon silhouettes in the stage background of Netflix's Culinary Class Wars, I reimagined the visual using Vibe Coding. The design features black and white symmetry with contrasting backgrounds, where the small circles inside represent the competing chefs.",
    },
    referenceUser: {
      name: "SABUM",
      url: "https://www.threads.com/@byunsabum/post/DTkg4CWkyVS",
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
