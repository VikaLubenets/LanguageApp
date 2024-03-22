import { Datagrid, List, NumberField, TextField, ReferenceField } from "react-admin";

export const UnitList = () => {
  return(
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id"/>
        <TextField source="title"/>
        <TextField source="description"/>
        <ReferenceField source="courseId" reference="courses" />
        <NumberField source="order"/>
      </Datagrid>
    </List>
  )
}