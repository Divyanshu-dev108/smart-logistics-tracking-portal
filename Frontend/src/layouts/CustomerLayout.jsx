import RoleLayout from "./RoleLayout";
import { customerNavigation } from "../utils/navigation";

export default function CustomerLayout() {
  return (
    <RoleLayout
      navigation={customerNavigation}
      brandTitle="FleetFlow"
      brandSubtitle="Customer Portal"
      roleLabel="Customer"
      greetingTitle="Track Your Shipment"
      greetingSubtitle="See where your order is, live 📦"
    />
  );
}