import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './ui/SearchBar';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../shared/model/store';

const Header = () => {
  const location = useLocation(); // 현재 페이지 경로 가져오기
  const isHome = location.pathname === '/'; // 현재 페이지가 홈페이지인지 확인
  const [showSearch, setShowSearch] = useState(!isHome); // 기본값 설정
  const { accessToken } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('여긴홈페이지?', isHome);

    if (!isHome) return; // 홈페이지가 아니면 스크롤 이벤트 등록 안 함

    const handleScroll = () => {
      console.log('현재좌표', window.scrollY);
      if (window.scrollY > 400) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);
  return (
    <header
      className={` ${
        isHome
          ? showSearch
            ? 'fixed w-full bg-white opacity-100 translate-y-0'
            : 'relative'
          : 'relative  bg-white'
      }`}
    >
      <nav className="flex justify-between mx-auto px-6 mt-3 items-center">
        <div className="left flex items-center">
          <a className="Logo cursor-pointer">logo</a>
          <div className=" flex gap-5 items-center ml-5">
            <a className="cursor-pointer" onClick={() => navigate('/')}>
              강의
            </a>
            <a
              className="cursor-pointer"
              onClick={() => navigate('/lectures-for-me')}
            >
              날.강.도
            </a>
            <a
              className="cursor-pointer"
              onClick={() => navigate('/my-activity')}
            >
              내 활동
            </a>
            {showSearch && <SearchBar />}
          </div>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="py-1 px-5 text-primary-default border-2 rounded-4xl text-sm font-black "
        >
          {accessToken ? '로그아웃' : '로그인'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
