import { useRef } from "react";

const Carousel = () => {
    const imageUrls = [
        "https://placehold.co/600x400/orange/white",
        "https://placehold.co/600x400/blue/white",
        "https://placehold.co/600x400/red/white",
        "https://placehold.co/900x400/pink/white" 
    ]; {/* Last image can be resized to fit the container */}
    
    const carouselRef = useRef();
    const totalWidth = 600 * imageUrls.length;

    const imagePickHandler = (index) => {
        if (carouselRef.current) {
            // scrollTo can take object as parameter. 
            carouselRef.current.scrollTo({
                left: index * 600,
                behavior: 'smooth'
            });
        }
    }

    return (
        <div className="max-w-[600px] mx-auto px-4">
            <h1 className="text-2xl font-bold mb-4">Carousel Widget</h1>
            
            {/* Carousel Container */}
            <div className="relative w-[600px]"> {/* Added relative positioning for the blow absolute positioin */}
                <div 
                    ref={carouselRef} 
                    className="w-[600px] h-[400px] overflow-x-hidden"
                >
                    <ul 
                        style={{ width: `${totalWidth}px` }}
                        className="flex h-[400px] shrink-0"
                    >
                        {imageUrls.map((url, index) => (
                            <li key={index} className="w-[600px] shrink-0">
                                <img 
                                    src={url}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full object-cover"
                                /> {/* object-cover helps resize the image to fit the container */}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Navigation Dots - Now overlaid */}
                <div className="absolute bottom-0 left-0 right-0 bg-gray-800/50"> {/* Added background */}
                    <ul className="flex justify-center gap-3">
                        {imageUrls.map((_, index) => (
                            <li key={index}> {/* onClick needs to pass arrow function to avoid immediate excuation */}
                                <button 
                                    className="w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
                                    onClick={() => imagePickHandler(index)} 
                                    aria-label={`Go to slide ${index + 1}`}
                                /> 
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
