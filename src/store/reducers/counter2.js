function counter2(state,action={}){
    switch (action.type) {
        case 'TEST':
            return Object.assign({},state,{
                'id' : 2 ,
                'num' : action.payload || []
            })
        default:
            return {
                'id' : 2 ,
                'num' : []
            } ;
    }
}

export default counter2 ;
