import Image from "next/image";

export default function Skills() {
    return (
        <div className="flex flex-row justify-between items-center px-32">
            <Image src="/html.svg" alt="html icone" width={56} height={56}/>
            <Image src="/css.svg" alt="css icone" width={56} height={56}/>
            <Image src="/js.svg" alt="js icone" width={56} height={56}/>
            <Image src="/react.svg" alt="react icone" width={56} height={56}/>
            <Image src="/ts.svg" alt="ts icone" width={56} height={56}/>
            <Image src="/java.svg" alt="java icone" width={56} height={56}/>
            <Image src="/spring.svg" alt="spring icone" width={56} height={56}/>
            <Image src="/postgre.svg" alt="postgresql icone" width={56} height={56}/>
            <Image src="/git.svg" alt="git icone" width={56} height={56}/>
            <Image src="/tailwind.svg" alt="tailwind icone" width={56} height={56}/>
        </div>
    )
}