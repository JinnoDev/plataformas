"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppTabs;
exports.TabButton = TabButton;
exports.CustomTabList = CustomTabList;
const ui_1 = require("expo-router/ui");
const expo_symbols_1 = require("expo-symbols");
const react_1 = require("react");
const react_native_1 = require("react-native");
const external_link_1 = require("./external-link");
const themed_text_1 = require("./themed-text");
const themed_view_1 = require("./themed-view");
const theme_1 = require("@/constants/theme");
function AppTabs() {
    return (<ui_1.Tabs>
      <ui_1.TabSlot style={{ height: '100%' }}/>
      <ui_1.TabList asChild>
        <CustomTabList>
          <ui_1.TabTrigger name="home" href="/" asChild>
            <TabButton>Home</TabButton>
          </ui_1.TabTrigger>
          <ui_1.TabTrigger name="explore" href="/explore" asChild>
            <TabButton>Explore</TabButton>
          </ui_1.TabTrigger>
        </CustomTabList>
      </ui_1.TabList>
    </ui_1.Tabs>);
}
function TabButton({ children, isFocused, ...props }) {
    return (<react_native_1.Pressable {...props} style={({ pressed }) => pressed && styles.pressed}>
      <themed_view_1.ThemedView type={isFocused ? 'backgroundSelected' : 'backgroundElement'} style={styles.tabButtonView}>
        <themed_text_1.ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'}>
          {children}
        </themed_text_1.ThemedText>
      </themed_view_1.ThemedView>
    </react_native_1.Pressable>);
}
function CustomTabList(props) {
    const scheme = (0, react_native_1.useColorScheme)();
    const colors = theme_1.Colors[scheme === 'unspecified' ? 'light' : scheme];
    return (<react_native_1.View {...props} style={styles.tabListContainer}>
      <themed_view_1.ThemedView type="backgroundElement" style={styles.innerContainer}>
        <themed_text_1.ThemedText type="smallBold" style={styles.brandText}>
          Expo Starter
        </themed_text_1.ThemedText>

        {props.children}

        <external_link_1.ExternalLink href="https://docs.expo.dev" asChild>
          <react_native_1.Pressable style={styles.externalPressable}>
            <themed_text_1.ThemedText type="link">Docs</themed_text_1.ThemedText>
            <expo_symbols_1.SymbolView tintColor={colors.text} name={{ ios: 'arrow.up.right.square', web: 'link' }} size={12}/>
          </react_native_1.Pressable>
        </external_link_1.ExternalLink>
      </themed_view_1.ThemedView>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    tabListContainer: {
        position: 'absolute',
        width: '100%',
        padding: theme_1.Spacing.three,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    innerContainer: {
        paddingVertical: theme_1.Spacing.two,
        paddingHorizontal: theme_1.Spacing.five,
        borderRadius: theme_1.Spacing.five,
        flexDirection: 'row',
        alignItems: 'center',
        flexGrow: 1,
        gap: theme_1.Spacing.two,
        maxWidth: theme_1.MaxContentWidth,
    },
    brandText: {
        marginRight: 'auto',
    },
    pressed: {
        opacity: 0.7,
    },
    tabButtonView: {
        paddingVertical: theme_1.Spacing.one,
        paddingHorizontal: theme_1.Spacing.three,
        borderRadius: theme_1.Spacing.three,
    },
    externalPressable: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: theme_1.Spacing.one,
        marginLeft: theme_1.Spacing.three,
    },
});
//# sourceMappingURL=app-tabs.web.js.map