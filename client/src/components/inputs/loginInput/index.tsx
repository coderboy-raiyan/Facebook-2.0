/* eslint-disable no-unused-vars */
import { ErrorMessage, useField } from "formik";
import "./style.scss";

type IProps = "email" | "password" | string;

function LoginInputs({
    placeholder,
    onChange,
    bottom,
    ...props
}: {
    placeholder: string;
    type: IProps;
    name: IProps;
    bottom?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    const [field, meta] = useField<IProps>(props);

    return (
        <div className="input_wrap">
            {meta.touched && meta.error && !bottom && (
                <div className="input_error" style={{ transform: "translateY(3px)" }}>
                    {meta.touched && meta.error && <ErrorMessage name={field.name} />}
                    {meta.touched && meta.error && <div className="error_arrow_top" />}
                </div>
            )}
            <input
                className={meta.touched && meta.error ? "input_error_border" : ""}
                placeholder={placeholder}
                {...field}
                {...props}
            />
            {meta.touched && meta.error && bottom && (
                <div className="input_error" style={{ transform: "translateY(2px)" }}>
                    {meta.touched && meta.error && <ErrorMessage name={field.name} />}
                    {meta.touched && meta.error && <div className="error_arrow_bottom" />}
                </div>
            )}

            {meta.touched && meta.error && (
                <i className="error_icon" style={{ top: `${!bottom && "63%"}` }} />
            )}
        </div>
    );
}

export default LoginInputs;
