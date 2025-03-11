'use client'
import Image from "next/image";
import Link from "next/link";

type PostProps = {
    img: string;
    name: string;
    content: string;
    tags?: string[];
    slug: string;
    tagColor: string;
    tagTextColor: string;
};

const Card: React.FC<PostProps> = ({ img, name, content, slug, tagColor, tagTextColor, tags = [] }) => {
    return (
        <div className="flex flex-col flex-wrap justify-between gap-y-5 rounded-lg w-[300px] text-white">
            <div>
                <div className="relative h-[300px] overflow-hidden rounded-lg">
                    <Image
                        src={img}
                        alt="Imagem do post"
                        width={288}
                        height={288}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
                <div className="py-4">
                    <h2 className="text-lg font-medium">{name}</h2>
                    <p className="text-base font-light"
                        dangerouslySetInnerHTML={{
                            __html: content.length > 20
                                ? content.substring(0, 20) + "..."
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

            <Link className="flex justify-end" href={`blog/${slug}`}>
                <Image
                    src="/arrow-button.svg"
                    alt="Post button"
                    width={40}
                    height={40}
                    loading="lazy" />
            </Link>
        </div>
    )
}

export default Card;
