import * as yup from "yup"

const circleSchema = yup
    .object({
        name: yup.string().required(),
        description: yup.string().required(),
        moto: yup.string(),
    })
    .required()

const postSchema = yup.object({
    content: yup.string().required()
}).required();

const commentSchema = yup.object({
    comment: yup.string().required()
}).required();

export { circleSchema, postSchema, commentSchema };
