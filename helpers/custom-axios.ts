
const customAxiosPost = async<T> (
  url: string,
  data: any, // Adjust the type based on your request payload
  token: string
): Promise<T> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const responseData: T = await response.json();
    return responseData;
  } catch (error) {
    // Handle errors
    console.error("Error:");
    return "Error" as T
  }
};
export { customAxiosPost };
