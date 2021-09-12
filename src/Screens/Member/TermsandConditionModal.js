import {Image, Modal} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import ExternalLinkIcon from '../../Assets/Image/member/icon_signup_externallink_gray.png';
import {
  heightPersentage,
  widthPersentage,
} from '../../Commons/DeviceWHPersentage';
import Gbutton from '../../Components/GbuttonComponent';

const termsText = [
  {
    title: '개인정보 수집•이용 동의서',
    content: `
[ 개인정보 수집.이용동의서 ]
1. 수집하는 개인정보 항목주식회사 [파인애플스튜디오](이하‘회사’라 합니다)는 서비스 이용을 위해 최초 회원 가입 시 이용자로부터 아래와 같은 개인정보를 수집하고 있습니다. 이용자는 본 개인정보 수집·이용 동의서에 따른 동의 시, '필요한 최소한의 정보 외의 개인정보' 수집·이용에 동의하지 아니할 권리가 있습니다.
-필수정보- 
인적사항(성명, 생년월일, 휴대전화번호,주소, 이메일주소 등) 
 ❍ 이용자의 이메일, 이름, 로그인 정보 연결된 디바이스의 기기정보 (식별자, 모델코드, Mac 주소) 
연결된 디바이스의 상태정보, 동작정보, 알람, 이벤트정보, 측정전력정보 연결된 디바이스의 동작 이력 - 전원 ON/OFF - 네트워크 연결 상태 
 ❍이벤트 발생 이력 연결된 디바이스의 위치정보가. 개인정보의 수집·이용에 관한 사항

❏ 개인정보의 수집·이용 목적 
 ❍ 귀하의 개인정보는 [파인애플스튜디오] 참여자들의 데이터보관을 목적으로 수집·이용됩니다.

❏ 개인정보의 보유·이용기간 
❏ 보유기간 : 회원 탈퇴시까지 보유 (단, 지원이력 정보는 일방향 암호화하여 탈퇴일로부터 1년간 보관 후 파기합니다.)
 ❍ 개인정보는 원칙적으로 개인정보의 수집 및 이용목적이 종료되면 파기합니다. 
❏ 참여자가 동의를 거부할 권리 및 동의를 거부할 경우의 불이익이 있을 수 있습니다.
 ❍ 참여자는 위 개인정보의 수집·이용에 동의를 거부할 수 있습니다. 다만, 거부할 경우 [파인애플스튜디오] 어플리케이션 이용에 제한이 있을 수 있습니다.
`,
  },
  {
    title: '서비스 이용약관 동의',
    content: `
[서비스 이용약관 동의 ]
1. 게시물은 회원이 서비스를 이용하면서 게재한 글, 사진, 파일, 관련 링크 및 댓글 등을 말합니다. 
2. 회원이 서비스에 등록하는 게시물로 인하여 본인 또는 타인에게 손해 및 기타 문제가 발생하는 경우, 회원은 이에 대한 책임을 질수 있으며 또한 명예훼손이나 개인정보 유출, 저작권과 같은 법률에 위배되는 게시물 및 댓글은 관련 법안에 따라 민형사상 처벌을 받을 수 있으니 이 점 유의하여 주시기 바랍니다. 
제 23 조 (게시물 제한규정(삭제 및 이동) 
1.욕설/비속어 및 분란을 조장하는 게시물 - 욕설 및 비속어가 담겨있거나, 연상시키는 내용 - 이유 없이 회원 간의 분란을 발생시킬 여지가 있는 내용의 게시물 또는 댓글 
2. 게시판 및 자료실과 관련 없는 게시물 - 각 주제 분야별로 나뉘어 있는 게시판 및 자료실의 주제와 관련 없는 내용 
3. 상업성 광고 및 홍보 글에 관한 게시물 
4. 개인정보의 유포에 관한 게시물 - 타인, 혹은 본인의 메일주소/실명/사진/전화번호/주민등록번호 등의 개인정보 또는 해당 정보가 담겨 있는 내용 
5. 확인되지 않은 소문의 유포에 관한 게시물 - 공개되었을 경우, 당사자의 권리침해가 우려되는 내용
6. 정치적 견해 차이 및 인종/성별/지역/종교에 대한 차별, 비하하는 게시물 - 인종/성별/지역/종교에 대한 차별적 발언 또는 비하하는 내용 - 상이한 정치적 견해를 비하하거나 폄하하는 내용
7. 타인을 사칭하거나 범죄행위에 관한 게시물 - 공인이나 특정이슈와 관련한 당사자 또는 지인, 주변인 등을 사칭하여 게시물을 작성하거나, "파인애플 스튜디오" 운영자를 사칭하여 작성된 내용 - 범죄와 관련 있거나 범죄를 유도하는 행위를 포함하는 내용
8. 저작권 위반에 관한 게시물 - 기사, 사진, 동영상, 음원, 영상물 등 저작권에 의해 보호받는 콘텐츠와 관련된 내용 뉴스의 경우, 기사 내용의 전부 혹은 일부를 게시하는 경우에는 저작권에 저촉될 수 있기 때문에 링크(URL)만을 허용합니다. - 음원, 사진, 동영상 등 해당 자료에 대한 불법공유를 목적으로 작성한 내용 공유를 목적으로 이메일을 수집하는 행위도 동일하게 처리됩니다. 
9.악성코드/스파이웨어/혐오감 조성에 관한 게시물 - 악성코드 및 스파이웨어의 유포 및 유도 관련 게시물은 사전경고 없이 제재를 받을 수 있습니다. - 시각 및 청각적으로 타인에게 혐오감을 줄 수 있는 게시물은 사전경고 없이 제재를 받을 수 있습니다.
10. 기타 서비스 운영에 지장을 초래할 수 있는 게시물 제 24 조 (이용제한)
1. 게시물 제한규정(3조)에 해당하는 내용을 게재하는 경우
2.다량의 게시물 등록을 목적으로 의미 없는 제목을 사용하거나, 반복되는 제목을 사용하여 게재하는 경우 
3. 비정상적인 방법으로 게시물을 등록, 조회 및 추천하는 경우 등 제 25 조 (게시중단 요청 서비스) 다른 회원의 게시물로 인하여 명예훼손, 저작권 침해 등의 피해를 입었을 경우, 운영담당자를 통해 해당 게시물에 대한 게시중단을 요청하실 수 있습니다.
[부 칙] (시행일) 이 약관은 2021년 9월 30일부터 적용되며, 종전 약관은 본 약관으로 대체되며, 개정된 약관의 적용일 이전 가입자도 개정된 약관의 적용을 받습니다.
`,
  },
  {
    title: '광고•마케팅 수신 동의',
    content: `
개인정보보호법 제22조 제4항에 의해 선택정보 사항에 대해서는 기재하지 않으셔도 서비스를 이용하실 수 있습니다. 

1. 마케팅 및 광고에의 활용 신규 기능 개발 및 맞춤 서비스 제공 뉴스레터 발송, 새로운 기능(제품)의 안내 할인 및 쿠폰 등 이벤트등의 광고성 정보 제공 
2. 마케팅 정보 제공 주식회사[파인애플스튜디오]는 서비스를 운용하는 과정에서 각종 정보를 서비스 화면, SMS, 푸시 알림, 이메일 등의 방법으로 회원에게 제공할 수 있으며, 결제 안내 등 의무적으로 안내해야 하는 정보성 내용 및 일부 혜택성 정보는 수신동의 여부와 무관하게 제공합니다. 
3. 수신 동의 및 철회 주식회사 [파인애플 스튜디오 ] 제공하는 마케팅 정보를 원하지 않을 경우 ‘설정 ▶︎ 마케팅 수신 동의 설정’에서 철회를 요청할 수 있습니다. 또한 향후 마케팅 활용에 새롭게 동의하고자 하는 경우 ‘설정 ▶︎ 마케팅 수신 동의 설정’에서 동의하실 수 있습니다.
`,
  },
  ,
];

const TermsandConditionModal = props => {
  const [showModal, setShowModal] = useState(false);
  const getText = terms => {
    switch (terms) {
      case 1:
        return termsText[0];
      case 2:
        return termsText[1];
      case 3:
        return termsText[2];
      default:
        return;
    }
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={{
          width: responsiveWidth(widthPersentage(24)),
          height: responsiveHeight(heightPersentage(24)),
        }}>
        <Image
          alt={' '}
          source={ExternalLinkIcon}
          resizeMode={'contain'}
          style={{witdh: '100%'}}
        />
      </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>{getText(props.terms).title}</Modal.Header>
          <Modal.Body>{getText(props.terms).content}</Modal.Body>
          <Modal.Footer justifyContent={'center'}>
            <Gbutton
              wp={140}
              hp={40}
              text={'Close'}
              rounded={8}
              onPress={() => setShowModal(false)}
            />
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default TermsandConditionModal;
