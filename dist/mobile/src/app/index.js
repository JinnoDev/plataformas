"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = HomeScreen;
const Device = require("expo-device");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const animated_icon_1 = require("@/components/animated-icon");
const hint_row_1 = require("@/components/hint-row");
const themed_text_1 = require("@/components/themed-text");
const themed_view_1 = require("@/components/themed-view");
const web_badge_1 = require("@/components/web-badge");
const theme_1 = require("@/constants/theme");
function getDevMenuHint() {
    if (react_native_1.Platform.OS === 'web') {
        return <themed_text_1.ThemedText type="small">use browser devtools</themed_text_1.ThemedText>;
    }
    if (Device.isDevice) {
        return (<themed_text_1.ThemedText type="small">
        shake device or press <themed_text_1.ThemedText type="code">m</themed_text_1.ThemedText> in terminal
      </themed_text_1.ThemedText>);
    }
    const shortcut = react_native_1.Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
    return (<themed_text_1.ThemedText type="small">
      press <themed_text_1.ThemedText type="code">{shortcut}</themed_text_1.ThemedText>
    </themed_text_1.ThemedText>);
}
function HomeScreen() {
    return (<themed_view_1.ThemedView style={styles.container}>
      <react_native_safe_area_context_1.SafeAreaView style={styles.safeArea}>
        <themed_view_1.ThemedView style={styles.heroSection}>
          <animated_icon_1.AnimatedIcon />
          <themed_text_1.ThemedText type="title" style={styles.title}>
            Welcome to&nbsp;Expo
          </themed_text_1.ThemedText>
        </themed_view_1.ThemedView>

        <themed_text_1.ThemedText type="code" style={styles.code}>
          get started
        </themed_text_1.ThemedText>

        <themed_view_1.ThemedView type="backgroundElement" style={styles.stepContainer}>
          <hint_row_1.HintRow title="Try editing" hint={<themed_text_1.ThemedText type="code">src/app/index.tsx</themed_text_1.ThemedText>}/>
          <hint_row_1.HintRow title="Dev tools" hint={getDevMenuHint()}/>
          <hint_row_1.HintRow title="Fresh start" hint={<themed_text_1.ThemedText type="code">npm run reset-project</themed_text_1.ThemedText>}/>
        </themed_view_1.ThemedView>

        {react_native_1.Platform.OS === 'web' && <web_badge_1.WebBadge />}
      </react_native_safe_area_context_1.SafeAreaView>
    </themed_view_1.ThemedView>);
}
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    safeArea: {
        flex: 1,
        paddingHorizontal: theme_1.Spacing.four,
        alignItems: 'center',
        gap: theme_1.Spacing.three,
        paddingBottom: theme_1.BottomTabInset + theme_1.Spacing.three,
        maxWidth: theme_1.MaxContentWidth,
    },
    heroSection: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: theme_1.Spacing.four,
        gap: theme_1.Spacing.four,
    },
    title: {
        textAlign: 'center',
    },
    code: {
        textTransform: 'uppercase',
    },
    stepContainer: {
        gap: theme_1.Spacing.three,
        alignSelf: 'stretch',
        paddingHorizontal: theme_1.Spacing.three,
        paddingVertical: theme_1.Spacing.four,
        borderRadius: theme_1.Spacing.four,
    },
});
//# sourceMappingURL=index.js.map