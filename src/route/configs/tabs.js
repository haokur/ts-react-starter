const _import = require('../_import_' + process.env.NODE_ENV).default;

const HomePage = _import('home')
const ListPage = _import('list')

export const tabsConfig = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/list',
    component: ListPage
  }
]


