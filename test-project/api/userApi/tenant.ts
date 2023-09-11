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
   * 分页查询租户
   * @alias /api/manager/tenant
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86/pageUsingGET
   */
  index: {
    get: "/tenant",
  },
  /**
   * 查询租户的应用权限树
   * @alias /api/manager/permission/tenant_apps
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%BA%94%E7%94%A8%E6%9D%83%E9%99%90%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getAppAndPermissionListByTenantUsingGET
   */
  getPermission: {
    get: "/permission/tenant_apps?tenantId={id}",
  },
  /**
   * 重新生成未激活的租户的用户密码并且发送账号密码
   * @alias /api/manager/tenant/users/{username}/regenerate_and_reset_pwd
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86/regenerateAndSendAccountInfoToUserUsingPOST
   */
  resendPwd: {
    post: "/tenant/users/{username}/regenerate_and_reset_pwd",
  },
  /**
   * 根据id查询租户信息
   * @alias /api/manager/tenant/{id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86/getTenantInfoByIdUsingGET
   */
  show: {
    get: "/tenant/{id}",
  },
  /**
   * 创建租户
   * @alias /api/manager/tenant
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86/createTenantUsingPOST
   */
  create: {
    post: "/tenant",
  },
  /**
   * 创建租户
   * @alias /api/manager/tenant
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86/createTenantUsingPOST
   */
  update: {
    put: "/tenant/{id}",
  },
  /**
   * 根据部分租户名称获取租户名称的备选项
   * @alias /api/manager/tenant/alternatives
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86/getUsernamesByPartNameUsingPOST
   */
  alternatives: {
    post: "/tenant/alternatives",
  },
  /**
   * 校验租户名称是否重复
   * @alias /api/manager/tenant/names_check
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86/checkTenantNameDuplicateUsingGET
   */
  checkName: {
    get: "/tenant/names_check",
  },
  /**
   * 获取当前租户详情
   * @alias /api/manager/tenant/current
   * @doc http://dev.secp.192.168.221.97.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%A7%9F%E6%88%B7%E7%AE%A1%E7%90%86/getCurrentTenantInfoUsingGET
   */
  current: {
    get: "/tenant/current",
  },
};
