import React from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';
import {signOut } from '../backend/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

const InternaScreen = () => {
  const navegacao = useNavigation();
  const executarLogout = async () => {
    try { 
        await signOut;
        Alert.alert('Desconectado');
        navegacao.navigate("Home");
    } catch(error) {
        Alert.alert("Erro", error.message);
    } 
    
};

   return(
     <View style={styles.container}>
        <Text>Bem vindo!</Text>
        <Button title='Sair' onPress={executarLogout}/>
     </View>
   );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default InternaScreen;