import { useState } from "react";
import { InputText } from "../../../components/input";
import Button from "../../../components/button/Button";
import { useLogin } from "../auth.hook";

const AuthForm = () => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });

  const { mutate: login, isPending } = useLogin();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login(loginForm);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-12 2xl:space-y-18">
      <div className="space-y-4">
        <InputText
          name="username"
          placeholder="Username"
          value={loginForm.username}
          onChange={handleChange}
          formClassname="bg-(--secondary-color) text-[#778288] border-[#282C2E]! border-2"
        />

        <InputText
          name="password"
          placeholder="Password"
          value={loginForm.password}
          onChange={handleChange}
          secret
          formClassname="bg-(--secondary-color) text-[#778288] border-[#282C2E]! border-2"
        />
      </div>

      <Button
        type="submit"
        name="Login"
        className="w-full h-12 bg-[#f29c3d] hover:bg-[#d68937] font-medium"
        isLoading={isPending}
      />
    </form>
  );
};

export default AuthForm;
