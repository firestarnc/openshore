import type { Metadata } from "next";
import RentCameraClient from "./RentCameraClient";

export const metadata: Metadata = {
  title: "Premium Camera and Lens Rentals in Benin City | Open Shore Studios",
  description:
    "Rent premium Sony and Canon cameras, pro lenses, drones, and creator gear at Open Shore Studios in Benin City. Explore combo deals and website launch discounts.",
  keywords: [
    "camera rental in Benin City",
    "lens rental in Benin City",
    "Sony camera rental in Benin City",
    "Canon G7x rental in Benin City",
    "drone rental in Benin City",
    "gear rental Open Shore Studios",
    "camera combo deals in Benin City",
    "equipment rental Benin City",
    "creator gear rental",
    "filmmaker equipment rental",
    "content creation gear Benin City",
  ],
  openGraph: {
    title: "Premium Camera and Lens Rentals in Benin City",
    description: "Rent premium Sony and Canon cameras, pro lenses, drones, and creator gear at Open Shore Studios in Benin City.",
    url: "https://openshorestudios.com/rent-camera",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Premium Camera and Lens Rentals in Benin City",
    description: "Rent premium Sony and Canon cameras, pro lenses, and creator gear at Open Shore Studios.",
  },
  alternates: {
    canonical: "https://openshorestudios.com/rent-camera",
  },
};

export default function RentCameraPage() {
  return <RentCameraClient />;
}
