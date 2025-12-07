"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  { name: "Arman", role: "Content Creator", text: "TaskHub changed how I write!", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=john" },
  { name: "Neeraj", role: "Marketer", text: "Incredible tool for alignment.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane" },
  { name: "Asif", role: "Writer", text: "Fast and accurate suggestions.", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex" },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white" aria-label="User testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <article key={index}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
              >
                <Image src={testimonial.img} alt={`Avatar of ${testimonial.name}`} width={80} height={80} className="rounded-full mx-auto mb-4" unoptimized />
                <blockquote className="mb-4 text-gray-700 italic">&ldquo;{testimonial.text}&rdquo;</blockquote>
                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-gray-600 text-sm">{testimonial.role}</p>
              </motion.div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}