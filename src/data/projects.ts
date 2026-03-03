export interface Project {
    id: string;
    title: string;
    description: string;
    originalImage: string;
    imitationImage: string;
    interactive?: boolean;
    referenceEmbed?: string; // iframe src URL
    referenceUser?: { name: string; url: string };
}

export const projects: Project[] = [
    {
        id: "ios-curl-animation",
        title: "iOS Page Curl",
        description: "An interactive recreation of the classic iOS page curl transition — the corner-peel effect used in iBooks and Apple Maps. Drag any corner to peel the page back and reveal the reverse side.",
        originalImage: "/images/love-jones-cover.jpg",
        imitationImage: "/images/love-jones-cover.jpg",
        interactive: true,
        referenceEmbed: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7431057068884885504?collapsed=1",
        referenceUser: {
            name: "Minsang Choi",
            url: "https://www.linkedin.com/posts/minsangchoi_metalshader-activity-7431057118914490368-L5TN"
        }
    },
    {
        id: "editorial-blog",
        title: "Editorial Blog",
        description: "An exploration of serif typography and irregular grid layouts often found in premium editorial sites.",
        originalImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200",
        imitationImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=1200",
    },
    {
        id: "creative-portfolio",
        title: "Creative Portfolio",
        description: "A highly animated and interactive portfolio concept with large typography and masked images.",
        originalImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
        imitationImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    },
];
