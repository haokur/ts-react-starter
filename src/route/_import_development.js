
function _import(file) {
  return require(`@/pages/${file}/${file}.tsx`).default
}

export default _import
