/**
 * 储能监控-bms的电池包
 */
export default {
  prefix: "/api/micro-grid/work_mode/storage/",

  /**
   * @description 获取电池包基础信息
   * http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E6%B1%A0%E5%8C%85/getBatteryPackBasicInfoUsingGET
   **/
  basicInfo: {
    get: "battery_pack/{packThingId}/basic_info",
  },
  /**
   * @description 获取电池包下所有电芯详情
   * doc:http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E6%B1%A0%E5%8C%85/getBatteryPackDetailUsingGET
   */
  cellDetail: {
    get: "battery_pack/{packThingId}/cell_detail",
  },
  /**
   * @description 获取电池包遥测数据
   * doc:http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%94%B5%E6%B1%A0%E5%8C%85/getBatteryPackTelemetryDataUsingGET
   **/
  telemetry: {
    get: "battery_pack/{packThingId}/telemetry",
  },
  /**
   * @description 获取单体电芯曲线数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/微电网/工作模式-储能监控-BMS/getBmsCellCurveUsingPOST
   **/
  cellCurve: {
    post: "cell/{cellThingId}/curve",
  },
  /**
   * @description 导出PCS曲线数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/exportStorageCurveDetailDataUsingPOST_1
   **/
  cellCurveExport: {
    post: "cell/{cellThingId}/curve/export",
  },
};
