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
    Vibration,
  } from "react-native";
  
  import MapView, { Marker } from "react-native-maps";
  import { useEffect, useState } from "react";
  import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
  import { Feather } from '@expo/vector-icons';
  import { FontAwesome6 } from '@expo/vector-icons';
  import { MaterialCommunityIcons } from '@expo/vector-icons';
  /* Importando o imagePicker */
  import * as ImagePicker from "expo-image-picker";
  
  /* Importando o expo-location */
  import * as Location from "expo-location";
  
  /* Importando o Async storage */
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  export default function SalvarFoto() {
    const [localizacao, setLocalizacao] = useState(null);
    const [camera, setCamera] = useState(null);
    const [status, requestPermission] = ImagePicker.useCameraPermissions();
    const [mapa, setMapa] = useState(null);
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
  
    useEffect(() => {
      async function Obterpermissoes() {
        /* Pedindo permissão da camera */
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        requestPermission(cameraStatus === "granted");
  
        /* Pedindo permissão  Localização */
        const { status: posicaoMapa } =
          await Location.requestForegroundPermissionsAsync();
  
        if (posicaoMapa !== "granted") {
          Alert.alert("Ops", "Você não permitiu sua localização");
          return;
        }
  
        /* Armazenando os dados da localização atual */
        try {
      let minhaLocalizacao = await Location.getCurrentPositionAsync({});
      if (minhaLocalizacao) {
        setMapa(minhaLocalizacao);
        // Resto do seu código...
      } else {
        // Trate o caso em que minhaLocalizacao é null
        console.error("Erro ao obter a localização.");
      }
    } catch (error) {
      console.error(error);
    }
  }  
      Obterpermissoes();
    }, []);
  
    const obterNomeRua = async (latitude, longitude) => {
        try {
          if (!mapa) {
            return null;
          }
      
          // Chama a função reverseGeocodeAsync para obter as informações de localização
          const locationInfo = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });
      
          // Verifica se foram retornadas informações de localização
          if (locationInfo && locationInfo.length > 0) {
            // Extrai o nome da rua das informações de localização
            const endereco = locationInfo[0].street;
            return endereco;
          } else {
            // Retorna null se não foram encontradas informações de localização
            return null;
          }
        } catch (error) {
          // Lida com erros, se houver algum
          console.error("Erro ao obter o nome da rua:", error);
          return null;
        }
      };
      
  
    const tirarFotoLocal = async () => {
      const foto = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        aspect: [16, 9],
        quality: 0.5,
      });
  
      if (!foto.canceled) {
        setCamera(foto.assets[0].uri);
      }
    };
  
    const melocaliza = () => {
      setLocalizacao({
        latitude: mapa.coords.latitude,
        longitude: mapa.coords.longitude,
  
        latitudeDelta: 0.001,
        longitudeDelta: 0.002,
      });
    };
  
    const limpar = () => {
      setLocalizacao(null);
      setCamera(null);
    };
  
    const salvar = async () => {
      if (!camera || !localizacao || nome === "") {
        Alert.alert(
          "Ops!!",
          "Você precisa tirar a foto ou se localizar ou digitar o nome para salvar"
        );
        return;
      }
  
      try {
        const albumDeLocais = await AsyncStorage.getItem("@albumvisitei");
  
        const listaDeLocais = albumDeLocais ? JSON.parse(albumDeLocais) : [];
        const jaTemLocal = listaDeLocais.some((listaDeLocais) => {
          return listaDeLocais.nome === nome;
          // True or False
        });
  
        if (jaTemLocal) {
          Alert.alert("Ops!", "Você já salvou um local com esse nome");
          Vibration.vibrate(300);
          return;
        }
  
        listaDeLocais.push({ camera, localizacao, nome, endereco });
  
        await AsyncStorage.setItem(
          "@albumvisitei",
          JSON.stringify(listaDeLocais)
        );
  
        Alert.alert(`Local Visitado`, `local ${nome} salvo com sucesso no Álbum`);
      } catch (error) {
        console.log("Deu ruim: " + error);
  
        Alert.alert("Erro", "erro ao salvar o local");
      }
    };
  
    return (
        <>
          <StatusBar color="#f7f7f7" />
          <View style={estilos.container}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={estilos.subcontainer}
            >
              <Text style={estilos.titulo}> Registre este momento!!</Text>
              
              <View style={estilos.fotoca}>
                <Pressable onPress={tirarFotoLocal} style={estilos.botao}>
                  <View style={estilos.botaoIcone}>
                  <MaterialCommunityIcons name="camera-wireless-outline" size={18} color="white" />
                    <Text style={estilos.textoBotao}>Tirar Foto</Text>
                  </View>
                </Pressable>
                {camera && (
                  <Image
                    style={estilos.fotoLocal}
                    source={{ uri: camera }}
                  />
                )}
              </View>
              
              {camera && (
                <>
                  <TextInput
                    style={estilos.input}
                    placeholder="Dê um nome para registrar o momento"
                    onChangeText={(valor) => setNome(valor)}
                    maxLength={40}
                  />
                  <View style={estilos.verLocal}>
                    {localizacao && (
                      <MapView
                        style={estilos.fotoLocal}
                        mapType="hybrid"
                        region={localizacao}
                        scrollEnabled={false}
                      >
                        <Marker coordinate={localizacao}>
                          <Image
                            resizeMode="contain"
                            style={estilos.marcardor}
                            source={require('../../assets/marcador.png')}
                          />
                        </Marker>
                      </MapView>
                    )}
                    <Pressable onPress={melocaliza} style={estilos.botao}>
                      <View style={estilos.botaoIcone}>
                      <MaterialCommunityIcons name="map-marker-radius-outline" size={18} color="white" />
                        <Text style={estilos.textoBotao}> Localizar </Text>
                      </View>
                    </Pressable>
                  </View>
                  <View style={estilos.botoesLimpSalv}>
                    <Pressable onPress={limpar} style={estilos.botaoExcluir}>
                      <Text style={estilos.textoBotaoexcluir}>
                      <FontAwesome6 name="trash-alt" size={16} color="white" /> Limpar
                      </Text>
                    </Pressable>
                    <Pressable onPress={salvar} style={estilos.botaoSalvar}>
                      <Text style={estilos.textoBotao}>
                      <Feather name="save" size={16} color="white" />
                        Salvar</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </>
      );
      
    }
  
  const estilos = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
    },
    subcontainer: {
      flexGrow: 1,
      justifyContent: "center",
    },
    fotoLocal: {
      width: 350,
      height: 300,
      marginVertical: 18,
      borderRadius: 5,
    },
    marcardor: {
      width: 100,
      height: 100,
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
    botaoIcone: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-evenly",
      gap: 5,
    },
    input: {
      borderColor: "#DE2E03",
      padding: 12,
      borderWidth: 2,
      borderRadius: 5,
      marginVertical: 12,
      fontSize: 16,
      fontWeight: "500",
    },
    titulo: {
      textAlign: "center",
      fontSize: 20,
      padding: 12,
      borderRadius: 5,
      margin: 10,
    },
    subtitulo: {
      textAlign: "center",
      fontSize: 18,
      margin: 10,
      padding: 12,
    },
    botoesLimpSalv: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    botaoExcluir: {
      backgroundColor: "red",
      padding: 12,
      borderRadius: 5,
      marginBottom: 24,
    },
    botaoSalvar: {
      backgroundColor: "green",
      padding: 12,
      borderRadius: 5,
      marginBottom: 24,
    },
    textoBotaoexcluir: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    },
  });