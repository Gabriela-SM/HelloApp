import React, {useEffect, useState} from 'react';
import { View, TextInput, Alert, Button } from 'react-native';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { banco } from '../backend/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

import AuthContext from '../util/Contexto';

import { auth } from '../backend/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const CriarTarefa = () => {
    const[nome, setNome] = useState('');
    const[descricao, setDescricao] = useState('');

    const [ userId, setUserId ] = useState(null);

    
    useEffect(() => {
        const usuario = onAuthStateChanged(auth, user => {
            if (user){
                setUserId(user.uid);
            } else {
                setUserId(null);
            }
        });
        return () => usuario();
    }, []);

    const navegacao = useNavigation();
    const cadastrar = async () => {
     try {
         await addDoc(collection(banco, 'tarefas'),
             {
             nome, descricao,
             'userId': userId,
             'data_criacao': Timestamp.now()
             }
         );
         Alert.alert("Sucesso", "Tarefa cadastrada com sucesso");
         navegacao.navigate("Interna");
     } catch(error){
         Alert.alert("Erro", error);

     }

    }
    return (
        <View>
            <TextInput placeholder='Nome da Tarefa' value={nome} onChangeText={setNome} />
            <TextInput placeholder='Descrição' value={descricao} onChangeText={setDescricao} />
            <Button title= "Cadastrar" onPress ={cadastrar} />
        </View>
    );
}

export default CriarTarefa;