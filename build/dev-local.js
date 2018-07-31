
/**
 * 打包后并在本地启动服务预览
 */
const { resolveDir } = require('./tools');
const { prodBuild } = require('./build-service')

const http = require('http')

const ecstatic = require('ecstatic');
const argv = require('optimist').argv;

const rootDir = resolveDir('dist')

const { runServer } = require('./tools')

const server = http.createServer(ecstatic({
  root: rootDir,
  showDir: true,
  autoIndex: true,
}));

// 默认端口
const defaultPort = 8001
const serverOpts = {
  server: server,
  port: defaultPort,
  autoOpen: true,
  success() {
    console.log('启动成功')
  }
}

if (argv.rebuild) {
  prodBuild()
    .then(() => {
      runServer(serverOpts);
    })
    .catch(err => {
      console.log('编译失败')
    })
}
else {
  runServer(serverOpts);
}
