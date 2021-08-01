import styled from "styled-components";

interface AvatarProps {
  url?: string;
  lg?: boolean;
}
const Img = styled.img`
  max-width: 100%;
`;

const Avatar: React.FC<AvatarProps> = ({ url = "", lg = false }) => {
  return <SAvatar lg={lg}>{url !== "" ? <Img src={url} /> : null}</SAvatar>;
};

const SAvatar = styled.div<{ lg: boolean }>`
  width: ${({ lg }) => (lg ? "30px" : "25px")};
  height: ${({ lg }) => (lg ? "30px" : "25px")};
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

export default Avatar;
