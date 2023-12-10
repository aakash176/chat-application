import * as React from "react";
import Box from "@mui/material/Box";
import { LinearProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
}
