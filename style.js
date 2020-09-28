import {
    StyleSheet,
    Dimensions 
} from 'react-native';
import {
    setSpText,
    scaleSizeH,
    scaleSizeW
} from "./src/util/scale";
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center"
    },
    center: {
        width: '96%',
        height: '96%',
        borderRadius: scaleSizeW(20),
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    head: {
        width: '100%',
        position: "absolute",
        top: scaleSizeW(20),
        left: 0,
        paddingLeft: scaleSizeW(40),
        paddingRight: scaleSizeW(40),
        flexDirection: "row",
        justifyContent: "space-between",
    },
    info: {
        alignItems: "center",
        flexDirection: "row",
    },
    charge: {
        width: scaleSizeW(40),
        height: scaleSizeW(40),
    },
    text: {
        fontFamily: "digit",
        fontSize: setSpText(400),
    },
    battery: {
        width:scaleSizeW(56),
        height: scaleSizeH(30),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: scaleSizeW(10),
        marginRight: scaleSizeW(10),
    },
    textSmall: {
        fontFamily: "digit",
        fontSize: setSpText(20),
    },
    textMin: {
        fontFamily: "digit",
        fontSize: setSpText(40),
    }
});
module.exports = styles;