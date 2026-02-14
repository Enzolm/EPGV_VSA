import { useEffect, useState } from "react";
import Footer from "@/composant/Footer";
import Navbar from "@/composant/Navbar";
import { useNavigate, useParams } from "react-router";
import { useAllArticles } from "@/hooks/useArticle";
import { Skeleton } from "@/components/ui/skeleton";
import { Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Toggle } from "@/components/ui/toggle";

function Actu_page() {
  const navigate = useNavigate();
  const { articles, loading, error } = useAllArticles();
  const { pagination } = useParams<{ pagination: string }>();
  const [isTousActive, setIsTousActive] = useState(true);
  const [filtre, setFiltre] = useState([""]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const publicationsList = articles || [];
  const totalPages = Math.ceil(publicationsList.length / itemsPerPage);

  useEffect(() => {
    const pageFromUrl = pagination ? parseInt(pagination) : 1;
    if (pageFromUrl >= 1 && pageFromUrl <= totalPages) {
      setCurrentPage(pageFromUrl);
    } else {
      navigate("/news/1", { replace: true });
    }
  }, [pagination, navigate, totalPages]);

  const handlePageChange = (page: number) => {
    navigate(`/news/${page}`);
  };

  const filteredArticles = publicationsList.filter((article) => {
    const matchesType =
      (filtre.includes("Actualites") && article.type === "actualite") ||
      (filtre.includes("italic") && article.type === "evenement") ||
      (filtre.includes("strikethrough") && article.type === "annonce") ||
      (filtre.includes("strikethrough") &&
        article.type === "annonce_importante") ||
      isTousActive;
    const matchesSearch =
      article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  function stripHtml(html: string): string {
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredArticles.slice(startIndex, endIndex);

  useEffect(() => {
    if (filtre.length > 1) {
      setIsTousActive(false);
    }
  }, [filtre]);

  return (
    <>
      <Navbar />
      <section className="px-4 sm:px-15 py-10 md:py-20">
        <h1 className="text-4xl font-extrabold">La vie du club</h1>
        <div className="flex md:flex-row flex-col justify-between  align-middle items-center gap-4 mt-8">
          <div className="flex align-middle items-center gap-4">
            <Toggle
              size="lg"
              className="data-[state=on]:bg-green-900 data-[state=on]:text-gray-100 transition-colors duration-300 ease-in-out"
              onPressedChange={(pressed) => {
                setIsTousActive(pressed);
                setFiltre([""]);
              }}
              pressed={isTousActive}
            >
              Tous
            </Toggle>
            <ToggleGroup
              type="multiple"
              size="lg"
              value={filtre}
              onValueChange={setFiltre}
            >
              <ToggleGroupItem
                value="Actualites"
                aria-label="Toggle bold"
                className="data-[state=on]:bg-green-900 data-[state=on]:text-gray-100 transition-colors duration-300 ease-in-out"
              >
                Actualités
              </ToggleGroupItem>
              <ToggleGroupItem
                value="italic"
                aria-label="Toggle italic"
                className="data-[state=on]:bg-green-900 data-[state=on]:text-gray-100 transition-colors duration-300 ease-in-out"
              >
                Evnènements
              </ToggleGroupItem>
              <ToggleGroupItem
                value="strikethrough"
                aria-label="Toggle strikethrough"
                className="data-[state=on]:bg-green-900 data-[state=on]:text-gray-100 transition-colors duration-300 ease-in-out"
              >
                Annonces
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <div className="relative">
            <div className="text-muted-foreground pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-3 peer-disabled:opacity-50 ">
              <Search className="size-4" />
              <span className="sr-only">User</span>
            </div>
            <Input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher un article"
              className="peer pl-9 w-[341.5px]"
            />
          </div>
        </div>
        <section className="flex flex-wrap justify-center gap-12 p-4 mt-6">
          {loading &&
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <div key={index} className="w-md h-91.5 p-2 animate-pulse">
                <Skeleton className="h-48 w-full mb-2" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6 mb-4" />
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-2/6" />
                  <Skeleton className="h-9 w-20 mt-2" />
                </div>
              </div>
            ))}

          {!loading &&
            filteredArticles.map((item) => (
              <div
                key={item.id_publication}
                className={`w-md flex flex-col rounded-xl overflow-hidden shadow-sm bg-card-light dark:bg-card-dark border border-card-border-light dark:border-card-border-dark max-w-sm max-h-150 hover:shadow-md transition-shadow duration-300 ease-in-out ${item.type === "annonce_importante" ? "border-yellow-500 border-2" : ""}`}
              >
                <img
                  src={`${import.meta.env.VITE_URL_UPLOAD}/${item.img}`}
                  alt={item.titre}
                  className="w-full h-48 object-cover"
                />
                <div className="flex gap-2 mt-3 pl-4">
                  {item.type === "annonce_importante" && (
                    <Megaphone className="text-yellow-500" />
                  )}
                  <p
                    className={`text-sm font-normal ${item.type === "annonce_importante" ? "text-yellow-500" : "text-primary"}`}
                  >
                    {item?.type === "actualite"
                      ? "Actualité"
                      : item?.type === "evenement"
                        ? "Événement"
                        : item?.type === "annonce"
                          ? "Annonce"
                          : item?.type === "annonce_importante"
                            ? "Annonce importante"
                            : ""}
                  </p>
                </div>
                <p className="text-lg font-bold tracking-[-0.015em] pl-4 mt-3 mb-3 line-clamp-1">
                  {item.titre}
                </p>
                <p className="text-base font-normal opacity-80 pl-4 pr-4 line-clamp-4 h-24">
                  {stripHtml(item.description)}
                </p>
                <div className="flex items-center justify-between gap-3 mt-4 pl-4 pr-4 pb-4">
                  <p className="text-sm font-light opacity-60">
                    publié le{" "}
                    {new Date(item.publication_date).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>
                  <button
                    className="flex min-w-21 max-w-120 cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-text-light text-sm font-bold hover:bg-opacity-80 transition-colors"
                    onClick={() =>
                      navigate(`/news/info/${item.id_publication}`)
                    }
                  >
                    Lire la suite
                  </button>
                </div>
              </div>
            ))}
        </section>
        {filteredArticles.length === 0 && (
          <p className="mt-8 text-center text-muted-foreground">
            Aucune publication trouvée.
          </p>
        )}
        {!loading && filteredArticles.length > 0 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => handlePageChange(page)}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(currentPage + 1, totalPages))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>
      <Footer />
    </>
  );
}

export default Actu_page;
