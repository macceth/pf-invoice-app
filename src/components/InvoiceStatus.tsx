interface InvoiceStatusProps {
  status: string;
  className?: string;
}

const InvoiceStatus = (props: InvoiceStatusProps) => {
  const statusText = props.status[0].toUpperCase() + props.status.substring(1);

  let statusClass = "text-center p-3 w-24 rounded-xl";
  if (props.status === "paid") statusClass += " bg-green-50 text-green-500";
  if (props.status === "pending") statusClass += " bg-yellow-50 text-yellow-500";
  if (props.status === "draft") statusClass += " bg-gray-50 text-gray-500";

  return (
    <div className={(props.className? props.className : '')}>
      <div className={statusClass}>⬤ {statusText}</div>
    </div>
  );
};

export default InvoiceStatus;
