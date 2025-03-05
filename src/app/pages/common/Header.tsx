'use client'

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from "next/link";
import { ArrowBigRight } from "lucide-react";

const navigation = [
    { name: 'Sobre', href: '#sobre' },
    { name: 'Projetos', href: '/projetos' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '#faq' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;

        if (scrollY > lastScrollY.current) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        lastScrollY.current = scrollY;

    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);


    return (
        <header className={`sticky inset-x-0 top-0 z-50 px-24 transition-opacity duration-200 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">carolliie.dev</span>
                        <Image
                            alt="carolliie logo"
                            src="/carolliie-dev.svg"
                            width={128}
                            height={128}
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="size-6" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm/6 font-semibold text-white hover:text-[#FFA0D4]">
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#" className="flex justify-between text-sm/6 font-semibold text-black bg-[#FFA0D4] p-1 px-6 rounded-3xl hover:bg-[#c279a1]">
                        Contato <ArrowBigRight color="black" />
                    </a>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-50" />
                <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#1e1e1e] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white">
                    <div className="flex items-center justify-between">
                        <a href="/" className="-m-1.5 p-1.5">
                            <span className="sr-only">carolliie.dev</span>
                            <Image
                                alt="carolliie logo"
                                src="/carolliie-dev.svg"
                                height={92}
                                width={92}
                            />
                        </a>
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
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:text-[#FFA0D4]"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:text-[#FFA0D4]"
                                >
                                    Contato
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}