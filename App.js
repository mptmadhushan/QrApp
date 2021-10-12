import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Text,
  Image,
  ImageBackground,
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
// #NME, Tik Tac
// #TEMP, 30.11
// #TQTS, 5
// #STOT, 52.48
export default function App() {
  const [product, setProduct] = useState([
    {
      name: ' mango',
      subTotal: ' 102.48',
      temp: ' 20.41',
      totalQty: ' 3',
      totalValue: '56.50',
    },
    {
      name: ' Banana',
      subTotal: ' 102.48',
      temp: ' 20.41',
      totalQty: '3',
      totalValue: '56.50',
    },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  // useEffect(() => {}, []);
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

          var text = msg.data;
          var fields = text.split(',');
          totalValue = fields[1];

          const newProduct = {
            name: name,
            temp: temp,
            totalQty: totalQty,
            subTotal: subTotal,
            totalValue: totalValue,
          };
          console.log('product', product);

          setProduct(prevArray => [...prevArray, newProduct]);
          console.log('product', product);
        }
        if (strFirstThree === '#STP') {
          console.log('product--<', product);
          setModalVisible1(true);
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
  const newProduct = {
    name: 'name',
    temp: 'temp',
    totalQty: 'totalQty',
    subTotal: 'subTotal',
    totalValue: 'totalValue',
  };
  const info = () => {
    setModalVisible1(true);
    console.log('product', product);
    // setProduct(prevArray => [...prevArray, newProduct]);
  };
  const WholeNews = () => {
    return product.map(function (pro, i) {
      return (
        <View key={i} style={styles.proCon}>
          <View>
            <Image
              source={require('./src/assets/images/cart.png')}
              style={{
                marginLeft: SIZES.width * 0.5,
                width: SIZES.width * 0.15,
                height: SIZES.width * 0.15,
              }}
            />
          </View>
          <View>
            <Text style={styles.popText}>Product Name :{pro.name}</Text>
            <Text style={styles.popText}>Temperature :{pro.temp}</Text>
            <Text style={styles.popText}>Quantity :{pro.totalQty}</Text>
            <Text style={styles.popText}>Sub Total :{pro.subTotal}</Text>
            <Text style={styles.popText}>Total :{pro.totalValue}</Text>
          </View>
        </View>
      );
    });
  };

  return (
    <StoreProvider store={store}>
      <ImageBackground
        source={require('./src/assets/images/bg.png')}
        style={styles.container}>
        <Text style={styles.title}>Smart Cart</Text>
        <Text style={styles.title2}>
          For{'\n'}New{'\n'}Experience
        </Text>

        <Modal
          animationType="slide"
          transparent={modalVisible1}
          visible={modalVisible1}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible1(!modalVisible1);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>{WholeNews()}</View>
              <TouchableOpacity
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button2, styles.buttonOpen]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Proceed</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            // Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            {product ? (
              <View style={styles.modalView}>
                <Text style={styles.titlenew}>Confirm Payment</Text>
                <Text style={styles.centerText}>Total: {product.subTotal}</Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>Confirm</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.buttonOpen]}
          onPress={() => info()}>
          <Text style={styles.textStyle}>Info</Text>
        </TouchableOpacity>
      </ImageBackground>
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
    height: SIZES.height * 0.6,
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button2: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    position: 'absolute',
    bottom: 20,
    right: 100,
  },
  buttonOpen: {
    backgroundColor: COLORS.primary,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 30,
    borderRadius: 20,
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
    // justifyContent: 'space-around',
    alignContent: 'center',
    flexDirection: 'column',
  },
  proCon: {
    height: SIZES.height * 0.2,
    width: SIZES.width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 20,
    // elevation: 1,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'SMARC___',
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginRight: 30,
    textAlign: 'right',
    width: SIZES.width,
  },
  titlenew: {
    fontFamily: 'SMARC___',
    fontSize: 40,
    fontWeight: 'bold',
    color: COLORS.primary,
    textAlign: 'center',
    width: SIZES.width,
  },
  title2: {
    fontFamily: 'SMARC___',
    fontSize: 35,
    fontWeight: 'bold',
    color: COLORS.secondary,
    // marginLeft: SIZES.width / 2,
    textAlign: 'right',
    width: SIZES.width,
    marginRight: 30,
    marginTop: -10,
  },
  popText: {
    fontFamily: 'SMARC___',
    fontSize: 15,
    color: COLORS.secondary,
    marginLeft: 20,
    textAlign: 'left',
    width: SIZES.width,
  },
  centerText: {
    textAlign: 'left',
    fontSize: 22,
    // marginTop: 30,
    // marginLeft: 30,
    padding: 2,
    color: '#777',
  },
});
