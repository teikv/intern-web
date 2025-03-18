import Image from "next/image";

const FeaturedImage = () => {
    return (
        <section className="bg-white px-6 py-12 max-w-6xl mx-auto">
            {/* Hình ảnh trên (full width) */}
            <div className="w-full">
                <Image 
                    src="/fi1.png" 
                    alt="Featured Image 1" 
                    width={1200} 
                    height={600} 
                    layout="intrinsic" 
                    className="w-full rounded-lg shadow-lg object-cover"
                />
            </div>

            {/* Hình ảnh dưới (full width, 3 hình vuông) */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[2, 3, 4].map((num) => (
                    <div key={num} className="w-full aspect-[1/1] relative">
                        <Image 
                            src={`/fi${num}.jpg`} 
                            alt={`Featured Image ${num}`} 
                            layout="fill" 
                            objectFit="cover" 
                            className="rounded-lg shadow-lg"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FeaturedImage;
