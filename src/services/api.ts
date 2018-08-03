/**
 * http 请求封装
 */
const API_ROOT = 'http://localhost:9000/'
// 代理的地址关键字列表
const ProxyUrlKeys = [
  'zhihu'
]

export const api = {
  _baseUrl: API_ROOT,
  _withCredentials: false,
  _timeout: 5000,
  _proxyUrlKeys: ProxyUrlKeys,
  _hasProxyKey(url) {
    return this._proxyUrlKeys.some(key => {
      return url.indexOf(key) !== -1
    })
  },
  _dataStringify(obj) {
    return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
  },
  _getDataByFormat(data, format) {
    if (format === 'json') {
      return JSON.stringify(data);
    }
    else if (format === 'formData') {
      return data;
    }
    else {
      return this._dataStringify(data);
    }
  },
  _setHeaderByFormat(xhr, format) {
    if (format === 'json') {
      xhr.setRequestHeader('Content-Type', 'application/json;Chartset=UTF-8;')
    }
    else if (!format || format === 'form') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;Chartset=UTF-8;')
    }
  },
  _getFullRequestUrl(url) {
    if (this._hasProxyKey(url)) {
      return url;
    }
    var isFullUrl =
      url.indexOf("http://") !== -1 || url.indexOf("https://") !== -1;
    return isFullUrl ? url : this._baseUrl + url;
  },
  get(options) {
    return this.request('get', options)
      .then(res => this.handleSuccess(res))
      .catch(err => this.handleError(err))
  },
  post(options) {
    return this.request('post', options)
      .then(res => this.handleSuccess(res))
      .catch(err => this.handleError(err))
  },
  request(method, options) {
    if (options.showLoading) { this.loadingStart() };
    return new Promise((resolve, reject) => {
      var { url, data = {}, headers, format } = options;
      var xhr = new XMLHttpRequest();

      // 设置 xhr 属性
      xhr.timeout = options.timeout || this._timeout;
      xhr.withCredentials = options.withCredentials || this._withCredentials

      // 设置请求成功的回调
      xhr.onload = function () {
        if (xhr.status == 200 || xhr.status == 304) {
          resolve(xhr.responseText);
        }
        else {
          reject('请求错误')
        }
      }

      // 绑定自定义 handler
      for (var ev in options.handlers) {
        var _prevHandler = xhr[ev];
        xhr[ev] = function () {
          _prevHandler();
          options.handlers[ev]();
        }
      }

      // 拼接 url
      var _url = this._getFullRequestUrl(url);
      if (method === 'get') {
        _url += `?${this._dataStringify(data)}`
      }
      xhr.open(method, _url, true);

      // 设置 header
      var _requestData = null;
      if (method === 'post') {
        this._setHeaderByFormat(xhr, format);
        _requestData = this._getDataByFormat(data, format);
      }
      for (var attr in headers) {
        xhr.setRequestHeader(attr, headers[attr]);
      }

      xhr.send(_requestData);
    })
  },
  loadingStart() {
    console.log('开始等待');
  },
  loadEnd() {
    console.log('结束等待');
  },
  handleSuccess(res) {
    console.log('请求成功');
    this.loadEnd();
    return res;
  },
  handleError(err) {
    console.log('请求失败')
    this.loadEnd();
    return err;
  }
}