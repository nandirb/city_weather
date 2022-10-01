import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import useApp from "../hooks/useApp";
import TextView from "./TextView";
export const ITEM_HEIGHT = 65;
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { colors, padding, roundness, spacing } from "../design";
import { getIcon } from "../utils";

const BriefInfo = (data: any) => {
  const { condition, main } = data;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: spacing,
        justifyContent: "flex-end",
        paddingHorizontal: 5,
      }}
    >
      <View
        style={{
          alignItems: "flex-end",
        }}
      >
        <TextView
          small
          color={colors.textSecondary}
        >{`Now: ${main?.temp} °C`}</TextView>
        <TextView
          small
          secondary
        >{`${main?.temp_min} °C  -  ${main?.temp_max} °C`}</TextView>
      </View>
    </View>
  );
};

const Item: React.FC<any> = (data: any) => {
  const { name, latitude, longitude, country, id } = data;
  const navigation = useNavigation<any>();

  const { viewedCities, setviewedCities } = useApp();
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const index = viewedCities?.findIndex((item: any) => item.id === id);

    if (index > -1) {
      const { main, condition } = viewedCities[index];
      const weatherinfo = { main, condition };
      setInfo(weatherinfo);
    }
  }, [viewedCities]);

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("CityDetail", { name, latitude, longitude, id })
      }
    >
      <View>
        <TextView boldless xlarge style={{ marginVertical: 5 }}>
          {name}
        </TextView>
        <TextView secondary>{country}</TextView>
      </View>

      {info && <BriefInfo {...info} />}
    </TouchableOpacity>
  );
};

export default Item;

const styles = StyleSheet.create({
  item: {
    padding: spacing,
    borderRadius: roundness,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    flexWrap: "wrap",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    marginHorizontal: spacing,
    marginVertical: spacing / 4,
  },
});
