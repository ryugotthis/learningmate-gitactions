import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation(); // 현재 경로 가져오기

  useEffect(() => {
    window.scrollTo(0, 0); // 페이지 이동 시 최상단으로 스크롤
  }, [pathname]); // pathname이 변경될 때마다 실행

  return null;
};

export default ScrollToTop;
