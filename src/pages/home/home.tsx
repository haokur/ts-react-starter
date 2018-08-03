import * as React from 'react'
import { connect } from 'react-redux'
import * as Actions from '../../store/actions';

import { api } from '../../services/api'

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

    componentDidMount() {
        // api.post({
        //     url: 'user/list',
        //     data: {
        //         name: 'tom'
        //     },
        //     showLoading: true,
        //     format: 'json'
        // })
        //     .then(res => {
        //         console.log(res)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     })
        // console.log('mounted')
        // api.get({
        //     act: 'user/list',
        //     data: {
        //         name: 'tom'
        //     },
        // }).then(res => {
        //     console.log('end', res)
        // })
        this.getTest()
        this.formPostTest()
        this.jsonPostTest()
        this.proxyRequest()
    }

    getTest() {
        api.get({
            url: 'user/list',
            data: {
                name: 'tom'
            },
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    formPostTest() {
        api.post({
            url: 'user/list',
            data: {
                name: 'tom'
            },
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    jsonPostTest() {
        api.post({
            url: 'user/list',
            data: {
                name: 'tom'
            },
            format: "json",
            headers: {
                'X-token': 'fadf12313df'
            },
            handlers: {
                'onload': function () {
                    console.log('自定义加载完成事件')
                }
            },
            withCredentials: true,
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    fileChange(ev) {
        console.log(ev.target.value)
        var formData = new FormData()
        formData.append('file', ev.target.value)
        api.post({
            url: 'upload',
            data: formData,
            format: 'formData'
        })
            .then(res => {
                console.log('上传成功')
            })
            .catch(err => {
                console.log(err)
            })
    }

    // 代理请求示例
    proxyRequest() {
        api.get({
            url: 'zhihu/4/news/latest'
        })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        var { countNum, shopCartAdd, shopCartReduce } = this.props;
        return (
            <div className="page-home">
                <h3 className="title">购物车的数量为:{countNum}</h3>
                <input type="file" onChange={$ev => this.fileChange($ev)} />
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
