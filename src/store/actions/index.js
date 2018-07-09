
export const RECEIVE_ACTIVITYLIST = 'TEST' ;
export function receiveActivityList(payload) {
    return {
        type : RECEIVE_ACTIVITYLIST ,
        payload
    }
}

export function increment(){
    return {
        type:'INCREMENT'
    }
}
