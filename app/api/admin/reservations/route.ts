import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Get reservations error:", error);

      return NextResponse.json(
        { success: false, message: "Unable to load reservations." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reservations: data,
    });
  } catch (error) {
    console.error("Reservations GET error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !["pending", "confirmed", "cancelled"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid reservation update." },
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
      console.error("Update reservation error:", error);

      return NextResponse.json(
        { success: false, message: "Unable to update reservation." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reservation: data,
    });
  } catch (error) {
    console.error("Reservations PATCH error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Reservation ID is required." },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("reservations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Delete reservation error:", error);

      return NextResponse.json(
        { success: false, message: "Unable to delete reservation." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Reservation deleted.",
    });
  } catch (error) {
    console.error("Reservations DELETE error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}