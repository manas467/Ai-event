import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  /* ================= USERS ================= */
  users: defineTable({
    name: v.string(),
    email: v.string(),
    imageUrl: v.optional(v.string()),
    tokenIdentifier: v.string(),

    hasCompletedOnboarding: v.boolean(),
    freeeventsCreated: v.number(),

    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_token", ["tokenIdentifier"]),

  /* ================= EVENTS ================= */
  events: defineTable({
    title: v.string(),
    description: v.string(),
    slug: v.string(),

    /* organizer info */
    organizerId: v.id("users"),
    organizerName: v.string(),

    /* event details */
    category: v.string(),
    tags: v.array(v.string()),

    /* date & time */
    startDate: v.number(),
    endDate: v.number(),
    timezone: v.string(),

    /* location */
    locationType: v.union(
      v.literal("physical"),
      v.literal("online")
    ),
    venue: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.string(),
    country: v.optional(v.string()),

    state: v.optional(v.string()),

    /* capacity & ticketing */
    capacity: v.number(),
    ticketType: v.union(
      v.literal("free"),
      v.literal("paid")
    ),
    ticketPrice: v.optional(v.number()),
    registrationCount: v.number(),

    /* customization */
    coverImage: v.optional(v.string()),
    themeColor: v.optional(v.string()),

    /* timestamps */
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organizer", ["organizerId"])
    .index("by_category", ["category"])
    .index("by_start_date", ["startDate"])
    .index("by_slug", ["slug"])
    .searchIndex("search_title", {
      searchField: "title",
    }),

  /* ================= REGISTRATIONS ================= */
  registrations: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),

    /* attendee info */
    attendeeName: v.string(),
    attendeeEmail: v.string(),

    /* QR code */
    qrCode: v.string(),

    /* check-in */
    checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),

    /* status */
    status: v.union(
      v.literal("registered"),
      v.literal("cancelled")
    ),

    registeredAt: v.number(),
  })
    .index("by_event", ["eventId"])
    .index("by_user", ["userId"])
    .index("by_event_user", ["eventId", "userId"])
    .index("by_qrcode", ["qrCode"]),
});
