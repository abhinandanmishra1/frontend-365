import { NextResponse } from "next/server";
import Streak from "@/models/StreakSchema";
import dbConnect from "@/lib/mongodb";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const items = await Streak.find({});
    return (
      NextResponse
        .json({
          success: true,
          count: items.length,
          isTodayMarked: items.some(
            (item) => item.date.toDateString() === new Date().toDateString()
          ),
        })
    );
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  const today = new Date().toDateString();
  try {
    const isTodayMarked = await Streak.findOne({
      date: today,
    });

    if (isTodayMarked) {
      return NextResponse.json({ success: false, message: "Already marked today" });
    }

    const item = await Streak.create({
      date: today,
    });
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
