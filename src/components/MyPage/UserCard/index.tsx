import React from 'react';
import Avatar from 'atoms/Avatar';
import styled from '@emotion/styled';

interface Props {
  userName: string;
  userEmail: string;
  userImgUrl?: string;
}

const UserCard = ({ userName, userEmail, userImgUrl }: Props) => {
  return (
    <Container>
      <Avatar imgUrl={userImgUrl} size="normal" />
      <Name>{userName}</Name>
      <Email>{userEmail}</Email>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  @media only screen and (max-width: 5s00px) {
    height: 150px;
    border-radius: 0;
  }
`;

const Name = styled.span`
  margin: 20px 0 10px 0;
  font-size: 1.2rem;
`;

const Email = styled.span`
  color: #aeaeae;
  fotn-size: 0.3rem;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  display: inline-block;
`;

export default UserCard;
