"use client"

import { Admin, ListGuesser, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";


import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";


import { UnitList } from "./unit/list";
import { UnitEdit } from "./unit/edit";
import { UnitCreate } from "./unit/create";


import { LessonList } from "./lesson/list";
import { LessonEdit } from "./lesson/edit";
import { LessonCreate } from "./lesson/create";


import { ChallengeList } from "./challenge/list";
import { ChallengeCreate } from "./challenge/create";
import { ChallengeEdit } from "./challenge/edit";


import { ChallengeOptionList } from "./challengeOption/list";
import { ChallengeOptionEdit } from "./challengeOption/edit";
import { ChallengeOptionCreate } from "./challengeOption/create";


import { VocabularyList } from "./vocabularyList/list";
import { VocabularyCreate } from "./vocabularyList/create";
import { VocabularyEdit } from "./vocabularyList/edit";


import { WordList } from "./word/list";
import { WordCreate } from "./word/create";
import { WordEdit } from "./word/edit";

const dataProvider = simpleRestProvider("/api");

const App = () => {
  return(
    <Admin dataProvider={dataProvider}>
      <Resource 
        name="courses"
        recordRepresentation="title"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
      />
      <Resource 
        name="units"
        recordRepresentation="title"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
      />
      <Resource 
        name="lessons"
        recordRepresentation="title"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
      />
      <Resource 
        name="challenges"
        recordRepresentation="question"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
      />
      <Resource 
        name="challengeOptions"
        recordRepresentation="text"
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        options={{label: "Challenge Options"}}
      />
      <Resource 
        name="vocabularyLists"
        recordRepresentation="title"
        list={VocabularyList}
        create={VocabularyCreate}
        edit={VocabularyEdit}
        options={{label: "Vocabulary Lists"}}
      />
     <Resource 
        name="words"
        recordRepresentation="title"
        list={WordList}
        create={WordCreate}
        edit={WordEdit}
        options={{label: "Words"}}
      />
    </Admin>
  )
}

export default App;