import { ReactNode } from "react";
// import { register } from "swiper/element/bundle";
// register();

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return children;
}
