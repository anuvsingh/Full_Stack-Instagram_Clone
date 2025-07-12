import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, REQ_USER_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType"

const BASE_API = "http://localhost:8080/api"

export const createPostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/create`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
            body: JSON.stringify(data.data),
        })
        const post = await res.json()
        console.log("Created Post", post)
        dispatch({ type: CREATE_NEW_POST, payload: post });
    } catch (error) {
        console.log("Catch", error);
    }
}

export const findUserPostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/following/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
        })
        const posts = await res.json()
        console.log("Find post by user id: ", posts)
        dispatch({ type: GET_USER_POST, payload: posts });
    } catch (error) {
        console.log("Catch", error);
    }
}

export const reqUserPostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/following/${data.userId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
        })
        const posts = await res.json()
        console.log("Req user post: ", posts)
        dispatch({ type: REQ_USER_POST, payload: posts });
    } catch (error) {
        console.log("Catch", error);
    }
}

export const likePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/like/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
        })
        const post = await res.json()
        console.log("Like post: ", post)
        dispatch({ type: LIKE_POST, payload: post });
    } catch (error) {
        console.log("Catch", error);
    }
}

export const unlikePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/unlike/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
        })
        const post = await res.json()
        console.log("Unlike post: ", post)
        dispatch({ type: UNLIKE_POST, payload: post });
    } catch (error) {
        console.log("Catch", error);
    }
}

export const savePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/save_post/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
        })
        const post = await res.json()
        console.log("Saved post: ", post)
        dispatch({ type: SAVE_POST, payload: post });
    } catch (error) {
        console.log("Catch", error);
    }
}

export const unSavePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/unsave_post/${data.postId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
        })
        const post = await res.json()
        console.log("UnSaved post: ", post)
        dispatch({ type: UNSAVE_POST, payload: post });
    } catch (error) {
        console.log("Catch", error);
    }
}

export const findPostByIdAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/${data.postId}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
        })
        const post = await res.json()
        console.log("Get Single post: ", post)
        dispatch({ type: GET_SINGLE_POST, payload: post });
    } catch (error) {
        console.log("Catch", error);
    }
}

export const deletePostAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/posts/delete/${data.postId}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
        })
        const post = await res.json()
        console.log("Deleted post: ", post)
        dispatch({ type: DELETE_POST, payload: post });
    } catch (error) {
        console.log("Catch", error);
    }
}