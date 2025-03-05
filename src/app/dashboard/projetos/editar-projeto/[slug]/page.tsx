"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { EditProjectForm } from "@/components/edit-project";

export default function EditarProjeto() {
    const params = useParams();
    const slug = params?.slug;
    const [project, setProject] = useState(null);
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
    if (error) return <p>Erro ao carregar o projeto.</p>


    return (
        <div>
            <EditProjectForm project={project} />
        </div>
    )
}