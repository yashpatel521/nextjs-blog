import { getAllUsrs } from "@/database/user";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // authorization
  const token = request.headers.get("Authorization");
  if (token) {
    const users = getAllUsrs();
    return Response.json({ data: users });
  } else {
    return Response.json({ message: "Unauthorized" });
  }
}
