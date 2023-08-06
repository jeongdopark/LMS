import CourseList from "./sidebar/CourseList";
import { ICourseField } from "@/hooks/queries/useGetCourseList";
import SectionHandlerButton from "./sidebar/SectionHandlerButton";
import EditButton from "./sidebar/EditButton";
import useCreateCourseMutation from "@/hooks/mutation/useCreateCourseMutation";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import useClickOutside from "@/hooks/classroom/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCurrentLecture } from "@/redux/slice/editCourseIdSlice";

interface IProps {
  courseList: ICourseField[];
  setCurrentCourse: React.Dispatch<React.SetStateAction<any>>;
}

const Sidebar = forwardRef<HTMLDivElement, IProps>(
  ({ courseList, setCurrentCourse }) => {
    const dispatch = useDispatch();
    const { mutate: createCourse } = useCreateCourseMutation();
    // 수정 취소했을 시, order 이전 상태 되돌리는 trigger
    const [getBackLectureOrderTrigger, setGetBackLectureOrderTrigger] =
      useState<boolean>(false);

    const selectedCourse = useSelector(
      (state: RootState) => state.editCourse.selectedCourse,
    );

    const handleCreateSection = () => {
      createCourse();
      setCurrentCourse(courseList![0]);
    };

    const sidebarRef = useRef<HTMLDivElement>(null);
    useClickOutside(
      sidebarRef,
      setGetBackLectureOrderTrigger,
      getBackLectureOrderTrigger,
    );

    useEffect(() => {
      const index = selectedCourse.findIndex(value => value === true);
      dispatch(setCurrentLecture(courseList[index].lectureList));
    }, [getBackLectureOrderTrigger]);

    return (
      <aside
        ref={sidebarRef}
        className="w-1/5 h-100 flex items-center flex-col mr-[20px] pt-[50px]"
      >
        <CourseList
          courseList={courseList}
          setCurrentCourse={setCurrentCourse}
        />
        <SectionHandlerButton
          text="섹션 추가"
          src="/images/plus.svg"
          onClick={handleCreateSection}
        />
        <EditButton />
      </aside>
    );
  },
);

export default Sidebar;
