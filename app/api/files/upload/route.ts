import { NextResponse } from "next/server";
import axios, { AxiosResponse } from "axios";
import { API_BACKEND } from "@/helpers/api-url";
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileBlob = await file
      .arrayBuffer()
      .then((buffer) => new Blob([buffer]));

    const formDataToSend = new FormData();
    formDataToSend.append("file", fileBlob, file.name);

    // Send the file to the backend server
    const backendResponse: AxiosResponse = await axios.post(
      API_BACKEND.FILES.UPLOAD_FILE,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    // Handle the backend response
    if (backendResponse.status === 200) {
      // Return a success response
      return NextResponse.json({ message: "File uploaded successfully" });
    } else {
      // Return an error response
      return NextResponse.json(
        { error: "Error uploading file" },
        { status: backendResponse.status }
      );
    }
  } catch (error) {
    console.error("Error:", error);
    // Return an error response
    return NextResponse.json(
      { error: "Error uploading file" },
      { status: 500 }
    );
  }
}
