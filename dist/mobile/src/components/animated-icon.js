"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimatedSplashOverlay = AnimatedSplashOverlay;
exports.AnimatedIcon = AnimatedIcon;
const expo_image_1 = require("expo-image");
const react_1 = require("react");
const react_native_1 = require("react-native");
const react_native_reanimated_1 = require("react-native-reanimated");
const react_native_worklets_1 = require("react-native-worklets");
const INITIAL_SCALE_FACTOR = react_native_1.Dimensions.get('screen').height / 90;
const DURATION = 600;
function AnimatedSplashOverlay() {
    const [visible, setVisible] = (0, react_1.useState)(true);
    if (!visible)
        return null;
    const splashKeyframe = new react_native_reanimated_1.Keyframe({
        0: {
            transform: [{ scale: INITIAL_SCALE_FACTOR }],
            opacity: 1,
        },
        20: {
            opacity: 1,
        },
        70: {
            opacity: 0,
            easing: react_native_reanimated_1.Easing.elastic(0.7),
        },
        100: {
            opacity: 0,
            transform: [{ scale: 1 }],
            easing: react_native_reanimated_1.Easing.elastic(0.7),
        },
    });
    return (<react_native_reanimated_1.default.View entering={splashKeyframe.duration(DURATION).withCallback((finished) => {
            'worklet';
            if (finished) {
                (0, react_native_worklets_1.scheduleOnRN)(setVisible, false);
            }
        })} style={styles.backgroundSolidColor}/>);
}
const keyframe = new react_native_reanimated_1.Keyframe({
    0: {
        transform: [{ scale: INITIAL_SCALE_FACTOR }],
    },
    100: {
        transform: [{ scale: 1 }],
        easing: react_native_reanimated_1.Easing.elastic(0.7),
    },
});
const logoKeyframe = new react_native_reanimated_1.Keyframe({
    0: {
        transform: [{ scale: 1.3 }],
        opacity: 0,
    },
    40: {
        transform: [{ scale: 1.3 }],
        opacity: 0,
        easing: react_native_reanimated_1.Easing.elastic(0.7),
    },
    100: {
        opacity: 1,
        transform: [{ scale: 1 }],
        easing: react_native_reanimated_1.Easing.elastic(0.7),
    },
});
const glowKeyframe = new react_native_reanimated_1.Keyframe({
    0: {
        transform: [{ rotateZ: '0deg' }],
    },
    100: {
        transform: [{ rotateZ: '7200deg' }],
    },
});
function AnimatedIcon() {
    return (<react_native_1.View style={styles.iconContainer}>
      <react_native_reanimated_1.default.View entering={glowKeyframe.duration(60 * 1000 * 4)} style={styles.glow}>
        <expo_image_1.Image style={styles.glow} source={require('@/assets/images/logo-glow.png')}/>
      </react_native_reanimated_1.default.View>

      <react_native_reanimated_1.default.View entering={keyframe.duration(DURATION)} style={styles.background}/>
      <react_native_reanimated_1.default.View style={styles.imageContainer} entering={logoKeyframe.duration(DURATION)}>
        <expo_image_1.Image style={styles.image} source={require('@/assets/images/expo-logo.png')}/>
      </react_native_reanimated_1.default.View>
    </react_native_1.View>);
}
const styles = react_native_1.StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    glow: {
        width: 201,
        height: 201,
        position: 'absolute',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 128,
        height: 128,
        zIndex: 100,
    },
    image: {
        position: 'absolute',
        width: 76,
        height: 71,
    },
    background: {
        borderRadius: 40,
        experimental_backgroundImage: `linear-gradient(180deg, #3C9FFE, #0274DF)`,
        width: 128,
        height: 128,
        position: 'absolute',
    },
    backgroundSolidColor: {
        ...react_native_1.StyleSheet.absoluteFillObject,
        backgroundColor: '#208AEF',
        zIndex: 1000,
    },
});
//# sourceMappingURL=animated-icon.js.map