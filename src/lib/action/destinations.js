import { serverMutation } from "../core/server"

export const addDestination = async (data)=>{
    return serverMutation('/api/destinations', data , 'POST')
}


export const deleteDestination = async (data)=>{
    return serverMutation(`/api/delete-destinations/${data.id}`, {} , 'DELETE')
}