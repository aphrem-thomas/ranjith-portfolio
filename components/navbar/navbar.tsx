function Navbar () {
    return(
        <div className="flex flex-row container h-10 items-center">
            <div className="tradeMark w-52">RM</div>
            <div className="navigation flex flex-row justify-around container">
                <div className="home w-10">Home</div>
                <div className="home w-10">Contact</div>
                <div className="home w-10">Works</div>
            </div>
            
        </div>
    )
}

export default Navbar;