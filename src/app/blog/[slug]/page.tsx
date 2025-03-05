"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import PostsSection from "@/app/pages/common/PostsSection";

export default function PostPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [post, setPost] = useState<any>(null);
    const [author, setAuthor] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [loadingAuthor, setLoadingAuthor] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`);
                setPost(response.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [slug]);

    useEffect(() => {
        async function fetchAuthor() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/ana-caroline-vieira`);
                setAuthor(response.data);
            } catch (err) {
                setError(true);
            } finally {
                setLoadingAuthor(false);
            }
        }
        fetchAuthor();
    }, []);

    if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
    if (error) return <p>Erro ao carregar a publicação.</p>;
    if (!post) return <p>Publicação não encontrada.</p>;

    return (
        <div>
            <div
                className="bg-center bg-cover h-[80vh] flex items-start justify-end text-white text-center p-[60px] flex-col rounded-br-[60px] rounded-bl-[60px] before:absolute before:top-0 before:left-0 before:w-full before:h-[80vh] before:rounded-br-[60px] before:rounded-bl-[60px] before:bg-gradient-to-t before:from-black/60 before:via-black/30 before:to-transparent"
                style={{ backgroundImage: `url(${post.img})` }}
            >
                <div className="z-20">
                    <h1 className="text-4xl font-semibold">{post.name}</h1>

                    <div className="flex items-center gap-10 text-center mt-4">
                        <span className="text-base text-white">{format(new Date(post.date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}</span>
                        <div className="flex justify-center gap-2 mt-2">
                            {post.tags.map((tag: string, index: number) => (
                                <span key={index} className={`bg-[#FFD7ED] text-${post.tagTextColor} font-medium uppercase text-base px-3 py-2 rounded-lg`}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto h-fit p-[60px] text-lg text-white leading-relaxed text-start bg-[url('/background-blog.svg')] bg-center bg-cover bg-no-repeat">
                <p className="prose mt-4" dangerouslySetInnerHTML={{ __html: post.content }}></p>

                {author ? (
                    <div className="mt-10 flex items-center gap-4 border-t pt-6 border-gray-400">
                        {author.profilePicture && (
                            <img
                                src={author.profilePicture}
                                alt="Foto do autor"
                                className="w-14 h-14 rounded-full"
                            />
                        )}
                        <div>
                            <h3 className="text-lg font-semibold text-white">Autora: {author.username}</h3>
                            <p className="text-sm text-gray-300">{author.bio || "Sem biografia disponível."}</p>
                        </div>
                    </div>
                ) : (
                    <Skeleton className="w-40 h-10 mt-6 rounded-full" />
                )}
            </div>

            <div>
                <h1 className="text-center text-4xl font-semibold">
                    Veja mais{" "}
                    <span className="pencerio text-[#FFD7ED] font-normal">
                        insights
                    </span>
                </h1>
                <PostsSection excludeSlug={slug}/>
            </div>
        </div>
    );
}
