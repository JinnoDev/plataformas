"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabTwoScreen;
const expo_image_1 = require("expo-image");
const expo_symbols_1 = require("expo-symbols");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const external_link_1 = require("@/components/external-link");
const themed_text_1 = require("@/components/themed-text");
const themed_view_1 = require("@/components/themed-view");
const collapsible_1 = require("@/components/ui/collapsible");
const web_badge_1 = require("@/components/web-badge");
const theme_1 = require("@/constants/theme");
const use_theme_1 = require("@/hooks/use-theme");
function TabTwoScreen() {
    const safeAreaInsets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    const insets = {
        ...safeAreaInsets,
        bottom: safeAreaInsets.bottom + theme_1.BottomTabInset + theme_1.Spacing.three,
    };
    const theme = (0, use_theme_1.useTheme)();
    const contentPlatformStyle = react_native_1.Platform.select({
        android: {
            paddingTop: insets.top,
            paddingLeft: insets.left,
            paddingRight: insets.right,
            paddingBottom: insets.bottom,
        },
        web: {
            paddingTop: theme_1.Spacing.six,
            paddingBottom: theme_1.Spacing.four,
        },
    });
    return (<react_native_1.ScrollView style={[styles.scrollView, { backgroundColor: theme.background }]} contentInset={insets} contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <themed_view_1.ThemedView style={styles.container}>
        <themed_view_1.ThemedView style={styles.titleContainer}>
          <themed_text_1.ThemedText type="subtitle">Explore</themed_text_1.ThemedText>
          <themed_text_1.ThemedText style={styles.centerText} themeColor="textSecondary">
            This starter app includes example{'\n'}code to help you get started.
          </themed_text_1.ThemedText>

          <external_link_1.ExternalLink href="https://docs.expo.dev" asChild>
            <react_native_1.Pressable style={({ pressed }) => pressed && styles.pressed}>
              <themed_view_1.ThemedView type="backgroundElement" style={styles.linkButton}>
                <themed_text_1.ThemedText type="link">Expo documentation</themed_text_1.ThemedText>
                <expo_symbols_1.SymbolView tintColor={theme.text} name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }} size={12}/>
              </themed_view_1.ThemedView>
            </react_native_1.Pressable>
          </external_link_1.ExternalLink>
        </themed_view_1.ThemedView>

        <themed_view_1.ThemedView style={styles.sectionsWrapper}>
          <collapsible_1.Collapsible title="File-based routing">
            <themed_text_1.ThemedText type="small">
              This app has two screens: <themed_text_1.ThemedText type="code">src/app/index.tsx</themed_text_1.ThemedText> and{' '}
              <themed_text_1.ThemedText type="code">src/app/explore.tsx</themed_text_1.ThemedText>
            </themed_text_1.ThemedText>
            <themed_text_1.ThemedText type="small">
              The layout file in <themed_text_1.ThemedText type="code">src/app/_layout.tsx</themed_text_1.ThemedText> sets up
              the tab navigator.
            </themed_text_1.ThemedText>
            <external_link_1.ExternalLink href="https://docs.expo.dev/router/introduction">
              <themed_text_1.ThemedText type="linkPrimary">Learn more</themed_text_1.ThemedText>
            </external_link_1.ExternalLink>
          </collapsible_1.Collapsible>

          <collapsible_1.Collapsible title="Android, iOS, and web support">
            <themed_view_1.ThemedView type="backgroundElement" style={styles.collapsibleContent}>
              <themed_text_1.ThemedText type="small">
                You can open this project on Android, iOS, and the web. To open the web version,
                press <themed_text_1.ThemedText type="smallBold">w</themed_text_1.ThemedText> in the terminal running this
                project.
              </themed_text_1.ThemedText>
              <expo_image_1.Image source={require('@/assets/images/tutorial-web.png')} style={styles.imageTutorial}/>
            </themed_view_1.ThemedView>
          </collapsible_1.Collapsible>

          <collapsible_1.Collapsible title="Images">
            <themed_text_1.ThemedText type="small">
              For static images, you can use the <themed_text_1.ThemedText type="code">@2x</themed_text_1.ThemedText> and{' '}
              <themed_text_1.ThemedText type="code">@3x</themed_text_1.ThemedText> suffixes to provide files for different
              screen densities.
            </themed_text_1.ThemedText>
            <expo_image_1.Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact}/>
            <external_link_1.ExternalLink href="https://reactnative.dev/docs/images">
              <themed_text_1.ThemedText type="linkPrimary">Learn more</themed_text_1.ThemedText>
            </external_link_1.ExternalLink>
          </collapsible_1.Collapsible>

          <collapsible_1.Collapsible title="Light and dark mode components">
            <themed_text_1.ThemedText type="small">
              This template has light and dark mode support. The{' '}
              <themed_text_1.ThemedText type="code">useColorScheme()</themed_text_1.ThemedText> hook lets you inspect what the
              user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
            </themed_text_1.ThemedText>
            <external_link_1.ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
              <themed_text_1.ThemedText type="linkPrimary">Learn more</themed_text_1.ThemedText>
            </external_link_1.ExternalLink>
          </collapsible_1.Collapsible>

          <collapsible_1.Collapsible title="Animations">
            <themed_text_1.ThemedText type="small">
              This template includes an example of an animated component. The{' '}
              <themed_text_1.ThemedText type="code">src/components/ui/collapsible.tsx</themed_text_1.ThemedText> component uses
              the powerful <themed_text_1.ThemedText type="code">react-native-reanimated</themed_text_1.ThemedText> library to
              animate opening this hint.
            </themed_text_1.ThemedText>
          </collapsible_1.Collapsible>
        </themed_view_1.ThemedView>
        {react_native_1.Platform.OS === 'web' && <web_badge_1.WebBadge />}
      </themed_view_1.ThemedView>
    </react_native_1.ScrollView>);
}
const styles = react_native_1.StyleSheet.create({
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        maxWidth: theme_1.MaxContentWidth,
        flexGrow: 1,
    },
    titleContainer: {
        gap: theme_1.Spacing.three,
        alignItems: 'center',
        paddingHorizontal: theme_1.Spacing.four,
        paddingVertical: theme_1.Spacing.six,
    },
    centerText: {
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.7,
    },
    linkButton: {
        flexDirection: 'row',
        paddingHorizontal: theme_1.Spacing.four,
        paddingVertical: theme_1.Spacing.two,
        borderRadius: theme_1.Spacing.five,
        justifyContent: 'center',
        gap: theme_1.Spacing.one,
        alignItems: 'center',
    },
    sectionsWrapper: {
        gap: theme_1.Spacing.five,
        paddingHorizontal: theme_1.Spacing.four,
        paddingTop: theme_1.Spacing.three,
    },
    collapsibleContent: {
        alignItems: 'center',
    },
    imageTutorial: {
        width: '100%',
        aspectRatio: 296 / 171,
        borderRadius: theme_1.Spacing.three,
        marginTop: theme_1.Spacing.two,
    },
    imageReact: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
});
//# sourceMappingURL=explore.js.map