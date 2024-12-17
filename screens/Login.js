import { View, Text, TextInput, Button, Alert} from 'react-native';
import React, {useState} from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth, signInWithEmailAndPassword } from '../backend/FirebaseConfig';
import { validacaoFormularioUsuario, exibirMensagemValidacao } from '../util/Validacao';

const LoginScreen = () => {
    const navegacao = useNavigation();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const executarLogin = async () => {
        try { 
            let validacaoErro = validacaoFormularioUsuario(email, senha);
            if ( validacaoErro.lenght > 0){ 
                exibirMensagemValidacao(validacaoErro);
            } else {
                await signInWithEmailAndPassword(auth, email, senha);
                Alert.alert("Olá", 'Usuário: '+ email);
                navegacao.navigate("Interna");
            }
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

            <Button title="Entrar" onPress={executarLogin}/>
            <Button title= "Voltar" onPress={() => navegacao.navigate('Home')} />
        </View>

    );

};

export default LoginScreen;