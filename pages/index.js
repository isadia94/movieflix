import Head from "next/head";
import Card from "../components/Card";
import DeskNav from "../components/DeskNav";
import Header from "../components/Header";
import MobNav from "../components/MobNav";
import SearchMobile from "../components/SearchMobile";
import { connectToDatabase } from "../lib/mongodb";

export default function Home({ movies }) {
  // const trending = titles.filter((item) => item.row == "trending");
  // const newMovies = titles.filter((item) => item.row == "new");

  const newMovies = movies;

  return (
    <div>
      <Head>
        <title>MovieFlix</title>
        <meta name="description" content="movie app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="px-8 pb-5">
        <Header />
        <SearchMobile />
        <MobNav />

        <div className="flex hideScrollbar overflow-x-auto">
          <DeskNav />
          <main className="flex flex-col space-y-9">
            <Card items={newMovies} header="Discover New" />
            <Card items={newMovies} header="Trending" />
            <Card items={newMovies} header="Favorites" />
          </main>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const { db } = await connectToDatabase();

  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  return {
    props: {
      movies: JSON.parse(JSON.stringify(movies)),
    },
  };
}
