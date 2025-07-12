import { FOLLOW_USER, GET_USER_BY_USER_IDS, GET_USER_BY_USERNAME, POPULAR_USER, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType"

const initialValue = {
    reqUser: null,
    findByUsername: null,
    findUserByIds: [],
    followUser: null,
    unfollowUser: null,
    searchUser: null,
    updatedUser: null,
    popularUsers: null
}
export const UserReducer = (store = initialValue, { type, payload }) => {
    if (type == REQ_USER) {
        return { ...store, reqUser: payload }
    } else if (type === GET_USER_BY_USERNAME) {
        return { ...store, findByUsername: payload }
    } else if (type === GET_USER_BY_USER_IDS) {
        return { ...store, findUserByIds: payload }
    } else if (type === FOLLOW_USER) {
        return { ...store, followUser: payload }
    } else if (type === UNFOLLOW_USER) {
        return { ...store, unfollowUser: payload }
    } else if (type === SEARCH_USER) {
        return { ...store, searchUser: payload }
    } else if (type === UPDATE_USER) {
        return { ...store, updatedUser: payload }
    } else if (type === POPULAR_USER) {
        return { ...store, popularUsers: payload }
    }
    return store;
}