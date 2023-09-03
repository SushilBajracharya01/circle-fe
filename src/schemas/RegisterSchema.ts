import * as yup from "yup"


const registerSchema = yup
    .object({
        username: yup.string().required(),
        fullname: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        country: yup.string().required(),
    })
    .required()

export default registerSchema;