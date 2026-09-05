import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  // Prevent middleware from crashing if environment variables
  // are temporarily unavailable.
  if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase environment variables.");
    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }

  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      console.error("Supabase middleware auth error:", error.message);
    }

    if (
      request.nextUrl.pathname.startsWith("/admin/reservations") &&
      !user
    ) {
      return NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
    }

    return response;
  } catch (error) {
    console.error("Middleware error:", error);

    return NextResponse.redirect(
      new URL("/admin/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/admin/reservations/:path*"],
};