import { useParams, useNavigate } from "react-router";
import Navbar from "@/composant/Navbar";
import Footer from "@/composant/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

function Actu_info() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="p-8 md:p-16 lg:p-24">
        <Button onClick={() => navigate(-1)} className="m-4 cursor-pointer">
          <ArrowLeft /> Retour aux actualités
        </Button>
      </div>

      <Footer />
    </>
  );
}

export default Actu_info;
