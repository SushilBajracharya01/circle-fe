import * as yup from "yup"

const circleSchema = yup
    .object({
        name: yup.string().required(),
        description: yup.string().required(),
        moto: yup.string(),
    })
    .required()

export { circleSchema };