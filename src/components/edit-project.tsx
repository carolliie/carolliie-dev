"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import Editor from "@/app/pages/common/Editor";

const FormSchema = z.object({
    name: z.string().min(2, {
        message: "Título deve possuir pelo menos 2 caracteres.",
    }),
    content: z.string().min(10, {
        message: "Descrição deve possuir pelo menos 10 caracteres.",
    }),
    tags: z.array(z.string().min(2)).nonempty({
        message: "Deve existir pelo menos uma tag.",
    }),
    img: z.string().min(2, {
        message: "Insira uma imagem.",
    }),
    projectColor: z.string().min(2, {
        message: "Insira a cor do projeto em hexadecimal.",
    }),
    tagColor: z.string().min(2, {
        message: "Insira a cor das tags em hexadecimal.",
    }),
    tagTextColor: z.string().min(2, {
        message: "Insira a cor das tags em hexadecimal.",
    }),
});

export function EditProjectForm({ project }: { project?: any }) {
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: project?.name || "",
            content: project.content || "",
            tags: Array.isArray(project?.tags) ? project.tags : [],
            img: project.img || "",
            projectColor: project.projectColor || "#000000",
            tagColor: project.tagColor || "#000000",
            tagTextColor: project.tagTextColor || "#000000",
        },
    });

    async function onSubmitForm(values: z.infer<typeof FormSchema>) {
        try {
            const updatedproject = {
                name: values.name,
                content: values.content,
                tags: values.tags,
                img: values.img,
                projectColor: values.projectColor,
                tagColor: values.tagColor,
                tagTextColor: values.tagTextColor,
            };

            const token = localStorage.getItem("authToken");

            await axios.patch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/edit/${project.slug}`,
                updatedproject,
                {
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            toast({
                title: "✅ Projeto atualizado com sucesso!",
                description: (
                    <div className="flex items-center gap-4 p-3 bg-gray-900 rounded-lg">
                        <img
                            src={values.img}
                            alt="Preview do projeto"
                            width={80}
                            height={80}
                            className="rounded-lg object-cover"
                        />
                        <div className="w-[300px]">
                            <h3 className="text-lg font-semibold text-white">{values.name}</h3>
                            <p className="text-sm text-gray-300">
                                {values.content.length > 30
                                    ? values.content.substring(0, 30) + "..."
                                    : values.content}
                            </p>
                        </div>
                    </div>
                ),
            });

            router.push("/dashboard/projetos")
        } catch (error) {
            toast({
                title: "❌ Erro ao atualizar projeto.",
                description: "Tente novamente mais tarde.",
            });
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitForm)} className="w-2/3 space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Título</FormLabel>
                            <FormControl>
                                <Input placeholder="Digite um título..." {...field} />
                            </FormControl>
                            <FormDescription>Este é o título do projeto.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Conteúdo</FormLabel>
                            <FormControl>
                                <Editor content={field.value} setContent={field.onChange} />
                            </FormControl>
                            <FormDescription>Este é o conteúdo do post.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Digite as tags separadas por vírgula..."
                                    value={field.value.join(", ")}
                                    onChange={(event) => field.onChange(event.target.value.split(",").map(tag => tag.trim()))}
                                />
                            </FormControl>
                            <FormDescription>Adicione as tags separadas por vírgula.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tagColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cor das tags</FormLabel>
                            <FormControl>
                                <Input
                                    type="color"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormDescription>Esta é a cor das tags.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="tagTextColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cor do título das tags</FormLabel>
                            <FormControl>
                                <Input
                                    type="color"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormDescription>Esta é a cor do título das tags.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="img"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imagem</FormLabel>
                            <FormControl>
                                <Input placeholder="Insira a URL da imagem..." {...field} onChange={(e) => field.onChange(e.target.value)} />
                            </FormControl>
                            {field.value && (
                                <div className="mt-4">
                                    <img
                                        src={field.value}
                                        width={200}
                                        height={200}
                                        alt="Imagem do project"
                                        className="rounded-lg border"
                                    />
                                </div>
                            )}
                            <FormDescription>Imagem de destaque do projeto.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="projectColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cor do projeto</FormLabel>
                            <FormControl>
                                <Input
                                    type="color"
                                    {...field}
                                    onChange={(e) => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormDescription>Esta é a cor do projeto.</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button type="submit">Publicar</Button>
            </form>
        </Form>
    );
}
