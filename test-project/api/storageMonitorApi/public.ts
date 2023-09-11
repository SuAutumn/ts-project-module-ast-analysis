/**
 * 储能监控-公用接口
 */
export default {
  prefix: "/api/micro-grid/work_mode/storage/",

  /**
   * @description 获取租户下所有的微网物(包括分享的)
   * @alias /api/merchant-manager/merchant/grid
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E5%85%AC%E7%94%A8%E6%8E%A5%E5%8F%A3/getUnderStorageThingUsingPOST
   */
  thingList: {
    get: "{gridId}/thing_list",
  },
  /**
   * 急停
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%B3%BB%E7%BB%9F/putSystemShutDownUsingPUT
   */
  shutDown: {
    put: "remote/{gridId}/shut_down/{pwd}",
  },
  /**
   * 储能子系统状态
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E7%B3%BB%E7%BB%9F/getStorageStatusUsingGET
   */
  subStatus: {
    get: "{thingId}/subsystem/status",
  },
  systenStatusMode: {
    get: "{thingId}/system/status",
  },
  /**
   * @description 空调遥调遥控
   * @alias /api/micro-grid/work_mode/storage/remote/{grid_id}/pcs/{pcs_thing_id}/control
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E8%BF%9C%E7%A8%8B%E8%B0%83%E6%8E%A7/remoteAirControlUsingPOST
   */
  remoteControl: {
    post: "remote/{gridId}/pcs/{pcsThingId}/control",
  },
  /**
   * @description 请求一体柜配置数据
   * @alias /api/micro-grid/work_mode/storage/remote/{grid_id}/air/{device_thing_id}/send
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%B7%A5%E4%BD%9C%E6%A8%A1%E5%BC%8F-%E5%82%A8%E8%83%BD%E7%9B%91%E6%8E%A7-%E8%BF%9C%E7%A8%8B%E8%B0%83%E6%8E%A7/sendMqttDataReqUsingPOST
   */
  send: {
    post: "remote/{gridId}/air/{thingId}/send",
  },
};
