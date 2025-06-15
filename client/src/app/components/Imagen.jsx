// components/Imagen.js
import Image from "next/image";

const Imagen = ({ src, alt = "Imagen", title, width = 1920, height = 1080 }) => {
  return (
    <div className="text-center">
      <div className="rounded-xl overflow-hidden shadow-md group">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="object-cover w-full h-auto transition-transform duration-[1500ms] group-hover:scale-105"
        />
      </div>
      {title && <h2 className="mt-2 font-semibold">{title}</h2>}
    </div>
  );
};

export default Imagen;
