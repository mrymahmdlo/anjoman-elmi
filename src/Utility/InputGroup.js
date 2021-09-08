import { CCol, CFormGroup, CFormText, CLabel } from "@coreui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const TextFild = (item) => (
  <CCol sm={item.colSize}>
    <CFormGroup>
      <CLabel htmlFor="nf-title">{item.name}</CLabel>
      {item.input}
      <CFormText className="help-block">{item.text}</CFormText>
    </CFormGroup>
  </CCol>
);

const SwitchFild = (item) => (
  <CCol sm={item.colSize}>
    <CFormGroup>
      <CCol sm="9">
        <CLabel htmlFor="nf-title">{item.name}</CLabel>
      </CCol>
      <CCol sm="3">{item.input}</CCol>
      <CFormText className="help-block">{item.text}</CFormText>
    </CFormGroup>
  </CCol>
);

const CKEditorFild = (name, text, setForm, form) => (
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
      data=""
      onInit={(editor) => {
        console.log("Editor is ready to use!", editor);
      }}
      onChange={(event, editor) => {
        const data = editor.getData();
        setForm({ ...form, QuizDescription: data });
      }}
    />
    <CFormText className="help-block">{text}</CFormText>
  </CFormGroup>
);

export { TextFild, SwitchFild, CKEditorFild };
