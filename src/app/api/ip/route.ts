import { NextRequest, NextResponse } from "next/server";

const GET = async (req: NextRequest) => {
  return NextResponse.json({
    ip: req.ip,
  });
};

export { GET };
