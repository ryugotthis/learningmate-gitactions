import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './ui/SearchBar';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../../shared/model/store';
import { useLogout } from '../../entities/auth/hooks/useLogout';

const Header = () => {
  const location = useLocation(); // 현재 페이지 경로 가져오기
  const isHome = location.pathname === '/'; // 현재 페이지가 홈페이지인지 확인
  const [showSearch, setShowSearch] = useState(!isHome); // 기본값 설정
  const { mutate } = useLogout();
  const { accessToken, isLoggedIn } = useAuthStore();

  const navigate = useNavigate();

  const handleLoginButton = () => {
    if (accessToken) {
      console.log('엑세스토큰 있음 → 로그아웃 실행');
      mutate(); // ✅ 로그아웃 실행
    } else {
      console.log('엑세스토큰 없음 → 로그인 페이지 이동');
      navigate('/login'); // ✅ 로그인 페이지로 이동
    }
  };

  useEffect(() => {
    console.log('여긴홈페이지?', isHome);

    if (!isHome) return; // 홈페이지가 아니면 스크롤 이벤트 등록 안 함

    const handleScroll = () => {
      // console.log('현재좌표', window.scrollY);
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
          onClick={handleLoginButton}
          className="py-1 px-5 text-primary-default border-2 rounded-4xl text-sm font-black "
        >
          {isLoggedIn ? '로그아웃' : '로그인'}
          {accessToken ? accessToken : '토큰없음'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
