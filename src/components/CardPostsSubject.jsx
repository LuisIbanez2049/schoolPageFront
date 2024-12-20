import { Archive, CalendarDays, FileText } from 'lucide-react'
import React from 'react'

function CardPostsSubject({ color, title, description, date, file }) {
    const dateDate = date && date.slice(0,10);
    const dateHour = date && date.slice(11,16);
    const divStyle = {
        boxShadow: `0px 5px 8px ${color}` 
    }
    return (
        <div className="w-[1300px] rounded-lg bg-[#f3f2f2] p-6 shadow-md" style={divStyle}>
            <h1 className={`mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white bg-[${color}] rounded-[15px] p-2`}>{title}</h1>
            <div className="mb-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
                <CalendarDays className="mr-2 h-4 w-4" />
                <time dateTime="2024-12-20">{dateDate} | {dateHour}</time>
            </div>
            <p className="mb-6 text-base text-gray-700 dark:text-gray-300">
                {description}
            </p>
            <a
                href={`${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center rounded-lg bg-[${color}] px-4 py-2 text-center text-sm  text-[#000000c0] font-semibold hover:text-black`}
            >
                <FileText className="mr-2 h-5 w-5" />
                View Document
            </a>
        </div>
    )
}

export default CardPostsSubject