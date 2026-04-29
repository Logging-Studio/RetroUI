export const blockConfig: {
    blocks: {
        name: string;
        slug: string;
        stage: string;
        type: string;
        cover_image: string;
        description: string | null;
        platform: string;
    }[];
} = {
    blocks: [{
        name: "About Us",
        slug: "about-us",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/about_us.png",
        description: "Tell your company's story and mission.",
        platform: "react"
    }, {
        name: "Artificial Intelligence",
        slug: "ai",
        stage: "published",
        type: "application",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/ai.png",
        description: "AI-powered chat interfaces and assistants.",
        platform: "react"
    }, {
        name: "Authentication",
        slug: "authentication",
        stage: "published",
        type: "application",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/auth.png",
        description: "Sign-in & sign-up screens.",
        platform: "react"
    }, {
        name: "Bento Grids",
        slug: "bento-grids",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/bento_grid.png",
        description: "Modern grid layouts with varied content blocks.",
        platform: "react"
    }, {
        name: "Blogs",
        slug: "blogs",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/blogs.png",
        description: "Display your articles",
        platform: "react"
    }, {
        name: "Call to Action",
        slug: "call-to-action",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/cta.png",
        description: "Compelling CTAs to drive user engagement.",
        platform: "react"
    }, {
        name: "Cards",
        slug: "cards",
        stage: "published",
        type: "application",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/card.png",
        description: "Versatile card layouts for various content types.",
        platform: "react"
    }, {
        name: "Career Sections",
        slug: "career-sections",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/career.png",
        description: "Showcase job openings and career opportunities.",
        platform: "react"
    }, {
        name: "Contact Us",
        slug: "contact-sections",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/contact_us.png",
        description: "Contact forms and information sections.",
        platform: "react"
    }, {
        name: "FAQ",
        slug: "faq",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/faq.png",
        description: "Frequently asked questions and answers.",
        platform: "react"
    }, {
        name: "FAQ Sections",
        slug: "faq-sections",
        stage: "draft",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/faq.png",
        description: "Answer common questions about your product.",
        platform: "react"
    }, {
        name: "Feature Blocks",
        slug: "feature-blocks",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/features.png",
        description: "Showcase your product's features and benefits.",
        platform: "react"
    }, {
        name: "Footer",
        slug: "footer",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/footer.png",
        description: "Website footers with links and information.",
        platform: "react"
    }, {
        name: "Forms",
        slug: "forms",
        stage: "published",
        type: "application",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/forms.png",
        description: "User-friendly forms for data collection.",
        platform: "react"
    }, {
        name: "Hero Sections",
        slug: "hero-sections",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/hero_section.png",
        description: "Eye-catching landing page hero sections.",
        platform: "react"
    }, {
        name: "Navbar",
        slug: "navbar",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/navbar.png",
        description: "Navigation bars and menus for your website.",
        platform: "react"
    }, {
        name: "Onboarding",
        slug: "onboarding",
        stage: "published",
        type: "application",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/onboarding.png",
        description: "User onboarding flows and welcome screens.",
        platform: "react"
    }, {
        name: "Pricing Tables",
        slug: "pricing-tables",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/pricing.png",
        description: "Clear pricing tables to showcase your plans.",
        platform: "react"
    }, {
        name: "Profile",
        slug: "profile",
        stage: "published",
        type: "application",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/profile.png",
        description: "Account profile",
        platform: "react"
    }, {
        name: "RetroUI Site",
        slug: "retroui-site",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/retroui_site.png",
        description: "Complete RetroUI website template.",
        platform: "react"
    }, {
        name: "Sidebar",
        slug: "sidebar",
        stage: "published",
        type: "application",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/sidebar.png",
        description: "Application sidebars and navigation panels.",
        platform: "react"
    }, {
        name: "Stats",
        slug: "stats",
        stage: "published",
        type: "application",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/stats.png",
        description: "Statistics and metrics display components.",
        platform: "react"
    }, {
        name: "Team",
        slug: "team",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/team.png",
        description: "Showcase your team members and leadership.",
        platform: "react"
    }, {
        name: "Testimonials",
        slug: "testimonials",
        stage: "published",
        type: "marketing",
        cover_image: "https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/blocks/testimonial.png",
        description: "Display customer reviews and testimonials.",
        platform: "react"
    }]

}

