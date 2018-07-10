
import * as Types from '../types'

export interface IShopCartIncrement {
    type: Types.SHOPCART_INCREMENT
}

export function shopCartIncrement(): IShopCartIncrement {
    return {
        type: Types.SHOPCART_INCREMENT
    }
}

export interface IShopCartDecrement {
    type: Types.SHOPCART_DECREMENT
}

export function shopCartDecrement(): IShopCartDecrement {
    return {
        type: Types.SHOPCART_DECREMENT
    }
}

export type ShopCartAction = IShopCartIncrement | IShopCartDecrement
