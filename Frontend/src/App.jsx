import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Badge from "./components/ui/Badge";
import Input from "./components/ui/Input";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-10">
      <Card className="w-[500px] space-y-6">

        <h1 className="text-3xl font-bold">
          Manexa Design System
        </h1>

        <Input placeholder="Search vehicles..." />

        <div className="flex gap-3">

          <Badge variant="success">
            Active
          </Badge>

          <Badge variant="warning">
            Pending
          </Badge>

          <Badge variant="danger">
            Offline
          </Badge>

        </div>

        <div className="flex gap-3">

          <Button>
            Primary
          </Button>

          <Button variant="secondary">
            Secondary
          </Button>

        </div>

      </Card>
    </div>
  );
}