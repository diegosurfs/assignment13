
import got from "got";

const WORDPRESS_API =
  "https://dev-assignment11-wordpress.pantheonsite.io/wp-json/wp/v2/restaurant";

async function getWordPressPosts() {
  const posts = await got(WORDPRESS_API).json();
  return posts;
}

export async function getSortedPostsData() {
  const posts = await getWordPressPosts();

  return posts
    .map((post) => ({
      id: String(post.id),
      title: post.title.rendered,
      date: post.date,
      content: post.content.rendered,
      excerpt: post.excerpt?.rendered || "",
      cuisine: post.acf?.cuisine || "",
      location: post.acf?.location || "",
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getAllPostIds() {
  const posts = await getWordPressPosts();

  return posts.map((post) => ({
    params: {
      id: String(post.id),
    },
  }));
}

export async function getPostData(id) {
  const posts = await getWordPressPosts();

  const post = posts.find(
    (post) => String(post.id) === String(id)
  );

  if (!post) {
    throw new Error(`Post ${id} not found`);
  }

  return {
    id: String(post.id),
    title: post.title.rendered,
    date: post.date,
    contentHtml: post.content.rendered,
    excerpt: post.excerpt?.rendered || "",
    cuisine: post.acf?.cuisine || "",
    location: post.acf?.location || "",
  };
}
