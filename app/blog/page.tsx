import clientPromise from "../../lib/mongodb";

export default async function BlogPage() {
  const client = await clientPromise;
  const db = client.db("nextblog");
  const posts = await db.collection("posts").find({}).toArray();

  return (
    <div style={{ padding: 20 }}>
      <h1>Blog</h1>

      <ul>
        {posts.map((post: any) => (
          <li key={post.slug}>
            <a href={`/blog/${post.slug}`}>{post.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}



