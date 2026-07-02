import RoleLayout from "./RoleLayout";
import { driverNavigation } from "../utils/navigation";

export default function DriverLayout() {
  return (
    <RoleLayout
      navigation={driverNavigation}
      brandTitle="FleetFlow"
      brandSubtitle="Driver App"
      roleLabel="Driver"
      greetingTitle="Driver Portal"
      greetingSubtitle="Welcome back, have a safe trip 🚚"
    />
  );
}