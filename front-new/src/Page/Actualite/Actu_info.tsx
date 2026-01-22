import { useParams, useNavigate } from "react-router";
import Navbar from "@/composant/Navbar";
import Footer from "@/composant/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useArticleById } from "@/hooks/useArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { Megaphone } from "lucide-react";
import ReadOnlyEditor from "@/lib/read-onlyeditor";

function Actu_info() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { article, loading, error } = useArticleById(id || null);
  console.log("Article chargé dans Actu_info:", article);

  return (
    <>
      <Navbar />
      <div className="p-8 md:p-16 lg:p-24">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="cursor-pointer"
        >
          <ArrowLeft /> Retour aux actualités
        </Button>
        <div className="flex gap-2 mt-3 pl-4">
          {article?.type === "annonce_importante" && (
            <Megaphone className="text-yellow-500" />
          )}
          <p
            className={`text-sm font-normal ${article?.type === "annonce_importante" ? "text-yellow-500" : "text-primary"}`}
          >
            {" "}
            {article?.type === "actualite"
              ? "Actualité"
              : article?.type === "evenement"
                ? "Événement"
                : article?.type === "annonce"
                  ? "Annonce"
                  : article?.type === "annonce_importante"
                    ? "Annonce importante"
                    : ""}
          </p>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-[-0.033em] mt-4">
          {article?.titre}
        </h1>

        <div className="mt-8">
          {loading ? (
            <Skeleton className="w-full h-64 mb-8 rounded-lg aspect-video" />
          ) : (
            error && <div>Erreur lors du chargement de l'article.</div>
          )}
          <p className="text-base font-normal opacity-60">
            Publié le{" "}
            {article &&
              new Date(article.publication_date).toLocaleDateString("fr-FR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
          </p>
          <img
            src={`${import.meta.env.VITE_URL_UPLOAD}/${article?.img}`}
            alt={article?.titre}
            className="w-full h-64 object-cover rounded-lg mb-8 aspect-video"
          />
        </div>
        <article className="prose prose-lg dark:prose-invert max-w-none text-text-light dark:text-text-dark prose-p:opacity-80 prose-headings:font-bold prose-headings:tracking-[-0.015em] prose-a:text-primary hover:prose-a:underline">
          {article && <ReadOnlyEditor content={article.description} />}
        </article>
      </div>
      <Footer />
    </>
  );
}

export default Actu_info;
