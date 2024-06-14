import { useEffect, useState } from "react"
import "./submissions.css"
import DataTable from 'react-data-table-component'
import toast from "react-hot-toast";
type PainScale = {
  id: number;
  weight_loss: string;
  fever: string;
  cough: string;
  pain: number;
}


function Submission() {

  const [data, setData] = useState([])
  const [selectedRows, setSelectedRows] = useState<PainScale[]>([])
  const [revalidate, setRevalidate] = useState(true)
  useEffect(() => {
    if (revalidate) {
      fetch('http://localhost:3000/painscale')
        .then(res => res.json())
        .then(data => {
          setData(data)
          setRevalidate(false)
        }).catch(err => {
          console.error(err)
          toast.error("Failed to fetch data. Please Reload", { icon: '😢' })
        })
    }
  }, [revalidate])
  

async function deleteSubmission() {
    try {
      for (const row of selectedRows) {
        const res = await fetch(`http://localhost:3000/painscale/${row.id}`, {
          method: 'DELETE',
        })
        if (res.ok) {
          toast.success(`deleted record with id ${row.id}`, { icon: '👏' })
        } else {
          toast.error("Failed to delete data", { icon: '😢' })
        }
      }
      setSelectedRows([])
      setRevalidate(true)
    } catch (err) {
      console.error(err)
      toast.error("Failed to delete data", { icon: '😢' })
    }
  }

  const columns = [
    {
      name: 'Weight Loss',
      selector: (row: PainScale) => row.weight_loss,
      sortable: true,
    },
    {
      name: 'Fever',
      selector: (row: PainScale) => row.fever,
      sortable: true,
    },
    {
      name: 'Cough',
      selector: (row: PainScale) => row.cough,
      sortable: true,
    },
    {
      name: 'Pain',
      selector: (row: PainScale) => row.pain,
      sortable: true,
    },
  ]

  function onChangeSelected(selectedRows: any) {
    setSelectedRows(selectedRows.selectedRows)
  }

  return (
    <div className="container">
      <h1>
        Submissions
      </h1>
      <p>
        Here are the submissions
      </p>
      <div className="actions">
        {
          selectedRows.length > 0 && (
            <button onClick={deleteSubmission}>Delete</button>
          )
        }
      </div>
      <DataTable
        columns={columns}
        pagination
        selectableRows
        onSelectedRowsChange={onChangeSelected}
        clearSelectedRows={revalidate}
        data={data}
      />
    </div>
  )
}

export default Submission
