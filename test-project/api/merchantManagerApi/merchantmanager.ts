/**
 * 户号管理
 */
export default {
  prefix: "/api/merchant-manager",

  /**
   * @description 获取租户下所有的微网物(包括分享的)
   * @alias /api/merchant-manager/merchant/grid
   * @doc http://test.secp.192.168.221.92.nip.io/api/merchant-manager/doc.html#/%E5%95%86%E6%88%B7%E7%AE%A1%E7%90%86/%E6%88%B7%E5%8F%B7%E7%AE%A1%E7%90%86/getGridThingByTenantUsingGET
   */
  gridList: {
    get: "/merchant/grid",
  },
};
