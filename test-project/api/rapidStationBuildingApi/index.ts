/**
 * 快速建站
 */
export default {
  prefix: "/api/micro-grid/work_mode/quick_station/",

  /**
   * @description 获取租户列表
   * @alias /api/micro-grid/work_mode/quick_station/tenant_list
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/getTenantListUsingGET
   */
  getTenantList: {
    get: "tenant_list",
  },
  /**
   * @description 获取电站物必填主数据
   * @alias /api/micro-grid/work_mode/quick_station/required_attribute_list/{template_code}
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/getRequiredAttributeListUsingGET
   */
  getAttributeList: {
    get: "required_attribute_list/{template_code}",
  },
  /**
   * @description 快速建站确认
   * @alias /api/micro-grid/work_mode/quick_station/confirm
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/confirmUsingPOST
   */
  confirmQuickStation: {
    post: "confirm",
  },

  /**
   * @description 电站设备物结构
   * @alias /api/micro-grid/work_mode/quick_station/thing_tree/{quick_station_id}
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/thingTreeUsingGET
   */
  getThingTree: {
    get: "thing_tree/{quick_station_id}",
  },

  /**
   * @description 电站设备信息
   * @alias /api/micro-grid/work_mode/quick_station/thing_detail/{thing_id}
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/thingDetailUsingGET
   * */
  getThingDetail: {
    get: "thing_detail/{thing_id}",
  },

  /**
   * @description 编辑删除
   * @alias /api/micro-grid/work_mode/quick_station/edit_delete/{quick_station_id}
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/editDeleteUsingGET
   * */
  editDeleteFun: {
    get: "edit_delete/{quick_station_id}",
  },

  /**
   * @description 编辑重新获取
   * @alias /api/micro-grid/work_mode/quick_station/edit_retry/{quick_station_id}
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/editRetryUsingGET
   * */
  getEditRetry: {
    get: "edit_retry/{quick_station_id}",
  },
  /**
   * @description
   * @alias /api/micro-grid/work_mode/quick_station/page
   * @doc
   */
  page: {
    post: "page",
  },
  /**
   * @description 编辑详情
   * @alias /api/micro-grid/work_mode/quick_station/edit_detail/{quick_station_id}
   * @doc https://test.secp-admin.192.168.221.97.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/editDetailUsingGET
   * */
  getEditDetail: {
    get: "edit_detail/{quick_station_id}",
  },
  /**
   * @description 获取建站状态-操作人备选项
   * @alias /api/micro-grid/work_mode/quick_station/status_operator_alternatives
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/getStatusOperatorAlternativesUsingPOST
   */
  statusOperatorAlter: {
    post: "status_operator_alternatives",
  },
  /**
   * @description 获取建站状态-操作人备选项
   * @alias /api/micro-grid/work_mode/quick_station/tenant_alternatives
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E5%BF%AB%E9%80%9F%E5%BB%BA%E7%AB%99/getTenantAlternativesUsingPOST
   */
  tenantAlter: {
    post: "tenant_alternatives",
  },
};
