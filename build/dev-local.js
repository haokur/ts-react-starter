
/**
 * 打包后并在本地启动服务预览
 */
const { resolveDir, getLocalIp } = require('./tools');
const { projectPath } = require('../config')
const { prodBuild } = require('./build-service')

const http = require('http')

const opn = require('opn');
const ecstatic = require('ecstatic');
const argv = require('optimist').argv;

const rootDir = resolveDir('dist')

const server = http.createServer(ecstatic({
  root: rootDir,
  showDir: true,
  autoIndex: true,
}));

// 默认端口
const defaultPort = 8001
if (argv.rebuild) {
  prodBuild()
    .then(() => {
      runServer(defaultPort);
    })
    .catch(err => {
      console.log('编译失败')
    })
}
else {
  runServer(defaultPort);
}

function tryListen(port) {
  return new Promise((resolve, reject) => {
    server.listen(port)
      .on('error', err => {
        if (err.code === 'EADDRINUSE') {
          reject(err)
        }
      })
      .on('listening', res => {
        resolve()
      })
  })
}

var tryMax = 0
function runServer(port) {
  tryMax++
  if (tryMax > 3) {
    return false;
  }
  tryListen(port)
    .then(() => {
      var uri = `http://localhost:${port}/${projectPath}`;
      let allAvailableAddress = getLocalIp('IPv4').map(item => `http://${item}:${port}`)
      console.log(`Available on:\n${allAvailableAddress.join('\n')}`)
      opn(uri)
    })
    .catch(err => {
      if (err.code === 'EADDRINUSE') {
        console.log('The port【' + port + '】 is occupied, try other port.')
        var nextPort = parseInt(port) + 1
        runServer(nextPort)
      }
      else {
        console.log(err)
      }
    })
}
