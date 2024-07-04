import * as Yup from 'yup';


const schema = Yup.object().shape({
    mainGroup: Yup.object().shape({
      mainGroupName: Yup.string()
      .required("Group name is required")
      .matches(/^[a-zA-Z0-9!@#$%^&*()\s,;:'"+=_[\]{}<>/?\\`|~-]/g, "Invalid characters")
      .min(3,"Group name atleast required 3 characters")
      .max(30, "Group name can not exceeded 30 characters"),
      
      mainGroupDescription: Yup.string()
      .required(" Description is required")
      .matches(/^[a-zA-Z0-9!@#$%^&*()\s,;:'"+=_[\]{}<>/?\\`|~-]/g, "Invalid characters")
      .min(20, "Description atleast required 20 characters")
      .max(300, "Description can not exceeded 300 characters"),
      
      mainGroupImage: Yup.mixed()
      .required(" Image is required ")
    }),

    termGroup: Yup.array().of(
      Yup.object().shape({
        termGroupName: Yup.string()
        .required("Term name is required")
        .matches(/^[a-zA-Z0-9!@#$%^&*()\s,;:'"+=_[\]{}<>/?\\`|~-]/g, "Invalid characters")
        .min(3, "Term name atleast required 3 characters")
        .max(30, "Term name can not exceeded 30 characters"),

        termGroupDescription: Yup.string()
        .required("Term description is required")
        .matches(/^[a-zA-Z0-9!@#$%^&*()\s,;:'"+=_[\]{}<>/?\\`|~-]/g, "Invalid characters")
        .min(20,"Term description atleast required 20 characters")
        .max(600, "Term description can not exceeded 600 characters"),

        termGroupImage: Yup.mixed()
        .required(" Image is required")
      })
    ),
  });

  export default schema;