import { NextResponse } from "next/server";
import webPush from "web-push";

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY as string,
  process.env.WEB_PUSH_PRIVATE_KEY as string
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // console.log(body);

    // const res = await webPush.sendNotification(
    //   body.subscription,
    //   JSON.stringify({
    //     title: "Hello Web Push",
    //     message: "Your web push notification is here!",
    //   })
    // );

    // console.log(res);
    return NextResponse.json({
      message: "Subscribe to push notifications",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
