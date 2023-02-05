/* eslint-disable no-unused-vars */
import { ErrorMessage, useField } from "formik";
import "./style.scss";

type IProps = "email" | "password" | string;

function LoginInputs({
    placeholder,
    handelLoginChange,
    values,
    ...props
}: {
    placeholder: string;
    type: IProps;
    name: IProps;
    values: string;
    handelLoginChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const [field, meta] = useField<IProps>(props);

    return (
        <div className="relative flex w-[320px] flex-col items-center">
            <div>{meta.touched && meta.error && <ErrorMessage name={field.name} />}</div>
            <input
                {...field}
                {...props}
                value={values}
                required
                placeholder={`${placeholder}`}
                className={`mb-[10px] h-[50px] w-full rounded-lg border  border-gray-300 bg-[var(--bg-primary)] pl-[10px] text-[17px] text-[var(--color-primary)] outline-none focus:ring-0 ${
                    meta.touched && meta.error && "input_error_border"
                }`}
                onChange={handelLoginChange}
            />
        </div>
    );
}

export default LoginInputs;
