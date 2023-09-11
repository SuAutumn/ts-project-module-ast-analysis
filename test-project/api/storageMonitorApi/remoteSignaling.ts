/**
 * 储能监控-遥信
 */
export default {
  prefix: "/api/micro-grid/work_mode/alert_message/",

  /**
   * @description 遥信告警-实时告警与历史告警
   * @alias /api/micro-grid/work_mode/alert_message/{micro_grid_id}/remote_signaling
   * @doc http://192.168.61.241:8086/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF/remoteSignalingAlertMessageUsingGET
   */
  remoteSignaling: {
    get: "{micro_grid_id}/remote_signaling",
  },
};
