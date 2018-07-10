import * as React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions';

import './home.scss'

interface Props {
    countNum: number;
    shopCartAdd: () => void;
    shopCartReduce: () => void;
}

class HomePage extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props)
    }

    render() {
        var { countNum, shopCartAdd, shopCartReduce } = this.props;
        return (
            <div className="page-home">
                <h3 className="title">购物车的数量为:{countNum}</h3>
                <button className="action-btn" type="button" onClick={shopCartAdd}>增加购物+</button>
                <button className="action-btn" type="button" onClick={shopCartReduce}>减少购物-</button>
            </div>
        )
    }
}

// 提取所需 states
function extractState({ shopCart$ }) {
    return shopCart$
}

// 提取所需 actions
function extractAction(dispatch) {
    return {
        shopCartAdd: () => dispatch(Actions.shopCartIncrement()),
        shopCartReduce: () => dispatch(Actions.shopCartDecrement())
    }
}

// 合并 提取的 states + 提取所需 actions + React 原生的 props
function mergeProps(stateProps, dispatchProps, ownProps) {
    return {
        ...stateProps,
        ...dispatchProps,
        ...ownProps
    }
}

// 最后导出包裹层
export default connect(
    extractState,
    extractAction,
    mergeProps
)(HomePage)
