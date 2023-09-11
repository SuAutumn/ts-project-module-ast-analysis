/**
 * @see
 * index      GET       /       列表
 * show       GET       /:id    详情
 * create     POST      /       创建
 * update     PUT       /:id    更新
 * destroy    DETELE    /:id    删除
 */
export default {
  prefix: "/api/manager",
  /**
   * 分页查询
   * @alias  /api/manager/tenant_identity/page
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E8%BA%AB%E4%BB%BD%E7%AE%A1%E7%90%86/pageTenantIdentityUsingGET
   */
  index: {
    post: "/tenant_identity/page",
  },
  /**
   * 创建租户身份
   * @alias /api/manager/tenant_identity
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E8%BA%AB%E4%BB%BD%E7%AE%A1%E7%90%86/createTenantIdentityUsingPOST
   */
  create: {
    post: "/tenant_identity",
  },
  /**
   * 修改租户身份
   * @alias /api/manager/tenant_identity/{identity_id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E8%BA%AB%E4%BB%BD%E7%AE%A1%E7%90%86/updateTenantIdentityUsingPUT
   */
  update: {
    put: "/tenant_identity/{id}",
  },
  /**
   * 批量删除租户身份
   * @alias /api/manager/tenant_identity/deletion
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E8%BA%AB%E4%BB%BD%E7%AE%A1%E7%90%86/batchDeleteTenantIdentityUsingPOST
   */
  delete: {
    post: "/tenant_identity/deletion",
  },
  /**
   * 获取单个租户身份
   * @alias /api/manager/tenant_identity/{identity_id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E8%BA%AB%E4%BB%BD%E7%AE%A1%E7%90%86/getOneUsingGET
   */
  show: {
    get: "/tenant_identity/{id}",
  },
  getPermission: {
    get: "/permission/all",
  },
  /**
   * 根据租户身份名称获取租户身份名称的备选项
   * @alias /api/manager/tenant_identity/alternatives
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E8%BA%AB%E4%BB%BD%E7%AE%A1%E7%90%86/getAlternativesUsingPOST_2
   */
  alternatives: {
    post: "/tenant_identity/alternatives",
  },
};
