import Navbar from "../composant/Navbar";
import FavoriteIcon from "@mui/icons-material/Favorite";

function Home() {
  return (
    <>
      <Navbar />
      <section className="px-4 sm:px-10 py-10 md:py-20">
        <div className="@container">
          <div className="@[480px]:p-0">
            <div
              className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 rounded-xl items-center justify-center p-4 text-center"
              data-alt="A group of people smiling during an outdoor gym session in a village setting"
              style={{
                backgroundImage: `linear-gradient(rgba(16, 34, 22, 0.4) 0%, rgba(16, 34, 22, 0.7) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-98_UNq_dpKBgV6m80l3Mqwf9E5nMpvveIbJKE8ATLcDAKDQGJUwYdztbL639XraqxRcrRUy9foX1fvMkuwffBgmW_0WrL1SuK9RCVJc3ip4gvPSUUmXUpOkDADJ9VagzJ1MIdydvw2nEI47eV9CuoV-_rIQh0Rk6xz2mRTlJ6HtYd1SZ21HNYNDYk5qEgXjytgDbjJPjiY-n0naUcnrQ45XBp29UxYeZ0jFAVP7GBxTvOVy-eBTUnUod3Pu0fmpP82-GPvkvx4o")`,
              }}
            >
              <div className="flex flex-col gap-2 max-w-3xl">
                <h1 className="text-white  font-black leading-tight tracking-[-0.033em] text-4xl md:text-5xl @[480px]:text-6xl">
                  Le Sport Santé, pour une vie plus active, plus sereine, plus
                  heureuse
                </h1>
                <h2 className="text-gray-200 text-sm font-normal leading-normal md:text-sm @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                  Rejoignez l'association de Gymnastique Volontaire de
                  Villeneuve Sur Auvers (91).
                </h2>
              </div>
              <button className="mt-6 bg-white text-black rounded-lg p-2 cursor-pointer hover:bg-white/80">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-10 py-10 md:py-20">
        <h1 className="text-4xl font-extrabold">Nos valeurs</h1>
        <p className="text-green-900/90">
          Plus qu’un sport, une pratique ouverte à tous, où chacun progresse à
          son propre rythme
        </p>
        <div>
          <div className="bg-gray-50 w-2xs border-2 border-green-600/70 rounded-lg p-4 mt-6 flex flex-col gap-4">
            <FavoriteIcon sx={{ fontSize: 40, color: "green" }} />
            <h2 className="text-2xl font-semibold">Bien-être</h2>
            <p className="text-green-900/90">
              Parce que chaque séance vise à améliorer la santé, réduire le
              stress et favoriser une meilleure qualité de vie.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
