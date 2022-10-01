export const getIcon = (code: number) => {
  switch (true) {
    case code > 800:
      return "weather-cloudy";
    case code >= 700 && code < 800:
      return "weather-hail";
    case code >= 600 && code < 700:
      return "weather-snowy-heavy";
    case code >= 500 && code < 600:
      return "weather-pouring";
    case code >= 400 && code < 500:
      return "weather-pouring";
    case code >= 300 && code < 400:
      return "weather-pouring";
    case code >= 200 && code < 300:
      return "weather-lightning";
  }
};
