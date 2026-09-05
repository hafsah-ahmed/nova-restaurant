"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Users,
  Check,
  X,
  Trash2,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

type Reservation = {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  special_request: string | null;
  status: string;
  created_at: string;
};

export default function ReservationsAdmin() {
  const router = useRouter();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/reservations", {
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load reservations.");
      }

      const data = await response.json();

      setReservations(data.reservations || []);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load reservations."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const updateStatus = async (
    id: string,
    status: "pending" | "confirmed" | "cancelled"
  ) => {
    try {
      setUpdating(id);
      setError("");

      const response = await fetch("/api/admin/reservations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to update reservation."
        );
      }

      setReservations((current) =>
        current.map((reservation) =>
          reservation.id === id
            ? {
                ...reservation,
                status: data.reservation?.status || status,
              }
            : reservation
        )
      );

      setError("");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to update reservation."
      );
    } finally {
      setUpdating(null);
    }
  };

  const deleteReservation = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this reservation?"
    );

    if (!confirmed) return;

    try {
      setUpdating(id);
      setError("");

      const response = await fetch("/api/admin/reservations", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete reservation."
        );
      }

      setReservations((current) =>
        current.filter((reservation) => reservation.id !== id)
      );

      setError("");
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Unable to delete reservation."
      );
    } finally {
      setUpdating(null);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);

      // Create the Supabase client only in the browser when logout is clicked.
      const supabase = createClient();

      await supabase.auth.signOut();

      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  };

  const pendingCount = reservations.filter(
    (reservation) => reservation.status === "pending"
  ).length;

  const confirmedCount = reservations.filter(
    (reservation) => reservation.status === "confirmed"
  ).length;

  const cancelledCount = reservations.filter(
    (reservation) => reservation.status === "cancelled"
  ).length;

  const formatTime = (time: string) => {
    if (!time) return "—";

    const [hours, minutes] = time.split(":").map(Number);

    if (Number.isNaN(hours) || Number.isNaN(minutes)) {
      return time;
    }

    const period = hours >= 12 ? "PM" : "AM";
    const displayHour = hours % 12 || 12;

    return `${displayHour}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-nova-espresso px-5 py-10 text-background sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <header className="border-b border-white/10 pb-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-orange-300" />

                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange-200">
                  NOVA — Admin
                </span>
              </div>

              <h1 className="mt-5 font-display text-5xl tracking-[-0.04em] sm:text-7xl">
                Reservations
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-6 text-white/40">
                Manage incoming reservation requests, confirm tables,
                cancel requests, or remove old reservations.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={fetchReservations}
                disabled={loading}
                className="flex items-center justify-center gap-3 rounded-full border border-white/15 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                <RefreshCw
                  size={13}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center justify-center gap-3 rounded-full border border-red-300/20 px-5 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-red-300 transition hover:bg-red-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
              >
                <LogOut size={13} />

                {loggingOut ? "Logging out..." : "Log out"}
              </button>
            </div>
          </div>
        </header>

        {/* STATS */}
        <section className="mt-8 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-nova-espresso px-6 py-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
              Total
            </p>

            <p className="mt-3 font-display text-4xl">
              {reservations.length}
            </p>

            <p className="mt-2 text-xs text-white/25">
              All requests
            </p>
          </div>

          <div className="bg-nova-espresso px-6 py-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-orange-200/50">
              Pending
            </p>

            <p className="mt-3 font-display text-4xl text-orange-200">
              {pendingCount}
            </p>

            <p className="mt-2 text-xs text-white/25">
              Awaiting response
            </p>
          </div>

          <div className="bg-nova-espresso px-6 py-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-green-300/50">
              Confirmed
            </p>

            <p className="mt-3 font-display text-4xl text-green-300">
              {confirmedCount}
            </p>

            <p className="mt-2 text-xs text-white/25">
              Confirmed tables
            </p>
          </div>

          <div className="bg-nova-espresso px-6 py-7">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-300/50">
              Cancelled
            </p>

            <p className="mt-3 font-display text-4xl text-red-300">
              {cancelledCount}
            </p>

            <p className="mt-2 text-xs text-white/25">
              Cancelled requests
            </p>
          </div>
        </section>

        {/* ERROR */}
        {error && (
          <div className="mt-8 rounded-xl border border-red-400/20 bg-red-400/5 px-5 py-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {/* LOADING */}
        {loading && reservations.length === 0 ? (
          <div className="flex min-h-[350px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <RefreshCw
                size={24}
                className="animate-spin text-orange-200"
              />

              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                Loading reservations
              </p>
            </div>
          </div>
        ) : reservations.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-24 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <CalendarDays
                size={20}
                className="text-white/40"
              />
            </div>

            <p className="mt-6 font-display text-3xl">
              No reservations yet.
            </p>

            <p className="mt-3 text-sm text-white/35">
              New reservation requests will appear here.
            </p>
          </div>
        ) : (
          <section className="mt-10 space-y-4">
            {/* TABLE HEADER */}
            <div className="hidden px-6 font-mono text-[8px] uppercase tracking-[0.2em] text-white/25 lg:grid lg:grid-cols-[1.3fr_1fr_1.2fr_auto] lg:gap-8">
              <span>Customer</span>
              <span>Contact</span>
              <span>Reservation</span>
              <span>Actions</span>
            </div>

            {reservations.map((reservation) => (
              <article
                key={reservation.id}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:border-white/20 hover:bg-white/[0.055]"
              >
                <div className="flex flex-col gap-7 lg:grid lg:grid-cols-[1.3fr_1fr_1.2fr_auto] lg:items-center lg:gap-8">
                  {/* CUSTOMER */}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-2xl">
                        {reservation.name}
                      </h2>

                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[8px] uppercase tracking-[0.15em] ${
                          reservation.status === "confirmed"
                            ? "bg-green-400/10 text-green-300"
                            : reservation.status === "cancelled"
                              ? "bg-red-400/10 text-red-300"
                              : "bg-orange-200/10 text-orange-200"
                        }`}
                      >
                        {reservation.status}
                      </span>
                    </div>

                    <p className="mt-3 text-sm text-white/35">
                      Submitted{" "}
                      {new Date(
                        reservation.created_at
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* CONTACT */}
                  <div className="space-y-1 text-sm">
                    <p className="break-all text-white/65">
                      {reservation.email}
                    </p>

                    <p className="text-white/40">
                      {reservation.phone}
                    </p>
                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-white/30">
                        <CalendarDays size={14} />

                        <span className="font-mono text-[8px] uppercase tracking-[0.15em]">
                          Date
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-white/80">
                        {formatDate(reservation.date)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-white/30">
                        <Clock3 size={14} />

                        <span className="font-mono text-[8px] uppercase tracking-[0.15em]">
                          Time
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-white/80">
                        {formatTime(reservation.time)}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-white/30">
                        <Users size={14} />

                        <span className="font-mono text-[8px] uppercase tracking-[0.15em]">
                          Guests
                        </span>
                      </div>

                      <p className="mt-2 text-sm text-white/80">
                        {reservation.guests}{" "}
                        {reservation.guests === 1
                          ? "guest"
                          : "guests"}
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          reservation.id,
                          "confirmed"
                        )
                      }
                      disabled={
                        updating === reservation.id ||
                        reservation.status === "confirmed"
                      }
                      className="flex items-center gap-2 rounded-full border border-green-300/20 px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.15em] text-green-300 transition hover:bg-green-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <Check size={13} />
                      Confirm
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(
                          reservation.id,
                          "cancelled"
                        )
                      }
                      disabled={
                        updating === reservation.id ||
                        reservation.status === "cancelled"
                      }
                      className="flex items-center gap-2 rounded-full border border-red-300/20 px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.15em] text-red-300 transition hover:bg-red-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      <X size={13} />
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteReservation(reservation.id)
                      }
                      disabled={updating === reservation.id}
                      className="grid size-10 place-items-center rounded-full border border-white/10 text-white/40 transition hover:border-red-300/30 hover:bg-red-300/10 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-30"
                      aria-label="Delete reservation"
                      title="Delete reservation"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* SPECIAL REQUEST */}
                {reservation.special_request && (
                  <div className="mt-6 border-t border-white/10 pt-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
                      Special request
                    </p>

                    <p className="mt-2 text-sm leading-6 text-white/55">
                      {reservation.special_request}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </section>
        )}

        {/* FOOTER */}
        <footer className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
              NOVA Restaurant — Admin Dashboard
            </p>

            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
              {reservations.length}{" "}
              {reservations.length === 1
                ? "reservation"
                : "reservations"}
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}