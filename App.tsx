import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { CityDetail, CityList } from "./src/screens";
import { AppProvider } from "./src/provider";
import { colors } from "./src/design";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="CityList"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primary,
            },
          }}
        >
          <Stack.Screen
            name="CityList"
            component={CityList}
            options={{ title: "", headerShadowVisible: false }}
          />
          <Stack.Screen
            name="CityDetail"
            component={CityDetail}
            options={{
              headerShadowVisible: false,
              title: "",
              headerTintColor: colors.white,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
