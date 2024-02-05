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
    ADD_GROUP: "/api/groups/add",
    UPDATE_GROUP: "/api/groups/update",
    DELETE_GROUP: "/api/groups/delete",
  },
  TASKS: {
    GET_TASKS: "/api/tasks",
    ADD_TASK: "/api/tasks/add",
    UPDATE_TASK: "/api/tasks/update",
    DELETE_TASK: "/api/tasks/delete",
  },
  COMMANDS: {
    GET_COMMANDS: "/api/commands",
    ADD_COMMAND: "/api/commands/add",
    UPDATE_COMMAND: "/api/commands/update",
    DELETE_COMMAND: "/api/commands/delete",
  },
  DATABASE: {
    GET_DATABASE: "/api/database",
    ADD_DATABASE: "/api/database/add",
    UPDATE_DATABASE: "/api/database/update",
    DELETE_DATABASE: "/api/database/delete",
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
    ADD_GROUP: BACK_END_URL + "/api/v1/group",
  },
  TASK: {
    GET_TASKS: BACK_END_URL + "/api/v1/task/list",
    ADD_TASK: BACK_END_URL + "/api/v1/task",
  },
  COMMAND: {
    GET_COMMAND: BACK_END_URL + "/api/v1/command/list",
    ADD_COMMAND: BACK_END_URL + "/api/v1/command",
  },
  DATABASE: {
    GET_DATABASE: BACK_END_URL + "/api/v1/db/list",
    ADD_DATABASE: BACK_END_URL + "/api/v1/db",
  },
};
export default API_URL;
