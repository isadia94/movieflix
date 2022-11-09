import Image from "next/image";

function Card({ items, header }) {
  return (
    <div className="hideScrollbar mt-4 pl-12 relative">
      <div className="flex justify-between items-center w-[100%]">
        <h2 className="font-bold md:text-lg">{header}</h2>
        <p className="text-xs">See all</p>
      </div>
      <div className="flex space-x-3 overflow-x-scroll hideScrollbar ">
        {items?.map(({ title, image, index }) => (
          <div
            className="relative shadow-2xl transition duration-200"
            key={index}
          >
            <div className="relative w-[210px] h-[320px] shadow-2xl overflow-hidden">
              <div className="absolute h-full  bg-black z-10  bg-opacity-30" />
              <Image
                alt="new"
                src={image}
                // width={500}
                // height={500}
                fill
                quality={100}
                object-fit="cover"
              />
            </div>

            {/* <h1 className="absolute bottom-4 left-2 font-extrabold text-white text-lg z-20 md:text-4xl md:max-w-[250px]">
              {title}
            </h1> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Card;
