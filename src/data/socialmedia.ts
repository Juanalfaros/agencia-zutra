export interface SocialMedia {
    name: string;
    url: string;
    icon: string;
    ariaLabel: string;
}

export const socialMedia: SocialMedia[] = [
    {
        name: "Instagram",
        url: "https://www.instagram.com/tuagenciazutra/",
        icon: "ph-duotone ph-instagram-logo",
        ariaLabel: "Instagram",
    },
    {
        name: "TikTok",
        url: "https://www.tiktok.com/@tuagenciazutra",
        icon: "ph-duotone ph-tiktok-logo",
        ariaLabel: "TikTok",
    },
    // {
    //     name: "LinkedIn",
    //     url: "https://www.linkedin.com/company/agenciazutra",
    //     icon: "ph-duotone ph-linkedin-logo",
    //     ariaLabel: "LinkedIn",
    // }
];
