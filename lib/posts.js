
import got from "got";

const WORDPRESS_API =
  "https://dev-assignment11-wordpress.pantheonsite.io/wp-json/twentytwentyfive-child/v1/latest-posts/1";

async function getWordPressPosts() {
  const posts = await got(WORDPRESS_API).json();
  return posts;
}

export async function getSortedPostsData() {
  const posts = await getWordPressPosts();

  return posts
    .map((post) => ({
      id: String(post.ID),
      title: post.post_title,
      date: post.post_date,
      content: post.post_content,
      excerpt: post.post_excerpt,
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export async function getAllPostIds() {
  const posts = await getWordPressPosts();

  return posts.map((post) => ({
    params: {
      id: String(post.ID),
    },
  }));
}

export async function getPostData(id) {
  const posts = await getWordPressPosts();

  const post = posts.find(
    (post) => String(post.ID) === String(id)
  );

  if (!post) {
    throw new Error(`Post ${id} not found`);
  }

  return {
    id: String(post.ID),
    title: post.post_title,
    date: post.post_date,
    contentHtml: post.post_content,
    excerpt: post.post_excerpt,
  };
}
