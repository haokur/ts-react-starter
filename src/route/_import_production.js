
import lazyLoadComponent from 'lazy-load-component'

function _import(file) {
  return lazyLoadComponent(() => import('@/pages/' + file + '/' + file + '.tsx'))
}

export default _import
