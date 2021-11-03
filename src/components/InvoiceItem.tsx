import { Link } from "react-router-dom";

interface InvoiceItemProps {
  id: string,
  
}

const InvoiceItem = (props: InvoiceItemProps) => {

  return <Link to={"/invoices/" + props.id} key={props.id}>
  <div>
    {props.id}: 
  </div>
</Link>
}

export default InvoiceItem