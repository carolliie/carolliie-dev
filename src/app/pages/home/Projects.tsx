import ProjectsSection from "../common/ProjectsSection";

export default function Projects() {
    return (
        <div className="px-0 pb-16 lg:px-3 lg:pb-32 container mx-auto flex flex-col" id="projetos">
            <div className="flex flex-row justify-between items-center px-12 lg:px-20">
                <div className="flex flex-col">
                    <p className="text-sm lg:text-base"><span aria-hidden="true" className="text-[#FFA0D4] mx-2">→</span>Meu portfólio</p>
                    <h1 className="text-4xl lg:text-5xl font-semibold flex flex-col">Projetos <span className="text-[#FFA0D4] font-normal pencerio text-base">recentes</span></h1>
                </div>
                
                <a href="/projetos" className="flex flex-row justify-between items-center gap-x-1 lg:gap-x-4 bg-white text-black text-nowrap text-sm lg:text-base font-medium py-1.5 px-3 rounded-full w-28 lg:w-36">Ver mais
                    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32.985 19.743C32.985 27.8509 26.7203 34.4236 18.9923 34.4236C11.2644 34.4236 4.99963 27.8509 4.99963 19.743C4.99963 11.6351 11.2644 5.06238 18.9923 5.06238C26.7203 5.06238 33.3532 11.63 32.985 19.743Z" fill="#1E1E1E" />
                        <path d="M19.0228 0C10.1688 0 2.26972 6.35598 0.417581 15.011C-0.507761 19.3357 0.115597 23.9343 2.18004 27.8474C4.16694 31.6134 7.42429 34.657 11.3215 36.3819C15.3753 38.1765 20.0291 38.4893 24.2899 37.2654C28.4003 36.0852 32.045 33.4946 34.5263 30.0172C39.7143 22.7472 39.0207 12.5353 32.917 6.02097C29.3397 2.20322 24.2588 0 19.0228 0ZM28.1497 20.0168L22.9632 25.3218C21.65 26.6652 19.5744 24.63 20.8822 23.2928L23.4993 20.6161H11.0971C10.2163 20.6161 9.48147 19.8817 9.48147 19.0026C9.48147 18.1234 10.2168 17.389 11.0971 17.389H23.4372L20.7683 14.724C19.4421 13.3994 21.4983 11.3453 22.8245 12.6698L28.1376 17.9758C28.7009 18.5378 28.7062 19.448 28.1497 20.0168Z" fill="#FFA0D4" />
                    </svg>
                </a>
            </div>

            <ProjectsSection/>
        </div>
    )
}