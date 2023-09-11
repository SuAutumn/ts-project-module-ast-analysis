/**
 * 控制模式新增
 */
export default {
  prefix: "/api/energy-control/control_tactics_pro",

  /**
   * @description 控制模式新增
   * @alias /api/energy-control/control_tactics_pro/mode/create
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModeCreateUsingPOST
   */
  controlTacticsProModeCreate: {
    post: "/mode/create",
  },
  /**
   * @description 控制模式编辑
   * @alias /api/energy-control/control_tactics_pro/mode/update
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModeUpdateUsingPOST
   */
  controlTacticsProModeUpdate: {
    post: "/mode/update",
  },
  /**
   * @description 控制模式列表查询
   * @alias /api/energy-control/control_tactics_pro/mode/list
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModeListUsingPOST
   */
  controlTacticsProModeList: {
    post: "/mode/list",
  },
  /**
   * @description 控制模式详情查询
   * @alias /api/energy-control/control_tactics_pro/mode/detail
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModeDetailUsingPOST
   */
  controlTacticsProModeDetail: {
    post: "/mode/detail",
  },
  /**
   * @description 当日生效电价模板
   * @alias /api/energy-control/control_tactics_pro/{stationId}/valid_price_template
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/todayValidPriceTemplateUsingGET
   */
  validPriceTemplate: {
    get: "/{stationId}/valid_price_template",
  },
  /**
   * @description 控制模式删除
   * @alias /api/energy-control/control_tactics_pro/mode/delete
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/energy-control/doc.html#/%E8%83%BD%E6%BA%90%E8%B0%83%E6%8E%A7/%E6%8E%A7%E5%88%B6%E7%AD%96%E7%95%A5(power-pro)/controlModeDeleteUsingPOST
   */
  controlTacticsProModeDelete: {
    post: "/mode/delete",
  },
};
