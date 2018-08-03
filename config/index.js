// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// 定位到绝对路径
var resolveDir = (dir) => path.join(__dirname, '..', dir)

// 项目名称目录 => 对应地址访问结构 http://dist.com/my-vue-starter/
// const { name: projectPath } = require(resolveDir('package.json'));
const projectPath = ''
const assetsRoot = projectPath ? resolveDir(`dist/${projectPath}`) : resolveDir('dist')
// console.log(projectPath, assetsRoot)
// return false;

module.exports = {
  projectPath,
  build: {
    env: require('./prod.env'),
    index: path.join(assetsRoot, 'index.html'),
    assetsRoot: assetsRoot,
    assetsSubDirectory: 'static',
    assetsPublicPath: `/${projectPath}/`,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8098,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/zhihu': {
        target: 'https://news-at.zhihu.com/api/',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/zhihu': ''
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
