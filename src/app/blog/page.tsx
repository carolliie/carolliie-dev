"use client"

import { useRef } from "react";
import AllPostsSection from "../pages/common/AllPosts";
import PostsSection from "../pages/common/PostsSection";
import { useIntersectionObserver } from "../pages/common/useObserver";

export default function PostsPage() {
    const ref = useRef<HTMLDivElement>(null);
    const isVisible = useIntersectionObserver(ref);

    return (
        <div className="px-0 pb-24 lg:px-3 lg:pb-32 container mx-auto flex flex-col py-32">
            <div className={`flex flex-row justify-between items-center px-10 lg:px-20 ${isVisible ? "fade-in-effect" : ""}`} ref={ref}>
                <div className="flex flex-col">
                    <p className="text-sm lg:text-base"><span aria-hidden="true" className="text-[#FFA0D4] mx-2">→</span>Publicações</p>
                    <h1 className="text-4xl lg:text-5xl font-semibold flex flex-col">Insights <span className="text-[#FFA0D4] font-normal pencerio">recentes</span></h1>
                </div>
            </div>

            <div className={`${isVisible ? "fade-in-effect" : ""}`} ref={ref}>
                <PostsSection />
            </div>

            <div className={`${isVisible ? "fade-in-effect" : ""}`} ref={ref}>
                <AllPostsSection />
            </div>

        </div>
    )
}