import { Button } from "@mui/material"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Link from "next/link";

export const AddEventBtn = () => {
  return (
    <Link href='/create'>
      <Button
        component="label"
        role={undefined}
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        Create an Event
      </Button>
    </Link>

  )
}