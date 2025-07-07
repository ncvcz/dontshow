import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Filter, Settings } from "@/types";
import { EditIcon, TrashIcon } from "lucide-react";

export default function Filters() {
  const [enabled, _setEnabled] = useStorage<boolean>("local:enabled", true);
  const [filters, setFilters] = useStorage<Filter[]>("local:filters", []);
  const [settings, _setSettings] = useStorage<Settings>("local:settings", {});
  const [isSensitiveAlertEnabled, setIsSensitiveAlertEnabled] = useState(true);
  const [expression, setExpression] = useState("");
  const [domain, setDomain] = useState("*");
  const [type, setType] = useState<Filter["type"]>("censor");
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddFilter = () => {
    setIsOpen(false);
    const newFilter: Filter = {
      expression,
      domain,
      type,
    };

    setFilters([...filters, newFilter]);
    setExpression("");
    setDomain("*");
    setType("censor");
  };

  const handleEditFilter = (index: number) => {
    setIsOpen(true);
    setIsEditing(true);
    const filter = filters[index];
    setExpression(filter.expression);
    setDomain(filter.domain);
    setType(filter.type);
  };

  const handleRemoveFilter = (index: number) => {
    const updatedFilters = filters.filter((_, i) => i !== index);
    setFilters(updatedFilters);
  };

  const handleUpdateFilter = () => {
    setIsOpen(false);

    const updatedFilters = filters.map((filter, index) =>
      filter === filters[index] ? { ...filter, expression, domain, type } : filter
    );

    setFilters(updatedFilters);

    setExpression("");
    setDomain("*");
    setType("censor");
    setIsEditing(false);
  };

  if (enabled && settings.sensitiveAlert && isSensitiveAlertEnabled) {
    return (
      <Card className="flex items-center justify-center p-6">
        <h1 className="text-3xl font-bold">This section contains sensitive content!</h1>
        <p className="text-muted-foreground text-center text-base">
          This section contains all your filters, which may include sensitive content. Click the
          button below to continue.
        </p>
        <Button
          className="w-full"
          onClick={() => {
            setIsSensitiveAlertEnabled(false);
          }}
        >
          Continue to Filters
        </Button>
      </Card>
    );
  }

  return (
    <div className="p-3">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="mb-2 text-2xl font-bold">Filters</h2>
            <p className="text-muted-foreground">
              Manage your filters here. You can add, edit, or remove filters that hide unwanted
              content.
            </p>
          </div>
          <DialogTrigger asChild className="cursor-pointer">
            <Button className="flex items-center gap-2">
              <span>Add Filter</span>
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent>
          <DialogContent>
            <DialogTitle>{isEditing ? "Edit Filter" : "Add New Filter"}</DialogTitle>
            <DialogDescription>
              {isEditing
                ? "Edit the details of the filter you want to modify."
                : "Enter the details of the new filter you want to add."}
            </DialogDescription>
            <div className="flex flex-col">
              <Label htmlFor="expression" className="mb-2">
                Expression
              </Label>
              <Input
                id="expression"
                placeholder="Enter the expression to filter"
                className="mb-4"
                value={expression}
                onChange={e => setExpression(e.target.value)}
              />
              <Label htmlFor="domain" className="mb-2">
                Domain
              </Label>
              <Input
                id="domain"
                placeholder="Enter the domain"
                className="mb-4"
                value={domain}
                onChange={e => setDomain(e.target.value)}
              />
              <Label htmlFor="type" className="mb-2">
                Action
              </Label>
              <Select value={type} onValueChange={value => setType(value as Filter["type"])}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="censor">Censor</SelectItem>
                  <SelectItem value="remove">Remove</SelectItem>
                </SelectContent>
              </Select>

              <Button className="mt-4" onClick={isEditing ? handleUpdateFilter : handleAddFilter}>
                {isEditing ? "Update Filter" : "Add Filter"}
              </Button>
            </div>
          </DialogContent>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Expression</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filters.map((filter, index) => (
            <TableRow key={index}>
              <TableCell className="font-mono font-medium">{filter.expression}</TableCell>
              <TableCell>{filter.domain}</TableCell>
              <TableCell>{filter.type}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Button variant="outline" onClick={() => handleEditFilter(index)}>
                  <EditIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" onClick={() => handleRemoveFilter(index)} color="red">
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
