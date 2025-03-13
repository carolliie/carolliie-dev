"use client"

import Image from "next/image";
import { useRef } from "react";
import { useIntersectionObserver } from "../common/useObserver";

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div className="flex flex-col lg:flex-row mb-12 lg:mb-0 py-16 px-6 lg:py-32 lg:px-12 justify-center items-center bg-[url('/sobre-background.svg')] bg-cover bg-center bg-no-repeat">
            <div className={`flex flex-col w-[90%] text-wrap lg:w-1/2 gap-y-8 justify-center mx-8 lg:mx-0 ${isVisible ? "fade-left" : ""}`} id="sobre" ref={ref}>
                <h1 className="font-semibold text-start text-3xl lg:text-5xl">Sobre</h1>
                <p className="font-light text-lg lg:w-8/12">Sou Ana Caroline, desenvolvedora de software com experiência em desenvolvimento web. Atualmente, atuo como freelancer, desenvolvendo projetos que conectam criatividade e funcionalidade.</p>

                <div className="flex flex-col justify-start items-start uppercase font-light gap-6">
                    <div className="flex flex-row justify-center items-center">
                        <div className="w-[155px] lg:w-48">
                            <p className="text-5xl font-light">+20</p>
                            <p className="text-sm lg:text-base">Projetos desenvolvidos</p>
                        </div>
                        <div className="w-[155px] lg:w-48">
                            <Image src="/formacao.svg" alt="html icone" width={64} height={64} loading="lazy" />
                            <p className="text-sm lg:text-base">Acadêmica de ciência da computação</p>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <div className="w-[155px] lg:w-48">
                            <Image src="/experiencia.svg" alt="html icone" width={64} height={64} loading="lazy" />
                            <p className="text-sm lg:text-base">Experiência no mercado</p>
                        </div>
                        <div className="w-[155px] lg:w-48">
                            <Image src="/resultados.svg" alt="html icone" width={64} height={64} loading="lazy" />
                            <p className="text-sm lg:text-base">Resultados rápidos e funcionais</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`mt-12 w-[90%] lg:w-fit ${isVisible ? "fade-right" : ""}`} id="sobre-img" ref={ref}>
                <Image
                    src="/carollie.webp"
                    alt="Ana Caroline"
                    width={458}
                    height={507}
                    loading="lazy"
                />
            </div>
        </div>
    )
}