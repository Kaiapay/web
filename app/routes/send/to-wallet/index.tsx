import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";

export default function SendToWallet() {
  return (
    <div className="flex flex-col h-screen gap-2">
      <HeaderWithBackButton heading="지갑 주소" subheading="받는 사람의 지갑 주소를 입력해주세요" />
      <div className="flex flex-col gap-4 px-4 py-7">
        <Button>완료</Button>
      </div>
    </div>
  );
}
