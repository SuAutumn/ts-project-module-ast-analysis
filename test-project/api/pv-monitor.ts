/**
 * 光伏监控-主接线图
 */
export default {
  prefix: "/api/micro-grid",
  /**
   *  光伏监控接线图-数据
   */
  wiringData: {
    get: "/work_mode/station/{gridId}/wiring/data",
  },
  /**
   *  光伏监控接线图-结构
   */
  wiringStructure: {
    get: "/work_mode/station/{gridId}/wiring/structure",
  },
};
