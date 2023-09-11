/**
 *  告警概览
 */
export default {
  prefix: "/api/micro-grid/work_mode/alert_message/",

  /**
   * @description 今日故障告警
   * @alias /api/micro-grid/work_mode/alert_message/{stationId}/daily_recover_status/overview
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF/dailyRecoverStatusOverviewUsingGET
   */
  getTodayAlarm: {
    get: "{stationId}/daily_recover_status/overview",
  },

  /**
   * @description 今日告警设备统计
   * @alias /api/micro-grid/work_mode/alert_message/{micro_grid_id}/history/page
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF/dailyRecoverStatusOverviewUsingGET
   */
  getTodayDevice: {
    get: "{stationId}/daily_device_type/overview",
  },

  /**
   * @description 设备告警统计
   * @alias /api/micro-grid/work_mode/alert_message/{micro_grid_id}/history/page
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF/dailyRecoverStatusOverviewUsingGET
   */
  getDeviceAlarm: {
    post: "device_type_overview/query",
  },

  /**
   * @description 告警等级统计
   * @alias /api/micro-grid/work_mode/alert_message/{micro_grid_id}/history/page
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%91%8A%E8%AD%A6%E6%B6%88%E6%81%AF/dailyRecoverStatusOverviewUsingGET
   */
  getAlarmLevel: {
    post: "message_level_overview/query",
  },
};
