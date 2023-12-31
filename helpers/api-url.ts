import { GROUP } from "@/types/group";
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
    GET_AGENTS: "/api/agents",
  },
  EVENTS: {
    GET_EVENTS: "/api/events",
  },
  ALERTS: {
    GET_ALERTS: "/api/alerts",
  },
  GROUPS: {
    GET_GROUPS: "/api/groups",
  },
  TASKS: {
    GET_TASKS: "/api/tasks",
  },
  COMMANDS: {
    GET_COMMANDS: "/api/commands",
  },
};

export const API_BACKEND = {
  USER: {
    LOGIN: BACK_END_URL + "/api/v1/user/signin",
    GET_USERS: BACK_END_URL + "/api/v1/user",
  },
  AGENT: {
    GET_AGENTS: BACK_END_URL + "/api/v1/agent/list",
    DELETE_AGENT: BACK_END_URL + "/api/v1/agent",
  },
  EVENTS: {
    GET_EVENTS: BACK_END_URL + "/api/v1/event/list",
  },
  ALERTS: {
    GET_ALERTS: BACK_END_URL + "/api/v1/alert/list",
  },
  GROUP: {
    GET_GROUPS: BACK_END_URL + "/api/v1/group/list",
  },
  TASK: {
    GET_TASKS: BACK_END_URL + "/api/v1/task/list",
  },
  COMMAND: {
    GET_COMMAND: BACK_END_URL + "/api/v1/command/list",
  },
};
export default API_URL;
