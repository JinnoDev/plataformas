import '@/global.css';
export declare const Colors: {
    readonly light: {
        readonly text: "#000000";
        readonly background: "#ffffff";
        readonly backgroundElement: "#F0F0F3";
        readonly backgroundSelected: "#E0E1E6";
        readonly textSecondary: "#60646C";
    };
    readonly dark: {
        readonly text: "#ffffff";
        readonly background: "#000000";
        readonly backgroundElement: "#212225";
        readonly backgroundSelected: "#2E3135";
        readonly textSecondary: "#B0B4BA";
    };
};
export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;
export declare const Fonts: {
    sans: string;
    serif: string;
    rounded: string;
    mono: string;
};
export declare const Spacing: {
    readonly half: 2;
    readonly one: 4;
    readonly two: 8;
    readonly three: 16;
    readonly four: 24;
    readonly five: 32;
    readonly six: 64;
};
export declare const BottomTabInset: number;
export declare const MaxContentWidth = 800;
