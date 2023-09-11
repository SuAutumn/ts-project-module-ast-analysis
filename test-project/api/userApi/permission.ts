export default {
  prefix: "/api/manager",
  /**
   * 查询租户权限树
   * @alias /api/manager/permission/tenant_apps
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%BA%94%E7%94%A8%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getAppAndPermissionListByTenantUsingGET
   */
  index: {
    get: "/permission/tenant_apps",
  },
  /**
   * 创建权限
   * @alias /api/manager/permission
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%BA%94%E7%94%A8%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/createPermissionUsingPOST
   */
  create: {
    post: "/permission",
  },
  /**
   * 删除权限
   * @alias /api/manager/permission/deletion
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%BA%94%E7%94%A8%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/deletePermissionUsingPOST
   */
  delete: {
    post: "/permission/deletion",
  },
  /**
   * 修改权限
   * @alias /api/manager/permission/{id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%BA%94%E7%94%A8%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/editPermissionUsingPUT
   */
  update: {
    put: "/permission/{id}",
  },
  /**
   * 查看权限详情
   * @alias /api/manager/permission/{id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%BA%94%E7%94%A8%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getPermissionInfoUsingGET
   */
  show: {
    get: "/permission/{id}",
  },
};
