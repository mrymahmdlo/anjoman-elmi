import { CCol, CFormGroup, CFormText, CLabel } from "@coreui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextField = (item) => (
  <CCol sm={item.colSize} key={item.name}>
    <CFormGroup>
      <CLabel htmlFor="nf-title">{item.name}</CLabel>
      {item.input}
      <CFormText className="help-block">{item.text}</CFormText>
    </CFormGroup>
  </CCol>
);

const SwitchField = (item) => (
  <CCol sm={item.colSize} key={item.name}>
    <CFormGroup>
      <CCol sm="9">
        <CLabel htmlFor="nf-title">{item.name}</CLabel>
      </CCol>
      <CCol sm="3">{item.input}</CCol>
      <CFormText className="help-block">{item.text}</CFormText>
    </CFormGroup>
  </CCol>
);

const CKEditorField = (name, text, setForm, form, fieldName) => {
  return (
    <CFormGroup>
      <CLabel htmlFor="nf-password">{name}</CLabel>
      <CKEditor
        editor={ClassicEditor}
        config={{
          language: "fa",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "|",
            "bulletedList",
            "numberedList",
            "|",
            "indent",
            "outdent",
            "alignment",
            "|",
            "imageUpload",
            "blockQuote",
            "insertTable",
            "mediaEmbed",
            "|",
            "undo",
            "redo",
          ],
        }}
        data={form[fieldName] ? form[fieldName] : ""}
        onChange={(event, editor) => {
          const data = editor.getData();
          setForm({ ...form, [fieldName]: data });
        }}
      />
      <CFormText className="help-block">{text}</CFormText>
    </CFormGroup>
  );
};

export { TextField, SwitchField, CKEditorField };
