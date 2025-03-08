// import { useReissue } from '../../../entities/auth/hooks/useReissue';
import PlusIcon from '../../../widgets/header/ui/icons/PlusIcon';

export const PostButton = () => {
  // const reissue = useReissue();

  return;
  <>
    <button
      // onClick={() => }
      className="flex items-center px-4 py-3 text-white bg-primary-default rounded-4xl"
    >
      {/* <img src={Add} alt="add" className="mr-1" /> */}
      <PlusIcon className=" mr-1" />
      <p className="text-sm font-bold cursor-pointer">글 등록</p>
    </button>
  </>;
};
