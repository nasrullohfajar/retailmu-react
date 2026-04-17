import retail from "../../assets/retail.png";
import logoFull from "../../assets/logo-full.svg";
import AuthForm from "./components/AuthForm";

const LoginPage = () => {
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
            <AuthForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
