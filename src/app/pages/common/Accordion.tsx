'use client'

import React, { useState } from "react"

type AccordionProps = {
    title: string;
    answer: string;
};

const Accordion: React.FC<AccordionProps> = ({ title, answer }) => {

    const [accordionOpen, setAccordionOpen] = useState(false);


    return (
        <div className="bg-gradient-to-b from-gray-light to-gray-dark p-6 rounded-3xl">
            <button className="flex justify-between w-full items-start" onClick={() => setAccordionOpen(!accordionOpen)}>
                <h3 className="text-lg text-start font-medium">{title}</h3>
                <svg
                    className="fill-[#FFA0D4] shrink-0 ml-8"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                            }`}
                    />
                    <rect
                        y="7"
                        width="16"
                        height="2"
                        rx="1"
                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${accordionOpen && "!rotate-180"
                            }`}
                    />
                </svg>
            </button>

            <div className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-50 text-base ${accordionOpen
                ? 'grid-rows-[1fr] opacity-100'
                : 'grid-rows-[0fr] opacity-0'
                }`}
            >
                <div className="overflow-hidden font-light">
                    <p className="mt-5">{answer}</p>
                </div>
            </div>

        </div>
    )
}

export default Accordion