let BACK_END_URL = process.env.BACK_END_URL;
const API_URL = {
  LOGIN: "/api/users/login",
  LOGOUT: "/api/users/logout",
  PAGES: {
    LOGIN: "/login",
    SIGNUP: "/signup",
    DASHBOARD: "/",
    AGENT: "/agents",
  },
};

export const API_BACKEND = {
  USER: {
    LOGIN: BACK_END_URL + "/api/v1/user/signin",
    GET_USERS: BACK_END_URL + "/api/v1/user",
  },
};
export default API_URL;
