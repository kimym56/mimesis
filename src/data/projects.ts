export interface Project {
    id: string;
    title: string;
    description: string;
    originalImage: string;
    imitationImage: string;
    interactive?: boolean;
    referenceEmbed?: string; // iframe src URL
}

export const projects: Project[] = [
    {
        id: "ios-curl-animation",
        title: "iOS Page Curl",
        description: "An interactive recreation of the classic iOS page curl transition — the corner-peel effect used in iBooks and Apple Maps. Drag any corner to peel the page back and reveal the reverse side.",
        originalImage: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200",
        imitationImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        interactive: true,
        referenceEmbed: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7431057068884885504?collapsed=1",
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
