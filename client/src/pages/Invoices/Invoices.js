// Import all needed dependencies
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';

// Import api from invoice
import { getInvoiceByOrderId } from '../../app/api/invoice';

// Import utility format rupiah
import { formatRupiah } from '../../app/utils';

// Import all needed components
import Navbar from '../../components/Navbar/Navbar';
import InvoiceData from '../../components/Invoices/InvoiceData';

const Invoices = () => {
  // order_id as parameter
  const { order_id } = useParams();

  // State
  const [invoice, setInvoice] = React.useState({});
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("process");

  // useNavigate
  const navigate = useNavigate();

  // Each order item change, fetch API of getInvoiceByOrderId
  React.useEffect(() => {
    getInvoiceByOrderId(order_id)
      .then(({ data }) => {
        if (data.error) {
          setError(data.message);
          swal("No invoice available!", '', "error");
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
        setInvoice(data);
      })
      .catch((err) => setError(err.message))
      .finally((_) => setStatus("success"));
  }, [order_id, navigate]);

  return (
    <div>
        <Navbar />
        <div className="container pl-[7.5rem] xs:pt-48 lg:pt-20">
          {status === "process" && (
            <p>Loading...</p>
          )}
          {/* If fetching status is success and no error, invoice component will be rendered  */}
          { (status === "success" && error === "") && (
            <InvoiceData
              status={invoice?.payment_status} 
              orderId={invoice?.order?.order_number} 
              total={formatRupiah(invoice?.total)} 
              userName={invoice?.user?.full_name} 
              email={invoice?.user?.email} 
              addressDetail={invoice?.delivery_address?.detail} 
              kelurahan={invoice?.delivery_address?.kelurahan} 
              kecamatan={invoice?.delivery_address?.kecamatan} 
              kabupaten={invoice?.delivery_address?.kabupaten} 
              provinsi={invoice?.delivery_address?.provinsi} />
          )}
        </div>
    </div>
  )
}

// export to app.js
export default Invoices