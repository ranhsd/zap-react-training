import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2)
  }
}));

export default function ZapCardLayout({ title, children }) {

  const classes = useStyles();

  return (
    <Paper>
      <Box display="flex" flexDirection="column" alignItems="start" p={2}>
        <Typography variant="h6" className={classes.title}>
          {title}
        </Typography>
        {children}
      </Box>
    </Paper>
  );
}
