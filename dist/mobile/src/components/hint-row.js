"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HintRow = HintRow;
const react_1 = require("react");
const react_native_1 = require("react-native");
const themed_text_1 = require("./themed-text");
const themed_view_1 = require("./themed-view");
const theme_1 = require("@/constants/theme");
function HintRow({ title = 'Try editing', hint = 'app/index.tsx' }) {
    return (<react_native_1.View style={styles.stepRow}>
      <themed_text_1.ThemedText type="small">{title}</themed_text_1.ThemedText>
      <themed_view_1.ThemedView type="backgroundSelected" style={styles.codeSnippet}>
        <themed_text_1.ThemedText themeColor="textSecondary">{hint}</themed_text_1.ThemedText>
      </themed_view_1.ThemedView>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    stepRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    codeSnippet: {
        borderRadius: theme_1.Spacing.two,
        paddingVertical: theme_1.Spacing.half,
        paddingHorizontal: theme_1.Spacing.two,
    },
});
//# sourceMappingURL=hint-row.js.map