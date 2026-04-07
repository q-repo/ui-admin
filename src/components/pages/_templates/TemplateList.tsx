import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import TemplatesListTable from "@/components/tables/TemplatesListTable";

export default function TemplateList() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Template List" />
      <div className="space-y-6">
        <ComponentCard title="Template List">
          <TemplatesListTable />
        </ComponentCard>
      </div>
    </div>
  );
}
