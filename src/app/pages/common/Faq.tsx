import Accordion from "./Accordion";

export default function Faq() {

    const faqAnswers = [
        { title: "Você está disponível para oportunidades de emprego em período integral?", answer: "Sim, estou disponível para oportunidades de emprego em período integral e aberta a discutir como posso contribuir para sua equipe." },
        { title: "Quais são os seus serviços?", answer: "Trabalho com desenvolvimento de software. Também realizo serviços de UX/UI." },
        { title: "Quais as suas Soft Skills?", answer: "Tenho como principais habilidades: Comunicação assertiva, assiduidade, trabalho em equipe, resolução de problemas e aprendizado contínuo." },
        { title: "Como você lida com entregas?", answer: "A depender do projeto, tenho diferentes situações de entrega. Para sites com interface completa e responsiva, tenho um prazo de 10 a 15 dias." },
        { title: "Qual o seu nível de inglês?", answer: "Atualmente, meu nível de língua inglesa é intermediário. Pratico leitura e escrita todos os dias, a partir do consumo de conteúdo para estudo ou lazer." },
        { title: "Você é desenvolvedora Front-end, Back-end, FullStack ou Mobile?", answer: "Sou desenvolvedora FullStack, com maior proficiência em Front-end." }
    ]

    return (
        <div className="flex container mx-auto flex-col lg:flex-row justify-between relative px-12 pb-28 lg:px-24 lg:pb-32" id="faq">
            <div className="flex flex-col gap-y-4 mb-10 lg:mb-0 lg:sticky top-0 w-fit lg:w-[450px]">
                <h1 className="text-5xl font-semibold">FAQ</h1>
                <p className="text-lg font-normal">Dúvidas frequentes recebidas no <span className="text-[#FFA0D4] font-general">Instagram</span> e <span className="text-[#F2FFAB] font-general">LinkedIn</span>.</p>

                <a href="https://www.linkedin.com/in/ana-caroline-vieira-526374274/" className="bg-[#F2FFAB] text-black text-nowrap font-medium flex flex-row justify-between items-center gap-x-6 py-3 px-4 w-fit lg:w-1/2 rounded-lg">
                    Ver linkedin
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_503_5)">
                            <path d="M18 0H2C0.9 0 0 0.9 0 2V18C0 19.1 0.9 20 2 20H18C19.1 20 20 19.1 20 18V2C20 0.9 19.1 0 18 0ZM6 17H3V8H6V17ZM4.5 6.3C3.5 6.3 2.7 5.5 2.7 4.5C2.7 3.5 3.5 2.7 4.5 2.7C5.5 2.7 6.3 3.5 6.3 4.5C6.3 5.5 5.5 6.3 4.5 6.3ZM17 17H14V11.7C14 10.9 13.3 10.2 12.5 10.2C11.7 10.2 11 10.9 11 11.7V17H8V8H11V9.2C11.5 8.4 12.6 7.8 13.5 7.8C15.4 7.8 17 9.4 17 11.3V17Z" fill="black" />
                        </g>
                        <defs>
                            <clipPath id="clip0_503_5">
                                <rect width="20" height="20" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </a>
            </div>

            <div className="flex flex-col justify-center items-start gap-y-6 w-fit lg:w-[450px]">
                {faqAnswers.map(((item, index) => (
                    <Accordion
                        key={index}
                        title={item.title}
                        answer={item.answer}
                    />
                )))}
            </div>
        </div>
    )
}