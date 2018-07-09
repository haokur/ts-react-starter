import *as React from 'react'

import { AppRoute } from './route/app-route'

export class App extends React.Component {
    state: any;

    constructor(props) {
        super(props)
        this.state = {
            showLoading: false,
        }
    }

    componentDidMount() {
        // setTimeout(()=>{
        //   this.setState({
        //     showLoading:false
        //   })
        // },3000)
    }

    render() {
        return (
            <div>
                <div><AppRoute /></div>
            </div>
        )
    }
}

