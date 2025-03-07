import Image from "next/image";
import Form from "../common/Form";

export default function Contact() {
    return (
        <div className="mx-12 lg:mx-20 pb-32 justify-center items-center" id="contato">
            <Image src="/clip.svg" alt="clipe icone" width={64} height={64} className="absolute 2xl:right-60 lg:right-32 -mt-5"/>
            <div className="bg-[url('/background-form-mobile.png')] lg:bg-[url('/background-form.svg')] bg-cover bg-no-repeat bg-center flex flex-col lg:flex-row justify-evenly items-center p-8 2xl:p-36 lg:p-16 gap-x-8 h-[90vh] lg:h-fit rounded-t-3xl lg:rounded-t-0">
                <div className="w-fit lg:w-1/3">
                    <h1 className="text-2xl lg:text-5xl font-semibold mb-4">Vamos conversar!</h1>
                    <p className="text-lg">Tem uma ideia, projeto ou dúvida? Estou à disposição para conversar! Preencha o formulário com seu e-mail, nome e mensagem. Vamos <strong>construir algo <span className="text-[#1e1e1e] uppercase">incrível</span> juntos!</strong></p>
                </div>

                <Form />
            </div>
        </div>
    )
}