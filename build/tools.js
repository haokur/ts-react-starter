const os = require('os');
const path = require('path')


/**
 * 获取本地 ip 地址
 * @param {String} ipType ip类型 分 IPV4 和 IPv6
 */
exports.getLocalIp = (ipType) => {
  var ifaces = os.networkInterfaces();
  var ips = {
    IPv4: [],
    IPv6: []
  }

  Object.keys(ifaces).forEach(item => {
    ifaces[item].forEach(face => {
      ips[face.family].push(face.address)
    })
  })

  return ipType ? ips[ipType] : ips;
}

/**
 * 定位到绝对路径
 */
exports.resolveDir = (dir) => path.join(__dirname, '..', dir)