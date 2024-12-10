import { View, Text, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const navegacao = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const executarLogin = () => {
        Alert.alert("Olá", 'Usuário: '+ email);
    };

    return (
        <View>
            <Text>E-mail</Text>
            <TextInput value={email} onChangeText={setEmail} />
            <Text>Senha</Text>
            <TextInput value={senha} onChangeText={setSenha} secureTextEntry />

            <Button title="Entrar" onPress={() => navegacao.navigator('Interna')}/>
            <Button title= "Voltar" onPress={() => navegacao.navigate('Home')} />
        </View>

    );

};

export default LoginScreen;