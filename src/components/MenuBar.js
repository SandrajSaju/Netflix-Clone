import React,{useEffect,useState} from 'react'
import "../styles/MenuBar.css"

const MenuBar = () => {

    const [isShown,setIsShown]=useState(false);

    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setIsShown(true);
            }else{
                setIsShown(false);
            }
        });
        return ()=>{
            window.removeEventListener("scroll",null);
        }
    },[])

    return (
        <div className="MenuBar" style={{background: isShown && "black"}}>
            <img 
            src="/images/logo.png"
            alt="Netflix.logo"
            className='MenuBar-logo'
             />

            <img 
            src="/images/avatar.jpeg"
            alt="Netflix Profile img"
            className='MenuBar-avatar'
             />


        </div>
    )
}

export default MenuBar