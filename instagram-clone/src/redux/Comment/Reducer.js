import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType"

const initialValue = {
    createdComment: null,
    postComment: null,
    likedComment: null,
    unlikedComment: null
}

export const CommentReducer = (store = initialValue, { type, payload }) => {
    if (type === CREATE_COMMENT) {
        return { ...store, createdComment: payload }
    }
    else if (type === GET_POST_COMMENT) {
        return { ...store, postComment: payload }
    }
    else if (type === LIKE_COMMENT) {
        return { ...store, likedComment: payload }
    }
    else if (type === UNLIKE_COMMENT) {
        return { ...store, unlikedComment: payload }
    }
    return store;
}