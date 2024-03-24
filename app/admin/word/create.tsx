import { SimpleForm, NumberInput, ReferenceInput, Create, TextInput, required } from "react-admin";

export const WordCreate = () => {
  return(
    <Create>
      <SimpleForm>
        <NumberInput source="id"/>
        <TextInput 
          source="word" 
          validate={[required()]} 
          label="Word"
        />
        <TextInput 
          source="translationEng" 
          validate={[required()]} 
          label="Translation_eng"
        />
        <TextInput 
          source="translationRus" 
          validate={[required()]} 
          label="Translation_rus"
        />
        <ReferenceInput 
          source="vocabularyId"
          reference="vocabularyLists"
        />
         <NumberInput 
          source="order" 
          validate={[required()]} 
          label="order"
        />
        <TextInput 
          source="imageSrc" 
          label="imageSrc"
        />
        <TextInput 
          source="audioSrc" 
          label="audioSrc"
        />
      </SimpleForm>
    </Create>
  )
}