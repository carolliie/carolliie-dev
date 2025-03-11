"use client";

import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { SearchIcon } from "lucide-react";
import Card from "./Card";

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

export default function AllPostsSection() {
    const [posts, setPost] = React.useState<Post[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts`
                );
                const sortedPosts = response.data
                    .sort((a: Post, b: Post) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    );

                setPost(sortedPosts);
            } catch (error) {
                console.error("Erro ao buscar posts", error);
            }
        };
        fetchPosts();
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (!query) {
            setFilteredPosts(posts);
        } else {
            const filtered = posts.filter((project) =>
                project.name.toLowerCase().includes(query) ||
                project.tags.some(tag => tag.toLowerCase().includes(query))
            );

            setFilteredPosts(filtered);
        }
    };

    const postsToShow = searchQuery ? filteredPosts : posts;

    return (
        <div className="px-0 pb-24 lg:px-3 lg:pb-32 mx-auto flex flex-col py-32 w-full">
            <div className="flex flex-row justify-between items-center px-12 lg:px-20">
                <div className="w-full">
                    <h1 className="text-start text-[25px] lg:text-4xl font-semibold">
                        Veja mais{" "}
                        <span className="pencerio text-[#FFD7ED] text-[20px] lg:text-4xl font-normal">
                            insights
                        </span>
                    </h1>
                </div>

                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou tag..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full text-black max-w-md px-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-[#FFD7ED] text-sm lg:text-lg"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" color="gray" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center px-10 lg:px-20 py-2">
                {postsToShow.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 py-12 justify-between">
                        {postsToShow.slice(0, visibleCount).map((post) => (
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

                {visibleCount < postsToShow.length && (
                    <button
                        className="mt-6 px-6 py-2 bg-[#FFA0D4] text-white rounded-lg hover:bg-[#a35480] transition duration-300"
                        onClick={() => setVisibleCount(visibleCount + 2)}
                    >
                        Ver mais
                    </button>
                )}
            </div>

        </div>
    );
}