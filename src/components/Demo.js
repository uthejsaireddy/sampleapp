import React from 'react'

function Demo() {
    return (
        <div>
            <header>Login</header>
            <div className='col-md-12'>
                <div className='col-md-6'>
                    <label>User Name :</label>
                    <input type="text" />
                </div>
                <div className='col-md-6'>
                <label>Password :</label>
                    <input type="text" />
                </div>
                <div className='col-md-6'>
                    <button>Submit</button>

                </div>
            </div>
        </div>
    )
}

export default Demo