export interface Project {
    id: string;
    title: string;
    description: string;
    originalImage: string;
    imitationImage: string;
}

export const projects: Project[] = [
    {
        id: "app-dashboard",
        title: "Fintech Dashboard",
        description: "A clean, data-heavy dashboard design focusing on visual hierarchy and soft contrast.",
        originalImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        imitationImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
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
