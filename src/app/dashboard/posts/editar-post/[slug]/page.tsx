"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { EditPostForm } from "@/components/edit-post-form";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

interface Post {
    name: string;
    content: string;
    tags: string[];
    img: string;
    tagColor: string;
    tagTextColor: string;
    slug: string;
}

export default function EditarPost() {
    const params = useParams();
    const slug = params?.slug;
    const [post, setPost] = useState<Post>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        async function fetchPost() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/posts/${slug}`);
                setPost(response.data);
            } catch (err) {
                console.error(err);
                setError(true);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, [slug]);

    if (loading) return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
    if (error) return <p>Erro ao carregar a publicação.</p>


    return (
        <div>
            <EditPostForm post={post} />
        </div>
    )
}