export default {
  prefix: "/api/micro-grid/work_mode/charge",
  /**
   * 微网下充电功率曲线
   * @alias /api/micro-grid/work_mode/charge/{gridId}/curve/total
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/getPowerCurveDataUsingPOST
   */
  totalCurve: {
    post: "/{gridId}/curve/total",
  },
  /**
   * 导出微网下充电运行曲线数据
   * @alias /api/micro-grid/work_mode/charge/{gridId}/curve/export/total
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/exportChargeCurveDetailDataUsingPOST
   */
  exportTotalCurve: {
    post: "/{gridId}/curve/export/total",
  },
  /**
   * 微网下充电电量数据
   * @alias /api/micro-grid/work_mode/charge/{gridId}/electricity/total
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/getChargeElecDataUsingPOST
   */
  totalElectricity: {
    post: "/{gridId}/electricity/total",
  },
  /**
   * 导出微网下充电运行电量数据
   * @alias /api/micro-grid/work_mode/charge/{gridId}/electricity/export/total
   * http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/exportChargeElecDataUsingPOST
   */
  exportTotalElectricity: {
    post: "/{gridId}/electricity/export/total",
  },
  /**
   * 微网下充电桩设备列表
   * @alias /api/micro-grid/work_mode/charge/{gridId}/charge_pile/list
   * http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/getChargeDeviceListUsingPOST
   * */
  chargePieList: {
    post: "/{gridId}/charge_pile/list",
  },
  /**
   * 充电桩及其充电枪运行数据
   * @alias /api/micro-grid/work_mode/charge/{chargePileId}/data
   * http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/getChargePileDataUsingGET
   */
  chargePieDetailInfo: {
    get: "/{chargePileId}/data",
  },
  /**
   * 单一充电桩充电电量数据
   * @alias /api/micro-grid/work_mode/charge/{chargePileId}/electricity
   * http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/getChargePileElecDataUsingPOST
   * */
  chargePieElectricity: {
    post: "/{chargePileId}/electricity",
  },
  /**
   * 导出单一充电桩充电电量数据
   * @alias /api/micro-grid/work_mode/charge/{chargePileId}/electricity/export
   * http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/exportSingleChargeElecDataUsingPOST
   * */
  exportChargePieElectricity: {
    post: "/{chargePileId}/electricity/export",
  },
};
