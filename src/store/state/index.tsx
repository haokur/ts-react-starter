
// 购物车模型
export interface shopCart {
  count: number;
}

// 全局 state
export interface StoreState {
  shopCart: shopCart;
}