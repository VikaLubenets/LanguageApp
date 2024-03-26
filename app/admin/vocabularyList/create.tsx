"use client"

import { SimpleForm, Create, SelectInput, TextInput, required, NumberInput } from "react-admin";

export const VocabularyCreate = () => {
  return(
    <Create>
      <SimpleForm>
        <NumberInput source="id"/>
        <TextInput 
          source="title" 
          validate={[required()]} 
          label="Title"
        />
        <SelectInput 
          source="level"
          choices={[
            {
              id: "A1-A2",
              name: "A1-A2"
            },
            {
              id: "B1-B2",
              name: "B1-B2"
            },
            {
              id: "C1-C2",
              name: "C1-C2"
            },
          ]}
          validate={[required()]} 
        />
        <TextInput 
          source="imageSrc" 
          validate={[required()]} 
          label="Image"
        />
      </SimpleForm>
    </Create>
  )
}