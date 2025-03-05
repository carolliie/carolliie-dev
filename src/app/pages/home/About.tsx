import Image from "next/image";

export default function About() {
    return (
        <div className="flex flex-row py-32 px-12 justify-center items-center bg-[url('/sobre-background.svg')] bg-cover bg-center bg-no-repeat" id="sobre">
            <div className="flex flex-col w-1/2 gap-y-8 justify-center">
                <h1 className="font-semibold text-5xl">Sobre</h1>
                <p className="font-light text-lg w-8/12">Sou Ana Caroline, desenvolvedora de software com experiência em desenvolvimento web. Atualmente, atuo como freelancer, desenvolvendo projetos que conectam criatividade e funcionalidade.</p>

                <div className="flex flex-col justify-start items-start uppercase font-light gap-6">
                    <div className="flex flex-row justify-center items-center">
                        <div className="w-48">
                            <p className="text-5xl font-light">+20</p>
                            <p>Projetos desenvolvidos</p>
                        </div>
                        <div className="w-48">
                            <Image src="/formacao.svg" alt="html icone" width={64} height={64} />
                            <p>Acadêmica de ciência da computação</p>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center items-center">
                        <div className="w-48">
                            <Image src="/experiencia.svg" alt="html icone" width={64} height={64} />
                            <p>Experiência no mercado</p>
                        </div>
                        <div className="w-48">
                            <Image src="/resultados.svg" alt="html icone" width={64} height={64} />
                            <p>Resultados rápidos e funcionais</p>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <Image src="/carollie.webp" alt="html icone" width={458} height={507}/>
            </div>
        </div>
    )
}