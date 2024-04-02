import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Image,
    Pressable,
  } from "react-native";
  import React from "react";
  
  export default function Sobre() {
    return (
        <View style={estilos.Container}>
          <ScrollView>
            <Text style={estilos.subtitulo}>Sobre o app PhotoMap</Text>
            <Text style={estilos.texto}>
              O <Text style={estilos.nomeApp}>PhotoMap</Text> é um aplicativo inteligente que combina a paixão pela fotografia com a precisão da localização. Imagine capturar momentos especiais e, ao mesmo tempo, registrar exatamente onde cada foto foi tirada.
            </Text>
            <Text style={estilos.texto}>
              Ao salvar a foto, o usuário pode visualizar informações como
              título e a localização da foto.
            </Text>
            <Text style={estilos.texto}>
              O aplicativo poderá receber novos recursos conforme o feedback e
              demanda dos usuários.
            </Text>
            <Text style={estilos.texto}>
              <Text style={estilos.nomeApp}>PhotoMap</Text> &copy; 2024
            </Text>
          </ScrollView>
        </View>
    );
  }
  
  const estilos = StyleSheet.create({
    AbrirSite: {
      flexDirection: "row",
      justifyContent: "center",
    },
    imagem: {
      width: 180,
      alignItems: "center",
    },
    container: {
        flex: 1,
        backgroundColor: "#00000",
        alignItems: "center",
        color:"#ffffff",
        justifyContent: "space-evenly",
      },
    subtitulo: {
      fontWeight: "bold",
      marginVertical: 8,
      fontSize: 18,
    },
    texto: {
      marginVertical: 8,
    },
    nomeApp: {
      fontWeight: "bold",
      color: "#DE2E03",
    },
  });