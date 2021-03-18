import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(3)
  }
}));

export default function ZapAppBar({ title, ...rest }) {
  const classes = useStyles();

  return (
    <AppBar position="static" {...rest}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h5">{title}</Typography>
      </Toolbar>
    </AppBar>
  );
}
