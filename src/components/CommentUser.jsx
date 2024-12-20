import React from 'react'

function CommentUser() {
    return (
        <div>
            <div className='w-[1000px] p-2 flex flex-row border border-black'>
                <div className='border border-black'>
                    <div className='w-[150px] h-[150px] rounded-full border border-black'>
                        <img src="" alt="" />
                    </div>
                </div>
                <div className='pl-4 border border-black'>
                    <h1 className='text-[35px]'>Luis Ibañez</h1>
                    <small>20-12-2024 | 13:31</small>
                </div>
            </div>
        </div>
    )
}

export default CommentUser