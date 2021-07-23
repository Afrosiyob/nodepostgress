import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_ME,
    AUTH_REGISTRATION,
} from "../actions";

import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
    fetchAuthLogin,
    fetchAuthMe,
    fetchAuthRegistration,
} from "../services/api.service";
import {
    authLoginError,
    authLoginSuccess,
    authLogoutError,
    authLogoutSuccess,
    authMeError,
    authMeSuccess,
    authRegistrationError,
    authRegistrationSuccess,
} from "./action";
import { notificationMessage } from "../services/notification.service";

function* watchAuthLogin() {
    yield takeEvery(AUTH_LOGIN, workAuthLogin);
}

function* workAuthLogin({ payload }) {
    const { request, history } = payload;
    const { response, error } = yield call(fetchAuthLogin, request);
    if (response) {
        const { token, user_info } = response.data.data;
        localStorage.setItem("token", `Bearer ${token}`);
        yield put(authLoginSuccess(user_info));
        notificationMessage("success", "auth login success");
        history.push("/admin");
    } else {
        yield put(authLoginError(error.response.data.message));
        notificationMessage("error", error.response.data.message);
    }
}

function* watchAuthMe() {
    yield takeEvery(AUTH_ME, workAuthMe);
}

function* workAuthMe({ payload }) {
    const history = payload;
    const { response, error } = yield call(fetchAuthMe);

    if (response) {
        const { user_info } = response.data.data;
        yield put(authMeSuccess(user_info));
        notificationMessage("success", "get user info success");
    } else {
        yield put(authMeError(error.response.data.message));
        notificationMessage("error", error.response.data.message);
        localStorage.removeItem("token");
        history.push("/login");
    }
}

function* watchAuthLogout() {
    yield takeEvery(AUTH_LOGOUT, workAuthLogout);
}

function* workAuthLogout({ payload }) {
    const history = payload;
    try {
        yield put(authLogoutSuccess());
        notificationMessage("success", "bye");
        localStorage.removeItem("token");
        history.push("/login");
    } catch (error) {
        yield put(authLogoutError(error));
        notificationMessage("error", error);
    }
}

function* watchAuthRegistration() {
    yield takeEvery(AUTH_REGISTRATION, workAuthRegistration);
}

function* workAuthRegistration({ payload }) {
    const { request, history } = payload;
    const { response, error } = yield call(fetchAuthRegistration, request);

    if (response) {
        yield put(authRegistrationSuccess());
        notificationMessage("success", "new user created");
        history.push("/login");
    } else {
        yield put(authRegistrationError(error.response.data.message));
        notificationMessage("error", error.response.data.message);
    }
}

export default function* authSaga() {
    yield all([
        fork(watchAuthLogin),
        fork(watchAuthMe),
        fork(watchAuthLogout),
        fork(watchAuthRegistration),
    ]);
}