import { companyLogos } from "@/data/data";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function WorkWith() {
  return (
    <section className="py-20 mb-[70vh]">
      <div className="container">
        <p className="text-xl font-medium text-center uppercase mb-9">
          Worked with some of the best out there
        </p>

        {/* logo wrapper */}
        <div>
          <Marquee
            autoFill={true}
          >
            {companyLogos.map(logo => (
              <div className="px-9 lg:px-16" key={logo.id}>
                <Image
                  src={logo.icon}
                  alt="logoIcon"
                  width={140}
                  height={39}
                  className="w-full h-auto"
                />
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
