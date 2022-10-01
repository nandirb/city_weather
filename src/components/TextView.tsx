/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { Text } from "react-native";
import { colors } from "../design";

const TextView = ({
  children,
  style,
  numberOfLines = undefined,
  bold,
  boldless,
  italic,
  capitalize,
  uppercase,
  flex,
  lineHeight,
  center,
  xxsmall,
  xsmall,
  small,
  normal,
  large,
  xlarge,
  xxlarge,
  xxxlarge,
  xxxxlarge,
  color = colors.textPrimary,
  isDetail,
  secondary,
}: any) => {
  return (
    <Text
      maxFontSizeMultiplier={1}
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
      style={[
        flex && { flex: 1 },
        bold && { fontWeight: "bold" },
        boldless && { fontWeight: "500" },
        capitalize && { textTransform: "capitalize" },
        uppercase && { textTransform: "uppercase" },
        center && { textAlign: "center" },
        italic && { fontStyle: "italic" },
        xxsmall && { fontSize: 8 },
        xsmall && { fontSize: 10 },
        small && { fontSize: 12 },
        normal && { fontSize: 15 },
        large && { fontSize: 16 },
        xlarge && { fontSize: 18 },
        xxlarge && { fontSize: 30 },
        xxxlarge && { fontSize: 60 },
        xxxxlarge && { fontSize: 80 },
        { lineHeight, color },
        { color: isDetail ? colors.white : color },
        secondary && {
          color: colors.textSecondary,
          textTransform: "uppercase",
          fontSize: 12,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextView;
