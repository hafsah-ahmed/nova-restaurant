"use client";

import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";

export function Reservation() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    special_request: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          guests: Number(form.guests),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to submit reservation."
        );
      }

      setSuccess(true);

      setForm({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: "2",
        special_request: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="reserve"
      className="relative overflow-hidden bg-nova-cream px-5 py-24 text-nova-espresso sm:px-8 sm:py-32 lg:px-12 lg:py-40"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* Heading */}
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-nova-espresso/40" />

              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-nova-espresso/50">
                04 — Reservations
              </span>
            </div>

            <h2 className="mt-6 max-w-4xl font-display text-6xl leading-[0.85] tracking-[-0.05em] sm:text-8xl lg:text-[8.5rem]">
              Your table
              <br />
              <em className="font-normal">awaits.</em>
            </h2>
          </div>

          <div className="max-w-md lg:ml-auto">
            <p className="text-base leading-7 text-nova-espresso/55 sm:text-lg">
              Join us for an evening of seasonal cooking, warm
              light and unhurried conversation.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />

              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-nova-espresso/40">
                Reservations · Tue — Sun · 5:30 — 11 PM
              </span>
            </div>
          </div>
        </div>

        {/* Booking area */}
        <div className="mt-16 grid gap-px bg-nova-espresso/10 lg:mt-24 lg:grid-cols-[0.7fr_1.3fr]">
          {/* Side panel */}
          <div className="flex min-h-[420px] flex-col justify-between bg-nova-espresso p-7 text-nova-cream sm:p-10 lg:p-12">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-orange-200/60">
                NOVA / 04
              </span>

              <h3 className="mt-8 max-w-sm font-display text-4xl leading-[0.95] tracking-[-0.04em] sm:text-5xl">
                Come for the
                <br />
                <em className="font-normal text-orange-200">
                  food.
                </em>
                <br />
                Stay for the
                <br />
                evening.
              </h3>
            </div>

            <div className="mt-12 border-t border-white/10 pt-6">
              <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
                Location
              </p>

              <p className="mt-2 text-sm text-white/60">
                14 Solace Lane
                <br />
                Islamabad, Pakistan
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white/40 p-7 sm:p-10 lg:p-12">
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <div className="grid size-16 place-items-center rounded-full bg-nova-espresso text-nova-cream">
                  <Check size={25} strokeWidth={1.4} />
                </div>

                <p className="mt-7 font-mono text-[9px] uppercase tracking-[0.25em] text-nova-espresso/40">
                  Request received
                </p>

                <h3 className="mt-4 font-display text-5xl tracking-[-0.04em]">
                  See you soon.
                </h3>

                <p className="mt-4 max-w-md text-sm leading-6 text-nova-espresso/50">
                  Your reservation request has been received.
                  Our team will confirm your table shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="mt-8 rounded-full border border-nova-espresso/15 px-6 py-3 font-mono text-[9px] uppercase tracking-[0.2em] transition hover:bg-nova-espresso hover:text-nova-cream"
                >
                  Make another reservation
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                  {/* Name */}
                  <label className="block">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-nova-espresso/40">
                      Your name
                    </span>

                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        updateField("name", e.target.value)
                      }
                      placeholder="Full name"
                      className="mt-3 w-full border-b border-nova-espresso/15 bg-transparent pb-3 text-sm outline-none transition-colors placeholder:text-nova-espresso/25 focus:border-nova-espresso"
                    />
                  </label>

                  {/* Email */}
                  <label className="block">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-nova-espresso/40">
                      Email
                    </span>

                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        updateField("email", e.target.value)
                      }
                      placeholder="you@example.com"
                      className="mt-3 w-full border-b border-nova-espresso/15 bg-transparent pb-3 text-sm outline-none transition-colors placeholder:text-nova-espresso/25 focus:border-nova-espresso"
                    />
                  </label>

                  {/* Phone */}
                  <label className="block">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-nova-espresso/40">
                      Phone
                    </span>

                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        updateField("phone", e.target.value)
                      }
                      placeholder="+92 300 0000000"
                      className="mt-3 w-full border-b border-nova-espresso/15 bg-transparent pb-3 text-sm outline-none transition-colors placeholder:text-nova-espresso/25 focus:border-nova-espresso"
                    />
                  </label>

                  {/* Guests */}
                  <label className="block">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-nova-espresso/40">
                      Guests
                    </span>

                    <select
                      required
                      value={form.guests}
                      onChange={(e) =>
                        updateField("guests", e.target.value)
                      }
                      className="mt-3 w-full border-b border-nova-espresso/15 bg-transparent pb-3 text-sm outline-none focus:border-nova-espresso"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                        (number) => (
                          <option
                            key={number}
                            value={number}
                          >
                            {number}{" "}
                            {number === 1 ? "guest" : "guests"}
                          </option>
                        )
                      )}
                    </select>
                  </label>

                  {/* Date */}
                  <label className="block">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-nova-espresso/40">
                      Date
                    </span>

                    <input
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) =>
                        updateField("date", e.target.value)
                      }
                      min={new Date()
                        .toISOString()
                        .split("T")[0]}
                      className="mt-3 w-full border-b border-nova-espresso/15 bg-transparent pb-3 text-sm outline-none focus:border-nova-espresso"
                    />
                  </label>

                  {/* Time */}
                  <label className="block">
                    <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-nova-espresso/40">
                      Time
                    </span>

                    <select
                      required
                      value={form.time}
                      onChange={(e) =>
                        updateField("time", e.target.value)
                      }
                      className="mt-3 w-full border-b border-nova-espresso/15 bg-transparent pb-3 text-sm outline-none focus:border-nova-espresso"
                    >
                      <option value="">Select time</option>
                      <option value="5:30 PM">5:30 PM</option>
                      <option value="6:00 PM">6:00 PM</option>
                      <option value="6:30 PM">6:30 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:30 PM">7:30 PM</option>
                      <option value="8:00 PM">8:00 PM</option>
                      <option value="8:30 PM">8:30 PM</option>
                      <option value="9:00 PM">9:00 PM</option>
                      <option value="9:30 PM">9:30 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                      <option value="10:30 PM">10:30 PM</option>
                    </select>
                  </label>
                </div>

                {/* Special request */}
                <label className="mt-9 block">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-nova-espresso/40">
                    Special request{" "}
                    <span className="text-nova-espresso/20">
                      Optional
                    </span>
                  </span>

                  <textarea
                    rows={3}
                    value={form.special_request}
                    onChange={(e) =>
                      updateField(
                        "special_request",
                        e.target.value
                      )
                    }
                    placeholder="Birthday, anniversary, dietary requirements..."
                    className="mt-3 w-full resize-none border-b border-nova-espresso/15 bg-transparent pb-3 text-sm outline-none placeholder:text-nova-espresso/25 focus:border-nova-espresso"
                  />
                </label>

                {error && (
                  <div className="mt-7 rounded-xl border border-red-500/15 bg-red-500/5 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-xs text-xs leading-5 text-nova-espresso/35">
                    Your request will be reviewed by our team
                    before your table is confirmed.
                  </p>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-4 rounded-full bg-nova-espresso px-7 py-4 text-nova-cream transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em]">
                      {loading
                        ? "Sending..."
                        : "Request a table"}
                    </span>

                    {loading ? (
                      <Loader2
                        size={15}
                        className="animate-spin"
                      />
                    ) : (
                      <ArrowUpRight
                        size={15}
                        strokeWidth={1.3}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    )}
                  </motion.button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}