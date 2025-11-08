import clientPromise from "@/lib/mongodb";
type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  console.log("Slug received:", slug);

  const client = await clientPromise;
  const db = client.db("nextblog");
  const post = await db.collection("posts").findOne({ slug });

  console.log("Post found:", post);

  if (!post) {
    return (
      <div style={{ padding: 20 }}>
        <h1>Post not found</h1>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
