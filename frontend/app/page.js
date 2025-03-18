import Head from "next/head";
import NewsList from "../components/NewsList";
import HeroSection from "../components/HeroSection";
import FeaturedImage from "../components/FeaturedImage";

export default function Home() {
    return (
        <>
            <Head>
                <title>Hekate | AI News</title>
                <meta name="description" content="Cập nhật tin tức về AI mới nhất" />
            </Head>
            <main className="bg-white min-h-screen">
                <HeroSection />
                <FeaturedImage />
                <NewsList />
            </main>
        </>
    );
}
