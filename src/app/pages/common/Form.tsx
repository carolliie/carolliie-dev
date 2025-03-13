"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

interface FormData {
    name: string;
    email: string;
    message: string;
}

export default function Form() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

    const onSubmitForm: SubmitHandler<FormData> = async (values) => {
        setIsSubmitting(true);
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email`,
                JSON.stringify(values),
                { headers: { "Content-Type": "application/json" } }
            );

            setSubmittedMessage("Email enviado com sucesso!");
            reset();
        } catch (error) {
            console.error(error);
            setSubmittedMessage("Erro ao enviar email. Tente novamente.");
        }
        setIsSubmitting(false);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col w-full lg:w-1/3 gap-y-4"
            id="form"
        >
            <input
                {...register("name", { required: "Nome é obrigatório" })}
                type="text"
                placeholder="Seu nome..."
                className="bg-white p-4 border-2 border-black rounded-2xl placeholder-black text-black"
            />
            {errors.name && <p className="text-white text-sm">{errors.name.message}</p>}

            <input
                {...register("email", {
                    required: "Email é obrigatório",
                    pattern: { value: /\S+@\S+\.\S+/, message: "E-mail inválido." },
                })}
                type="email"
                placeholder="seuemail@empresa.com"
                className="bg-white p-4 border-2 border-black rounded-2xl placeholder-black text-black"
            />
            {errors.email && <p className="text-white text-sm">{errors.email.message}</p>}

            <textarea
                {...register("message", {
                    required: "A sua mensagem não pode estar vazia.",
                    maxLength: { value: 1000, message: "Sua mensagem não pode exceder 1000 caracteres." },
                })}
                placeholder="Olá! Gostaria de enviar uma mensagem..."
                className="bg-white p-4 border-2 border-black rounded-2xl h-24 placeholder-black text-black"
            />
            {errors.message && <p className="text-white text-sm">{errors.message.message}</p>}

            <button type="submit" className="flex items-center justify-center text-black font-medium border-2 p-4 border-black rounded-2xl bg-[#F1FFA1] hover:bg-[#d9e690] transition-all duration-300">
                Enviar formulário
                <div className={`loader mx-2 mt-2 transition-all duration-500 transform ${isSubmitting ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            {submittedMessage && <p className="text-[#1e1e1e]">{submittedMessage}</p>}
        </form >
    );
}
