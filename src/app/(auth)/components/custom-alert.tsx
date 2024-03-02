import { ExclamationCircle } from "@/components/icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface Props {
  message: string;
}

const CustomAlert = ({ message }: Props) => {
  return (
    <Alert variant="destructive">
      <ExclamationCircle />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default CustomAlert;
