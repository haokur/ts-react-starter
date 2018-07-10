
import * as Types from '../types'
import { ShopCartAction } from '../actions'

// 初始化购物车数量
const initShopCart$ = {
  countNum: 0
}

function shopCart(state = initShopCart$, action: ShopCartAction) {
  switch (action.type) {
    case Types.SHOPCART_INCREMENT:
      return {
        ...state,
        countNum: state.countNum + 1
      }
      break;
    case Types.SHOPCART_DECREMENT:
      return {
        ...state,
        countNum: Math.max(0, state.countNum - 1)
      }
    default:
      return state;
      break;
  }
}

export default shopCart