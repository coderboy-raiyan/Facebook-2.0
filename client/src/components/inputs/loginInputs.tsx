/* eslint-disable react/jsx-props-no-spreading */
import { useField } from "formik";

interface IProps {
    type: "email" | "password" | string;
    name: "email" | "password" | string;
}

function LoginInputs({
    placeholder,
    ...props
}: {
    placeholder: string;
    type: "email" | "password";
    name: "email" | "password";
}) {
    const [field, meta] = useField(props);
    return (
        <div className="relative flex w-[320px] flex-col items-center">
            <input
                placeholder={`${placeholder}`}
                className="mb-[10px] h-[50px] w-full rounded-lg  border border-gray-300 bg-[var(--bg-primary)] pl-[10px] text-[17px] text-[var(--color-primary)] outline-none"
                {...field}
                {...props}
            />
        </div>
    );
}

export default LoginInputs;
