"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import ProjectsSection from "@/app/pages/common/ProjectsSection";

export default function ProjectPage() {
    const params = useParams();
    const slug = params?.slug;
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${slug}`);
                setProject(response.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchProject();
    }, [slug]);

    if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
    if (error) return <p>Erro ao carregar o projeto.</p>;
    if (!project) return <p>Projeto não encontrado.</p>;

    return (
        <div>
            <div
                className="bg-center bg-cover h-[80vh] flex items-start justify-end text-white text-center p-[60px] flex-col rounded-br-[60px] rounded-bl-[60px] before:absolute before:top-0 before:left-0 before:w-full before:h-[80vh] before:rounded-br-[60px] before:rounded-bl-[60px] before:bg-gradient-to-t before:from-black/60 before:via-black/30 before:to-transparent"
                style={{ backgroundImage: `url(${project.img})` }}
            >
                <div className="z-20">
                    <h1 className="text-4xl font-semibold">{project.name}</h1>

                    <div className="flex items-center gap-10 text-center mt-4">
                        <span className="text-base text-white">{format(new Date(project.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                        <div className="flex justify-center gap-2 mt-2">
                            {project.tags.map((tag: string, index: number) => (
                                <span key={index} className={`texttext-${project.tagTextColor} font-medium uppercase text-base px-3 py-2 rounded-lg`}
                                    style={{
                                        backgroundColor: `${project.tagColor}`,
                                    }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto h-fit p-[60px] text-lg text-white leading-relaxed text-start bg-[url('/background-blog.svg')] bg-center bg-cover bg-no-repeat">
                <p dangerouslySetInnerHTML={{ __html: project.content }}></p>
            </div>

            <div>
                <h1 className="text-center text-4xl font-semibold">
                    Veja mais{" "}
                    <span className="pencerio text-[#FFD7ED] font-normal">
                        insights
                    </span>
                </h1>
                <ProjectsSection />
            </div>
        </div>
    );
}
