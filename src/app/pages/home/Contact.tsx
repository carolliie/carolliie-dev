import Image from "next/image";
import Form from "../common/Form";

export default function Contact() {
    return (
        <div className="mx-20 pb-32 justify-center items-center">
            <Image src="/clip.svg" alt="clipe icone" width={64} height={64} className="absolute 2xl:right-60 lg:right-32 -mt-5"/>
            <div className="bg-[url('/background-form.svg')] bg-contain bg-no-repeat bg-center flex justify-evenly items-center 2xl:p-36 lg:p-16 gap-x-8">
                <div className="w-1/3">
                    <h1 className="text-5xl font-semibold mb-4">Vamos conversar!</h1>
                    <p className="text-lg">Tem uma ideia, projeto ou dúvida? Estou à disposição para conversar! Preencha o formulário ao lado com seu e-mail, nome e mensagem. Vamos <strong>construir algo incrível juntos!</strong></p>
                </div>

                <Form />
            </div>
        </div>
    )
}