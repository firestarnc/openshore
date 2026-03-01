import Header from '@/components/header';
import Hero from '@/components/hero';
import Services from "@/components/services";
import FeaturedWork from "@/components/featured-work";
import Footer from '@/components/footer';


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <FeaturedWork />
      <Footer />
    </main>
  );
}