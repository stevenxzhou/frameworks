import { useRef, useState, useEffect } from "react";

const MeControl = () => {

    const [userSignedIn, setUserSignedIn] = useState(true); 
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const menuRef = useRef();
    const buttonRef = useRef();

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Checking click bubble 
            if (menuRef.current && 
                !menuRef.current.contains(event.target) && 
                !buttonRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        };

        // top -> down capture phase before bubling. 
        document.addEventListener('mousedown', handleClickOutside, true);
        
        // cleanup the listener when componnet unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutsid, true);
        };
    }, []);

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    }
    return (
        <>
            <header className="flex justify-between bg-yellow-500 items-center">
                <div className="flex px-4 items-center">
                    <button className="hover:opacity-50 transition-opacity">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6" // Tailwind classes for size
                            fill="none"
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                            >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                    </button>
                    <img className="mt-1" src="https://placehold.co/220x50/transparent/31343C?font=poppins&text=Open%20Mic%20Night"></img>
                </div>
                <div className="pr-4 flex items-center">
                    {!userSignedIn ? (
                        <span>Sign in</span>
                    ) : 
                    (
                        <button ref={buttonRef} className="rounded-full focus:outline-none focus:ring-2 focus:ring-gray-400 hover:opacity-80 transition-opacity" onClick={() => toggleProfileMenu()}>
                            <img className="rounded-full w-12 h-12 p-1" src="https://media2.dev.to/dynamic/image/width=50,height=50,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Fuser%2Fprofile_image%2F483102%2F6d940290-12d0-4c4a-8be9-1a9fc955d203.jpeg" />
                        </button>
                    )}
                </div>
            </header>
            
            {showProfileMenu && (
                <div ref={menuRef} className="flex justify-end mt-1">
                    <ul className="w-[200px]">
                        <li className="bg-yellow-300 border-b-2 hover:opacity-80 transition-opacity">
                            <button className="w-full h-8">Settings</button>
                        </li>
                        <li className="bg-yellow-300 hover:opacity-80 transition-opacity">
                            <button className="w-full h-8">Log out</button>
                        </li>
                    </ul>
                </div>
            )}
        </>
    )

}

export default MeControl;