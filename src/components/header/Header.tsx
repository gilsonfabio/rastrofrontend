"use client";

import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/theme-switcher";

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;
  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <>
      {/* Header fixo */}
      <header className="top-0 left-0 w-full bg-slate-200 dark:bg-gray-900 shadow-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo ou título */}
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Dashboard
          </h1>

          {/* Informações do usuário */}
          {session?.user && (
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {session.user.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {session.user.email}
                </p>
              </div>

              <ThemeSwitcher />

              <Button
                size="sm"
                variant="outline"
                onClick={() => signOut({ callbackUrl: "/login" })}
              >
                Sair
              </Button>
            </div>
          )}
        </div>
        <div className="relative w-full h-[20vh] md:h-[40vh] flex items-center justify-between bg-white">
          <div className="relative h-full max-h-[200px] md:max-h-[250px] aspect-square ml-4">
            <Image
              src="/dash_dog.png"
              alt="Imagem esquerda"
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 30vw, 250px"
              className="object-contain"
            />
          </div>
          <div className="relative h-full max-h-[200px] md:max-h-[250px] aspect-square mr-4">
            <Image
              src="/dash_cat.png"
              alt="Imagem direita"
              fill
              priority
              quality={100}
              sizes="(max-width: 768px) 30vw, 250px"
              className="object-contain"
            />
          </div>
        </div>
      </header>
    </>
  );
}
