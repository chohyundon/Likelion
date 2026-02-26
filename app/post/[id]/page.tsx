import PostScreen from "../../components/post/PostScreen";

type Props = { params: Promise<{ id: string }> };

export default async function PostByIdPage({ params }: Props) {
  const { id } = await params;
  return <PostScreen postId={id} />;
}
