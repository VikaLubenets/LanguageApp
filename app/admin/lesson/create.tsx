import { SimpleForm, NumberInput, ReferenceInput, Create, TextInput, required } from "react-admin";

export const LessonCreate = () => {
  return(
    <Create>
      <SimpleForm>
        <TextInput 
          source="title" 
          validate={[required()]} 
          label="Title"
        />
        <ReferenceInput 
          source="unitId"
          reference="units"
        />
         <NumberInput 
          source="order" 
          validate={[required()]} 
          label="order"
        />
      </SimpleForm>
    </Create>
  )
}