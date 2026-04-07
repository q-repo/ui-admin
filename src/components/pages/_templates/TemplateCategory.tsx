import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TemplatesCategoryTable from "@/components/tables/TemplatesCategoryTable";

export default function TemplateCategory() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Template Category" />
      <div className="space-y-6">
        <ComponentCard title="Template Category">
          <TemplatesCategoryTable />
        </ComponentCard>
      </div>
    </div>
  );
}
