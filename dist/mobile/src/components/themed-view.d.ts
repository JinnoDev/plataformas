import { type ViewProps } from 'react-native';
import { ThemeColor } from '@/constants/theme';
export type ThemedViewProps = ViewProps & {
    lightColor?: string;
    darkColor?: string;
    type?: ThemeColor;
};
export declare function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps): import("react").JSX.Element;
