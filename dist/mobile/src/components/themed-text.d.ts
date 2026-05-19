import { type TextProps } from 'react-native';
import { ThemeColor } from '@/constants/theme';
export type ThemedTextProps = TextProps & {
    type?: 'default' | 'title' | 'small' | 'smallBold' | 'subtitle' | 'link' | 'linkPrimary' | 'code';
    themeColor?: ThemeColor;
};
export declare function ThemedText({ style, type, themeColor, ...rest }: ThemedTextProps): import("react").JSX.Element;
