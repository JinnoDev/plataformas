"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabLayout;
const native_1 = require("@react-navigation/native");
const react_1 = require("react");
const react_native_1 = require("react-native");
const animated_icon_1 = require("@/components/animated-icon");
const app_tabs_1 = require("@/components/app-tabs");
function TabLayout() {
    const colorScheme = (0, react_native_1.useColorScheme)();
    return (<native_1.ThemeProvider value={colorScheme === 'dark' ? native_1.DarkTheme : native_1.DefaultTheme}>
      <animated_icon_1.AnimatedSplashOverlay />
      <app_tabs_1.default />
    </native_1.ThemeProvider>);
}
//# sourceMappingURL=_layout.js.map