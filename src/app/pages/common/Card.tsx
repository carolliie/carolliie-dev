'use client'

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
        <div className="flex flex-col flex-wrap justify-between gap-y-5 rounded-lg 2xl:w-80 xl:w-[245px] lg:w-[245px] sm:w-[245px] xs:w-[250px] text-white">
            <div>
                <div className="relative 2xl:w-72 2xl:h-72 xl:w-[245px] xl:h-[245px] overflow-hidden rounded-lg">
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

            <a className="flex justify-end" href={`blog/${slug}`}>
                <img src="/arrow-button.svg" alt="Post button" className="w-10 h-10" />
            </a>
        </div>
    )
}

export default Card;
