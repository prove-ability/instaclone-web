import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as SolidHeart } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import { gql, useMutation } from "@apollo/client";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import Comments from "./Comments";

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

interface PhotoProps extends Omit<seeFeed_seeFeed, "__typename"> {}

const Photo: React.FC<PhotoProps> = ({
  id,
  user,
  file,
  isLiked,
  likes,
  caption,
  commentNumber,
  comments,
}) => {
  const [toggleLikeMutation] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
      update: (cache, { data }) => {
        const {
          toggleLike: { ok },
        } = data!;
        if (!ok) {
          return;
        }
        const fragmentId = `Photo:${id}`;
        const fragment = gql`
          fragment BSName on Photo {
            isLiked
            likes
          }
        `;
        const result = cache.readFragment<{
          isLiked: boolean;
          likes: number;
        }>({
          id: fragmentId,
          fragment,
        });
        if (result && "isLiked" in result && "likes" in result) {
          const { isLiked: cacheIsLiked, likes: cacheLikes } = result;
          cache.writeFragment({
            id: fragmentId,
            fragment,
            data: {
              isLiked: !cacheIsLiked,
              likes: cacheIsLiked ? cacheLikes - 1 : cacheLikes + 1,
            },
          });
        }
      },
    }
  );

  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Avatar lg url={user?.avatar!} />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                style={{ color: isLiked ? "tomato" : "inherit" }}
                icon={isLiked ? SolidHeart : faHeart}
              />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? "1 like" : `${likes} likes`}</Likes>
        <Comments
          author={user.username}
          caption={caption}
          commentNumber={commentNumber}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.img`
  max-width: 100%;
`;
const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;
const PhotoAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

export default Photo;
