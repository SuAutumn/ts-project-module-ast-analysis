/**
 * 园区光伏概览
 */
export default {
  prefix: "/api/micro-grid/dark/parks",

  /**
   * @description 获取光伏数量
   * @alias /api/micro-grid/dark/parks/overview/pv
   * @doc http://apisix.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%9A%97%E9%BB%91%E7%89%88-%E8%B5%84%E4%BA%A7%E6%A6%82%E8%A7%88/getParksPvOverviewUsingGET
   */
  pv: {
    get: "/overview/pv",
  },
  storage: {
    get: "/overview/storage",
  },
  charge: {
    get: "/overview/charge",
  },
  //   园区概览列表
  parkList: {
    get: "/overview",
  },
  profit: {
    get: "/profit/day_total",
  },
  days: {
    get: "/profit/days",
  },
  // 园区发电和减排
  emission: {
    get: "/electricity/emission_reduction",
  },
  chargePile: {
    get: "/electricity/charge_pile",
  },
  storageCharge: {
    get: "/electricity/storage/charge",
  },
  storageDischarge: {
    get: "/electricity/storage/discharge",
  },
  mapData: {
    get: "/map",
  },
};
