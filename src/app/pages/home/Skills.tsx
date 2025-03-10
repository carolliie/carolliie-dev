import Image from "next/image";

export default function Skills() {
    return (
        <div className="flex container mx-auto flex-row flex-wrap justify-between gap-4 lg:gap-0 items-center px-12 lg:px-24">
            <Image src="/html.svg" alt="html icone" width={56} height={56} loading="lazy" />
            <Image src="/css.svg" alt="css icone" width={56} height={56} loading="lazy" />
            <Image src="/js.svg" alt="js icone" width={56} height={56} loading="lazy" />
            <Image src="/react.svg" alt="react icone" width={56} height={56} loading="lazy" />
            <Image src="/ts.svg" alt="ts icone" width={56} height={56} loading="lazy" />
            <Image src="/java.svg" alt="java icone" width={56} height={56} loading="lazy" />
            <Image src="/spring.svg" alt="spring icone" width={56} height={56} loading="lazy" />
            <Image src="/postgre.svg" alt="postgresql icone" width={56} height={56} loading="lazy" />
            <Image src="/git.svg" alt="git icone" width={56} height={56} loading="lazy" />
            <Image src="/tailwind.svg" alt="tailwind icone" width={56} height={56} loading="lazy" />
        </div>
    )
}