const customAxiosDelete = async <T>(
  url: string,
  token?: string
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    const responseData: T = await response.json();
    return responseData;
  } catch (error: any) {
    // Handle errors
    console.error(error?.message);
    return "Error" as T;
  }
};

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
  } catch (error: any) {
    // Handle errors
    console.error(error?.message);
    return error?.message as T;
  }
};

const customAxiosGet = async <T>(
  url: string,
  params?: any,
  cache?: Object
): Promise<T> => {
  try {
    if (params) {
      const queryString = Object.keys(params)
        .map(
          (key) =>
            encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
        )
        .join("&");
      url = `${url}?${queryString}`;
    }
    const response = await fetch(url, cache);
    const responseData: T = await response.json();
    return responseData;
  } catch (error: any) {
    // Handle errors
    console.error(error?.message);
    return error?.message as T;
  }
};
export { customAxiosPost, customAxiosGet, customAxiosDelete };
