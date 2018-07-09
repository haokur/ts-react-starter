const { prodBuild } = require('./build-service')

prodBuild()
  .then(() => {
    console.log('编译完成')
  })
  .catch(err => {
    console.log('编译失败')
  })