/**
 * 储能监控-主接线图
 */
export default {
  prefix: "/api/micro-grid/work_mode/storage/system",

  /**
   * @description 获取园区下储能系统树截图
   * http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%B3%BB%E7%BB%9F/getPowerCurveDataUsingPOST_1
   **/
  tree: {
    get: "/{gridId}/tree",
  },
  /**
   *  获取储能系统充放电功率曲线
   */
  curve: {
    post: "/{storageSysThingId}/curve",
  },
  /**
   *  导出储能系统曲线数据
   */
  export: {
    post: "/{storageSysThingId}/curve_data/export",
  },
  /**
   *  获取储能系统充放电电量
   */
  electricity: {
    post: "/{storageSysThingId}/electricity",
  },
  /**
   *  导出储能系统充放电量数据
   */
  electricityExport: {
    post: "/{storageSysThingId}/electricity/export",
  },
  /**
   *  储能系统一次接线图-数据
   */
  wiringData: {
    get: "/{storageSysThingId}/wiring/data",
  },
  /**
   *  储能系统一次接线图-结构
   */
  wiringStructure: {
    get: "/{storageSysThingId}/wiring/structure",
  },
  /**
   *  获取微网下的各类型储能物列表(储能系统、pcs、bms、空调等)
   */
  thingList: {
    get: "/{storageSysThingId}/thing_list",
  },
};
