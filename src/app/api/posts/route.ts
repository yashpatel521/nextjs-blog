import prisma from "@/lib/prisma";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });
  return Response.json({ success: true, data: posts });
}

export async function POST(request: Request) {
  // create post
  const { title, content, authorEmail } = await request.json();
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: authorEmail } },
    },
  });
  return Response.json(result);
}
