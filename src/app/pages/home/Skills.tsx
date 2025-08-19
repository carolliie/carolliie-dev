"use client"

import Image from "next/image";
import { useRef } from "react";
import { useIntersectionObserver } from "../common/useObserver";

export default function Skills() {

    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div className={`flex mx-auto flex-row flex-wrap justify-between gap-4 lg:gap-0 items-center px-12 lg:px-24 ${isVisible ? "fade-in-effect" : ""}`} ref={ref}>
            <Image src="/html.svg" alt="html icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/css.svg" alt="css icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/js.svg" alt="js icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/react.svg" alt="react icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/ts.svg" alt="ts icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/java.svg" alt="java icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/spring.svg" alt="spring icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/postgre.svg" alt="postgresql icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/git.svg" alt="git icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
            <Image src="/tailwind.svg" alt="tailwind icone" width={56} height={56} loading="lazy" className="hover:scale-105 transition-all duration-300 ease-in-out" />
        </div>
    )
}