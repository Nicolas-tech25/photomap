import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import SalvarFoto from "./src/screens/SalvarFoto";
import Biblioteca from "./src/screens/Biblioteca";
import Sobre from "./src/screens/Sobre";
import Privacidade from "./src/screens/Privacidade";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: "#DE2E03" },
            headerTintColor: "#fff",
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="SalvarFoto"
            component={SalvarFoto}
            options={{ title: "Salvar Fotos" }}
          />
          <Stack.Screen
            name="Biblioteca"
            component={Biblioteca}
            options={{ title: "Biblioteca" }}
          />

          <Stack.Screen
            name="Sobre"
            component={Sobre}
            options={{ title: "Conheça nosso App" }}
          />
          <Stack.Screen name="Privacidade" component={Privacidade} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}