import { NextResponse } from "next/server";
import Streak from "@/models/StreakSchema";
import dbConnect from "@/lib/mongodb";

export async function GET(request: Request) {
  await dbConnect();

  try {
    const items = await Streak.find({});
    const response = {
      success: true,
      count: items.length,
      isTodayMarked: items.some(
        (item) => new Date(item.date).toDateString() === new Date().toDateString()
      ),
    };

    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}

export async function POST(request: Request) {
  await dbConnect();
  const getDate = (date: Date) => date.toISOString().split("T")[0];
  const today = getDate(new Date());

  try {
    const isTodayMarked = await Streak.findOne({
      date: today,
    });

    if (isTodayMarked) {
      return NextResponse.json({
        success: false,
        message: "Already marked today",
      });
    }

    const item = await Streak.create({
      date: today,
    });
    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
