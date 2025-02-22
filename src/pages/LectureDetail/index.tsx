import { useParams } from 'react-router-dom';
import { useFetchLectures } from '../../entities/lectures/hooks/useFetchLectures';
import { CommentList } from '../../features/recommended/CommemtList';
import { CommentInput } from '../../features/recommended/CommentInput';
import { BookmarkIcon } from '../../shared/ui/icons/BookmarkIcon';
import { CommentIcon } from '../../shared/ui/icons/CommentIcon';
import { DateIcon } from '../../shared/ui/icons/DateIcon';
import { DownIcon } from '../../shared/ui/icons/DownIcon';
import { DownVoteIcon } from '../../shared/ui/icons/DownVoteIcon';
import { LinkIcon } from '../../shared/ui/icons/LinkIcon';
import { MoreIcon } from '../../shared/ui/icons/MoreIcon';
import { SearchIcon } from '../../shared/ui/icons/SearchIcon';
import { StartIcon } from '../../shared/ui/icons/StartIcon';
import { UpIcon } from '../../shared/ui/icons/UpIcon';
import { UpVoteIcon } from '../../shared/ui/icons/UpVoteIcon';
import { ViewsIcon } from '../../shared/ui/icons/ViewsIcon';
import Header from '../../widgets/header';
import Infren from '../../widgets/header/ui/icons/Infren.svg';

