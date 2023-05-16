import service from "../axios"


export function login(parm){
    return service({
        method:'post',
        url: '/login',
        data: parm
    })
}
export function show(){
    return service({
        method:'get',
        url: '/getall',
    })
}
export function update(parm){
    return service({
        method:'post',
        url: '/update',
        data: parm
    })
}
export function save(parm){
    return service({
        method:'post',
        url: '/save',
        data: parm
    })
}
export function deletething(id){
    return service({
        method:'post',
        url: '/delete/'+id,
    })
}


