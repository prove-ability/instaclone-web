import styled from "styled-components";
import { Link } from "react-router-dom";

import { BaseBox } from "../shared";
import routes from "../../routes";

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${({ theme }) => theme.accent};
  }
`;

interface BottomBoxProps {
  cta: string;
  link: typeof routes[keyof typeof routes];
  linkText: string;
}

const BottomBox: React.FC<BottomBoxProps> = ({ cta, link, linkText }) => {
  return (
    <SBottomBox>
      <span>{cta}</span>
      <Link to={link}>{linkText}</Link>
    </SBottomBox>
  );
};

export default BottomBox;
