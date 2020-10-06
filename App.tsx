import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet
          , Text
          , View
          , Image
          , TextInput
          , TouchableOpacity
          , AsyncStorage
        } from 'react-native';

export default function App() {

  const [name, setName] = useState('');
  const [user, setUser] = useState([]);
  
  const save = async() => {
    try {
      await AsyncStorage.setItem('MyName', name);

    } catch (err) {
      alert(err);
    }

    let user = {
      name: 'AVOP'
      , location: 'RJ'
    }

    await AsyncStorage.setItem('User', JSON.stringify(user));


  }

  const load = async() => {
    try {
      let name = await AsyncStorage.getItem('MyName');

      if( name != null) {
        setName(name);
      }

      let jsonValue = await AsyncStorage.getItem('User');
      if( jsonValue != null) {
        setUser(JSON.parse(jsonValue));
      }


    } catch (err) {
      alert(err);
    }
  }

  const remove = async () => {
    try {
      await AsyncStorage.removeItem('MyName');

    } catch (err) {
      alert(err);

    } finally {
      setName('');
    }
  }

  useEffect(() => {
    load();
  }, [])

    return (
    <View style={styles.container}>

      <Image 
        source={require('./assets/Church.jpeg')} 
        style={{width: '100%', height: 200, marginTop: 64}} 
        resizeMode='contain'
      />

      <Text style={{height: 30}}>{name}</Text> 
      <Text style={{height: 30}}>{user.name}</Text> 
      <Text style={styles.name}>What's your name? </Text>

      <TextInput 
        style={styles.input} 
        value={name}
        onChangeText={ text => setName(text) }
        
      />



      <TouchableOpacity style={styles.button} onPress={() => save()} >
        <Text style={{color: 'white'}}>Save my name</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => remove()}>
        <Text style={{color: 'white'}}>Remove my name</Text>
      </TouchableOpacity>




      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
  , name: {
    fontSize: 24
    , fontWeight: '300'
  }
  , input: {
    borderWidth: 1
    , borderColor: '#575dd9'
    , alignSelf: 'stretch'
    , margin: 32
    , height: 64
    , borderRadius: 6
    , paddingHorizontal: 16
    , fontSize: 24
    , fontWeight: '300'
    ,
  }
  , button: {
    backgroundColor: '#575dd9'
    , alignItems: 'center'
    , justifyContent: 'center'
    , alignSelf: 'stretch'
    , paddingVertical: 12
    , paddingHorizontal: 32
    , marginTop: 32
    , marginHorizontal: 32
    , borderRadius: 6
    , 
  }
});
