"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, Fragment } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Transition } from "@headlessui/react";

const navigation = [
  { name: "Sobre", href: "/#sobre" },
  { name: "Projetos", href: "/projetos" },
  { name: "Blog", href: "/blog" },
  { name: "FAQ", href: "/#faq" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsVisible(scrollY <= lastScrollY.current);
    lastScrollY.current = scrollY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 px-2 lg:px-24 w-full transition-opacity duration-200 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <nav
        aria-label="Global"
        className="flex items-center justify-between py-6"
      >
        <div className="flex lg:flex-1 px-8 lg:px-0">
          <Link href="/" className="p-1.5 w-[300px]">
            <span className="sr-only">carolliie.dev</span>
            <Image
              alt="carolliie logo"
              src="/carolliie-dev.svg"
              width={128}
              height={128}
              loading="lazy"
            />
          </Link>
        </div>

        <div className="flex w-[70px] lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-mx-10 inline-flex items-center justify-center rounded-md p-2.5 text-white"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-8" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-normal text-white hover:text-[#fac6e2] hover:glow"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="#contato"
            className="flex justify-between items-center text-sm/6 font-medium text-black bg-[#FFA0D4] p-1 px-6 rounded-3xl hover:bg-[#462c3a] hover:text-[#fff3f9]"
          >
            Contato →
          </Link>
        </div>
      </nav>

      {/* Mobile menu with smooth fade/slide transitions */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
          {/* Backdrop com fade suave */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 z-40 bg-black/50"
              aria-hidden="true"
            />
          </Transition.Child>

          {/* Painel: fade-in right / fade-out right */}
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in duration-200"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#1e1e1e] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white">
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="-m-1.5 p-1.5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">carolliie.dev</span>
                  <Image
                    alt="carolliie logo"
                    src="/carolliie-dev.svg"
                    height={92}
                    width={92}
                    loading="lazy"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-white"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:text-[#FFA0D4]"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="py-6">
                    <Link
                      href="/#contato"
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:text-[#FFA0D4]"
                    >
                      Contato
                    </Link>
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </header>
  );
}
