"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppTabs;
const unstable_native_tabs_1 = require("expo-router/unstable-native-tabs");
const react_1 = require("react");
const react_native_1 = require("react-native");
const theme_1 = require("@/constants/theme");
function AppTabs() {
    const scheme = (0, react_native_1.useColorScheme)();
    const colors = theme_1.Colors[scheme === 'unspecified' ? 'light' : scheme];
    return (<unstable_native_tabs_1.NativeTabs backgroundColor={colors.background} indicatorColor={colors.backgroundElement} labelStyle={{ selected: { color: colors.text } }}>
      <unstable_native_tabs_1.NativeTabs.Trigger name="index">
        <unstable_native_tabs_1.NativeTabs.Trigger.Label>Home</unstable_native_tabs_1.NativeTabs.Trigger.Label>
        <unstable_native_tabs_1.NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/home.png')} renderingMode="template"/>
      </unstable_native_tabs_1.NativeTabs.Trigger>

      <unstable_native_tabs_1.NativeTabs.Trigger name="explore">
        <unstable_native_tabs_1.NativeTabs.Trigger.Label>Explore</unstable_native_tabs_1.NativeTabs.Trigger.Label>
        <unstable_native_tabs_1.NativeTabs.Trigger.Icon src={require('@/assets/images/tabIcons/explore.png')} renderingMode="template"/>
      </unstable_native_tabs_1.NativeTabs.Trigger>
    </unstable_native_tabs_1.NativeTabs>);
}
//# sourceMappingURL=app-tabs.js.map