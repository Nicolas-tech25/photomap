import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button, Alert, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { obterNomeRua } from './SalvarFoto'; 

export default function Biblioteca() {
  const [listaDeLocais, setListaDeLocais] = useState([]);

  useEffect(() => {
    async function carregarLocaisSalvos() {
      try {
        const albumDeLocais = await AsyncStorage.getItem('@albumvisitei');
        if (albumDeLocais) {
          setListaDeLocais(JSON.parse(albumDeLocais));
        }
      } catch (error) {
        console.error('Erro ao carregar locais salvos:', error);
      }
    }

    carregarLocaisSalvos();
  }, []);

  const excluirTodasFotos = async () => {
    try {
      await AsyncStorage.removeItem('@albumvisitei');
      setListaDeLocais([]);
      Alert.alert('Sucesso', 'Todas as fotos foram excluídas.');
    } catch (error) {
      console.error('Erro ao excluir todas as fotos:', error);
    }
  };

  const excluirFoto = async (index) => {
    try {
      const novosLocais = [...listaDeLocais];
      novosLocais.splice(index, 1);
      setListaDeLocais(novosLocais);
      await AsyncStorage.setItem('@albumvisitei', JSON.stringify(novosLocais));
      Alert.alert('Sucesso', 'Foto excluída com sucesso.');
    } catch (error) {
      console.error('Erro ao excluir foto:', error);
    }
  };

  return (
    <FlatList
    data={listaDeLocais}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => (
        <View style={estilos.item}>
        <Image style={estilos.image} source={{ uri: item.camera }} />
        <Text style={estilos.text}>Nome: {item.nome}</Text>
        <Text style={estilos.text}>Endereço: {item.endereco ? item.endereco : 'Endereço não disponível'}</Text>
        <Pressable onPress={() => excluirFoto(index)}>
          <Text style={estilos.excluir}>Excluir Foto</Text>
        </Pressable>
      </View>
      
    )}
  />
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  item: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  excluir: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5,
  },
});