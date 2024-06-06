import React from 'react'

const Navbar = () => {
  return (
    <div className='main px-4 bg-[#0b4ba5] py-4 shadow-md flex justify-center'>
            {/* main content  */}
            <div className="">
                {/* react image  */}
                <div className="flex justify-center mb-2">
                    <img className='w-28' src="https://www.devknus.com/img/react.png"
                        alt="img" />
                </div>
                {/* heading  */}
                <div className="heading">
                    <span className='text-2xl text-white font-bold'>React QR Code Generator</span>
                </div>
            </div>
        </div>
  )
}

export default Navbar
