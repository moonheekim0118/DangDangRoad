import Head from 'next/head';
import styled from '@emotion/styled';

const PrivacyPolicy = () => {
  return (
    <Container>
      <Head>
        <title>댕댕로드 | 개인정보보호정책</title>
        <meta
          property="og:title"
          content="댕댕로드 개인정보보호정책"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="댕댕로드 개인정보보호정책"
          key="ogdesc"
        />
      </Head>
      <h2>개인정보보호정책</h2>
      <p>
        댕댕로드 이용을 위해 수집한 귀하의 정보를 관리함에 있어서
        「개인정보보호법」에서 규정하고 있는 책임과 의무를 준수하고 <br />{' '}
        제공자가 동의한 내용 외 <strong>다른 목적으로는 활용하지 않음</strong>을
        알려드립니다. <br />
        - 개인정보 수집이용 목적 : 회원가입 및 본인인증, 게시글 작성 <br />
        <strong>- 수집하려는 개인정보 항목</strong>
        <br />
        필수: 이메일, 비밀번호, 닉네임, 프로필 사진(선택) <br />
        - 개인정보 보유 및 이용기간 : 개인정보 및 초상권 수집, 이용목적이 달성된
        후에는 지체 없이 파기합니다. 개인정보 보유 및 이용기간은 회원 탈퇴
        시까지입니다. <br />
        - 이용자는 댕댕로드에가 수집하는 개인정보 제공에 대한 동의를 거부할
        권리가 있습니다. 다만, 댕댕로드 이용에 필요한 필수 항목의 제공에 대한
        동의를 거부하시면 위의 서비스가 제한될 수 있습니다. <br />
      </p>
      <br />
      <br />
      <h2>회원 탈퇴 유의사항</h2>
      <p>
        1. 회원 가입 시 제공된 정보는 모두 파기됩니다. <br />
        2. 회원 탈퇴 시 이미 업로드 한 게시글과 댓글은 자동으로 삭제되지
        않습니다.
        <br />
        3. 탈퇴된 계정은 복구 될 수 없습니다.
      </p>
    </Container>
  );
};

const Container = styled.div`
  line-height: 2;
`;

export default PrivacyPolicy;
