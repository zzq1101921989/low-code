import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const Layout = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1209"
    width="30"
    height="30"
  >
    <path
      d="M1023.910943 511.999898c5.11911 317.794367-194.116663 516.825376-511.91103 511.911029-317.794367 4.914346-516.825376-194.116663-511.91103-511.911029C-4.825463 194.20553 194.205546-4.825478 511.999913 0.088868c317.794367-4.914346 516.825376 194.116663 511.91103 511.91103z"
      fill="#3377FF"
      p-id="1210"
    ></path>
    <path
      d="M1022.477592 566.671996C1006.915497 340.40732 852.318366 201.16752 614.382119 204.85328c-254.112635-4.095288-413.624112 155.416189-409.528824 409.528824-3.890524 237.936247 135.554041 392.533378 361.613952 408.095473 268.036615-16.381153 439.629192-187.97373 456.010345-455.805581z"
      fill="#336DFF"
      p-id="1211"
    ></path>
    <path
      d="M1015.515602 629.944199C985.824762 491.523456 876.480566 407.160519 716.764325 409.617692c-190.635668-3.071466-310.218084 116.51095-307.146618 307.146618-2.457173 159.716241 81.905765 269.060437 220.121743 298.751277 211.112109-34.400421 351.375731-174.664043 385.776152-385.571388z"
      fill="#3364FF"
      p-id="1212"
    ></path>
    <path
      d="M312.968905 439.308531L158.781302 678.678129a40.952882 40.952882 0 0 0 34.400422 63.067439h308.375204a40.952882 40.952882 0 0 0 34.400421-63.067439l-154.187602-239.574362a40.952882 40.952882 0 0 0-68.800842 0.204764z"
      fill="#80AAFF"
      p-id="1213"
    ></path>
    <path
      d="M997.701098 705.707031C964.734028 646.734881 902.076118 613.153517 819.146531 614.382104c-127.1587-2.047644-206.812056 77.605712-204.764412 204.764412-1.433351 82.929587 32.352777 145.587497 91.120163 178.554567a431.233852 431.233852 0 0 0 292.198816-291.994052z"
      fill="#335AFF"
      p-id="1214"
    ></path>
    <path
      d="M571.586357 329.554807l-225.240853 349.123322a40.952882 40.952882 0 0 0 34.400421 63.067439h450.481706a40.952882 40.952882 0 0 0 34.400421-63.067439l-225.240853-349.123322a40.952882 40.952882 0 0 0-68.800842 0z"
      fill="#FFFFFF"
      p-id="1215"
    ></path>
    <path
      d="M347.369326 294.540092m-51.191103 0a51.191103 51.191103 0 1 0 102.382206 0 51.191103 51.191103 0 1 0-102.382206 0Z"
      fill="#FFFFFF"
      p-id="1216"
    ></path>
  </svg>
);

export default function ImageIcon(props: Partial<CustomIconComponentProps>) {
  return <Icon component={Layout} {...props} />;
}
