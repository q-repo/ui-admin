import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";

export default function Users() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Users"/>
      <div className="space-y-6">
        <ComponentCard title="Table Users">
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  )
}