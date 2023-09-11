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
   * 分页查询用户
   * @alias /api/manager/user
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/pageUserUsingGET
   */
  index: {
    get: "/user",
  },
  /**
   * 删除用户
   * @alias /api/manager/user/deletion
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/deleteUserUsingPOST
   */
  delete: {
    post: "/user/deletion",
  },
  /**
   * 查询用户信息
   * @alias /api/manager/user/{id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getUserInfoUsingGET
   */
  show: {
    get: "/user/{id}",
  },
  /**
   * 创建用户
   * @alias /api/manager/user
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/createUserUsingPOST
   */
  create: {
    post: "/user",
  },
  /**
   * 修改用户
   * @alias /api/manager/user/{id}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/editUserUsingPUT
   */
  update: {
    put: "/user/{id}",
  },
  /**
   * 根据部分用户名称获取用户名的备选项
   * @alias /api/manager/user/alternatives
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getUsernamesByPartNameUsingPOST_1
   */
  alternatives: {
    post: "/user/alternatives",
  },
  /**
   * 获取用户所有已关联的角色
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%85%B3%E8%81%94%E8%A7%92%E8%89%B2%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/pageRelatedRolesByUserUsingGET
   * @alias /api/manager/role_user/user/{user_id}/related
   */
  showRelated: {
    get: "role_user/user/{id}/related",
  },
  /**
   * 获取用户所有未关联的角色
   * @alias /api/manager/role_user/user/{user_id}/disrelated
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E5%85%B3%E8%81%94%E8%A7%92%E8%89%B2%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86/pageUnRelatedRolesByUserUsingGET
   */
  showDisrelated: {
    get: "role_user/user/{id}/disrelated",
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
};
