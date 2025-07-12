import { SIGN_IN, SIGN_UP } from "./ActionType";

export const signinAction = (data) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:8080/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Sign-in failed");
        }

        const token = await res.json(); // Assuming your backend returns JSON with token
        // OR if token is in headers:
        // const token = res.headers.get("Authorization");

        if (token) {
            localStorage.setItem("token", token);
            dispatch({ type: SIGN_IN, payload: token });
            console.log("signIn token: ", token);
        }

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const signupAction = (data) => async (dispatch) => {
    try {
        const res = await fetch("http://localhost:8080/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        const user = await res.json();

        console.log("SignUp user: ", user);

        dispatch({ type: SIGN_UP, payload: { ...user, email: data.email, password: data.password } });


    } catch (error) {
        console.log(error)
    }
}
