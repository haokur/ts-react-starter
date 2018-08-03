import Axios from 'axios';

const HttpClient = Axios.create({
  timeout: 5000,
  withCredentials: false,
  baseURL: 'http://localhost:9000/',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;Chartset=UTF-8;'
  },
  transformRequest: [
    (data, headers) => {
      if (!data) { return data };
      console.log(headers)
      if (headers && headers['Content-Type'].indexOf('json') !== -1) {
        return JSON.stringify(data);
      }
      else if (headers && headers['Content-Type'].indexOf('form-data') !== -1) {
        return data;
      }
      else {
        return Object.keys(data).map(key => `${key}=${data[key]}`).join('&');
      }
    }
  ]
})

export const api = {
  get({ act, data: params, _withWait = false }) {
    if (_withWait) { this.handleWait() };
    return HttpClient.get(act, { params: params })
      .then(res => this.handleSuccess(res))
      .catch(err => this.handleError(err))
  },
  post({ act, data, headers = null, _withWait = false }) {
    if (_withWait) { this.handleWait() };
    return HttpClient.post(act, data, { headers: headers })
      .then(res => this.handleSuccess(res))
      .catch(err => this.handleError(err))
  },
  jsonPost(options) {
    options.headers = options.headers || {}
    Object.assign(options.headers, {
      'Content-Type': 'application/json;Chartset=UTF-8;'
    })
    return this.post(options);
  },
  filePost(options) {
    options.headers = options.headers || {}
    Object.assign(options.headers, {
      // 'post-type': 'file'
      'Content-Type': 'multipart/form-data;'
    })
    return this.post(options);
  },
  handleWait() {
    console.log('等待')
  },
  hideWait() {
    console.log('隐藏等待框')
  },
  handleSuccess(res) {
    console.log('请求成功')
    this.hideWait();
    return res;
  },
  handleError(err) {
    console.log('请求失败');
    this.hideWait();
    return err;
  },
}