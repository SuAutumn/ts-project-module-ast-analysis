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
   * 分页查询角色
   * @alias /api/manager/roles
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/pageRoleUsingGET
   */
  index: {
    get: "/roles",
  },
  /**
   * 获取角色的权限信息
   * @alias /api/manager/roles/{id}/permission
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getPermissionByRoleUsingGET
   */
  getPermission: {
    get: "/roles/{id}/permission",
  },
  /**
   * 为角色更新权限
   * @alias /api/manager/roles/{id}/permission
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/updatePermissionUsingPUT
   */
  editPermission: {
    put: "/roles/{id}/permission",
  },
  /**
   * @deprecated 未找到接口相关文档，请谨慎使用
   */
  showRelated: {
    get: "role_user/roles/{id}/related",
  },
  /**
   * @deprecated 未找到接口相关文档，请谨慎使用
   */
  showDisrelated: {
    get: "role_user/roles/{id}/disrelated",
  },
  /**
   * 查询角色信息
   * @alias /api/manager/roles/{id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getRoleInfoUsingGET
   */
  show: {
    get: "/roles/{id}",
  },
  /**
   * 创建角色
   * @alias /api/manager/roles
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/createRoleUsingPOST
   */
  create: {
    post: "/roles",
  },
  /**
   * 修改角色
   * @alias /api/manager/roles/{id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/editRoleUsingPUT
   */
  update: {
    put: "/roles/{id}",
  },
  /**
   * 删除角色
   * @alias /api/manager/roles/deletion
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/deleteRoleUsingPOST
   */
  delete: {
    post: "/roles/deletion",
  },
  /**
   * 角色与用户相互关联
   * @alias /api/manager/role_user/related
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%85%B3%E8%81%94%E8%A7%92%E8%89%B2%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/relateUsersAndRolesUsingPOST
   */
  bind: {
    post: "role_user/related",
  },
  /**
   * 角色与用户取消关联
   * @alias /api/manager/role_user/disrelated
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%85%B3%E8%81%94%E8%A7%92%E8%89%B2%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/disRelatedUsersAndRolesUsingPOST
   */
  unbind: {
    post: "role_user/disrelated",
  },
  /**
   * 根据部分角色名称获取角色名称的备选项
   * @alias /api/manager/roles/alternatives
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E8%A7%92%E8%89%B2%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getNamesByPartNameUsingPOST
   */
  alternatives: {
    post: "/roles/alternatives",
  },
};
