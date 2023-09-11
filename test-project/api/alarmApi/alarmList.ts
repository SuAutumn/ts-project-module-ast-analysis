/**
 * 历史告警
 */
export default {
  prefix: "/api/micro-grid/work_mode/alert_message/",

  /**
   * @description 获取历史告警
   * @alias /api/micro-grid/work_mode/alert_message/{micro_grid_id}/history/page
   * @doc https://dev.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF/historyPageUsingPOST
   */
  getHistory: {
    post: "{micro_grid_id}/history/page",
  },
  /**
   * @description 获取告警查询枚举
   * @alias /api/micro-grid/work_mode/alert_message/enum_info
   * @doc https://dev.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF/getAlertMessageEnumInfoUsingGET
   */
  enumInfo: {
    get: "{micro_grid_id}/enum_info",
  },
  /**
   * @description 实时告警
   * @alias /api/micro-grid/work_mode/alert_message/{micro_grid_id}/real_time/page
   * @doc https://dev.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF/realTimePageUsingPOST
   */
  getRealTime: {
    post: "{micro_grid_id}/real_time/page",
  },
};
