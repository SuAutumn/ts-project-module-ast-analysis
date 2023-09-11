/**
 * 控制策略
 */
export default {
  prefix: "/api/energy-control/control_tactics_pro/",

  /**
   * @description 通用参数读取
   * @alias /api/energy-control/control_tactics_pro/{stationId}/general_param/read
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/generalParamReadUsingGET
   */
  read: {
    get: "{stationId}/general_param/read",
  },
  /**
   * @description 通用参数保存
   * @alias /api/energy-control/control_tactics_pro/{stationId}/general_param/save/{password}
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/generalParamSaveUsingPOST
   */
  save: {
    post: "{stationId}/general_param/save/{password}/{paramType}",
  },
  /**
   * @description 密码校验
   * @alias /api/energy-control/control_tactics_pro/{password}/password_check
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/passwordCheckUsingGET
   */
  passwordCheck: {
    get: "{password}/password_check",
  },
  /**
   * @description 日志-控制模式调度日志分页
   * @alias /api/energy-control/control_tactics_pro/mode/log/page
   * @doc https://test.secp.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/pageControlModeLogUsingPOST
   */
  pageControlModeLog: {
    post: "mode/log/page",
  },
  /*
   * @description 调度计划-控制模式调度计划日历保存
   * @alias /api/energy-control/control_tactics_pro/mode/plan/save
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModePlanSaveUsingPOST
   */
  setDragMode: {
    post: "mode/plan/save",
  },
  /**
   * @description 调度计划-控制模式调度计划详情查询
   * @alias /api/energy-control/control_tactics_pro/mode/plan/detail
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModePlanDetailUsingPOST
   */
  getPlanDetail: {
    post: "mode/plan/detail",
  },
  getCurveDetail: {
    post: "mode/plan/curve_detail",
  },
  /**
   * @description 调度计划-控制模式调度计划配置保存
   * @alias /api/energy-control/control_tactics_pro/mode/plan/edit_save
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModePlanEditSaveUsingPOST
   */
  setConfigMode: {
    post: "mode/plan/edit_save",
  },
  /**
   * @description 调度计划-控制模式调度计划删除
   * @alias /api/energy-control/control_tactics_pro/mode/plan/delete
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModePlanDeleteUsingPOST
   */
  deleteMode: {
    post: "mode/plan/delete",
  },
};
