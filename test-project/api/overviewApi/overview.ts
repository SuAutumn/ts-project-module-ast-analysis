/**
 * 资方大屏相关api
 */
export default {
  prefix: "/api/watchman",

  /**
   * @description 获取用户名下资产信息
   * @alias /api/watchman/managements/assets
   * @doc http://dev.secp.192.168.221.92.nip.io/api/watchman/doc.html#/智慧电站/资方大屏相关api/getStationAssetsUnderUserUsingGET
   */
  assets: {
    get: "/managements/assets",
  },
  /**
   * @description 获取用户名下电站的(T+1)指标信息
   * @alias /api/watchman/managements/stations/appoints
   * @doc http://dev.secp.192.168.221.92.nip.io/api/watchman/doc.html#/智慧电站/资方大屏相关api/getStationsAppointUnderUserUsingGET
   */
  appoints: {
    get: "/managements/stations/appoints",
  },
  /**
   * @description 获取用户名下电站的历史发电量信息
   * @alias /api/watchman/managements/stations/e/curves/months
   * @doc http://dev.secp.192.168.221.92.nip.io/api/watchman/doc.html#/智慧电站/资方大屏相关api/getStationEMonthCurvesUnderUserUsingGET
   */
  months: {
    get: "/managements/stations/e/curves/months",
  },
  /**
   * @description 分页查询设备信息
   * @alias /api/watchman/work_mode/devices/alarms/page
   * @doc http://test.secp.192.168.221.92.nip.io/api/watchman/doc.html#/%E6%99%BA%E6%85%A7%E7%94%B5%E7%AB%99/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6API/pageDeviceAlarmsUsingPOST_1
   */
  alarms: {
    post: "/work_mode/devices/alarms/page",
  },
};
