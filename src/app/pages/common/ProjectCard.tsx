'use client'

type ProjectProps = {
    img: string;
    name: string;
    content: string;
    tags?: string[];
    slug: string;
    projectColor: string;
    tagColor: string;
    tagTextColor: string;
};

const ProjectCard: React.FC<ProjectProps> = ({ img, name, content, slug, projectColor, tagColor, tagTextColor, tags = [] }) => {
    return (
        <div className="flex flex-col justify-center gap-y-5 p-4 rounded-2xl w-fit h-fit text-white"
            style={{
                background: `linear-gradient(to bottom, #FFFFFF 20%, ${projectColor} 90%)`,
            }}
        >
            <div>
                <div className="relative w-[470px] h-[470px] overflow-hidden rounded-lg">
                    <img
                        src={img}
                        alt="Imagem do post"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="py-4">
                    <h2 className="text-lg font-medium">{name}</h2>
                    <p className="text-base font-light"
                        dangerouslySetInnerHTML={{
                            __html: content.length > 24
                                ? content.substring(0, 24) + "..."
                                : content
                        }}
                    ></p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, index) => (
                        <span key={index} className={`bg-[#F2FFAB] text-sm text-black font-medium uppercase px-2 py-1 rounded-md`}
                            style={{
                                backgroundColor: `${tagColor}`,
                                color: `${tagTextColor}`
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <a className="flex justify-end" href={`/projetos/${slug}`}>
                <img src="/arrow-button.svg" alt="Project button" className="w-10 h-10" />
            </a>
        </div>
    )
}

export default ProjectCard;
