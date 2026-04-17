import { ThreeDot } from "react-loading-indicators";

const PageLoader = () => {
  return (
    <div className="fixed inset-0 z-1060 bg-transparent flex items-center justify-center">
      <ThreeDot color="#14150e" size="medium" text="" textColor="" />
    </div>
  );
};

export default PageLoader;
