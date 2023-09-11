/**
 * 储能监控-电表
 */
export default {
  prefix: "/api/micro-grid/work_mode/storage/meter_condition/",

  /**
   * @description 获取电表基础数据
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E8%A1%A8/getPcsPowerCurveDataUsingPOST
   */
  meterBasicInfo: {
    get: "{meterThingId}/basic_info",
  },
  /**
   * @description 获取电表遥测数据
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E8%A1%A8/getMeterTelemetryDataUsingGET
   */
  telemetry: {
    get: "{meterThingId}/telemetry",
  },
  /**
   * @description 获取电表功率曲线数据
   * @alias /api/micro-grid/work_mode/storage/air_condition/{airThingId}/curve
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E8%A1%A8/getPcsPowerCurveDataUsingPOST
   */
  curve: {
    post: "/{meterThingId}/curve",
  },
  /**
   * @description 导出电表功率曲线数据
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E8%A1%A8/exportStorageCurveDetailDataUsingPOST
   */
  exportCurve: {
    post: "{meterThingId}/curve_data/export",
  },
  /**
   * @description 获取电表电量数据
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E8%A1%A8/getPcsElectricityDataUsingPOST
   */
  electricity: {
    post: "/{meterThingId}/electricity",
  },
  /**
   * @description 导出电表电量数据
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E8%A1%A8/exportStorageElecDataUsingPOST
   */
  exportElectricity: {
    post: "{meterThingId}/electricity/export",
  },
};
