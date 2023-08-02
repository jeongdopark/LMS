import LectureSetting from "./LectureSetting";

const ModalFooter: React.FC = () => {
  return (
    <div className="flex justify-between mb-[-20px]">
      <LectureSetting />
      <button
        type="submit"
        className="w-[107px] h-[45px] rounded-[10px] font-bold text-base text-grayscale-20 bg-grayscale-5 hover:text-white hover:bg-primary-80"
      >
        업로드
      </button>
    </div>
  );
};

export default ModalFooter;
