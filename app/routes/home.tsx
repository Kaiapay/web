import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: Route.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Welcome message={loaderData.message} />
      <div className="mt-8 text-center">
        <Link 
          to="/pets" 
          className="inline-block px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Petstore API 예시 보기 (Orval 자동생성)
        </Link>
      </div>
    </div>
  );
}
