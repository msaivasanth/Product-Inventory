import React from 'react'
import { ProgressBar } from 'react-loader-spinner'

const Loader = () => {
    return (
        <div>
            <div className='center'>
                <ProgressBar
                visible={true}
                height="80"
                width="80"
                barColor="#4fa94d"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass=""
                />
            </div>
        </div>
    )
}

export default Loader
