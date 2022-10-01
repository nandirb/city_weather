import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  GEO_API_URL,
  geoApiOptions,
  WEATHER_API_URL,
  WEATHER_API_KEY,
} from "../api";
import { Item, TextView } from "../components";
import { colors, roundness, spacing } from "../design";
import { ITEM_HEIGHT } from "../components/Item";
import * as Location from "expo-location";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import LottieView from "lottie-react-native";
import { lottie } from "../../assets/lottie";

const getLocation = async (setCurrentWeather: (loc: any) => void) => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  const location = await Location.getCurrentPositionAsync();

  if (status !== "granted") {
    return Alert.alert("Permission to access location was denied");
  }

  if (location) {
    const { latitude, longitude } = location.coords;
    const response = await fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    if (response) {
      const data = await response.json();
      const weatherinfo = {
        description: data.weather[0].description,
        ...data.main,
      };
      setCurrentWeather(weatherinfo);
    }
  }
};

const renderItem = ({ item }: any) => <Item {...item} />;
const keyExtractor = (item: any) => item.id;

const getItemLayout = (data: any, index: any) => {
  return {
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * data.length,
    index,
  };
};

const CityList: React.FC<any> = () => {
  const [search, setSearch] = React.useState("");
  const [list, setList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  const [currentWeather, setCurrentWeather] = useState<any>(null);

  const getCities = async () => {
    const url = search
      ? `${GEO_API_URL}/cities?namePrefix=${search}`
      : `${GEO_API_URL}/cities?limit=${limit}`;

    try {
      const response = await fetch(url, geoApiOptions);
      const json = await response.json();
      setList(json?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onReachEnd = () => {
    if (!search) {
      setLimit(limit + 10);
    }
  };

  useEffect(() => {
    getLocation(setCurrentWeather);
    getCities();
  }, [search]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <LottieView
          autoPlay
          style={{
            height: 120,
          }}
          source={lottie.weather}
        />
        {currentWeather && (
          <TextView
            isDetail
            xxlarge
            center
            style={{ marginBottom: spacing * 2, alignItems: "center" }}
          >{`${currentWeather.temp}°C`}</TextView>
        )}
      </View>

      <View style={styles.textInput}>
        <TextInput
          value={search}
          placeholder="Search a city"
          placeholderTextColor={colors.textSecondary}
          onChangeText={(text: string) => setSearch(text)}
          style={{ flex: 1, color: colors.textPrimary }}
        />

        <TouchableOpacity onPress={() => setSearch("")}>
          <Icon name="close" color={colors.textSecondary} size={16} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onEndReached={onReachEnd}
      />
    </View>
  );
};

export default CityList;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    height: 60,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "transparent",
    borderRadius: roundness,
    alignItems: "center",
    backgroundColor: colors.white,
    marginHorizontal: spacing,
    marginBottom: spacing,
  },
});
