import { FETCH_USER_STORY } from "./ActionType"

const initialValue = {
    stories: null,
}

export const StoryReducer = (store = initialValue, { type, payload }) => {
    if (type === FETCH_USER_STORY) {
        return { ...store, stories: payload }
    }
    return store;
}