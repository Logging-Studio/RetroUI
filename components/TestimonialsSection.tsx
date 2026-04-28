import { Text } from "@/components/base-retroui";
import Image from "next/image";
import { testimonials } from "@/config/data";

export function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 py-28 space-y-14">
      <div className="text-center">
        <Text as="h2" className="uppercase text-4xl lg:text-5xl">
          <span className="relative text-outline-foreground text-shadow-foreground">
            <Image src="/decor/heart.svg" alt="components decoration" width={60} height={60} className="absolute h-[60px] w-[60px] -left-10 -top-4" />
            Loved
          </span>
          {" "}by devs, designers
          <br />
          & creators
        </Text>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.name} className="relative">
            {/* <div className="absolute bg-primary top-1 left-1 -bottom-1 -right-1 border-2 border-border"></div> */}
            <div
              className="bg-white p-4 border-2 relative"
            >
              <Image src="https://pub-5f7cbdfd9ffa4c838e386788f395f0c4.r2.dev/icons/quote.svg" alt="quote" width={48} height={48} className="w-12 h-12 mb-2" />

              <Text className="mb-6 leading-relaxed">{testimonial.quote}</Text>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 border-2 border-black rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-black">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground font-medium">{testimonial.position}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
