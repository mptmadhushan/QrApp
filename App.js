import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';
import MQTTConnection from './src/screens/Mqtt';
import {Buffer} from 'buffer';
// global.Buffer = Buffer;
import MqttNotificationsManager from './realtimeManager';
MqttNotificationsManager.create('bob', {
  uri: 'mqtt://broker.mqttdashboard.com:1883',
});
export default function App() {
  useEffect(() => {
    // this.mqttConnect = new MQTTConnection();
    // this.mqttConnect.onMQTTConnect = this.onMQTTConnect;
    // this.mqttConnect.onMQTTLost = onMQTTLost;
    // this.mqttConnect.onMQTTMessageArrived = this.onMQTTMessageArrived;
    // this.mqttConnect.onMQTTMessageDelivered = this.onMQTTMessageDelivered;
    // this.mqttConnect.connect('broker.mqtt-dashboard.com', 8000);
    // onMQTTConnect = () => {
    //   console.log('App onMQTTConnect');
    //   this.mqttConnect.subscribeChannel('hanth2');
    // };
    // const onMQTTLost = () => {
    //   console.log('App onMQTTLost');
    // };
    // onMQTTMessageArrived = message => {
    //   console.log('App onMQTTMessageArrived: ', message);
    //   console.log(
    //     'App onMQTTMessageArrived payloadString: ',
    //     message.payloadString,
    //   );
    // };
    // onMQTTMessageDelivered = message => {
    //   console.log('App onMQTTMessageDelivered: ', message);
    // };
    // return () => {
    //   this.mqttConnect.close();
    // };
  }, []);

  return (
    <View style={styles.container}>
      <Text>react_native_mqtt</Text>
      <Button
        title="Press me"
        onPress={() =>
          this.mqttConnect.send(
            'hanth2',
            'message send to channel hanth2 again',
          )
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
