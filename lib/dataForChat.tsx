import AvatarCollector01 from "../components/avatars/AvatarCollector01";
import AvatarCollector02 from "../components/avatars/AvatarCollector02";
import AvatarCollector03 from "../components/avatars/AvatarCollector03";
import AvatarCollector04 from "../components/avatars/AvatarCollector04";
import AvatarCollector05 from "../components/avatars/AvatarCollector05";
import AvatarCreators01 from "../components/avatars/AvatarCreators01";
import AvatarCreators02 from "../components/avatars/AvatarCreators02";
import AvatarCreators03 from "../components/avatars/AvatarCreators03";
import AvatarCreators04 from "../components/avatars/AvatarCreators04";
import AvatarCreators05 from "../components/avatars/AvatarCreators05";
import { Role } from "../enums/roleType";

const creatorUsers: Chat[] = [
  {
    id: "1",
    name: "Sam Russell",
    role: Role.CREATOR,
    address: "",
    company: "Coca Cola",
    amount: 2,
    timestamp: "2:38 AM",
    icon: <AvatarCollector01 />,
  },
  {
    id: "2",
    name: "Jack Hughes",
    role: Role.CREATOR,
    address: "",
    company: "Heineken",
    amount: 2,
    timestamp: "2:38 AM",
    icon: <AvatarCollector02 />,
  },
  {
    id: "3",
    name: "Caty Nguyen",
    role: Role.CREATOR,
    address: "",
    company: "Red Bull",
    amount: 0,
    timestamp: "2:38 AM",
    icon: <AvatarCollector03 />,
  },
  {
    id: "4",
    name: "Jamie Ling",
    role: Role.CREATOR,
    address: "",
    company: "Martini",
    amount: 0,
    timestamp: "2:38 AM",
    icon: <AvatarCollector04 />,
  },
  {
    id: "5",
    name: "Hank Pecker",
    role: Role.CREATOR,
    address: "",
    company: "Perrier",
    amount: 0,
    timestamp: "2:38 AM",
    icon: <AvatarCollector05 />,
  },
];

const collectorUsers: Chat[] = [
  {
    id: "1",
    name: "Sam Russell",
    role: Role.COLLECTOR,
    address: "ABC Straat 123, Amsterdam",
    company: "",
    amount: 2,
    timestamp: "2:38 AM",
    icon: <AvatarCreators01 />,
  },
  {
    id: "2",
    name: "Jack Hughes",
    role: Role.COLLECTOR,
    address: "ABC Straat 123, Amsterdam",
    company: "",
    amount: 2,
    timestamp: "2:38 AM",
    icon: <AvatarCreators02 />,
  },
  {
    id: "3",
    name: "Caty Nguyen",
    role: Role.COLLECTOR,
    address: "ABC Straat 123, Amsterdam",
    company: "",
    amount: 0,
    timestamp: "2:38 AM",
    icon: <AvatarCreators03 />,
  },
  {
    id: "4",
    name: "Jamie Ling",
    role: Role.COLLECTOR,
    address: "ABC Straat 123, Amsterdam",
    company: "",
    amount: 0,
    timestamp: "2:38 AM",
    icon: <AvatarCreators04 />,
  },
  {
    id: "5",
    name: "Hank Pecker",
    role: Role.COLLECTOR,
    address: "ABC Straat 123, Amsterdam",
    company: "",
    amount: 0,
    timestamp: "2:38 AM",
    icon: <AvatarCreators05 />,
  },
];

const messages: Message[] = [
  {
    message: "Lorem ipsum dolor sit amet consectetur. Vestibulum.",
    isSender: true,
    timestamp: Date.now() - 100000,
  },
  {
    message: "Lorem ipsum",
    isSender: true,
    timestamp: Date.now() - 99900,
  },
  {
    message: "Lorem ipsum dolor sit amet consectetur. Hac.",
    isSender: true,
    timestamp: Date.now() - 95000,
  },
  {
    message: "Lorem ipsum dolor sit amet.",
    isSender: false,
    timestamp: Date.now() - 85000,
  },
  {
    message: "Lorem ipsum",
    isSender: true,
    timestamp: Date.now() - 70000,
  },
  {
    message: "Lorem ipsum dolor sit",
    isSender: true,
    timestamp: Date.now() - 50000,
  },
  {
    message: "ok",
    isSender: false,
    timestamp: Date.now() - 40000,
  },
];

export { creatorUsers, collectorUsers, messages };
