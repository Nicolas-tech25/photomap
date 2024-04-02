import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Pressable,
    Image,
    ScrollView,
    Alert,
    TextInput,
  } from "react-native";
  import logo from "../../assets/logo.png";
  import { Ionicons } from "@expo/vector-icons";
  
  export default function Home({ navigation }) {
    return (
      <>
        <StatusBar color="#f7f7f7" />
        <View style={estilos.container}>
          <View>
            <Image style={estilos.logo} source={logo} />
            <Text style={estilos.titulo}>PhotoMap</Text>
          </View>
          <View style={estilos.viewBotoes}>
            <Pressable
              style={estilos.botao}
              onPress={() => navigation.navigate("SalvarFoto")}
            >
              <Text style={estilos.textoBotao}>Salvar Foto</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Biblioteca")}
              style={estilos.botao}
            >
              <Text style={estilos.textoBotao}> Biblioteca </Text>
            </Pressable>
          </View>
          <View style={estilos.viewRodape}>
        <Pressable
          style={estilos.botaoRodape}
          onPress={() => navigation.navigate("Privacidade")}
        >
          <Text style={color="#DE2E03"}>
            <Ionicons name="lock-closed" size={12} color="#DE2E03" /> Privacidade
          </Text>
        </Pressable>
        <Pressable
          style={estilos.botaoRodape}
          onPress={() => navigation.navigate("Sobre")}
        >
          <Text style={color="#DE2E03"}>
            <Ionicons name="information-circle" size={12} color="#DE2E03" /> Sobre
          </Text>
        </Pressable>
      </View>
        </View>
      </>
    );
  }
  
  const estilos = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffff",
      alignItems: "center",
      justifyContent: "space-evenly",
    },
    logo: {
      width: 350,
      height: 280,
      alignSelf: "center",
    },
    botao: {
      backgroundColor: "#DE2E03",
      padding: 12,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 5,
      marginBottom: 24,
    },
    textoBotao: {
      color: "#f7f7f7",
      fontWeight: "bold",
      fontSize: 18,
    },
    titulo: {
      textAlign: "center",
      fontSize: 24,
      color: "#DE2E03",
    },
    viewBotoes:{
    gap: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    },
    viewRodape: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      botaoRodape: {
        padding: 16,
        alignItems: "center",
      },
  });