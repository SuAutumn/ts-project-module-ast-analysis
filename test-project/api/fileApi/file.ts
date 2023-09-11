export default {
  prefix: "/api/micro-grid",
  /**
   * 下载文件
   * @alias /api/micro-grid/file/{fileName}
   * @doc http://dev.secp.192.168.221.92.nip.io/api/micro-grid/doc.html#/%E5%BE%AE%E7%94%B5%E7%BD%91/%E6%96%87%E4%BB%B6%E7%9B%B8%E5%85%B3/downloadFileUsingGET
   */
  download: {
    get: "/file/{fileName}",
  },
};
