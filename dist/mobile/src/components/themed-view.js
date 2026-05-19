"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemedView = ThemedView;
const react_native_1 = require("react-native");
const use_theme_1 = require("@/hooks/use-theme");
function ThemedView({ style, lightColor, darkColor, type, ...otherProps }) {
    const theme = (0, use_theme_1.useTheme)();
    return <react_native_1.View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps}/>;
}
//# sourceMappingURL=themed-view.js.map