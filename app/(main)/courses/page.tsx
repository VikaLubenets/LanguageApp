import { getCourses, getUserProgress } from "@/db/queries";
import { List } from "./list";

const CoursesPage = async () => {
  const coursesData =  getCourses();
  const userProgressData =  getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData
  ])

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Spanish Courses
      </h1>
      <List 
        courses={courses.sort((a, b) => a.id - b.id)}
        activeCourseId={userProgress?.activeCourseId}
      />
    </div>
  )
};

export default CoursesPage;