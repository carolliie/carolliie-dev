import PostsSection from "../common/PostsSection";

export default function BlogSection() {
    return (
        <div className="flex flex-col justify-center items-center pb-24 bg-[url('/background-blog.svg')] bg-center bg-cover bg-no-repeat">
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