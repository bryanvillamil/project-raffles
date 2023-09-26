import Home from "@/components/pages/home/home";
import type { GetStaticProps } from "next";
import { getDataHome } from "@services/home";
import { IPropsHome } from "@/types/home";

export default function Index(props: IPropsHome) {
  console.log("props", props);
  return <Home {...props} />;
}

export const getStaticProps: GetStaticProps<any> = async () => {
  const data = await getDataHome();
  return {
    props: {
      ...data,
    },
  };
};
