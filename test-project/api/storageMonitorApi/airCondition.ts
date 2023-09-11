/**
 * 储能监控-空调
 */
export default {
  prefix: "/api/micro-grid",

  /**
   * @description 获取空调基础数据
   * @alias /api/micro-grid/work_mode/storage/air_condition/{airThingId}/basic_info
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%A9%BA%E8%B0%83/getAirConditionBasinInfoUsingGET
   */
  airConditionBasicInfo: {
    get: "work_mode/storage/air_condition/{airThingId}/basic_info",
  },
  /**
   * @description 获取空调遥测数据
   * @alias /api/micro-grid/work_mode/storage/air_condition/{airThingId}/telemetry
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%A9%BA%E8%B0%83/getAirTelemetryDataUsingGET
   */
  telemetry: {
    get: "work_mode/storage/air_condition/{airThingId}/telemetry",
  },
  /**
   * @description 获取空调曲线数据
   * @alias /api/micro-grid/work_mode/storage/air_condition/{airThingId}/curve
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/微电网/工作模式-储能监控-空调/getAirCurveUsingPOST
   */
  curve: {
    post: "work_mode/storage/air_condition/{airThingId}/{dataType}/curve",
  },
  /**
   * @description 导出空调曲线数据
   * @alias /api/micro-grid/work_mode/storage/air_condition/{airThingId}/curve
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/微电网/工作模式-储能监控-空调/exportAirCurveDataUsingPOST
   */
  exportCurve: {
    post: "work_mode/storage/air_condition/{airThingId}/{dataType}/curve/export",
  },
  /**
   * @description 空调遥调遥控
   * @alias /api/micro-grid/work_mode/storage/remote/{grid_id}/air/{air_thing_id}/control
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E8%BF%9C%E7%A8%8B%E8%B0%83%E6%8E%A7/remoteAirControlUsingPOST
   */
  remoteAirControl: {
    post: "work_mode/storage/remote/{grid_id}/air/{air_thing_id}/control",
  },

  /**
   * @description 请求一体柜配置数据
   * @alias /api/micro-grid/work_mode/storage/remote/{grid_id}/air/{device_thing_id}/send
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E8%BF%9C%E7%A8%8B%E8%B0%83%E6%8E%A7/sendMqttDataReqUsingPOST
   */
  airSend: {
    post: "work_mode/storage/remote/{grid_id}/air/{device_thing_id}/send",
  },
};
