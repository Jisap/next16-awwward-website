import { workSecItems } from "@/data/data";
import Image from "next/image";

export default function Works() {
  return (
    <section className="section">
      <div className="container">
        {/* Title */}
        <div className="flex flex-wrap items-center justify-between gap-6">
          {/* Text wrapper */}
          <div>
            <h2 className="section-title">selected</h2>
            <h2 className="section-title">Work</h2>
          </div>

          {/* Text wrapper */}
          <div className="sm:text-2xl uppercase font-medium">
            <p>selected</p>
            <p>Works and Projects</p>
          </div>
        </div>

        {/* Wrapper */}
        <div className="space-y-32 lg:space-y-44 mt-24 lg:mt-36">
          {workSecItems.map((item) => (
            <div key={item.id}>
              {/* Content */}
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>

              {/* Image */}
              <div>
                <Image
                  src={item.img}
                  alt={item.title}
                  width={583}
                  height={260}

                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
