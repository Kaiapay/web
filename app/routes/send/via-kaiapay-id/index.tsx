import Button from "~/components/Button";
import HeaderWithBackButton from "~/components/HeaderWithBackButton";

export default function SendViaKaiapayId() {
  return (
    <div className="flex flex-col h-screen gap-2">
      <HeaderWithBackButton heading="KaiaPay 아이디" subheading="받는 사람의 KaiaPay 아이디를 입력해주세요" />
      <div className="flex flex-col gap-4 px-4 py-7">
        <Button>완료</Button>
      </div>
    </div>
  );
}