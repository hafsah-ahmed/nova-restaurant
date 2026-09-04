import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type Reservation = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
};

export async function POST(request: Request) {
  try {
    const body: Reservation = await request.json();

    const {
      name,
      email,
      phone,
      date,
      time,
      guests,
      specialRequest,
    } = body;

    // Basic validation
    if (!name || !email || !phone || !date || !time || !guests) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 }
      );
    }

    if (guests < 1 || guests > 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Guests must be between 1 and 8.",
        },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("reservations")
      .insert({
        name,
        email,
        phone,
        date,
        time,
        guests,
        special_request: specialRequest || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase reservation error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Unable to save reservation. Please try again.",
        },
        { status: 500 }
      );
    }

    console.log("NEW NOVA RESERVATION:", data);

    return NextResponse.json(
      {
        success: true,
        message: "Reservation request received.",
        reservation: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Reservation error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}