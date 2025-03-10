"use client";

import React from "react";
import axios from "axios";
import { useEffect } from "react";
import ProjectCard from "./ProjectCard";

export type Project = {
    date: string | number | Date;
    id: string;
    name: string;
    content: string;
    img: string;
    slug: string;
    tags: string[];
    projectColor: string;
    tagColor: string;
    tagTextColor: string;
};

export default function ProjectsSection({ excludeSlug }: { excludeSlug?: string }) {
    const [projects, setProject] = React.useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`
                );
                const sortedProjects = response.data
                    .sort((a: Project, b: Project) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .filter((project: Project) => project.slug !== excludeSlug);

                setProject(sortedProjects.slice(0, 2));
            } catch (error) {
                console.error("Erro ao buscar posts", error);
            }
        };
        fetchProjects();
    }, [excludeSlug]);

    return (
        <div className="container flex flex-col justify-center items-center px-12 py-2">
            {projects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 xl:gap-48 py-12 justify-between">
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            img={project.img}
                            name={project.name}
                            content={project.content}
                            tags={project.tags || []}
                            slug={project.slug}
                            projectColor={project.projectColor}
                            tagColor={project.tagColor}
                            tagTextColor={project.tagTextColor}
                        />
                    ))}
                </div>
            ) : (
                <span className="text-lg font-semibold text-center mt-4">
                    Nenhum projeto disponível
                </span>
            )}
        </div>
    );
}