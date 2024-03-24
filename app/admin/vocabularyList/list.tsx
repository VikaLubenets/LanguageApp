"use client"
import { Datagrid, List, TextField, SelectField, NumberField } from "react-admin";

export const VocabularyList = () => {
  return(
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id"/>
        <TextField source="title"/>
        <SelectField 
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
        />
        <TextField source="imageSrc"/>
      </Datagrid>
    </List>
  )
}