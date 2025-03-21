// 커스텀 훅
import { useGetDemandLectureComments } from '../../../entities/comments/model';
// 컴포넌트
import { CommentCard } from './CommentCard';

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
  } = useGetDemandLectureComments(postId);
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
        return <CommentCard key={comment.id} data={comment} postId={postId} />;
      })}
    </>
  );
};
