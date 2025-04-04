"use client"; 
//indicates that this component will use client-side rendering
import React, { Fragment } from "react";
// React is imported to create the component. 
// Fragment is used to group multiple elements 
// without adding extra nodes to the DOM.
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavBar from "./NavBar";


const images = ["/img3.jpg", "/img4.jpg", "/img2.jpg"];

export default function Home() {
  const router = useRouter();

  return (
    <Fragment>
      <div className="min-h-screen bg-gradient-to-br from-blue-300 to-indigo-500">
        <NavBar/>
        <div className="flex items-center justify-center h-[90vh] mt-20">
          <div className="bg-white shadow-xl rounded-2xl p-6 max-w-lg mb-20 text-center transform transition-all duration-500 hover:scale-105">
            <Carousel
              autoPlay
              infiniteLoop
              showThumbs={false}
              showStatus={false}
              className="rounded-lg overflow-hidden"
            >
              {images.map((src, index) => (
                <div key={index}>
                  <Image src={src} alt={`Slide ${index + 1}`} width={500} height={300} priority />
                </div>
              ))}
            </Carousel>

            <h1 className="text-2xl font-bold text-blue-800 mt-4">Welcome to MedBro</h1>
            <p className="text-gray-600 mt-2 text-md">Your trusted medical recommendation assistant.</p>

            <button
              className="mt-4 px-5 py-2 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-800 transition"
              onClick={() => router.push("/workplace")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
