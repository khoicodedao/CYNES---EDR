import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  const formData: any = await request.json();
  console.log(formData);
  try {
    // Send the form data to the backend server
    const backendResponse: AxiosResponse = await axios.post(
      "https://103.200.20.228/api/v1/file/upload",
      formData
    );

    // Handle the backend response
    if (backendResponse.status === 200) {
      // Return a success response
      return NextResponse.json({ message: "Form submitted successfully" });
    } else {
      // Return an error response
      return NextResponse.json(
        { error: "Error submitting form" },
        { status: backendResponse.status }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    // Return an error response
    return NextResponse.json(
      { error: "Error submitting form" },
      { status: 500 }
    );
  }
}
