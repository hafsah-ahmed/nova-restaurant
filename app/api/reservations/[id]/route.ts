import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { status } = body;

    if (!status || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid reservation status.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("reservations")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Supabase reservation update error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to update reservation.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reservation: data,
    });
  } catch (error) {
    console.error("Reservation update error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const { error } = await supabaseAdmin
      .from("reservations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Supabase reservation delete error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to delete reservation.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reservation deleted.",
    });
  } catch (error) {
    console.error("Reservation delete error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}