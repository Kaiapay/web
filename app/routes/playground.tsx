import Button from '../components/Button';

export default function ButtonDemo() {
  const handleClick = () => {
  };

  return (
    <div className="min-h-screen bg-black p-8 flex flex-col items-center justify-center gap-2">
      <Button onClick={handleClick}>가입하기</Button>
      <Button onClick={handleClick} disabled>가입하기</Button>
      <Button onClick={handleClick} backgroundColor="bg-secondary" textColor="text-primary">로그인</Button>
      <Button onClick={handleClick} backgroundColor="bg-secondary" textColor="text-primary" disabled>로그인</Button>
    </div>
  );
}
