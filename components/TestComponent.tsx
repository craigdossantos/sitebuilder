type TestProps = {
  message: string;
};

export default function TestComponent({ message }: TestProps) {
  return <div>{message}</div>;
}
