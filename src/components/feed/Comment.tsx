import sanitizeHtml from "sanitize-html";
import styled from "styled-components";
import { FatText } from "../shared";

const CommentContainer = styled.div``;
const CommentCaption = styled.span`
  margin-left: 20px;
  mark {
    background-color: inherit;
    color: ${({ theme }) => theme.accent};
    cursor: pointer;
  }
`;

interface CommentProps {
  author: string;
  payload: string | null;
}

function Comment({ author, payload }: CommentProps) {
  if (!payload) {
    return null;
  }
  const cleanedPayload = sanitizeHtml(
    payload.replace(/#[\w]+/g, "<mark>$&</mark>"),
    {
      allowedTags: ["mark"],
    }
  );
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanedPayload,
        }}
      />
    </CommentContainer>
  );
}

export default Comment;
