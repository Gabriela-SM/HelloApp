import React, {useState} from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const CadastroScreen = () =>{
    const navegacao = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <View>
            <Text>E-mail</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Text>Senha</Text>
            <TextInput value={senha} onChangeText={setSenha} secureTextEntry />

            <Button title='Entrar'/>
            <Button title= "Voltar" onPress={() => navegacao.navigate('Home')} />
            <StatusBar style="auto" />
        </View>
          
    )
};

export default CadastroScreen;