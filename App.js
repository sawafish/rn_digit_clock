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
import styles from './style';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time:"",
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
      hour = doubleTime(now.getHours()),
      minute = doubleTime(now.getMinutes()),
      seconds =doubleTime(now.getSeconds());
    let time = `${hour}:${minute}:${seconds}`;
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
          backgroundColor:isDayTheme?"rgb(220, 235, 236)":"#222"
        }}>
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
                circleColorActive={"#333"}
                circleColorInactive={"rgb(202, 234, 236)"}
                backgroundActive={"#eee"}
                backgroundInactive={"#000"}
                onSyncPress={value => this.setState({
                  isDayTheme:value
                })}/>
              </View>
              <Text style={{...styles.text,
          color:isDayTheme?"#333":"#eee"
        }}>{time}</Text>
          </View>
        </View>
   );
  }
};

export default App;
