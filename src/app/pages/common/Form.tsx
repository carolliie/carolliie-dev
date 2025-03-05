"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function Form() {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

    async function onSubmitForm(values: any) {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/send-email`,
                JSON.stringify(values),
                { headers: { "Content-Type": "application/json" } }
            );
            
            setSubmittedMessage("✅ Email enviado com sucesso!");
            reset();
        } catch (error) {
            setSubmittedMessage("❌ Erro ao enviar email. Tente novamente.");
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col w-1/3 gap-y-4">
            <input
                {...register("name", { required: "Nome é obrigatório" })}
                type="text"
                placeholder="Seu nome..."
                className="bg-white p-4 border-2 border-black rounded-2xl placeholder-black text-black" />
            {errors.name && <p className="text-white text-sm">{errors.name.message?.toString()}</p>}

            <input
                {...register("email", { required: "Email é obrigatório", pattern: { value: /\S+@\S+\.\S+/, message: "E-mail inválido." } })}
                type="email"
                placeholder="seuemail@empresa.com"
                className="bg-white p-4 border-2 border-black rounded-2xl placeholder-black text-black" />
            {errors.email && <p className="text-white text-sm">{errors.email.message?.toString()}</p>}

            <textarea
                {...register("message", { required: "A sua mensagem não pode estar vazia.", maxLength: { value: 1000, message: "Sua mensagem não pode exceder 1000 caracteres." } })}
                placeholder="Olá! Gostaria de enviar uma mensagem..."
                className="bg-white p-4 border-2 border-black rounded-2xl h-24 placeholder-black text-black" />
            {errors.message && <p className="text-white text-sm">{errors.message.message?.toString()}</p>}

            <button type="submit" className="text-black font-medium border-2 p-4 border-black rounded-2xl bg-[#F1FFA1]">
                Enviar formulário
            </button>

            {submittedMessage && (
                <p className="text-white">{submittedMessage}</p>
            )}
            
        </form>
    )
}