import Home from "@/components/pages/home/home";
import type { GetStaticProps } from "next";
import { getDataHome } from "@services/home";

export default function Index(props: {}) {
  console.log("props", props);

  return <Home />;
}

export const getStaticProps: GetStaticProps<any> = async () => {
  return {
    props: {
      logo: await getDataHome(),
    },
  };
};
