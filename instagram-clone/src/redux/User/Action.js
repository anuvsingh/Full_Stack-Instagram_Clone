import { FOLLOW_USER, GET_USER_BY_USER_IDS, GET_USER_BY_USERNAME, POPULAR_USER, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType"

const BASE_API = "http://localhost:8080/api"

export const getUserProfileAction = (token) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:8080/api/users/reg", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        if (!res.ok) {
            throw new Error("Failed to fetch profile");
        }

        const userData = await res.json();
        dispatch({ type: "GET_USER_PROFILE_SUCCESS", payload: userData });
        return { payload: userData };

    } catch (error) {
        console.error("Fetch profile error:", error);
        dispatch({ type: "GET_USER_PROFILE_FAILURE", error });
        throw error;
    }
};

export const findUserByUserNameAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/username/${data.username}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            }
        });
        const user = await res.json();
        console.log("Find by username:", user);
        dispatch({ type: GET_USER_BY_USERNAME, payload: user });
    } catch (error) {
        console.log("Catch Error:", error)
    }
}

export const findUserByUserIdsAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/m/${data.userIds}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            }
        });
        const users = await res.json();
        console.log("Find by user ids:", users);
        dispatch({ type: GET_USER_BY_USER_IDS, payload: users });
    } catch (error) {
        console.log("Catch Error:", error)
    }

}

export const followUserAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/follow/${data.userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            }
        });
        const user = await res.json();
        console.log("follow user:", user);
        dispatch({ type: FOLLOW_USER, payload: user });
    } catch (error) {
        console.log("Catch Error:", error)
    }

}

export const unFollowUserAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/unfollow/${data.userId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            }
        });
        const user = await res.json();
        console.log("unfollow user:", user);
        dispatch({ type: UNFOLLOW_USER, payload: user });
    } catch (error) {
        console.log("Catch Error:", error)
    }

}

export const searchUserAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/search?q=${data.query}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            }
        });
        const user = await res.json();
        console.log("search user:", user);
        dispatch({ type: SEARCH_USER, payload: user });
    } catch (error) {
        console.log("Catch Error:", error)
    }

}

export const editUserAction = (data) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/account/edit`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + data.jwt
            },
            body: JSON.stringify(data.data)
        });
        const user = await res.json();
        console.log("update user:", user);
        dispatch({ type: UPDATE_USER, payload: user });
    } catch (error) {
        console.log("Catch Error:", error)
    }
}

// http://localhost:8080/api/users/populer

export const getPopularUser = (jwt) => async (dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/users/populer`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
                Authorization: "Bearer" + jwt
            },
        });
        const user = await res.json();
        console.log("popular user:", user);
        dispatch({ type: POPULAR_USER, payload: user });
    } catch (error) {
        console.log("Catch Error:", error)
    }
}
