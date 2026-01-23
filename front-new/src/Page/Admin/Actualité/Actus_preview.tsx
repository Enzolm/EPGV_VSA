import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Article } from "@/hooks/useArticle";
import ReadOnlyEditor from "@/lib/read-onlyeditor";
import { ArrowLeft, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function Actus_preview({
  open,
  onClose,
  article,
}: {
  open: boolean;
  onClose: () => void;
  article: Article;
}) {
  const navigate = useNavigate();
  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-250! max-h-[90vh] overflow-y-auto ">
          <div className="">
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
              <p className="text-base font-normal opacity-60">
                Publié le{" "}
                {article &&
                  new Date(article.publication_date).toLocaleDateString(
                    "fr-FR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
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
        </DialogContent>
      </Dialog>
    </>
  );
}
export default Actus_preview;
