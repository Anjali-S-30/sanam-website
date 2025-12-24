"use client";

import { useEffect } from "react";
import { Mail, MessageCircle, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { useNavbar } from "@/context/NavbarContext";

const EMAIL = "booking@sanamofficial.com";
const EMAIL_SUBJECT = "Gig, Collaboration, or Media Enquiry";
const WHATSAPP_NUMBER = "919876543210";
const WHATSAPP_MESSAGE =
  "Hi SANAM team! I'd love to talk about gigs, collaborations, or media enquiries.";

export default function ContactPage() {
  const { setNavbarStyle } = useNavbar();

  useEffect(() => {
    setNavbarStyle({
      background: "bg-white",
      logo: "",
      text: "text-neutral-700",
      hamburger: "text-black",
    });

    return () => {
      setNavbarStyle({
        background: "bg-white",
        logo: "",
        text: "text-neutral-700",
        hamburger: "text-black",
      });
    };
  }, [setNavbarStyle]);

  const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <main className="min-h-screen bg-neutral-50 text-black">
      <section className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 md:py-20 lg:py-24">
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="font-bold text-neutral-500 tracking-wider uppercase text-xs mb-2">
            Contact
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">
            For gigs, collaborations, or media enquiries, reach out to us directly!
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-600 font-light leading-relaxed px-1">
            We keep it personal. Tell us about your event, city, and date ideas—our team will get back fast.
          </p>
        </div>

        <div className="mt-10 md:mt-12 grid gap-6 md:gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Contact methods */}
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">Direct lines</p>

            <div className="flex flex-col gap-4">
              <a
                href={emailHref}
                className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-neutral-100 p-2 text-neutral-900">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-neutral-500">Click to Email</p>
                    <p className="text-lg font-semibold text-black">{EMAIL}</p>
                    <p className="text-sm text-neutral-600">Pre-fills your booking subject.</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-neutral-500 transition group-hover:text-black" />
              </a>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
              >
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-neutral-100 p-2 text-neutral-900">
                    <MessageCircle className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm text-neutral-500">Click to WhatsApp</p>
                    <p className="text-lg font-semibold text-black">+{WHATSAPP_NUMBER}</p>
                    <p className="text-sm text-neutral-600">Opens with a pre-filled message.</p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-neutral-500 transition group-hover:text-black" />
              </a>
            </div>

            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 shadow-sm">
                <Clock className="h-4 w-4 text-neutral-900" />
                <span className="text-neutral-700">We aim to reply within 24 hours.</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-2 shadow-sm">
                <MapPin className="h-4 w-4 text-neutral-900" />
                <span className="text-neutral-700">Available worldwide for tours and media.</span>
              </div>
            </div>
          </div>

          {/* Right: Guidance + Form */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-2xl space-y-5">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">What to include</p>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• Event name and city</li>
                <li>• Dates, venue capacity, and format</li>
                <li>• Collaboration/media details and timelines</li>
                <li>• Your contact info and preferred follow-up</li>
              </ul>
              <div className="mt-5 rounded-lg border border-neutral-100 bg-neutral-50 p-3 text-sm text-neutral-600">
                No forms, no friction—just direct access to the band&apos;s booking desk.
              </div>
            </div>

            <div className="border-t border-neutral-200 pt-5">
              <h2 className="text-xl font-semibold text-black mb-3">Send us your details</h2>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label htmlFor="event" className="text-sm font-medium text-neutral-700">
                      Event name & city
                    </label>
                    <input
                      id="event"
                      type="text"
                      placeholder="e.g., SANAM Nights, Mumbai"
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm text-neutral-900 focus:border-black focus:outline-none focus:ring-0"
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="dates" className="text-sm font-medium text-neutral-700">
                      Dates & venue capacity
                    </label>
                    <input
                      id="dates"
                      type="text"
                      placeholder="e.g., 12-13 Aug, 3K cap"
                      className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm text-neutral-900 focus:border-black focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="details" className="text-sm font-medium text-neutral-700">
                    Collaboration / media details
                  </label>
                  <textarea
                    id="details"
                    rows={3}
                    placeholder="Share format, timelines, and any partners involved."
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm text-neutral-900 focus:border-black focus:outline-none focus:ring-0"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact" className="text-sm font-medium text-neutral-700">
                    Your contact info
                  </label>
                  <input
                    id="contact"
                    type="text"
                    placeholder="Name, email, phone, and preferred follow-up"
                    className="w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-3 text-sm text-neutral-900 focus:border-black focus:outline-none focus:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-sm font-bold tracking-wider text-white transition hover:bg-neutral-800"
                >
                  Send details
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                <p className="text-xs text-neutral-500 text-center">
                  We respond within 24 hours on weekdays.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
