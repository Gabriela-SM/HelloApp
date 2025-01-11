import React, {useState, useEffect} from "react";
import { View, Text, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { signOut, auth, banco } from '../backend/FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, query, getDocs, where, doc, deleteDoc } from 'firebase/firestore';

const InternaScreen = () => {
    const [userId, setUserId] = useState(null);
    const [tarefas, setTarefas] = useState(null);

    const buscarTarefas = async () => {
      const q = query(collection(banco, "tarefas"), where("userId","==",userId));
      const snapshot = await getDocs(q);
      const dados = snapshot.docs.map(doc => ({...doc.data(), id:doc.id}));

      setTarefas(dados);
    };

    useEffect(() => {
      const usuario = onAuthStateChanged(auth, user =>{
          if (user){
              setUserId(user.uid);
              buscarTarefas();
          } else {
              setUserId(null);
          }
      });

      return () => usuario();

    }, []);

    
const excluirTarefa = (id) => {
  try{
    Alert.alert("Atenção", "Deseja excluir?",
        [
        {text:'Sim',
          onPress: () => executarExclusao(id),
        },
        {text:"Não",
          onPress:() =>""
        }]
    );
   

  } catch(e) {
      Alert.alert("Erro ao excluir: ", e);
  }
};

const executarExclusao = async (id) => {
  const tarefa = doc(banco, "tarefas", id);
  await deleteDoc(tarefa);
  buscarTarefas();

};

const abrirEdicao =(id) => {
  navegacao.navigate("CriarTarefa", {tarefaId: id});
};
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
     <View>
        <Text>Bem vindo!</Text>
        <Button title='Sair' onPress={executarLogout}/>
        <Button title='Nova Tarefa' onPress={() => navegacao.navigate('CriarTarefa')}/>

        <FlatList data={tarefas} renderItem={ ({ item }) => (
            <View>
              <Text>{ item.nome }</Text>
              <Text>{ item.descricao }</Text>
              <Button title="Editar" onPress={() => abrirEdicao(item.id)} />
              <Button title="Excluir" onPress={() => excluirTarefa(item.id)}/>
            </View>
            )}
       />
     </View>
   );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default InternaScreen;