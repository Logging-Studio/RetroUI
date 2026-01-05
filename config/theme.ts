export enum Theme {
    Default = "default",
    Purple = "purple",
    Lime = "lime",
    Red = "red",
    Lavender = "lavender",
    Orange = "orange",
    Green = "green",
}


export const themeConfig = ({hasRadius = false}: {hasRadius?: boolean}) => ({
    [Theme.Default]: {
        name: "default",
        color:
`:root {
    --radius: ${hasRadius ? "0.5rem" : "0"};
    --background: #fff;
    --foreground: #000;
    --card: #fff;
    --card-foreground: #000;
    --primary: #ffdb33;
    --primary-hover: #ffcc00;
    --primary-foreground: #000;
    --secondary: #000;
    --secondary-foreground: #fff;
    --muted: #cccccc;
    --muted-foreground: #5a5a5a;
    --accent: #fae583;
    --accent-foreground: #000;
    --destructive: #e63946;
    --destructive-foreground: #fff;
    --border: #000;
}

.dark {
    --background: #1a1a1a;
    --foreground: #f5f5f5;
    --card: #242424;
    --card-foreground: #f5f5f5;
    --primary: #ffdb33;
    --primary-hover: #ffcc00;
    --primary-foreground: #000;
    --secondary: #3a3a3a;
    --secondary-foreground: #f5f5f5;
    --muted: #3f3f46;
    --muted-foreground: #a0a0a0;
    --accent: #fae583;
    --accent-foreground: #000;
    --destructive: #e63946;
    --destructive-foreground: #fff;
    --border: #5c5c5c;
}
`,
    },
    [Theme.Purple]: {
        name: "purple",
        color: 
`:root {
    --radius: ${hasRadius ? "0.5rem" : "0"};
    --background: #f5f5f5;
    --foreground: #1a1a1a;
    --card: #FFFFFF;
    --card-foreground: #f5f5f5;
    --primary: #5F4FE6;
    --primary-hover: #4938C2;
    --primary-foreground: #fff;
    --secondary: #3a3a3a;
    --secondary-foreground: #f5f5f5;
    --muted: #CFCCEA;
    --muted-foreground: #5B5686;
    --accent: #FED13B;
    --accent-foreground: #000000;
    --destructive: #EF4444;
    --destructive-foreground: #fff;
    --border: #3a3a3a;
}

.dark {
    --background: #0f0f12;
    --foreground: #f5f5f5;
    --card: #1a1a1d;
    --card-foreground: #eaeaea;
    --primary: #7b6df5;
    --primary-hover: #5F4FE6;
    --primary-foreground: #fff;
    --secondary: #2a2a2e;
    --secondary-foreground: #eaeaea;
    --muted: #3d395a;
    --muted-foreground: #a49fce;
    --accent: #FED13B;
    --accent-foreground: #000;
    --destructive: #EF4444;
    --destructive-foreground: #fff;
    --border: #2e2e32;
}
`,
    },
    [Theme.Lime]: {
        name: "Lime",
        color: 
`:root {
    --radius: ${hasRadius ? "0.5rem" : "0"};
    --background: #FFFFFF;
    --foreground: #000000;
    --card: #FFFFFF;
    --card-foreground: #000000;
    --input: #FFFFFF;
    --ring: #AAFC3D;
    --primary: #AAFC3D;
    --primary-hover: #97f819;
    --primary-foreground: #FFFFFF;
    --secondary: #5252FF;
    --secondary-foreground: #000000;
    --muted: #F3F4F6;
    --muted-foreground: #6B7280;
    --accent: #FF00FF;
    --accent-foreground: #000000;
    --destructive: #EF4444;
    --destructive-foreground: #FFFFFF;
    --border: #3a3a3a;
}

.dark {
    --background: #FFFFFF;
    --foreground: #000000;
    --card: #FFFFFF;
    --card-foreground: #000000;
    --input: #FFFFFF;
    --border: #000000;
    --ring: #AAFC3D;
    --primary: #AAFC3D;
    --primary-hover: #97f819;
    --primary-foreground: #000000;
    --secondary: #000000;
    --secondary-foreground: #FFFFFF;
    --muted: #F3F3F3;
    --muted-foreground: #444444;
    --accent: #FF4FD8;
    --accent-foreground: #000000;
    --destructive: #FF0033;
    --destructive-foreground: #FFFFFF;
}
`,
    },
    [Theme.Red]: {
        name: "Red",
        color: 
`:root {
    --radius: ${hasRadius ? "0.5rem" : "0"};
    --background: #FCFFE7;
    --foreground: #000000;
    --muted: #EFD0D5;
    --muted-foreground: #A42439;
    --card: #FFFFFF;
    --card-foreground: #000000;
    --popover: #FFFFFF;
    --popover-foreground: #000000;
    --border: #000000;
    --input: #FFFFFF;
    --primary: #EA435F;
    --primary-hover: #D00000;
    --primary-foreground: #FFFFFF;
    --secondary: #FFDA5C;
    --secondary-foreground: #000000;
    --accent: #CEEBFC;
    --accent-foreground: #000000;
    --destructive: #D00000;
    --destructive-foreground: #FFFFFF;
    --ring: #000000;
}
    
.dark {
    --background: #0f0f0f;
    --foreground: #f5f5f5;
    --muted: #3a1f24;
    --muted-foreground: #f2a7b2;
    --card: #1a1a1a;
    --card-foreground: #ffffff;
    --popover: #1a1a1a;
    --popover-foreground: #ffffff;
    --border: #2a2a2a;
    --input: #2a2a2a;
    --primary: #EA435F;
    --primary-hover: #D00000;
    --primary-foreground: #ffffff;
    --secondary: #FFDA5C;
    --secondary-foreground: #000000;
    --accent: #2a3b45;
    --accent-foreground: #CEEBFC;
    --destructive: #D00000;
    --destructive-foreground: #ffffff;
    --ring: #EA435F;
}
`,
    },
    [Theme.Lavender]: {
        name: "Lavender",
        color: 
`:root {
    --radius: ${hasRadius ? "0.5rem" : "0"};
    --background: #F9F5F2;
    --foreground: #000000;
    --muted: #EDE3FF;
    --muted-foreground: #5B3B98;
    --card: #FFFFFF;
    --card-foreground: #000000;
    --popover: #FFFFFF;
    --popover-foreground: #000000;
    --border: #000000;
    --input: #FFFFFF;
    --primary: #C4A1FF;
    --primary-hover: #9678FF;
    --primary-foreground: #000000;
    --secondary: #E7F193;
    --secondary-foreground: #000000;
    --accent: #FE91E9;
    --accent-foreground: #000000;
    --destructive: #FE3B3B;
    --destructive-foreground: #FFFFFF;
    --ring: #000000;
}

.dark {
    --background: #121014;
    --foreground: #f5f5f5;
    --muted: #2d2440;
    --muted-foreground: #c7b6f3;
    --card: #1a1820;
    --card-foreground: #ffffff;
    --popover: #1a1820;
    --popover-foreground: #ffffff;
    --border: #2a2a2e;
    --input: #2a2a2e;
    --primary: #C4A1FF;
    --primary-hover: #9678FF;
    --primary-foreground: #000000;
    --secondary: #E7F193;
    --secondary-foreground: #000000;
    --accent: #FE91E9;
    --accent-foreground: #000000;
    --destructive: #FE3B3B;
    --destructive-foreground: #ffffff;
    --ring: #C4A1FF;
}

`,
    },
    [Theme.Orange]: {
        name: "Orange",
        color: 
`:root {
    --radius: ${hasRadius ? "0.5rem" : "0"};
    --background: #F9F5F2;
    --foreground: #000000;
    --muted: #EFD0D5;
    --muted-foreground: #A42439;
    --card: #FFFFFF;
    --card-foreground: #000000;
    --popover: #FFFFFF;
    --popover-foreground: #000000;
    --border: #000000;
    --input: #FFFFFF;
    --primary: #EA435F;
    --primary-hover: #D00000;
    --primary-foreground: #FFFFFF;
    --secondary: #FFDA5C;
    --secondary-foreground: #000000;
    --accent: #CEEBFC;
    --accent-foreground: #000000;
    --destructive: #D00000;
    --destructive-foreground: #FFFFFF;
    --ring: #000000;
}

.dark {
    --background: #12100e;
    --foreground: #f5f5f5;
    --muted: #3a2617;
    --muted-foreground: #ffb679;
    --card: #1a1a1a;
    --card-foreground: #ffffff;
    --popover: #1a1a1a;
    --popover-foreground: #ffffff;
    --border: #2a2a2a;
    --input: #2a2a2a;
    --primary: #F07200;
    --primary-hover: #ff8011;
    --primary-foreground: #FDEAD9;
    --secondary: #EF8C27;
    --secondary-foreground: #000000;
    --accent: #FF6B6B;
    --accent-foreground: #000000;
    --destructive: #FE3B3B;
    --destructive-foreground: #ffffff;
    --ring: #F07200;
}
`,
    },
    [Theme.Green]: {
        name: "Green",
        color: 
`:root {
    --radius: ${hasRadius ? "0.5rem" : "0"};
    --background: #F9F5F2;
    --foreground: #000000;
    --muted: #EFD0D5;
    --muted-foreground: #A42439;
    --card: #FFFFFF;
    --card-foreground: #000000;
    --popover: #FFFFFF;
    --popover-foreground: #000000;
    --border: #000000;
    --input: #FFFFFF;
    --primary: #EA435F;
    --primary-hover: #D00000;
    --primary-foreground: #FFFFFF;
    --secondary: #FFDA5C;
    --secondary-foreground: #000000;
    --accent: #CEEBFC;
    --accent-foreground: #000000;
    --destructive: #D00000;
    --destructive-foreground: #FFFFFF;
    --ring: #000000;
}

.dark {
    --background: #0f1210;
    --foreground: #f5f5f5;
    --muted: #1f3a2d;
    --muted-foreground: #9cd9b8;
    --card: #181c19;
    --card-foreground: #ffffff;
    --popover: #181c19;
    --popover-foreground: #ffffff;
    --border: #2a2e2b;
    --input: #2a2e2b;
    --primary: #599D77;
    --primary-hover: #39654c;
    --primary-foreground: #ffffff;
    --secondary: #3a6f52;
    --secondary-foreground: #ffffff;
    --accent: #FFE75A;
    --accent-foreground: #000000;
    --destructive: #F05D5D;
    --destructive-foreground: #ffffff;
    --ring: #599D77;
}
`,
    },
});

export const themes = Object.keys(themeConfig({hasRadius: false}));

