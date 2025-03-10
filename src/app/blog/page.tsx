import AllPostsSection from "../pages/common/AllPosts";
import PostsSection from "../pages/common/PostsSection";

export default function PostsPage() {
    return (
        <div className="px-0 pb-24 lg:px-3 lg:pb-32 container mx-auto flex flex-col py-32" id="projetos">
            <div className="flex flex-row justify-between items-center px-20">
                <div className="flex flex-col">
                    <p className="text-sm lg:text-base"><span aria-hidden="true" className="text-[#FFA0D4] mx-2">→</span>Publicações</p>
                    <h1 className="text-4xl lg:text-5xl font-semibold flex flex-col">Insights <span className="text-[#FFA0D4] font-normal pencerio">recentes</span></h1>
                </div>
            </div>

            <PostsSection />

            <AllPostsSection />
        </div>
    )
}