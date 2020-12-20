import React from 'react';
import {useState} from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  TouchableHighlight, Image, ScrollView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {launchImageLibrary} from 'react-native-image-picker';
import { VictoryChart, VictoryLine } from "victory-native";
import { PieChart } from 'react-native-svg-charts'


function DetailScreen({ route, navigation }) {
  return (
    <View style={{ flex: 1}}>
      <Text>detail screen</Text>
    </View>
  )
}

function AddNewFilmScreen({navigation}) {
  return (
    <View>
      <Text>add new film screen</Text>
    </View>
  )
}

function OptionsScreen({route, navigation}) {

  return (
    <View>
      <Text>option screen</Text>
    </View>
  )
}

function HomeScreen({navigation}) {

  return (
    <View>
      <Text>home screen</Text>
    </View>
  )
}

function GraphScreen({navigation}) {
  let renderScreen = []
  const [figure, setFigure] = useState(true)
  var x = [-6.28, -5.38, -4.48, -3.58, -2.68, -1.78, -0.88, 0.02, 0.92, 1.82, 2.72, 3.62, 4.52, 5.42];
  var y = x.map(Math.sin);

  const data = [{size:25, color:"yellow"},
                {size:20, color:"green"},
                {size:55, color:"blue"},]

  const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

  const pieData = data
    .map((value, index) => ({
      value:value.size,
      svg: {
        fill: value.color,
      }
    }))
  if (figure === true){
    renderScreen = [
      <View>
        <View style={styles.butFig}>
          <Button
            onPress={() => setFigure(!figure)}
            title="graph"
            color="#00aa00"
            style={styles.butFig}
          />
        </View>
        <View >
          <VictoryChart>
            <VictoryLine
              data={[-6.28, -5.88, -5.48, -5.08, -4.68, -4.28, -3.88, -3.48, -3.08, -2.68, -2.28, -1.88, -1.48, -1.08, -0.68, -0.28, 0.12, 0.52, 0.92, 1.32, 1.72, 2.12, 2.52, 2.92, 3.32, 3.72, 4.12, 4.52, 4.92, 5.32, 5.72, 6.12].map((t) => ({ t }))}
              sortKey="t"
              x = {(d) => d.t}
              y={(d) => Math.sin(d.t)}
            />
          </VictoryChart>
        </View>
      </View>
    ]
  }else {
    renderScreen = [
      <View>
        <View style={styles.butFig}>
          <Button
            onPress={() => setFigure(!figure)}
            title="diagram"
            color="#0000aa"
            style={styles.butFig}
          />
        </View>
        <View>
          <PieChart style={{ height: 200 }} data={pieData} />
        </View>
      </View>
    ]
  }
  return renderScreen
}

const GStack = createStackNavigator();

function GraphStackScreen({navigation}){
  return (
    <Stack.Navigator>
      <GStack.Screen name='Graph'
                     component={GraphScreen}
      />
    </Stack.Navigator>
  )
}

const HStack = createStackNavigator();

function HomeStackScreen({navigation}){
  function LogoTitle({navigation}) {
    return (
      <View style={styles.addFilm}>
        <TouchableHighlight onPress={() => navigation.navigate("Add")}>
          <View>
            <Text>de</Text>
            {/*<AntDesign name="plus" size={24} color="black" />*/}
          </View>
        </TouchableHighlight>
      </View>

    );
  }

  return (

    <HStack.Navigator>
      <HStack.Screen name='Home'
                     component={HomeScreen}
                     options={{headerRight: props => LogoTitle({navigation})}}
      />
      <HStack.Screen name="Detail" component={DetailScreen}/>
      <HStack.Screen name="Add" component={AddNewFilmScreen}/>
      <HStack.Screen name="Options" component={OptionsScreen}/>
    </HStack.Navigator>
  )
}

const Stack = createStackNavigator();

function ImageStackScreen({navigation}) {
  const [ImageList, setImageList] = useState([])
  function addImageBut({ navigation }) {
    return (
      <View style={styles.addFilm}>
        <TouchableHighlight onPress={AddImage}>
          <View>
            <Text style={{ fontSize: 30 }}>+</Text>
          </View>
        </TouchableHighlight>
      </View>

    );
  }

  function AddImage() {
    launchImageLibrary({storageOptions: { skipBackup: true, path: 'images'}}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else {
        setImageList(value => [...value, response.uri])
      }
      })
  }

  // class CustomImage extends React.Component{
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       id: props.id,
  //       width: 200,
  //       height: 200,
  //       uri: ''
  //     }
  //     this.launchImage()
  //   }
  //   launchImage (){
  //     launchImageLibrary({storageOptions: { skipBackup: true, path: 'images'}}, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else {
  //       this.setState({uri:() => response.uri})
  //     }
  //     })
  //   }
  //   render() {
  //     return <Text>sa</Text>;
  //   }
  // }

  function getStyle(index) {
    const sizeBig = {height:260, width: 260}
    const sizeSm = {height:130, width: 130}
    index = index % 12
    let ret = {}
    if (index === 0){
      Object.assign(ret, sizeBig)
    }else if(index===1){
      Object.assign(ret, sizeSm, {position:'absolute', right:0})
    }else if(index===2){
      Object.assign(ret, sizeSm, {position:'absolute', top:130, right:0})
    }else if(index===3 || index ===6 || index===7 || index===9){
      Object.assign(ret, sizeSm, )
    }else if(index===4 || index===10){
      Object.assign(ret, sizeSm, {position: 'absolute', top:260+Math.floor(index/6)*390, right:130})
    }else if(index===5 || index===11){
      Object.assign(ret, sizeSm, {position: 'absolute', top:260+Math.floor(index/6)*390, right:0})
    }else if(index===8 ){
      Object.assign(ret, sizeBig, {position: 'absolute', top:390, left:130})
    }
    console.log(ImageList, ret)
    return ret
  }

  function ImageScreen() {
    return (
      <View>
        <ScrollView>
          {ImageList.map((value, index) =>
            <Image key={index}
              source={{ uri: value }}
              style={getStyle(index)}
            />)}
        </ScrollView>
      </View>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen name="Image"
                    component={ImageScreen}
                    options={{ headerRight: props => addImageBut({ navigation }) }}
      />
      <Stack.Screen name='Home'
                    component={HomeScreen}
      />
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator()

function App() {
  return (
    <NavigationContainer initialRouteName="Home" >
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen}/>
        <Tab.Screen name='Image' component={ImageStackScreen} />
        <Tab.Screen name='Graph' component={GraphStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  imageC:{
    height: 100, width: '50%'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  addFilm: {
    marginRight: 12 ,
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: .5,
    borderColor: '#000',
    height: 40,
    borderRadius: 5 ,
    marginHorizontal: 20,
    marginTop: 0,
  },
  ImageStyle: {
    padding: 0,
    margin: 10,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
  },
  containerStyle: {
    height: 25,
    width: 25,
    backgroundColor: "#000000"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  butFig:{
    marginHorizontal: 15,
    marginVertical: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  logo: {
    height: 100,
    width: "66%",
    borderRadius: 1,
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  innerText: {
    fontWeight: 'normal',
    marginHorizontal: "120"
  },
  twoButton: {
    fontSize: 20,
    margin:20,
    flexDirection: 'column',
    justifyContent: "space-between"
  },
  button1: {
    borderRadius: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#00ff00",
    padding: 10,
    margin: 20
  },
  button2: {
    borderRadius: 20,
    height: 100,
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#ff0000",
    padding: 10,
    margin: 20
  },
  addImage: {
    borderRadius: 20,
  },
  image1:{
    height:266,
    width:266,
  }
});

export default App;
