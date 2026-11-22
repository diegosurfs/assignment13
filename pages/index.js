
import Head from "next/head";
import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";
import styles from "../styles/Home.module.css";

export default function Home({ allPostsData }) {
  return (
    <div>
      <Head>
        <title>Santa Rosa Restaurant Directory</title>
        <meta
          name="description"
          content="Explore restaurants and their cuisine and locations."
        />
      </Head>

      <main className={styles.container}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>RESTAURANT DIRECTORY</p>
          <h1>Local Restaurants</h1>
          <p className={styles.description}>
            Discover restaurants, cuisines, and locations.
          </p>
        </section>

        <section className={styles.about}>
          <h2>Our Restaurants</h2>

          <ul>
            {allPostsData.map(
              ({ id, title, date, cuisine, location }) => (
                <li key={id}>
                  <h3>
                    <Link href={`/posts/${id}`}>{title}</Link>
                  </h3>
                  <p>Cuisine: {cuisine}</p>
                  <p>Location: {location}</p>
                  <small>{date}</small>
                </li>
              )
            )}
          </ul>
        </section>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();

  return {
    props: {
      allPostsData,
    },
  };
}
