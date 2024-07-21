import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params; // Destructure id from params

  try {
    await prisma.post.delete({
      where: { id },
    });
    return NextResponse.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: error,
    });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const id = params.id;
  try {
    const updatedPost = await prisma.post.update({
      where: { id },
      data: { ...body },
    });
    return Response.json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
