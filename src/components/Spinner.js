import React from 'react'
import loading from './loading.gif'

const Spinner=()=>  {

    return (
      <div className='text-center'>
        <img src={loading}  style={{height:'20px', marginBottom:'15px'}}alt="" />
      </div>
    )
  
}
export default Spinner