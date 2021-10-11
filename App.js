import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Button,
} from 'react-native';
import MQTTConnection from './src/screens/Mqtt';
import {Buffer} from 'buffer';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/redux/store';
import _ from 'underscore';
import MQTT from 'sp-react-native-mqtt';
import {icons, images, SIZES, COLORS, FONTS} from './src/constants';

// MqttNotificationsManager.create('bob', {
//   uri: 'mqtt://broker.mqttdashboard.com:1883',
// });

export default function App() {
  useEffect(() => {}, []);
  let name = '';
  let temp = '';
  let totalQty = '';
  let subTotal = '';
  let totalValue = '';
  MQTT.createClient({
    uri: 'mqtt://broker.mqttdashboard.com:1883',
    clientId: 'hello123123',
  })
    .then(function (client) {
      client.on('closed', function () {
        console.log('mqtt.event.closed');
      });

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg);
      });

      client.on('message', function (msg) {
        // console.log('mqtt.event.message', msg.data);
        var str = msg.data;
        var strFirstThree = str.substring(0, 4);

        console.log(strFirstThree); // shows '012'
        if (strFirstThree === '#NME') {
          console.log('NAME', msg.data);
          var text = msg.data;
          var fields = text.split(',');

          name = fields[1];
          // name = msg.data;
        }
        if (strFirstThree === '#TEM') {
          console.log('TEMP', msg.data);
          var text = msg.data;
          var fields = text.split(',');

          temp = fields[1];
        }
        if (strFirstThree === '#TQT') {
          console.log('NAME', msg.data);

          var text = msg.data;
          var fields = text.split(',');

          totalQty = fields[1];
        }
        if (strFirstThree === '#STO') {
          console.log('TEMP', msg.data);

          var text = msg.data;
          var fields = text.split(',');

          subTotal = fields[1];
        }
        if (strFirstThree === '#TVA') {
          console.log('TEMP', msg.data);
          totalValue = msg.data;
          const product = {
            name: name,
            temp: temp,
            totalQty: totalQty,
            subTotal: subTotal,
            totalValue: totalValue,
          };
          console.log('product', product);
          setProduct(product);
        }
      });

      client.on('connect', function () {
        console.log('connected');
        client.subscribe('cart420chi', 0);

        // client.publish('/data', 'test', 0, false);
      });

      client.connect();
    })
    .catch(function (err) {
      console.log(err);
    });
  const [product, setProduct] = useState({
    name: 'Tik tac',
    subTotal: '52.79',
    temp: '30.11',
    totalQty: '5',
    totalValue: '52.79',
  });
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <StoreProvider store={store}>
      <View style={styles.container}>
        <Text style={styles.title}>Smart Cart</Text>
        <View style={styles.proCon}>
          {product ? (
            <Text style={styles.centerText}>Product Name : {product.name}</Text>
          ) : null}
          {product ? (
            <Text style={styles.centerText}>Temperature : {product.temp}</Text>
          ) : null}
          {product ? (
            <Text style={styles.centerText}>Quantity : {product.totalQty}</Text>
          ) : null}
          {product ? (
            <Text style={styles.centerText}>subTotal : {product.subTotal}</Text>
          ) : null}
          {product ? (
            <Text style={styles.centerText}>Total : {product.totalValue}</Text>
          ) : null}
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.title}>Confirm Payment</Text>
              <Text style={styles.centerText}>Total: {product.subTotal}</Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableOpacity>
      </View>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    height: SIZES.height * 0.5,
    width: SIZES.width * 0.9,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    borderRadius: 2,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 30,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'column',
  },
  proCon: {
    height: SIZES.height * 0.5,
    width: SIZES.width * 0.8,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    // alignItems: 'flex0-',
    // alignContent: 'center',
    shadowColor: '#111',
    shadowOpacity: 0.1,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'SMARC___',
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.black,
    textAlign: 'center',
  },
  centerText: {
    textAlign: 'left',
    fontSize: 22,
    marginTop: 30,
    marginLeft: 30,
    padding: 2,
    color: '#777',
  },
});
