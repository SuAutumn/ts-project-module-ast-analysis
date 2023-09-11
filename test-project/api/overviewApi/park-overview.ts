/*
 * 储能监控-bms
 */
export default {
  prefix: "/api/micro-grid/system/overview/",
  /**
   * @description 项目概况
   * @alias /api/micro-grid/system/overview/{grid_id}/info/overview
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemOverviewInfoUsingGET
   */
  overview: {
    get: "/{gridId}/info/overview",
  },
  /**
   * @description 收益信息
   * @alias /api/micro-grid/system/overview/{grid_id}/info/profit
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemProfitInfoUsingGET
   */
  profit: {
    get: "/{gridId}/info/profit",
  },
  /**
   * @description 光伏信息
   * @alias /api/micro-grid/system/overview/{grid_id}/info/generate
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemGenerateInfoUsingGET
   */
  generate: {
    get: "/{gridId}/info/generate",
  },

  /**
   * @description 储能信息
   * @alias /api/micro-grid/system/overview/{grid_id}/info/storage
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemStorageInfoUsingGET
   */
  storage: {
    get: "/{gridId}/info/storage",
  },
  /**
   * @description 充电信息
   * @alias /api/micro-grid/system/overview/{grid_id}/info/charge
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemChargeInfoUsingGET
   */
  charge: {
    get: "/{gridId}/info/charge",
  },
  /**
   * @description 光伏-5min级功率曲线
   * @alias /api/micro-grid/system/overview/{grid_id}/values/generate/5min
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getGenerateTimeValuesUsingGET
   */
  generate5Min: {
    get: "{gridId}/values/generate/5min",
  },
  /**
   * @description 储能-5min级功率曲线
   * @alias /api/micro-grid/system/overview/{grid_id}/values/storage/5min
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getStorageTimeValuesUsingGET
   */
  storage5Min: {
    get: "/{gridId}/values/storage/5min",
  },
  /**
   * @description 充电-日级电量柱状图
   * @alias /api/micro-grid/system/overview/{grid_id}/values/charge/day
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemStatusUsingGET
   */
  chargeWeekly: {
    get: "/{gridId}/values/charge/day",
  },
  /**
   * @description 光储充及关口-实时功率
   * @alias /api/micro-grid/system/overview/{grid_id}/power
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemPowerUsingGET
   */
  power: {
    get: "/{gridId}/power",
  },
  /**
   * @description 储能-5min级充放电量曲线
   * @alias /api/micro-grid/system/overview/{grid_id}/values/storage/elec/5min
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getStorageElecTimeValuesUsingGET
   */
  storageElec: {
    get: "/{gridId}/values/storage/elec/5min",
  },
  /**
   * @description 各系统告警状态与安全运行
   * @alias /api/micro-grid/system/overview/{grid_id}/alarm/summaries
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemAlarmAndSafetyUsingGET
   */
  alarmSummary: {
    get: "/{gridId}/alarm/summaries",
  },
  /**
   * @description 发电清洁指标
   * @alias /api/micro-grid/system/overview/{grid_id}/indicators/clean
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E7%B3%BB%E7%BB%9F%E6%A6%82%E8%A7%88/getSystemCleanIndicatorsUsingGET
   */
  clean: {
    get: "/{gridId}/indicators/clean",
  },
};
