import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const Clothes = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="3596"
    width="20"
    height="20"
  >
    <path
      d="M1000.8 406.1L896 511c-8.8 8.8-20.4 13.3-32 13.3s-23.2-4.4-32-13.3v416c0 17.7-14.3 32-32 32H512v1H224c-17.7 0-32-14.3-32-32V512c-8.8 8.8-20.4 13.3-32 13.3s-23.2-4.4-32-13.3L23.2 407.1c-30.5-30.5-30.5-79.8 0-110.3l194.6-194.6C232 88 251.3 80 271.5 80h91.1c7.7 0 15.1 2.8 21 7.8 19.7 17.1 71.3 56.2 132 56.2 60.8 0 112.5-39.3 132.1-56.3 5.8-5 13.1-7.8 20.7-7.8l83.8-0.6h0.6c20.1 0 39.5 8 53.7 22.3l194.3 194.3c30.5 30.4 30.5 79.8 0 110.2z"
      p-id="3597"
    ></path>
  </svg>
);

export default function ClothesIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={Clothes} {...props} />;
}
