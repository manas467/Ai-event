"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { Authenticated, Unauthenticated } from "convex/react";
import { Button } from "./ui/button";
import { BarLoader } from "react-spinners";

import { Plus, Ticket, Building } from "lucide-react";
import { useStoreUser } from "@/hooks/use-store-user";

const Header = () => {
  const { isLoading } = useStoreUser();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-20 border-b bg-background/80 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/spott.png"
            alt="Spott logo"
            width={500}
            height={500}
            className="h-11 w-auto"
            priority
          />
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUpgradeModal(true)}
          >
            Pricing
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/explore">Explore</Link>
          </Button>

          {/* AUTHENTICATED */}
          <Authenticated>
            <Button size="sm" asChild className="mr-2 flex gap-2">
              <Link href="/create-event">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Create Event</span>
              </Link>
            </Button>

            <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-9 h-9",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Tickets"
                    labelIcon={<Ticket size={16} />}
                    href="/my-tickets"
                  />
                  <UserButton.Link
                    label="My Events"
                    labelIcon={<Building size={16} />}
                    href="/my-events"
                  />
                  <UserButton.Action label="manageAccount" />
                </UserButton.MenuItems>
              </UserButton>
          </Authenticated>

          {/* UNAUTHENTICATED */}
          <Unauthenticated>
            <SignInButton mode="modal">
              <Button size="sm">Sign in</Button>
            </SignInButton>
          </Unauthenticated>
        </div>

        {/* Loader */}
        {isLoading && (
          <div className="absolute bottom-0 left-0 w-full">
            <BarLoader width="100%" color="#a855f7" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
