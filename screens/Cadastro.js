import React, {useState} from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { auth, createUserWithEmailAndPassword } from '../backend/FirebaseConfig'


const CadastroScreen = () =>{
    const navegacao = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const executarCadastro = async () => {
        try { 

            await createUserWithEmailAndPassword(auth, email, senha);
            Alert.alert("Cadastro realizado com sucesso!");               
            navegacao.navigate("Interna");
            
        } catch(error) {
            Alert.alert("Erro", error.message);
        } 
        
    };

    return (
        <View>
            <Text>E-mail</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Text>Senha</Text>
            <TextInput value={senha} onChangeText={setSenha} secureTextEntry />

            <Button title='Entrar' onPress={executarCadastro}/>
            <Button title= "Voltar" onPress={() => navegacao.navigate('Home')} />
            <StatusBar style="auto" />
        </View>
          
    )
};

export default CadastroScreen;