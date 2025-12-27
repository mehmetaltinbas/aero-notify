import { ResponseBase } from "@/features/shared/types/response/response-base.response";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const response: ResponseBase = { isSuccess: true, message: 'read all' }
    return NextResponse.json(response)
}
