import { ResponseType } from "./types";

export async function GET(url: string): Promise<ResponseType> {
  const response = await fetch(`/api${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ResponseType = await response.json();
  return data;
}

export async function POST(url: string, body: any): Promise<ResponseType> {
  const response = await fetch(`/api${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data: ResponseType = await response.json();
  return data;
}

export async function DELETE(url: string): Promise<ResponseType> {
  const response = await fetch(`/api${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data: ResponseType = await response.json();
  return data;
}
