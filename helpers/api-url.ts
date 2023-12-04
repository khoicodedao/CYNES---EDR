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
  AGENT: {
    GET_AGENTS: "/api/agent",
  },
  EVENTS: {
    GET_EVENTS: "/api/events",
  },
};

export const API_BACKEND = {
  USER: {
    LOGIN: BACK_END_URL + "/api/v1/user/signin",
    GET_USERS: BACK_END_URL + "/api/v1/user",
  },
  AGENT: {
    GET_AGENTS: BACK_END_URL + "/api/v1/agent",
  },
  EVENTS:{
    GET_EVENTS:BACK_END_URL + "/api/v1/event",
  }
};
export default API_URL;
