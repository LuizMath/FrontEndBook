import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { SignOut } from "@/components/google-sign-out";
import { BookOpen } from "lucide-react";

export async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="border-b">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/books" className="flex items-center gap-2 font-semibold">
          <BookOpen className="size-5" />
          Juridiq Books
        </Link>

        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {user.image && (
                <Image
                  src={user.image}
                  alt={user.name ?? "Avatar"}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              )}
              <span className="hidden sm:inline">
                {user.name ?? user.email}
              </span>
            </div>
            <SignOut />
          </div>
        )}
      </div>
    </header>
  );
}
