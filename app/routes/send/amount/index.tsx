import { useNavigate, useParams } from "react-router";
import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";

export default function SendAmount() {
  const { via } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col h-screen gap-2">
      <HeaderWithBackButton heading="얼마를 보낼까요?" subheading="보낼 토큰과 금액을 입력해주세요" />
      <div className="flex flex-col gap-4 px-4 py-7">
        <Button>다음</Button>
      </div>
    </div>
  );
}