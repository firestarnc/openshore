import Header from "@/components/header";
import PortfolioGrid from "@/components/portfolio-grid";
import CtaFooter from "@/components/footer";

export default function PortfolioPage() {
  return (
    <main className="bg-white min-h-screen text-black">
      {/* We pass a prop or context here normally, 
         but our Header detects the active path automatically 
      */}
      <Header />
      
      <PortfolioGrid />
      
      <CtaFooter />
    </main>
  );
}