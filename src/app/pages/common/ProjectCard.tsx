'use client'

import Image from "next/image";
import Link from "next/link";

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
                <div className="relative w-[270px] h-[270px] lg:w-[470px] lg:h-[470px] xl:w-[550px] xl:h-[550px] !rounded-lg">
                    <Image
                        src={img}
                        alt="Imagem do post"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        className="rounded-lg"
                        loading="lazy"
                    />
                </div>
                <div className="py-4">
                    <h2 className="text-lg font-medium">{name}</h2>
                    <p className="text-base font-light text-wrap"
                        dangerouslySetInnerHTML={{
                            __html: content.length > 30
                                ? content.substring(0, 30) + "..."
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

            <Link className="flex justify-end" href={`/projetos/${slug}`}>
                <Image
                    src="/arrow-button.svg"
                    alt="Project button"
                    width={40}
                    height={40}
                    loading="lazy"
                />
            </Link>
        </div>
    )
}

export default ProjectCard;
