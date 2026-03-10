// portfolio-data.js
// This file acts as your "database". 
// To add a new project, simply copy one of the blocks inside the [ ] brackets, paste it below, and change the text/images!

const portfolioData = {
    // ----------------------------------------------------
    // 1. GRAPHIC DESIGN & UI CONCEPTS
    // Add images to your folder and update the "image" link.
    // ----------------------------------------------------
    graphics: [
        {
            id: "img1-src", // Must be unique for the pop-up modal to work
            title: "Cyberpunk Branding",
            category: "Brand Identity",
            image: "assets/images/graphic.png",
            fallbackImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
            description: "Futuristic visual branding system with glowing aesthetics and bold typography."
        },
        {
            id: "img2-src",
            title: "Neon Campaign",
            category: "Marketing Visuals",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
            fallbackImage: "",
            description: "Social media creative campaign driving engagement through dynamic visual storytelling."
        },
        {
            id: "img3-src",
            title: "UI Concept Alpha",
            category: "UX/UI Design",
            image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
            fallbackImage: "",
            description: "Dark-mode user interface design exploring glassmorphism and minimal interaction patterns."
        },
        {
            id: "img4-src",
            title: "Fintech Dash",
            category: "UX/UI Concepts",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
            fallbackImage: "",
            description: "Modern dashboard interface featuring data visualizations and sleek neon typography."
        }
        // TO ADD MORE: Paste a new block here (don't forget the comma on the previous one!)
    ],

    // ----------------------------------------------------
    // 2. CINEMATIC SHOWREEL (VIDEOS)
    // ----------------------------------------------------
    videos: [
        {
            title: "Cinematic Travel Film",
            description: "Visual storytelling focused on cultural exploration with dramatic neon lighting.",
            thumbnail: "assets/images/video.png",
            fallbackThumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=600&auto=format&fit=crop"
        },
        {
            title: "Creative Showreel 2024",
            description: "A cinematic compilation of freelance video editing projects and motion graphics.",
            thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=600&auto=format&fit=crop",
            fallbackThumbnail: ""
        }
    ]
};
