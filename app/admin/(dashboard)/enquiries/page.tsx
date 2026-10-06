import { listEnquiries } from "@/services/enquiries";
import { Badge } from "@/components/ui/Badge";

export default async function AdminEnquiriesPage() {
  const enquiries = await listEnquiries();

  return (
    <div>
      <h1 className="text-ink text-2xl font-semibold">Enquiries</h1>

      {enquiries.length === 0 ? (
        <p className="text-muted mt-6 text-sm">
          No enquiries yet — once MongoDB is connected, submissions from every form will appear
          here.
        </p>
      ) : (
        <div className="border-border bg-surface mt-6 overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="border-border text-muted border-b">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Department</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Received</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry._id} className="border-border border-b last:border-0">
                  <td className="text-ink px-4 py-3">
                    {enquiry.name}
                    <div className="text-muted text-xs">{enquiry.email}</div>
                  </td>
                  <td className="text-muted px-4 py-3 uppercase">{enquiry.type}</td>
                  <td className="text-muted px-4 py-3">{enquiry.assignedDepartment}</td>
                  <td className="px-4 py-3">
                    <Badge>{enquiry.status}</Badge>
                  </td>
                  <td className="text-muted px-4 py-3">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
