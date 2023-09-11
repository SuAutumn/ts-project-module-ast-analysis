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
   * 查询当前用户信息
   * @alias /api/manager/user/current
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/getCurrentUserInfoUsingGET
   */
  current: {
    get: "/user/current",
  },

  /**
   * 登录授权
   * @alias /api/manager/auth/login
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%B3%BB%E7%BB%9F%E6%8E%88%E6%9D%83%E6%8E%A5%E5%8F%A3/loginUsingPOST
   */
  login: {
    post: "/auth/login",
  },

  /**
   * 查询当前用户的权限信息
   * @alias /api/manager/auth/permission
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%B3%BB%E7%BB%9F%E6%8E%88%E6%9D%83%E6%8E%A5%E5%8F%A3/getPermissionUsingGET
   */
  permission: {
    get: "/auth/permission",
  },

  /**
   * 登录授权
   * @alias /api/manager/auth/logout
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%B3%BB%E7%BB%9F%E6%8E%88%E6%9D%83%E6%8E%A5%E5%8F%A3/logoutUsingGET
   */
  logout: {
    get: "/auth/logout",
  },
  /**
   * 用户忘记密码，获取验证码
   * @alias /api/manager/user/password/send_verification_code
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/sendVerificationCodeToModifyPasswordUsingGET
   */
  captcha: {
    get: "/user/password/send_verification_code?account={account}",
  },
  /**
   * 忘记密码，修改密码
   * @alias /api/manager/user/password/forget
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/forgetAndResetPasswordUsingPOST
   */
  forgetPwd: {
    post: "/user/password/forget",
  },
  /**
   * 重置密码
   * @alias /api/manager/user/password/reset
   * @doc http://dev.secp.192.168.221.92.nip.io/api/manager/doc.html#/%E5%90%8E%E5%8F%B0%E7%AE%A1%E7%90%86/%E7%94%A8%E6%88%B7%E7%AE%A1%E7%90%86%E6%A8%A1%E5%9D%97/resetPasswordUsingPOST
   */
  resetPwd: {
    post: "/user/password/reset",
  },
};
