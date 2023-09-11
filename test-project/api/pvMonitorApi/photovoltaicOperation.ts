/**
 * 资方大屏相关api
 */
export default {
  prefix: "/api/micro-grid",

  realTimeWeather: {
    get: "/dark/park/{id}/pv/running/weather/current",
  },
  sevenDWeather: {
    get: "/dark/park/{id}/pv/running/weather/forecast/7d",
  },
  fourHWeather: {
    get: "/dark/park/{id}/pv/running/weather/forecast/4h",
  },
  deviceList: {
    get: "/dark/park/{id}/pv/running/inverters",
  },
  powerCurve: {
    get: "/dark/park/{id}/pv/running/power_curve",
  },
  curveExport: {
    post: "/dark/park/{id}/pv/running/power_curve/export?startDate={startDate}&endDate={endDate}",
  },
};
