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
        width: '100%',
        height: '100%',
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
    },
    shadowHorizontal: {
        width: '100%',
        height: scaleSizeH(10),
        opacity: 0.5,
        position: "absolute",
        zIndex: 5,
        left: 0,
    },
    top: {
        top: 0
    },
    bottom: {
        bottom: 0
    },
    left: {
        left: 0
    },
    right: {
        right: 0
    },
    shadowVertical: {
        width: scaleSizeH(10),
        height: '100%',
        opacity: 0.5,
        position: "absolute",
        zIndex: 5,
        top: 0
    },
    head: {
        width: '100%',
        position: "absolute",
        top: scaleSizeW(20),
        left: 0,
        paddingLeft: scaleSizeW(100),
        paddingRight: scaleSizeW(100),
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
    clock:{
        alignItems: "center",
        justifyContent: "center",
        flexDirection:"row"
    },
    text: {
        fontSize: setSpText(350),
        marginTop:scaleSizeH(30)
    },
    battery: {
        width: scaleSizeW(50),
        height: scaleSizeH(30),
        alignItems: "center",
        justifyContent: "center",
        marginLeft: scaleSizeW(10),
        marginRight: scaleSizeW(10),
    },
    textSmall: {
        fontSize: setSpText(20),
    },
    textMin: {
        fontSize: setSpText(35),
    },
    clockCell:{
        width:"26%",
        height:"80%",
        margin:scaleSizeW(15),
        alignItems: "center",
        justifyContent: "center",
        borderRadius:scaleSizeW(20),
    },
    textProvider:{
        fontSize: setSpText(100),
        marginTop:scaleSizeH(40),
        opacity:0.5
    }
});
module.exports = styles;