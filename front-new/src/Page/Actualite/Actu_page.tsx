import { useEffect, useState } from "react";
import Footer from "@/composant/Footer";
import Navbar from "@/composant/Navbar";
import { useNavigate, useParams } from "react-router";

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
  const { pagination } = useParams<{ pagination: string }>();
  const [isTousActive, setIsTousActive] = useState(true);
  const [filtre, setFiltre] = useState([""]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allItems = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    type: "Actualité",
    title: `Titre ${i + 1}`,
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi amet libero accusamus, aliquam dolorum ex?",
    date: "25 octobre 2025",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuATv7b8jdbCvHGkz1XdD4cTX3_n3-2tpyIsmaGa6CDCxfVqm-iTkbbmJuTLRU7G9Kayg8xqHINgiTMiz_oGcbD9tTRQCMOtCI-DvTtAj8sMugMihQxwdEh653mRmFq4ocJiuAsd_BoPJlMJ4P0dU-RlHdpBxKMFoT1i5_L_7MeEVndeZA9b-ZveAC6JwBf4P_GbbTE0HJvhn6RjDPL2H5hlgsWp2dkGs7nqLhO-OdTkMHB66vK6WEajmGVUA8c99ldoQp_OhKWFasg",
  }));

  const totalPages = Math.ceil(allItems.length / itemsPerPage);

  useEffect(() => {
    const pageFromUrl = pagination ? parseInt(pagination) : 1;
    if (pageFromUrl >= 1 && pageFromUrl <= totalPages) {
      setCurrentPage(pageFromUrl);
    } else {
      // Si la page n'est pas valide, rediriger vers la page 1
      navigate("/news/1", { replace: true });
    }
  }, [pagination, navigate, totalPages]);

  const handlePageChange = (page: number) => {
    navigate(`/news/${page}`);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = allItems.slice(startIndex, endIndex);

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
              placeholder="Rechercher un article"
              className="peer pl-9 w-[341.5px]"
            />
          </div>
        </div>
        <section className="flex flex-wrap justify-center gap-12 p-4 mt-6">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col rounded-xl overflow-hidden shadow-sm bg-card-light dark:bg-card-dark border border-card-border-light dark:border-card-border-dark max-w-sm max-h-[600px] hover:shadow-md transition-shadow duration-300 ease-in-out cursor-pointer "
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-48 object-cover"
              />
              <p className="text-sm font-normal text-primary pl-4 mt-2">
                {item.type}
              </p>
              <p className="text-lg font-bold tracking-[-0.015em] pl-4 mt-3 mb-3 line-clamp-1">
                {item.title}
              </p>
              <p className="text-base font-normal opacity-80 pl-4 pr-4 line-clamp-4">
                {item.description}
              </p>
              <div className="flex items-center justify-between gap-3 mt-4 pl-4 pr-4 pb-4">
                <p className="text-sm font-normal opacity-60">
                  publié le {item.date}
                </p>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-9 px-4 bg-primary text-text-light text-sm font-bold hover:bg-opacity-80 transition-colors"
                  onClick={() => navigate(`/news/info/${item.id}`)}
                >
                  Lire la suite
                </button>
              </div>
            </div>
          ))}
        </section>
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => handlePageChange(page)}
                  isActive={currentPage === page}
                  className="cursor-pointer"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

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
      </section>
      <Footer />
    </>
  );
}

export default Actu_page;
