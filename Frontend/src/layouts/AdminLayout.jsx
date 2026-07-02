import RoleLayout from "./RoleLayout";
import { adminNavigation } from "../utils/navigation";

export default function AdminLayout() {
  return (
    <RoleLayout
      navigation={adminNavigation}
      brandTitle="FleetFlow"
      brandSubtitle="Smart Logistics Platform"
      roleLabel="Administrator"
      greetingTitle="Dashboard"
      greetingSubtitle="Welcome back, Admin 👋"
    />
  );
}