import { getCourses } from "@/db/queries";
import { List } from "./list";

const CoursesPage = async () => {
  const data = await getCourses();

  return (
    <div className="h-full max-w-[912px] px-3 mx-auto">
      <h1 className="text-2xl font-bold text-neutral-700">
        Spanish Courses
      </h1>
      <List 
        courses={data.sort((a, b) => a.id - b.id)}
        activeCourseId={1}
      />
    </div>
  )
};

export default CoursesPage;