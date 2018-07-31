const os = require('os');
const path = require('path')

const opn = require('opn');

/**
 * 获取本地 ip 地址
 * @param {String} ipType ip类型 分 IPV4 和 IPv6
 */
function getLocalIp(ipType) {
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
exports.getLocalIp = getLocalIp

/**
 * 定位到绝对路径
 */
exports.resolveDir = (dir) => path.join(__dirname, '..', dir)

/**
 * 启动一个服务
 */
exports.runServer = (function () {
  var defaultPort = 8080;
  var tryMax = 10;

  function _tryListen(server, port) {
    return new Promise((resolve, reject) => {
      var app = server.listen(port)
        .on('error', err => {
          if (err.code === 'EADDRINUSE') {
            reject(err)
          }
        })
        .on('listening', res => {
          resolve(app)
        })
    })
  }

  return function runServer(options) {
    let { server, port = defaultPort, autoOpen, success } = options
    tryMax--
    if (tryMax < 0) {
      console.log('已超过最大的重试次数');
      return false;
    }
    _tryListen(server, port)
      .then((app) => {
        var uri = `http://localhost:${port}`;
        let allAvailableAddress = getLocalIp('IPv4').map(item => `http://${item}:${port}`)
        console.log(`Available on:\n${allAvailableAddress.join('\n')}`)
        autoOpen && opn(uri)
        success && success(app, uri);
      })
      .catch(err => {
        if (err.code === 'EADDRINUSE') {
          console.log('The port【' + port + '】 is occupied, try other port.')
          var nextPort = parseInt(port) + 1
          Object.assign(options, {
            port: nextPort,
          })
          runServer(options)
        }
        else {
          console.log(err)
        }
      })
  }
})();