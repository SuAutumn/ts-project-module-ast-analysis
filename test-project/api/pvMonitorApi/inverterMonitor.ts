export default {
  prefix: "/api/micro-grid/generation_system/",
  /**
   * @description 逆变器详情-逆变器组串运行信息
   * @alias /api/micro-grid/generation_system/inverters/{node_id}/strings/info
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E5%85%89%E4%BC%8F%E7%9B%91%E6%8E%A7/getInverterStringsInfoUsingGET
   */
  strings: {
    get: "/inverters/{nodeId}/strings/info",
  },
  /**
   * @description 逆变器详情-逆变器详细运行信息
   * @alias /api/micro-grid/generation_system/inverters/{node_id}/detail
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E5%85%89%E4%BC%8F%E7%9B%91%E6%8E%A7/getInverterDetailInfoUsingGET
   */
  detail: {
    get: "/inverters/{nodeId}/detail",
  },
  /**
   * @description 逆变器详情-逆变器导出功率曲线
   * @alias /inverters/values/export
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E5%85%89%E4%BC%8F%E7%9B%91%E6%8E%A7/exportInverterPowerDetailDataUsingPOST
   */
  inverterExport: {
    post: "/inverters/values/export",
  },
  /**
   * @description 节点有功无功曲线（共用）
   * @alais /api/micro-grid/generation_system/nodes/{node_id}/values/power
   * @doc https://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E5%85%89%E4%BC%8F%E7%9B%91%E6%8E%A7/getTodayNodePowerValuesUsingGET
   */
  inverterPower: {
    get: "/nodes/{nodeId}/values/power",
  },
  /**
   * @description 光伏并网点列表
   * @alias /api/micro-grid/generation_system/{grid_id}/nodes/generate
   * @doc http://test.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%99%BA%E8%83%BD%E5%BE%AE%E7%BD%91-%E5%85%89%E4%BC%8F%E7%9B%91%E6%8E%A7/getGenerateNodeListUsingGET
   */
  nodesGenerate: {
    get: "/{gridId}/nodes/generate",
  },
};