export const LectureDetail = () => {
  const { id } = useParams(); // ✅ URL에서 id 추출
  const postId = Number(id); // 문자열을 숫자로 변환
  const { data: lecturesData } = useFetchLectures({
    page: 15,
    size: 10,
    sort: 'desc',
  });

  const lecture = lecturesData.find((lecture: any) => lecture.id === postId);
  return (
    <>
      <Header />
      <div className="flex flex-col gap-[80px] items-center mt-[100px]">
        <div className="w-[1152px] flex flex-col gap-[48px]">
          <header className="flex flex-col gap-[24px] px-[24px] pb-[24px] border-b">
            <img src={Infren} className="w-10 mb-3" />
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[4px]">
                <h2 className="font-bold text-[32px]">
                  뉴욕 프로덕트 디자이너가 알려주는, 입문자를 위한 UX디자인 개론
                </h2>
                <div className="text-xs text-font-sub-default flex gap-[16px]">
                  <div className="flex items-center gap-[4px]">
                    <DateIcon />
                    <span className="text-[14px]"> 25.02.01</span>
                  </div>

                  <div className="flex items-center gap-[4px]">
                    <ViewsIcon />
                    <span className="text-[14px]">30K</span>
                  </div>

                  <div className="flex items-center gap-[4px]">
                    <CommentIcon />
                    <span className="text-[14px]">0</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-[24px]">
                <button className="flex gap-[4px] h-[40px] items-center border border-line px-[24px] rounded-4xl whitespace-nowrap">
                  <StartIcon className="w-[18px] h-[24px]" />
                  <span className="text-[14px]">강의</span>
                </button>
                <button className="flex gap-[4px] h-[40px] items-center border border-line px-[24px] rounded-4xl">
                  <LinkIcon className="w-[18px] h-[24px]" />
                  <span className="text-[14px]">링크 복사</span>
                </button>
                <button>
                  <BookmarkIcon />
                </button>
                <button>
                  <MoreIcon />
                </button>
              </div>
            </div>
          </header>

          {/* 강의 요약 */}
          <div className="flex flex-col gap-[16px] border rounded-lg p-[24px]">
            <h2 className="font-bold text-[24px]">강의요약</h2>
            <p>뉴욕에서 실무경험을 쌓은 전문가가 알려주는</p>
          </div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex justify-end gap-[10px] px-[16px]">
              <div className="relative w-[351px]  flex border rounded-4xl px-[20px] py-[12px]">
                <input
                  placeholder="추천 검색"
                  className="text-[16px] outline-none w-full"
                />
                <SearchIcon className="text-font-sub" />
              </div>
              <button className="flex items-center h-[48px] px-[24px] gap-[4px] border rounded-4xl text-font-sub text-[16px]">
                <p>공감순</p>
                <DownIcon className="w-[18px] " />
              </button>
            </div>
            <div className="flex justify-between ">
              <div className="border rounded-lg w-[564.5px] p-[24px]">
                <div className="flex gap-[16px] items-center  pb-[16px] border-b-4 border-primary-default">
                  <div className="flex gap-[8px] w-full items-center">
                    <UpVoteIcon className="text-primary-default" />
                    <span className="text-[24px] font-bold">추천</span>
                  </div>

                  <button className="flex w-auto h-[48px] px-[24px] rounded-full bg-primary-default text-white text-[16px] font-bold justify-center items-center whitespace-nowrap">
                    의견 추가
                  </button>
                </div>
                <ul className="divide-y">
                  <li className="flex justify-between items-center gap-[8px] px-[8px] py-[16px]">
                    <div className="flex items-center gap-[20px]">
                      <button className="border flex flex-col justify-center items-center gap-2 px-3 py-5 rounded-4xl">
                        <UpIcon />
                        <span>200</span>
                      </button>

                      <div className="flex justify-between pl-1 w-full">
                        <p>UX 입문자에게 추천해요</p>
                      </div>
                    </div>
                    <DownIcon />
                  </li>
                  <li className="flex justify-between items-center gap-[8px] px-[8px] py-[16px]">
                    <div className="flex items-center gap-[20px]">
                      <button className="border flex flex-col justify-center items-center gap-2 px-3 py-5 rounded-4xl">
                        <UpIcon />
                        <span>200</span>
                      </button>

                      <div className="flex justify-between pl-1 w-full">
                        <p>UX 입문자에게 추천해요</p>
                      </div>
                    </div>
                    <DownIcon />
                  </li>
                  <li className="flex justify-between items-center gap-[8px] px-[8px] py-[16px]">
                    <div className="flex items-center gap-[20px]">
                      <button className="border flex flex-col justify-center items-center gap-2 px-3 py-5 rounded-4xl">
                        <UpIcon />
                        <span>200</span>
                      </button>

                      <div className="flex justify-between pl-1 w-full">
                        <p>UX 입문자에게 추천해요</p>
                      </div>
                    </div>
                    <DownIcon />
                  </li>
                </ul>
              </div>
              <div className="border rounded-lg w-[564.5px] p-[24px]">
                <div className="flex gap-[16px] items-center  pb-[16px] border-b-4 border-error">
                  <div className="flex gap-[8px] w-full items-center">
                    <DownVoteIcon className="text-error" />
                    <span className="text-[24px] font-bold">비추천</span>
                  </div>

                  <button className="flex w-auto h-[48px] px-[24px] rounded-full bg-error text-white text-[16px] font-bold justify-center items-center whitespace-nowrap">
                    의견 추가
                  </button>
                </div>
                <ul className="divide-y">
                  <li className="flex justify-between items-center gap-[8px] px-[8px] py-[16px]">
                    <div className="flex items-center gap-[20px]">
                      <button className="border flex flex-col justify-center items-center gap-2 px-3 py-5 rounded-4xl">
                        <UpIcon />
                        <span>200</span>
                      </button>

                      <div className="flex justify-between pl-1 w-full">
                        <p>UX 입문자에게 추천해요</p>
                      </div>
                    </div>
                    <DownIcon />
                  </li>
                  <li className="flex justify-between items-center gap-[8px] px-[8px] py-[16px]">
                    <div className="flex items-center gap-[20px]">
                      <button className="border flex flex-col justify-center items-center gap-2 px-3 py-5 rounded-4xl">
                        <UpIcon />
                        <span>200</span>
                      </button>

                      <div className="flex justify-between pl-1 w-full">
                        <p>UX 입문자에게 추천해요</p>
                      </div>
                    </div>
                    <DownIcon />
                  </li>
                  <li className="flex justify-between items-center gap-[8px] px-[8px] py-[16px]">
                    <div className="flex items-center gap-[20px]">
                      <button className="border flex flex-col justify-center items-center gap-2 px-3 py-5 rounded-4xl">
                        <UpIcon />
                        <span>200</span>
                      </button>

                      <div className="flex justify-between pl-1 w-full">
                        <p>UX 입문자에게 추천해요</p>
                      </div>
                    </div>
                    <DownIcon />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>추천 비추천 퍼센트</div>
        <section className="w-[1152px]">
          {/* 댓글 리스트 */}

          <CommentList postId={lecture.id} />
          {/* 댓글 입력 */}
          <CommentInput postId={lecture.id} />
        </section>
      </div>
    </>
  );
};
