import React from 'react';
import {useEffect} from 'react';
import {useRef} from 'react';
import {useState} from 'react';
import PineClipPresenter from './PineClipPresenter';
const tempDataList = [
  {
    id: '14',
    title: '블리처스(BLITZERS) ☃ 올겨울 필수 아이(돌)템 BEST7 [TMI]',
    category: '세탁기',
    url: 'https://youtu.be/-DfZ2UWl9ro',
  },
  {
    id: '2',
    title: '이걸 다 말해도 되는 거야? 스카이리(SKYLE) TMI',
    category: '세탁기',
    url: 'https://youtu.be/giMGCfay7Os',
  },
  {
    id: '7',
    title: '킹덤(KINGDOM) 여자가 좋아하는 남자유형 다있음 [TMI]',
    category: '세탁기',
    url: 'https://youtu.be/VG2mQXoRS2A',
  },
  {
    id: '11',
    title: '수능 끝났는데 남소 받을래? (기대해 9명임😊) 다크비(DKB)랑 [TMI]',
    category: '세탁기',
    url: 'https://youtu.be/FIImoLz-UQ4',
  },
  {
    id: '1',
    title:
      '오늘부터 최애, 스카이리(SKYLE) FLY UP HIGH [HEART VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/58WPGNcA6DM',
  },

  {
    id: '3',
    title:
      '데뷔해줘서 고마운 ㅜㅜ 스카이리(SKYLE) FLY UP HIGH [AEGYO VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/VmfJQmQuQzA',
  },
  {
    id: '4',
    title:
      '킹덤(KINGDOM) BLACK CROWN 내가 살고싶은 왕국이로소이다..!! [ORIGINAL VER. PERFORMANCE] ',
    category: 'pinedoll',
    url: 'https://youtu.be/kEUqpiiDm0E',
  },
  {
    id: '5',
    title:
      '킹덤(KINGDOM) BLACK CROWN 하트 받으러 오세요오오오❤️[HEART VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/RTX5gyQnbKA',
  },
  {
    id: '6',
    title: '킹덤(KINGDOM) BLACK CROWN [COMIC VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/1sGE3y3hnXc',
  },
  {
    id: '8',
    title:
      '다크비(DKB) 왜만나(rollercoaster), 잘 생겼으니까 만나지 ㅋㅋ [ORIGINAL VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/KTJiQWUluUw',
  },
  {
    id: '9',
    title:
      '다크비(DKB) 왜 안 만나?ㅋ(rollercoaster) 머리부터 발끝까지 하트💗💗💗 [HEART VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/26oeQ9lJAV0',
  },
  {
    id: '10',
    title:
      '스우파는 끝났지만ㅜ 다크비(DKB) 왜만나(rollercoaster) 댄스덕에 😍 [BATTLE VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/9YklMEgytRI',
  },
  {
    id: '12',
    title:
      '(양해구함🙏) 블리처스(BLITZERS)가 실수좀할게 🤣 [ORIGINAL VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/tqtcrYm05Rw',
  },
  {
    id: '13',
    title:
      '잘생긴 남자 애교 모음집😍 블리처스(BLITZERS) 실수좀할게😁 [AEGYO VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/zrf3VIwySQQ',
  },

  {
    id: '15',
    title:
      '블리처스(BLITZERS) 내적댄스(HOP-IN)🕺💃 올해 젤귀엽 ㅇㅈ [ORIGINAL VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/hM90szJuh-M',
  },
  {
    id: '16',
    title:
      '블리처스(BLITZERS) 쉘위댄스? 🎵 연말파티원 급구(1/n) [SOLO PERFORMANCE] ',
    category: 'pinedoll',
    url: 'https://youtu.be/26sNwVeglTI',
  },
];
const tempDataList1 = [
  {
    id: '8',
    title:
      '다크비(DKB) 왜만나(rollercoaster), 잘 생겼으니까 만나지 ㅋㅋ [ORIGINAL VER. PERFORMANCE]',
    category: '세탁기',
    url: 'https://youtu.be/KTJiQWUluUw',
  },
  {
    id: '9',
    title:
      '다크비(DKB) 왜 안 만나?ㅋ(rollercoaster) 머리부터 발끝까지 하트💗💗💗 [HEART VER. PERFORMANCE]',
    category: '세탁기',
    url: 'https://youtu.be/26oeQ9lJAV0',
  },
  {
    id: '10',
    title:
      '스우파는 끝났지만ㅜ 다크비(DKB) 왜만나(rollercoaster) 댄스덕에 😍 [BATTLE VER. PERFORMANCE]',
    category: '세탁기',
    url: 'https://youtu.be/9YklMEgytRI',
  },
];
const tempDataList3 = [
  {
    id: '14',
    title: '블리처스(BLITZERS) ☃ 올겨울 필수 아이(돌)템 BEST7 [TMI]',
    category: 'interview',
    url: 'https://youtu.be/-DfZ2UWl9ro',
  },
  {
    id: '2',
    title: '이걸 다 말해도 되는 거야? 스카이리(SKYLE) TMI',
    category: 'interview',
    url: 'https://youtu.be/giMGCfay7Os',
  },
  {
    id: '7',
    title: '킹덤(KINGDOM) 여자가 좋아하는 남자유형 다있음 [TMI]',
    category: 'interview',
    url: 'https://youtu.be/VG2mQXoRS2A',
  },
  {
    id: '11',
    title: '수능 끝났는데 남소 받을래? (기대해 9명임😊) 다크비(DKB)랑 [TMI]',
    category: 'interview',
    url: 'https://youtu.be/FIImoLz-UQ4',
  },
];
const tempDataList2 = [
  {
    id: '1',
    title:
      '오늘부터 최애, 스카이리(SKYLE) FLY UP HIGH [HEART VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/58WPGNcA6DM',
  },

  {
    id: '3',
    title:
      '데뷔해줘서 고마운 ㅜㅜ 스카이리(SKYLE) FLY UP HIGH [AEGYO VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/VmfJQmQuQzA',
  },
  {
    id: '4',
    title:
      '킹덤(KINGDOM) BLACK CROWN 내가 살고싶은 왕국이로소이다..!! [ORIGINAL VER. PERFORMANCE] ',
    category: 'pinedoll',
    url: 'https://youtu.be/kEUqpiiDm0E',
  },
  {
    id: '5',
    title:
      '킹덤(KINGDOM) BLACK CROWN 하트 받으러 오세요오오오❤️[HEART VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/RTX5gyQnbKA',
  },
  {
    id: '6',
    title: '킹덤(KINGDOM) BLACK CROWN [COMIC VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/1sGE3y3hnXc',
  },
  {
    id: '8',
    title:
      '다크비(DKB) 왜만나(rollercoaster), 잘 생겼으니까 만나지 ㅋㅋ [ORIGINAL VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/KTJiQWUluUw',
  },
  {
    id: '9',
    title:
      '다크비(DKB) 왜 안 만나?ㅋ(rollercoaster) 머리부터 발끝까지 하트💗💗💗 [HEART VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/26oeQ9lJAV0',
  },
  {
    id: '10',
    title:
      '스우파는 끝났지만ㅜ 다크비(DKB) 왜만나(rollercoaster) 댄스덕에 😍 [BATTLE VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/9YklMEgytRI',
  },
  {
    id: '12',
    title:
      '(양해구함🙏) 블리처스(BLITZERS)가 실수좀할게 🤣 [ORIGINAL VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/tqtcrYm05Rw',
  },
  {
    id: '13',
    title:
      '잘생긴 남자 애교 모음집😍 블리처스(BLITZERS) 실수좀할게😁 [AEGYO VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/zrf3VIwySQQ',
  },

  {
    id: '15',
    title:
      '블리처스(BLITZERS) 내적댄스(HOP-IN)🕺💃 올해 젤귀엽 ㅇㅈ [ORIGINAL VER. PERFORMANCE]',
    category: 'pinedoll',
    url: 'https://youtu.be/hM90szJuh-M',
  },
  {
    id: '16',
    title:
      '블리처스(BLITZERS) 쉘위댄스? 🎵 연말파티원 급구(1/n) [SOLO PERFORMANCE] ',
    category: 'pinedoll',
    url: 'https://youtu.be/26sNwVeglTI',
  },
];
const PineClipContainer = props => {
  const [category, setCategory] = useState(0);
  const [videoList, setVideoList] = useState(tempDataList);
  const [title, setTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const handlerCategory = value => {
    setCategory(value);
  };
  useEffect(() => {
    if (category === 1) {
      setVideoList(tempDataList1);
    } else if (category === 2) {
      setVideoList(tempDataList2);
    } else if (category === 3) {
      setVideoList(tempDataList3);
    } else {
      setVideoList(tempDataList);
    }
  }, [category]);
  const videoPanel = useRef();
  const [isBottom, setIsBottom] = useState(true);
  const openVideoPlayer = (url, titleName) => {
    // setVideoUrl(url);
    setVideoUrl(url.substring(url.lastIndexOf('/') + 1));
    console.log(url.substring(url.lastIndexOf('/') + 1));
    setTitle(titleName);
    setIsBottom(false);
    videoPanel.current.show();
  };
  return (
    <PineClipPresenter
      {...props}
      videoList={videoList}
      category={category}
      setCategory={setCategory}
      handlerCategory={handlerCategory}
      videoPanel={videoPanel}
      isBottom={isBottom}
      setIsBottom={setIsBottom}
      openVideoPlayer={openVideoPlayer}
      videoUrl={videoUrl}
    />
  );
};

export default PineClipContainer;
