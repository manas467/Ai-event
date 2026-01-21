import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { add } from "date-fns";
import { ca, de } from "date-fns/locale";
import { QrCode } from "lucide-react";
import { register } from "next/dist/next-devtools/userspace/pages/pages-dev-overlay-setup";
import { use } from "react";

export default defineSchema({
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

   events: defineTable({
      title:v.string(),
      description:v.string(),
      slug:v.string(),

      //organizer info

      orgainzerId:  v.id("users"),
      organizerName: v.string(),


      //event details
      category: v.string(),
      tags: v.array(v.string()),

      //date and time
      startDate: v.number(),
      endDate: v.number(),
      timezone: v.string(),
         
      //location
      locationType: v.union(v.literal("physical"), v.literal("online")),
      venue: v.optional(v.string()),
      address: v.optional(v.string()),
      city: v.string(),
      state: v.optional(v.string()),

      //capacity and ticketing

      capacity: v.number(),
      ticketType:v.union(v.literal("free"), v.literal("paid")),
      ticketPrice: v.optional(v.number()),
      registerationCount: v.number(),

      //Customization

      coverImage:v.optional(v.string()),
      themeColor:v.optional(v.string()),

      //timestamps
      createdAt: v.number(),
      updatedAt: v.number(),
 
   })
   .index("by_organizer", ["orgainzerId"])
   .index("by_category", ["category"])
   .index("by_Start_date",["startDate"])
   .index("by_slug", ["slug"])
   .searchIndex("search_title",{searchField:"title"}),




   registrations: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),


    //attendent info
    attendeeName: v.string(),
    attendeeEmail: v.string(),

    //qr code for entry
   QrCode:v.string(),//Unique Id for QR code generation

   //check-in status
   checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),

    //status
    status: v.union(v.literal("registered"), v.literal("cancelled")),

    registeredAt: v.number(),


   })
   .index("by_event", ["eventId"])
   .index("by_user", ["userId"])
   .index("by_event_user", ["eventId", "userId"])
   .index("by_qrcode", ["QrCode"]),



});
