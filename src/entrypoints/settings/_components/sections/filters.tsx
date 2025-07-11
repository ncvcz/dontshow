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
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FilterFormData {
  expression: string;
  domain: string;
  type: Filter["type"];
}

const DEFAULT_FORM_DATA: FilterFormData = {
  expression: "",
  domain: "*",
  type: "censor",
};

export default function Filters() {
  const { t } = useTranslation("settings", { keyPrefix: "filters" });
  const [enabled] = useStorage<boolean>("local:enabled", true);
  const [filters, setFilters] = useStorage<Filter[]>("local:filters", []);
  const [settings] = useStorage<Settings>("local:settings", {});
  const [isSensitiveAlertEnabled, setIsSensitiveAlertEnabled] = useState(true);

  // Dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Form state
  const [formData, setFormData] = useState<FilterFormData>(DEFAULT_FORM_DATA);

  const isEditing = editingIndex !== null;

  // Helper functions
  const resetForm = () => {
    setFormData(DEFAULT_FORM_DATA);
    setEditingIndex(null);
  };

  const closeDialog = () => {
    setIsOpen(false);
    resetForm();
  };

  const validateForm = () => {
    return formData.expression.trim() !== "" && formData.domain.trim() !== "";
  };

  // Handlers
  const handleAddFilter = () => {
    if (!validateForm()) return;

    const newFilter: Filter = { ...formData };
    setFilters([...filters, newFilter]);
    closeDialog();
  };

  const handleEditFilter = (index: number) => {
    const filter = filters[index];
    setFormData({
      expression: filter.expression,
      domain: filter.domain,
      type: filter.type,
    });
    setEditingIndex(index);
    setIsOpen(true);
  };

  const handleUpdateFilter = () => {
    if (!validateForm() || editingIndex === null) return;

    const updatedFilters = filters.map((filter, i) =>
      i === editingIndex ? { ...formData } : filter
    );
    setFilters(updatedFilters);
    closeDialog();
  };

  const handleRemoveFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (isEditing) {
      handleUpdateFilter();
    } else {
      handleAddFilter();
    }
  };

  // Sensitive content warning
  if (enabled && settings.sensitiveAlert && isSensitiveAlertEnabled) {
    return (
      <Card className="flex flex-col items-center justify-center gap-4 p-6">
        <h1 className="text-3xl font-bold">{t("sensitiveAlert.title")}</h1>
        <p className="text-muted-foreground max-w-md text-center text-base">
          {t("sensitiveAlert.description")}
        </p>
        <Button className="w-full max-w-xs" onClick={() => setIsSensitiveAlertEnabled(false)}>
          {t("sensitiveAlert.button")}
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6 py-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">{t("title")}</h2>
          <p className="text-muted-foreground max-w-2xl text-base">{t("description")}</p>
        </div>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              <span>{t("addFilter.title")}</span>
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md">
            <DialogTitle>{isEditing ? t("editFilter.title") : t("addFilter.title")}</DialogTitle>
            <DialogDescription>
              {isEditing ? t("editFilter.description") : t("addFilter.description")}
            </DialogDescription>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="expression">{t("expression.label")}</Label>
                <Input
                  id="expression"
                  placeholder={t("expression.placeholder")}
                  value={formData.expression}
                  onChange={e => setFormData(prev => ({ ...prev, expression: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="domain">{t("domain.label")}</Label>
                <Input
                  id="domain"
                  placeholder={t("domain.placeholder")}
                  value={formData.domain}
                  onChange={e => setFormData(prev => ({ ...prev, domain: e.target.value }))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="action">{t("action.label")}</Label>
                <Select
                  value={formData.type}
                  onValueChange={value =>
                    setFormData(prev => ({ ...prev, type: value as Filter["type"] }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={t("action.placeholder")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="censor">{t("action.options.censor")}</SelectItem>
                    <SelectItem value="remove">{t("action.options.remove")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={closeDialog}>
                  {t("cancel")}
                </Button>
                <Button className="flex-1" onClick={handleSubmit} disabled={!validateForm()}>
                  {isEditing ? t("updateFilter.title") : t("addFilter.title")}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filters.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-8">
          <h3 className="mb-2 text-lg font-semibold">{t("noFilters.title")}</h3>
          <p className="text-muted-foreground mb-4 text-center">{t("noFilters.description")}</p>
        </Card>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("expression.label")}</TableHead>
              <TableHead>{t("domain.label")}</TableHead>
              <TableHead>{t("action.label")}</TableHead>
              <TableHead className="w-[100px]">{t("actions.label")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filters.map((filter, index) => (
              <TableRow key={index}>
                <TableCell className="font-mono font-medium">{filter.expression}</TableCell>
                <TableCell>{filter.domain}</TableCell>
                <TableCell className="capitalize">{filter.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditFilter(index)}
                      className="h-8 w-8 p-0"
                    >
                      <EditIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveFilter(index)}
                      className="text-destructive hover:text-destructive h-8 w-8 p-0"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
