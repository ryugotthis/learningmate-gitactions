import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './ui/SearchBar';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../shared/store/authstore';
import { useLogout } from '../../entities/auth/hooks/useLogout';
import Logo from './ui/icons/Logo';
import { HamburgerIcon } from '../../shared/ui/icons/HamburgerIcon';
import { ProfileIcon } from '../../shared/ui/icons/ProfileIcon';
import { SearchIcon } from '../../shared/ui/icons/SearchIcon';
import { useGetUser } from '../../entities/auth/hooks/useGetUser ';

const Header = () => {
  const location = useLocation(); // 현재 페이지 경로 가져오기
  const isHome = location.pathname === '/'; // 현재 페이지가 홈페이지인지 확인
  const [showSearch, setShowSearch] = useState(!isHome); // 기본값 설정
  const { mutate } = useLogout(); // 로그아웃
  const { data: userData } = useGetUser();
  const { accessToken, isLoggedIn } = useAuthStore();

  // 메뉴와 검색 패널 상태를 각각 관리
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [isProfileClicked, SetIsProfileClicked] = useState(false);
  // 프로필 드롭다운에 대한 ref 생성
  const profileDropdownRef = useRef<HTMLUListElement>(null);
  const navigate = useNavigate();

  const handleLoginButton = () => {
    if (accessToken) {
      SetIsProfileClicked(true);
      console.log('엑세스토큰 있음 → 로그아웃 실행');
      // mutate(); // ✅ 로그아웃 실행
    } else {
      console.log('엑세스토큰 없음 → 로그인 페이지 이동');
      navigate('/login'); // ✅ 로그인 페이지로 이동
    }
  };
  console.log('보자보자', userData);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        SetIsProfileClicked(false);
      }
    };

    // 프로필 드롭다운이 열려 있을 때만 이벤트 리스너 등록
    if (isProfileClicked) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileClicked]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target as Node)
      ) {
        SetIsProfileClicked(false);
      }
    };

    // 프로필 드롭다운이 열려 있을 때만 이벤트 리스너 등록
    if (isProfileClicked) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileClicked]);
  // 메뉴와 검색 둘 중 하나라도 열려있으면 오버레이를 표시
  const overlayVisible = menuOpen || isSearchClicked;

  return (
    <header
      className={`${
        isHome
          ? showSearch
            ? 'fixed w-full bg-white opacity-100 translate-y-0'
            : 'relative'
          : 'relative bg-white'
      } `}
    >
      <nav className="h-[84px] flex justify-between  items-center relative bg-white z-30">
        <div className="relative mx-[16px] lg:px-[32px] flex gap-[12px] lg:gap-[32px] items-center">
          {/* 햄버거 버튼 (모바일/태블릿 전용) */}
          <button
            className="lg:hidden"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setIsSearchClicked(false); // 메뉴가 열리면 검색창 닫기
            }}
          >
            <HamburgerIcon />
          </button>
          <button onClick={() => navigate('/')}>
            <Logo />
          </button>

          {/* PC 버전 메뉴 */}
          <div className="hidden text-md-600 lg:flex lg:items-center lg:gap-[32px]">
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
            {showSearch && <SearchBar isNaveBar={true} />}
          </div>
        </div>
        <div className="flex gap-[16px] pr-[16px] lg:pr-[32px] ">
          {/* 모바일, 태블릿 버전 검색 버튼 */}
          <button
            onClick={() => {
              setIsSearchClicked(!isSearchClicked);
              setMenuOpen(false); // 검색 버튼 클릭 시 메뉴 닫기
            }}
            className="mr-[8px] lg:mr-[0] lg:hidden"
          >
            <SearchIcon />
          </button>
          <button
            onClick={handleLoginButton}
            className={`${
              isLoggedIn
                ? ''
                : 'px-[24px] border-2 border-primary-default rounded-4xl'
            } h-[40px] text-primary-default text-sm font-black`}
          >
            {isLoggedIn ? (
              userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="profileImage"
                  className="w-[40px] h-[40px]"
                />
              ) : (
                <ProfileIcon />
              )
            ) : (
              '로그인'
            )}
          </button>
          {isProfileClicked && (
            <ul
              ref={profileDropdownRef}
              className="absolute top-[70px] right-[16px] lg:right-[32px] flex flex-col w-[121px] py-[8px] rounded-[12px] bg-white shadow-[0_0_5px_rgba(0,0,0,0.1)]"
            >
              <li
                onClick={() => navigate('/my-page')}
                className="px-[16px] py-[12px] text-font-sub font-medium tracking-[-0.05em] cursor-pointer"
              >
                마이페이지
              </li>
              <li
                onClick={() => mutate()}
                className="px-[16px] py-[12px] text-font-sub font-medium tracking-[-0.05em] cursor-pointer"
              >
                로그아웃
              </li>
            </ul>
          )}
        </div>
      </nav>

      {/* 오버레이 (메뉴나 검색 패널이 열렸을 때) */}
      {overlayVisible && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20"
          onClick={() => {
            setMenuOpen(false);
            setIsSearchClicked(false);
          }}
        />
      )}

      {/* 모바일/태블릿 메뉴 패널 */}
      {menuOpen && (
        <ul className="lg:hidden absolute px-[72px] bg-white w-full z-30 text-md-600">
          <li
            className="cursor-pointer py-[16px]"
            onClick={() => {
              setMenuOpen(false);
              navigate('/');
            }}
          >
            강의
          </li>
          <li
            className="cursor-pointer py-[16px]"
            onClick={() => {
              setMenuOpen(false);
              navigate('/lectures-for-me');
            }}
          >
            날.강.도
          </li>
          <li
            className="cursor-pointer py-[16px]"
            onClick={() => {
              setMenuOpen(false);
              navigate('/my-activity');
            }}
          >
            내 활동
          </li>
        </ul>
      )}

      {/* 모바일/태블릿 검색 패널 */}
      {isSearchClicked && (
        <div className="lg:hidden absolute flex justify-center w-full px-[24px] py-[12px] bg-white z-30">
          <SearchBar isNaveBar={true} />
        </div>
      )}
    </header>
  );
};

export default Header;
