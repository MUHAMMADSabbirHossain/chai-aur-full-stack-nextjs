import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel, { User } from "@/model/User";

export async function DELETE(
  request: Request,
  { params }: { params: { massageid: string } }
) {
  await dbConnect();

  const messageId = params.massageid;
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "User not found",
      },
      {
        status: 404,
      }
    );
  }

  try {
    const updateResult = await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $pull: {
          messages: { _id: messageId },
        },
      },
      { new: true }
    );

    if (updateResult?.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error deleting message:", error);

    return Response.json(
      {
        success: false,
        message: "Error deleting message",
      },
      {
        status: 500,
      }
    );
  }
}
