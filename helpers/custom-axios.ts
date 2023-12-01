import { MSG } from "@/types/msg";

type USER_RES = {
  error: boolean;
  msg: MSG;
  tokens: {
    access: string;
    refresh: string;
  };
};

const customAxiosPost = async (
  url: string,
  data: any, // Adjust the type based on your request payload
  token: string
): Promise<USER_RES> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: USER_RES = await response.json();
    return responseData;
  } catch (error) {
    // Handle errors
    console.error("Error:");
    return {
      error: false,
      msg: "wrong user or password",
      tokens: {
        access: "string",
        refresh: "string",
      },
    };
  }
};
export { customAxiosPost };
