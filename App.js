import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
  Image,
  ImageBackground
} from 'react-native';
import Switch from 'react-native-switch-pro';
import DeviceInfo from 'react-native-device-info';
import Orientation from 'react-native-orientation';
import IdleTimerManager from 'react-native-idle-timer';
import LinearGradient from 'react-native-linear-gradient';
import styles from './style';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time:{
        hours:"",
        minutes:"",
        seconds:"",
      },
      date:"",
      battery:"",
      isDayTheme:false,
      isCharging:false,
    };
    this.timer=null;
    this.batteryPointer=null;
  }
  renderClock(){
   const doubleTime=e=>e.toString().padStart(2, "0");
    let now = new Date(),
      hours = doubleTime(now.getHours()),
      minutes = doubleTime(now.getMinutes()),
      seconds =doubleTime(now.getSeconds());
    let time =
        {
          hours,
          minutes,
          seconds,
        };
    this.setState({
      time
    })
  };
  renderDate(){
   const doubleTime=e=>e.toString().padStart(2, "0");
   let now = new Date(),
      year = now.getFullYear(),
      month = doubleTime(now.getMonth() + 1),
      day = doubleTime(now.getDate());
    let date = `${year}/${month}/${day}`;
    this.setState({
      date
    })
  }
  getBatteryInfo(){
    DeviceInfo.getBatteryLevel().then(batteryLevel => {
      console.log(batteryLevel)
      let battery=Math.floor(batteryLevel*100);
      console.log(battery)
      this.setState({
        battery
      })
    });
    DeviceInfo.isBatteryCharging().then(isCharging => {
      this.setState({
        isCharging 
      })
    });
  }
  componentDidMount() {
    Orientation.lockToLandscape();
    IdleTimerManager.setIdleTimerDisabled(true);
    this.renderDate();
    this.timer = setInterval(() => {
      this.renderClock();
    }, 1000);
    this.getBatteryInfo();
    this.batteryPointer = setInterval(() => {
      this.getBatteryInfo();
    }, 1000*60);
  }
  componentWillUnmount(){
    clearInterval(this.timer);
    clearInterval(this.batteryPointer);
    IdleTimerManager.setIdleTimerDisabled(false);
  }
  render(){
    let {time,date,battery,isDayTheme,isCharging}=this.state;
    return (
        <View style={{...styles.container,
          backgroundColor:isDayTheme?"#eee":"#000"
        }}>
          <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0)" hidden={true}/>
          <View style={{...styles.center,
          backgroundColor:isDayTheme?"rgb(220, 235, 236)":"#000"
          }}>
            <LinearGradient colors={isDayTheme?['#000000', 'transparent']:['#eeeeee30', 'transparent']} style={{...styles.shadowHorizontal,...styles.top}}/>
            <LinearGradient colors={isDayTheme?['transparent', '#000000']:['transparent','#eeeeee30']} style={{...styles.shadowHorizontal,...styles.bottom}}/>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={isDayTheme?['#000000', 'transparent']:['#eeeeee30', 'transparent']} style={{...styles.shadowVertical,...styles.left}}/>
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={isDayTheme?['transparent', '#000000']:[ 'transparent','#eeeeee30']} style={{...styles.shadowVertical,...styles.right}}/>
              <View style={styles.head}>
                <View style={styles.info}>
                  {
                    isCharging?
                    <Image style={styles.charge} 
                    source={isDayTheme?require('./src/assets/lightning.png'):require('./src/assets/lightning_w.png')}/>
                    :
                    null
                  }
                  <ImageBackground 
                  style={styles.battery}
                  source={isDayTheme?require('./src/assets/battery.png'):require('./src/assets/battery_w.png')}>
                    <Text style={{...styles.textSmall,
                    color:isDayTheme?"#333":"#eee"
                    }}>{battery}</Text>
                  </ImageBackground>
                  <Text style={{...styles.textMin,
                  color:isDayTheme?"#333":"#eee"
                  }}>{date}</Text>
                </View>
                <Switch 
                circleColorActive={"#000"}
                circleColorInactive={"rgb(202, 234, 236)"}
                backgroundActive={"#eee"}
                backgroundInactive={"#333"}
                onSyncPress={value => this.setState({
                  isDayTheme:value
                })}/>
              </View>
              <View style={styles.clock}>
                <View style={styles.clockCell}>
                  <Text style={{...styles.text,
                    color:isDayTheme?"#333":"#eee"
                  }}>{time.hours}</Text>
                </View>
                <Text style={{...styles.textProvider,
                    color:isDayTheme?"#333":"#eee"
                  }}>:</Text>
                <View style={styles.clockCell}>
                  <Text style={{...styles.text,
                    color:isDayTheme?"#333":"#eee"
                  }}>{time.minutes}</Text>
                </View>
                <Text style={{...styles.textProvider,
                    color:isDayTheme?"#333":"#eee"
                  }}>:</Text>
                <View style={styles.clockCell}>
                  <Text style={{...styles.text,
                    color:isDayTheme?"#333":"#eee"
                  }}>{time.seconds}</Text>
                </View>
              </View>
          </View>
        </View>
   );
  }
};

export default App;
