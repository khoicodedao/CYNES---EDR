const customAxiosPost = async <T>(
  url: string,
  data?: any, // Adjust the type based on your request payload
  token?: string
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: data ? JSON.stringify(data) : "",
    });

    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    // Handle errors
    console.error("Error:");
    return "Error" as T;
  }
};

const customAxiosGet = async <T>(url: string, params?: any): Promise<T> => {
  try {
    console.log(params);
    if (params) {
      const queryString = Object.keys(params)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        )
        .join("&");
      url = `${url}?${queryString}`;
    }
    const response = await fetch(url);
    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    // Handle errors
    console.error("Error:");
    return "Error" as T;
  }
};
export { customAxiosPost, customAxiosGet };
