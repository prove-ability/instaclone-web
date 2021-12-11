import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Infer, object, string } from "superstruct";
import { gql, useMutation } from "@apollo/client";
import { superstructResolver } from "@hookform/resolvers/superstruct";

import Comment from "./Comment";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import {
  createMutation,
  createMutationVariables,
} from "../../__generated__/createMutation";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      error
    }
  }
`;

const CommentsContainer = styled.div`
  margin-top: 20px;
`;

const CommentCount = styled.span`
  opacity: 0.7;
  margin: 10px 0px;
  display: block;
  font-weight: 600;
  font-size: 10px;
`;

const schema = object({
  payload: string(),
});

type SchemaType = Infer<typeof schema>;

interface CommentsProps
  extends Pick<seeFeed_seeFeed, "caption" | "commentNumber" | "comments"> {
  photoId: number;
  author: string;
}

function Comments({
  photoId,
  author,
  caption,
  commentNumber,
  comments,
}: CommentsProps) {
  const [createCommnetMutation, { loading }] = useMutation<
    createMutation,
    createMutationVariables
  >(CREATE_COMMENT_MUTATION, {
    onCompleted: (data) => {
      const { ok } = data;
    },
  });
  const { register, handleSubmit, reset } = useForm<SchemaType>({
    resolver: superstructResolver(schema),
  });
  const onValid = (data: SchemaType) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommnetMutation({ variables: { photoId, payload } });
  };
  return (
    <CommentsContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>
        {commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}
      </CommentCount>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
      <div>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            {...register("payload")}
            type="text"
            placeholder="Write a commnt..."
          />
        </form>
      </div>
    </CommentsContainer>
  );
}

export default Comments;
