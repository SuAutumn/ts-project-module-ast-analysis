/**
 * 充电桩一次接线图模拟接口
 */
export default {
  prefix: "/api/micro-grid/work_mode",
  /**
   * @description 充电桩一次接线图结构
   * @alias /system/charge_pile_sys_thing_id/wiring/structure
   * @doc 暂无
   */
  structure: {
    mock: true,
    get: "/charge_pile/system/{thingId}/wiring/structure",
  },
  /**
   * @description 充电桩一次接线图数据
   * @alias /system/charge_pile_sys_thing_id/wiring/structure
   * @doc 暂无
   */
  data: {
    mock: true,
    get: "/charge_pile/system/{thingId}/wiring/data",
  },
  /**
   * @description 充电桩接线图
   * @alias /api/micro-grid/work_mode/charge/{grid_id}/sys/tree
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%85%85%E7%94%B5%E7%9B%91%E6%8E%A7/getChargeSysTreeUsingGET
   */
  tree: {
    get: "/charge/{gridId}/sys/tree",
  },
};
