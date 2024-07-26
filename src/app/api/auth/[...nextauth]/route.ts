import { authConfig } from "@/lib/authConfig";
import NextAuth from "next-auth";

import { NextApiRequest, NextApiResponse } from "next";

// This handler will be used for the HTTP POST method
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authConfig);
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authConfig);
}
