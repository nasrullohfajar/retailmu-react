import { useState } from "react";
import retail from "../../assets/retail.png";
import logoFull from "../../assets/logo-full.svg";
import { InputText } from "../../components/input";
import Button from "../../components/button/Button";

const LoginPage = () => {
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative h-dvh overflow-hidden bg-(--primary-color)">
      <img
        src={retail}
        alt="Retail store background"
        fetchPriority="high"
        className="absolute inset-0 w-full h-full object-cover object-right"
      />

      <div className="absolute inset-0 bg-linear-to-r from-(--primary-color) from-40% to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-(--primary-color) from-0% to-transparent" />

      <div className="relative h-full grid grid-cols-2">
        <div className="flex flex-col justify-center gap-18 px-72">
          <div className="flex flex-col gap-10">
            <img src={logoFull} alt="Logo retailmu" className="w-20" />
            <h1 className="text-white text-4xl font-semibold leading-11 ">
              Kendali Bisnis Kini Berada di Ujung Jari Anda
            </h1>
          </div>

          <div>
            <form className="space-y-18">
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
                isLoading={isLoading}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
