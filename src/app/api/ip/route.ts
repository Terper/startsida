import { headers } from "next/headers";
import { NextRequest, NextResponse, userAgent } from "next/server";

const GET = async (req: NextRequest) => {
  const { ua } = userAgent(req);
  return NextResponse.json({
    ip: headers().get("x-forwarded-for"),
  });
};

export { GET };
