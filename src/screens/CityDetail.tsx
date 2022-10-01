import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet, ActivityIndicator } from "react-native";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../api";
import { useNavigation } from "@react-navigation/native";
import { colors, roundness, padding, spacing } from "../design";
import { TextView } from "../components";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import useApp from "../hooks/useApp";

const initialData = {
  feels_like: 0,
  humidity: 0,
  pressure: 0,
  temp: 0,
  temp_max: 0,
  temp_min: 0,
  description: "",
  wind: 0,
};

const CityDetail: React.FC<any> = ({ route }) => {
  const { latitude, longitude, name, id } = route?.params;
  const { setViewedCities } = useApp();

  const navigation = useNavigation();

  const [data, setData] = useState(initialData);
  const [icon, setIcon] = useState("");
  const [loading, setLoading] = useState(true);

  const getWeather = async ({ latitude, longitude }: any) => {
    try {
      const response = await fetch(
        `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
      );

      let weatherData = await response.json();

      if (weatherData) {
        const { main } = weatherData;
        const img = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

        setViewedCities((prev: any) => [
          ...prev,
          { id, main, condition: weatherData.weather[0].id },
        ]);

        const weatherinfo = {
          description: weatherData.weather[0].description,
          wind: weatherData.wind.speed,
          ...main,
        };
        setIcon(img);
        setData(weatherinfo);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWeather({ latitude, longitude });
  }, []);

  const today = new Date();

  const renderRow = (title: string, value: any) => {
    return (
      <View style={styles.row}>
        <TextView>{title}</TextView>
        <TextView style={{ marginStart: 8 }} color={colors.primary}>
          {value}
        </TextView>
      </View>
    );
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.container} color={colors.primary} />
    );
  }
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "flex-end", paddingEnd: spacing }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: spacing,
          }}
        >
          <Icon
            name="map-marker"
            color={colors.white}
            size={20}
            style={{ marginRight: spacing / 2 }}
          />
          <TextView large boldless isDetail xxlarge>
            {name}
          </TextView>
        </View>
        <TextView large isDetail>
          {today.toLocaleDateString()}
        </TextView>
      </View>
      <View style={styles.header}>
        <View style={styles.center}>
          <TextView
            isDetail
            xxxlarge
            style={{ marginBottom: spacing }}
          >{`${data.temp}°C`}</TextView>
          {icon && (
            <Image source={{ uri: icon }} style={{ height: 100, width: 100 }} />
          )}
          <TextView isDetail xlarge center>
            {data.description}
          </TextView>
        </View>
      </View>
      <View>
        <View style={styles.detail}>
          {renderRow("Humidity", data.humidity)}
          {renderRow("Pressure", data.pressure)}
          {renderRow("Wind", data.wind)}
        </View>
      </View>
    </View>
  );
};

export default CityDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    justifyContent: "space-between",
    flex: 1,
    padding: spacing,
  },
  header: {
    paddingHorizontal: spacing,
    paddingBottom: spacing * 2,
  },
  detail: {
    padding: spacing * 2,
    borderRadius: roundness,
    backgroundColor: colors.white,
    margin: spacing,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: spacing,
  },
  detailIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
