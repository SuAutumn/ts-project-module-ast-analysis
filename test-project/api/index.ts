import userApi from "./userApi";
import merchantManagerApi from "./merchantManagerApi";
import storageMonitorApi from "./storageMonitorApi";
import fileApi from "./fileApi";
import overviewApi from "./overviewApi";
import overview from "./overviewApi";
import chargeApi from "./chargeApi";
import pvMonitor from "./pv-monitor";
import alarmApi from "./alarmApi";
import pvMonitorApi from "./pvMonitorApi";
import assetsOverviewApi from "./assetsOverviewApi";
import energyControl from "./energyControl";
import controlPoliciesApi from "./controlPoliciesApi";
import rapidStationBuildingApi from "./rapidStationBuildingApi";

export default {
  host: "",
  mockHost: "http://192.168.221.31:4000/mock/40",
  ...userApi,
  ...merchantManagerApi,
  ...storageMonitorApi,
  ...fileApi,
  ...overviewApi,
  ...overview,
  ...chargeApi,
  pvMonitor,
  ...alarmApi,
  ...pvMonitorApi,
  assetsOverviewApi,
  ...energyControl,
  ...controlPoliciesApi,
  rapidStationBuildingApi,
};
