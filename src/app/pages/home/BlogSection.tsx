"use client"

import { useRef } from "react";
import PostsSection from "../common/PostsSection";
import { useIntersectionObserver } from "../common/useObserver";

export default function BlogSection() {

    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div className={`flex flex-col justify-center items-center pb-24 bg-[url('/background-blog.svg')] bg-center bg-cover bg-no-repeat ${isVisible ? "fade-in-effect" : ""}`} ref={ref} id="posts">
            <h1 className="text-center text-3xl lg:text-4xl font-semibold">
                Insights e{" "}
                <span className="pencerio text-[#FFD7ED] font-normal">
                    inspirações
                </span>
            </h1>

            <PostsSection/>
        </div>
    );
}