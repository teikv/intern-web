import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 md:px-12 py-12 bg-white">
      {/* Left Side - Text Content */}
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold text-black mb-4">
          Bringing the benefits of <span className="text-blue-600">AI</span> to everyone
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          We research and develop the fields of Artificial Intelligence: Natural Language, Computer Vision, Machine Learning, Big Data Analysis
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
          Explore
        </button>
      </div>

      {/* Right Side - Image */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <Image 
          src="/login-image.png" 
          alt="AI Illustration" 
          width={500} 
          height={500} 
          className="rounded-lg shadow-lg"
        />
      </div>
    </section>
  );
};

export default HeroSection;