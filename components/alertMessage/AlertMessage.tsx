import { useEffect, useState } from 'react';

function AlertMessage (props:{message:string, type:string, closeAlert:Function}) {
    useEffect(()=>{
        setTimeout(()=>props.closeAlert(),2000)
    },[])
   
    return(
        <>
        <div className={`alertMessage 
        fixed bottom-2 h-10 w-1/2 
        origin-center  text-center rounded-md shadow-md leading-10 text-sm md:text-lg
        ${props.type==='success'? 'bg-secondary':'bg-hazard'}
        ${props.type==='error' && 'text-background'}
        `}>
            {props.message}
        </div>
        </>
    )
}

export default AlertMessage;