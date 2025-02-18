import { useFetchDemandLectureComments } from '../../entities/recomended/hooks/useFetchDemandLectureCommets';

import { CommentCard } from './CommentCard';

//예시
// interface Comment {
//   id: number;
//   content: string;
//   user: {
//     name: string;
//   };
//   createTime: string;
// }

// const CommentExample: Comment[] = [
//   {
//     id: 0,
//     content:
//       '간단한 웹사이트를 클론해서 만들거나, 계산기나 Todo를 만들어 보는 것도 좋습니다.',
//     user: {
//       name: '가나다라',
//     },
//     createTime: '25.02.01',
//   },
//   {
//     id: 1,
//     content:
//       '간단한 웹사이트를 클론해서 만들거나, 계산기나 Todo를 만들어 보는 것도 좋습니다.',
//     user: {
//       name: '가나다라',
//     },
//     createTime: '25.02.01',
//   },
//   {
//     id: 2,
//     content:
//       '간단한 웹사이트를 클론해서 만들거나, 계산기나 Todo를 만들어 보는 것도 좋습니다.',
//     user: {
//       name: '가나다라',
//     },
//     createTime: '25.02.01',
//   },
//   {
//     id: 3,
//     content:
//       '간단한 웹사이트를 클론해서 만들거나, 계산기나 Todo를 만들어 보는 것도 좋습니다.',
//     user: {
//       name: '가나다라',
//     },
//     createTime: '25.02.01',
//   },
//   {
//     id: 4,
//     content:
//       '간단한 웹사이트를 클론해서 만들거나, 계산기나 Todo를 만들어 보는 것도 좋습니다.',
//     user: {
//       name: '가나다라',
//     },
//     createTime: '25.02.01',
//   },
// ];
interface CommentData {
  id: number;
  content: string;
  createTime: string;
  updateTime: string;
  user: {
    id: number;
    name: string;
    profileImage: string;
  };
}
interface CommentListProps {
  postId: number;
}
export const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  console.log('postId', postId);
  const {
    data: CommentListData,
    isLoading,
    isError,
    error,
  } = useFetchDemandLectureComments(postId);
  console.log('댓글데이터확인', CommentListData);
  return (
    <>
      <div className="flex items-center mb-10">
        <span className="text-font-sub-default mr-2">
          댓글 {CommentListData?.length}
        </span>
        {/* 높이가 없으니 중간 경계선이 됨 그냥 border하면 top,bottom 2겹이 됨 */}
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      {/* 댓글 리스트 */}
      {isLoading ? <div>로딩중</div> : ''}
      {isError ? <div>에러 {error.message}</div> : ''}
      {/* (CommentListData || []).map((comment:CommentData) */}
      {(CommentListData || []).map((comment: CommentData) => {
        console.log('🔍 comment.id:', comment.id); // ✅ 콘솔 출력으로 확인
        return <CommentCard key={comment.id} data={comment} />;
      })}
    </>
  );
};
