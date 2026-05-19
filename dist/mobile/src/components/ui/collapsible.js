"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Collapsible = Collapsible;
const expo_symbols_1 = require("expo-symbols");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = require("react-native-reanimated");
const themed_text_1 = require("@/components/themed-text");
const themed_view_1 = require("@/components/themed-view");
const theme_1 = require("@/constants/theme");
const use_theme_1 = require("@/hooks/use-theme");
function Collapsible({ children, title }) {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const theme = (0, use_theme_1.useTheme)();
    return (<themed_view_1.ThemedView>
      <react_native_1.Pressable style={({ pressed }) => [styles.heading, pressed && styles.pressedHeading]} onPress={() => setIsOpen((value) => !value)}>
        <themed_view_1.ThemedView type="backgroundElement" style={styles.button}>
          <expo_symbols_1.SymbolView name={{ ios: 'chevron.right', android: 'chevron_right', web: 'chevron_right' }} size={14} weight="bold" tintColor={theme.text} style={{ transform: [{ rotate: isOpen ? '-90deg' : '90deg' }] }}/>
        </themed_view_1.ThemedView>

        <themed_text_1.ThemedText type="small">{title}</themed_text_1.ThemedText>
      </react_native_1.Pressable>
      {isOpen && (<react_native_reanimated_1.default.View entering={react_native_reanimated_1.FadeIn.duration(200)}>
          <themed_view_1.ThemedView type="backgroundElement" style={styles.content}>
            {children}
          </themed_view_1.ThemedView>
        </react_native_reanimated_1.default.View>)}
    </themed_view_1.ThemedView>);
}
const styles = react_native_1.StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme_1.Spacing.two,
    },
    pressedHeading: {
        opacity: 0.7,
    },
    button: {
        width: theme_1.Spacing.four,
        height: theme_1.Spacing.four,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        marginTop: theme_1.Spacing.three,
        borderRadius: theme_1.Spacing.three,
        marginLeft: theme_1.Spacing.four,
        padding: theme_1.Spacing.four,
    },
});
//# sourceMappingURL=collapsible.js.map