import Editor from './Eitor';

export const TestTiptap = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-5">
      <h1 className="text-2xl font-bold text-center mb-5">
        📝 React + TypeScript + Tiptap 블록 에디터
      </h1>
      <Editor />
    </div>
  );
};
