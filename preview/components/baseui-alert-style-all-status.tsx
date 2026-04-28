import { Alert } from "@/components/base-retroui/Alert";
import { CheckCircle, InfoIcon, XIcon } from "lucide-react";

export default function AlertAllStatus() {
  return (
    <div className="space-y-4">
      <Alert status="success" className="flex items-center">
        <CheckCircle className="h-4 w-4 mr-4" />
        <Alert.Title>This is a success alert!</Alert.Title>
      </Alert>
      <Alert status="info" className="flex items-center">
        <InfoIcon className="h-4 w-4 mr-4" />
        <Alert.Title>This is an info alert!</Alert.Title>
      </Alert>
      <Alert status="error" className="flex items-center">
        <XIcon className="h-4 w-4 mr-4" />
        <Alert.Title>This is an error alert!</Alert.Title>
      </Alert>
      <Alert status="warning" className="flex items-center">
        <InfoIcon className="h-4 w-4 mr-4" />
        <Alert.Title>This is an error alert!</Alert.Title>
      </Alert>
    </div>
  );
}
