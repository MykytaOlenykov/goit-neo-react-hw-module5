import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <ThreeDots
      height="80"
      width="80"
      radius="9"
      color="#5a7fb7"
      ariaLabel="three-dots-loading"
      wrapperStyle={{ display: "flex", justifyContent: "center" }}
      wrapperClassName=""
      visible={true}
    />
  );
}
