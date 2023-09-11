/**
 * 储能监控-bms
 */
export default {
  prefix: "/api/micro-grid/work_mode/storage/bms",

  /**
   * @description bms基础信息
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/getPcsBasicInfoUsingGET
   **/
  basicInfo: {
    get: "/{bmsThingId}/basic_info",
  },
  /**
   * @description 获取PCS充放电功率曲线
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/getPcsPowerCurveDataUsingGET
   **/

  socCurve: {
    post: "/{bmsThingId}/soc_curve",
  },
  /**
   * @description 导出PCS曲线数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/exportStorageCurveDetailDataUsingPOST_1
   **/
  socCurveExport: {
    post: "/{bmsThingId}/soc_curve/export",
  },

  /**
   * @description 获取PCS遥测数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/getPcsTelemetryDataUsingGET
   **/
  telemetry: {
    get: "/{bmsThingId}/telemetry",
  },
  /**
   * @description 获取单体电芯曲线数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/微电网/工作模式-储能监控-BMS/getBmsCellCurveUsingPOST
   **/
  cellCyrve: {
    post: "/{bmsThingId}/cell/{dataType}/curve",
  },
  /**
   * @description 导出单体电芯曲线数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/微电网/工作模式-储能监控-BMS/exportBmsCellCurveUsingPOST
   **/
  exportCellCyrve: {
    post: "/{bmsThingId}/cell/curve/{dataType}/export",
  },
  /**
   * @description 获取电池簇运行曲线
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/微电网/工作模式-储能监控-BMS/getBmsRunCurveUsingPOST
   **/
  runCurve: {
    post: "/{bmsThingId}/run_curve",
  },
  /**
   * @description 导出电池簇运行曲线数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/微电网/工作模式-储能监控-BMS/exportBmsRunCurveUsingPOST
   **/
  exportRunCurve: {
    post: "/{bmsThingId}/run_curve/export",
  },
};
