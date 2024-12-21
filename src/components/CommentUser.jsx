import React from 'react'

function CommentUser() {
    return (
        <div>
            <div className='w-[1000px] p-4 bg-[#ffffff69] rounded-[30px] shadow-md'>
                <div className='  flex flex-row'>
                    <div className=''>
                        <div className='w-[80px] h-[80px] rounded-full border border-black'>
                            <img src="" alt="" />
                        </div>
                    </div>
                    <div className='pl-4 '>
                        <h1 className='text-[35px] font-semibold text-gray-800'>Luis Ibañez</h1>
                        {/* <small className='text-muted-foreground '>20-12-2024 | 13:31</small> */}
                        <div className="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <time > 20-12-2024 | 13:31 </time>
                        </div>
                    </div>
                </div>
                <p className='text-[18px] font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quia voluptas reiciendis suscipit nam quae incidunt qui,
                    tenetur ea iure ut perferendis accusantium libero modi. Numquam vitae fugit excepturi earum.</p>
            </div>
        </div>
    )
}

export default CommentUser