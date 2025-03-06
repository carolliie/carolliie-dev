"use client";

import React from "react";
import axios from "axios";
import Card from "../common/Card";
import { useEffect } from "react";

export type Post = {
    date: string | number | Date;
    id: string;
    name: string;
    content: string;
    img: string;
    slug: string;
    tags: string[];
    tagColor: string;
    tagTextColor: string;
};

export default function PostsSection({ excludeSlug }: { excludeSlug?:string }) {
    const [posts, setPosts] = React.useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`
                );
                const sortedPosts = response.data
                    .sort((a: Post, b: Post) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .filter((post: Post) => post.slug !== excludeSlug);

                setPosts(sortedPosts.slice(0, 4)); 
            } catch (error) {
                console.error("Erro ao buscar posts", error);
            }
        };
        fetchPosts();
    }, [excludeSlug]);

    return (
        <div className="flex flex-col justify-center items-center px-12 py-2">
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-12 justify-center">
                    {posts.map((post) => (
                        <Card
                            key={post.id}
                            img={post.img}
                            name={post.name}
                            content={post.content}
                            tags={post.tags || []}
                            slug={post.slug}
                            tagColor={post.tagColor}
                            tagTextColor={post.tagTextColor} 
                            />
                    ))}
                </div>
            ) : (
                <span className="text-lg font-semibold text-center mt-4">
                    Nenhum post disponível
                </span>
            )}
        </div>
    );
}