/**
 * 储能监控-pcs
 */
export default {
  prefix: "/api/micro-grid/work_mode/storage/pcs",
  /**
   * @description PCS基础信息
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/getPcsBasicInfoUsingGET
   **/
  basicInfo: {
    get: "/{pcsThingId}/basic_info"
  },
  /**
   * @description 获取PCS充放电功率曲线
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/getPcsPowerCurveDataUsingGET
   **/

  curve: {
    post: "/{pcsThingId}/curve"
  },
  /**
   * @description 导出PCS曲线数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/exportStorageCurveDetailDataUsingPOST_1
   **/
  curveExport: {
    post: "/{pcsThingId}/curve_data/export"
  },
  /**
   * @description PCS充放电电量
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/getPcsElectricityDataUsingGET
   **/
  electricity: {
    post: "/{pcsThingId}/electricity"
  },
  /**
   * @description PCS充放电电量导出
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/getPcsElectricityDataUsingGET
   **/
  electricityExport: {
    post: "/{pcsThingId}/electricity/export"
  },
  /**
   * @description 获取PCS遥测数据
   * doc:http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-PCS/getPcsTelemetryDataUsingGET
   **/
  telemetry: {
    get: "/{pcsThingId}/telemetry"
  }
};
