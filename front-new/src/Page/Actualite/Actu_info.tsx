import { useParams, useNavigate } from "react-router";
import Navbar from "@/composant/Navbar";
import Footer from "@/composant/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useArticleById } from "@/hooks/useArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { Megaphone } from "lucide-react";
import ReadOnlyEditor from "@/lib/read-onlyeditor";
import { motion } from "motion/react";

function Actu_info() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { article, loading, error } = useArticleById(id || null);
  window.scrollTo({ top: 0, behavior: "instant" });

  return (
    <div className="bg-background min-h-dvh">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="p-8 md:p-16 lg:p-24"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="cursor-pointer"
          >
            <ArrowLeft /> Retour aux actualités
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex gap-2 mt-3 pl-4"
        >
          {article?.type === "annonce_importante" && (
            <Megaphone className="text-yellow-500" />
          )}
          <p
            className={`text-sm font-normal ${article?.type === "annonce_importante" ? "text-yellow-500" : "text-foreground"}`}
          >
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
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-foreground text-4xl lg:text-5xl font-black tracking-[-0.033em] mt-4"
        >
          {article?.titre}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
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
          <motion.img
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            src={`${import.meta.env.VITE_URL_UPLOAD}/${article?.img}`}
            alt={article?.titre}
            className="mt-8 w-full h-64 object-cover rounded-lg mb-8 aspect-video"
          />
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="prose prose-lg dark:prose-invert max-w-none text-text-light dark:text-text-dark prose-p:opacity-80 prose-headings:font-bold prose-headings:tracking-[-0.015em] prose-a:text-primary hover:prose-a:underline"
        >
          {article && <ReadOnlyEditor content={article.description} />}
        </motion.article>
      </motion.div>
      <Footer />
    </div>
  );
}

export default Actu_info;
