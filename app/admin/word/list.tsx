import { Datagrid, List, NumberField, TextField, ReferenceField } from "react-admin";

export const WordList = () => {
  return(
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id"/>
        <TextField source="word"/>
        <TextField source="translationEng"/>
        <TextField source="translationRus"/>
        <ReferenceField source="vocabularyId" reference="vocabularyLists" />
        <NumberField source="order"/>
        <TextField source="imageSrc"/>        
        <TextField source="audioSrc"/>
      </Datagrid>
    </List>
  )
}